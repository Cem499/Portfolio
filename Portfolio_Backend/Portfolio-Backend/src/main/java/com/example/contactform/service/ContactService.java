package com.example.contactform.service;

import com.example.contactform.dto.ContactRequest;
import com.example.contactform.dto.ContactResponse;
import com.example.contactform.entity.ContactMessage;
import com.example.contactform.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private static final int MAX_MESSAGES_PER_HOUR_PER_EMAIL = 3;

    private final ContactMessageRepository repository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    public ContactResponse processContact(ContactRequest request) {
        checkEmailSpam(request.getEmail());

        ContactMessage entity = new ContactMessage();
        entity.setName(request.getName());
        entity.setEmail(request.getEmail());
        entity.setMessage(request.getMessage());

        ContactMessage saved = repository.save(entity);
        log.info("Kontaktanfrage gespeichert: ID={}, E-Mail={}", saved.getId(), saved.getEmail());

        emailService.sendNotificationEmail(saved);
        emailService.sendConfirmationEmail(saved);

        return new ContactResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getCreatedAt());
    }

    private void checkEmailSpam(String email) {
        long count = repository.countByEmailAndCreatedAtAfter(email, LocalDateTime.now().minusHours(1));
        if (count >= MAX_MESSAGES_PER_HOUR_PER_EMAIL) {
            throw new TooManyRequestsException("Zu viele Nachrichten von dieser E-Mail-Adresse.");
        }
    }

    public static class TooManyRequestsException extends RuntimeException {
        public TooManyRequestsException(String message) {
            super(message);
        }
    }
}