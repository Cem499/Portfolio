package com.example.contactform.controller;

import com.example.contactform.dto.ApiErrorResponse;
import com.example.contactform.dto.ContactRequest;
import com.example.contactform.dto.ContactResponse;
import com.example.contactform.entity.ContactMessage;
import com.example.contactform.repository.ContactMessageRepository;
import com.example.contactform.service.ContactService;
import com.example.contactform.service.RateLimiterService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private static final Logger log = LoggerFactory.getLogger(ContactController.class);

    private final ContactService contactService;
    private final RateLimiterService rateLimiterService;
    private final ContactMessageRepository contactMessageRepository;

    // Only trust X-Forwarded-For when running behind a known reverse proxy.
    // Set app.proxy.trusted=true in application.properties if using nginx / Cloudflare / ALB.
    @Value("${app.proxy.trusted:false}")
    private boolean trustForwardedFor;

    public ContactController(ContactService contactService,
                             RateLimiterService rateLimiterService,
                             ContactMessageRepository contactMessageRepository) {
        this.contactService = contactService;
        this.rateLimiterService = rateLimiterService;
        this.contactMessageRepository = contactMessageRepository;
    }

    /**
     * Returns all stored contact messages.
     * NOTE: Exposes personal data. Protect with Spring Security before deploying to production.
     */
    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> submitContact(
            @Valid @RequestBody ContactRequest request,
            HttpServletRequest httpRequest) {

        String clientIp = resolveClientIp(httpRequest);
        log.info("Kontaktanfrage von IP: {}", clientIp);

        if (!rateLimiterService.tryConsume(clientIp)) {
            log.warn("Rate Limit überschritten für IP: {}", clientIp);
            return ResponseEntity
                    .status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(new ApiErrorResponse(429, "Too Many Requests",
                            "Zu viele Anfragen. Bitte warte einen Moment."));
        }

        ContactResponse response = contactService.processContact(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Deletes a single contact message by ID.
     * Returns 204 No Content on success, 404 if the message does not exist.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        if (!contactMessageRepository.existsById(id)) {
            log.warn("Löschen fehlgeschlagen – ID nicht gefunden: {}", id);
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiErrorResponse(404, "Not Found",
                            "Nachricht mit ID " + id + " nicht gefunden."));
        }
        contactMessageRepository.deleteById(id);
        log.info("Nachricht gelöscht: ID={}", id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Resolves the real client IP.
     * X-Forwarded-For is only trusted when app.proxy.trusted=true to prevent spoofing.
     */
    private String resolveClientIp(HttpServletRequest request) {
        if (trustForwardedFor) {
            String forwarded = request.getHeader("X-Forwarded-For");
            if (forwarded != null && !forwarded.isBlank()) {
                return forwarded.split(",")[0].trim();
            }
        }
        return request.getRemoteAddr();
    }
}