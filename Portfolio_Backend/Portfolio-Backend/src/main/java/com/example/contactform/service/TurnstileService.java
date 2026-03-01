package com.example.contactform.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class TurnstileService {

    private static final Logger log = LoggerFactory.getLogger(TurnstileService.class);
    private static final String VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    @Value("${app.turnstile.secret-key}")
    private String secretKey;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Verifies a Cloudflare Turnstile token.
     * Returns true if the token is valid, false otherwise.
     */
    public boolean verify(String token, String remoteIp) {
        if (token == null || token.isBlank()) {
            log.warn("Turnstile-Token ist leer oder null");
            return false;
        }

        try {
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("secret", secretKey);
            body.add("response", token);
            if (remoteIp != null && !remoteIp.isBlank()) {
                body.add("remoteip", remoteIp);
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<TurnstileResponse> response = restTemplate.postForEntity(
                    VERIFY_URL, request, TurnstileResponse.class);

            TurnstileResponse result = response.getBody();
            if (result != null && result.success) {
                log.info("Turnstile-Verifizierung erfolgreich");
                return true;
            } else {
                log.warn("Turnstile-Verifizierung fehlgeschlagen: {}",
                        result != null ? result.errorCodes : "keine Antwort");
                return false;
            }
        } catch (Exception e) {
            log.error("Fehler bei Turnstile-Verifizierung: {}", e.getMessage());
            return false;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class TurnstileResponse {
        @JsonProperty("success")
        boolean success;

        @JsonProperty("error-codes")
        List<String> errorCodes;
    }
}
