package com.example.contactform.service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;


@Service
public class RateLimiterService {

    private final int requestsPerMinute;
    private final Cache<String, Bucket> cache;


    public RateLimiterService(
            @Value("${app.rate-limit.requests-per-minute:5}") int requestsPerMinute) {
        this.requestsPerMinute = requestsPerMinute;
        this.cache = Caffeine.newBuilder()
                .maximumSize(100_000)
                .expireAfterAccess(Duration.ofMinutes(2))
                .build();
    }

    public boolean tryConsume(String clientKey) {
        Bucket bucket = cache.get(clientKey, this::createBucket);
        return bucket != null && bucket.tryConsume(1);
    }

    private Bucket createBucket(String key) {
        Bandwidth limit = Bandwidth.builder()
                .capacity(requestsPerMinute)
                .refillGreedy(requestsPerMinute, Duration.ofMinutes(1))
                .build();
        return Bucket.builder().addLimit(limit).build();
    }
}