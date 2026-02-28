package com.example.contactform.service;

import com.example.contactform.entity.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${spring.mail.password}")
    private String apiKey;

    @Value("${app.mail.recipient}")
    private String recipient;

    @Value("${spring.mail.username}")
    private String senderAddress;

    private void sendEmail(String to, String subject, String text) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = Map.of(
            "from", senderAddress,
            "to", new String[]{to},
            "subject", subject,
            "text", text
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            restTemplate.postForEntity("https://api.resend.com/emails", request, String.class);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Async
    public void sendNotificationEmail(ContactMessage msg) {
        try {
            sendEmail(
                recipient,
                "Neue Kontaktanfrage von " + msg.getName(),
                "Name: " + msg.getName() + "\nE-Mail: " + msg.getEmail()
                    + "\nDatum: " + msg.getCreatedAt() + "\n\nNachricht:\n" + msg.getMessage()
            );
            log.info("Benachrichtigung gesendet für ID {}", msg.getId());
        } catch (Exception e) {
            log.error("Fehler beim Senden der Benachrichtigung: {}", e.getMessage());
        }
    }

    @Async
    public void sendConfirmationEmail(ContactMessage msg) {
        try {
            sendEmail(
                msg.getEmail(),
                "Wir haben deine Nachricht erhalten!",
                "Hallo " + msg.getName() + ",\n\nvielen Dank für deine Nachricht. "
                    + "Wir melden uns schnellstmöglich.\n\nMit freundlichen Grüßen,\nDein Support-Team"
            );
            log.info("Bestätigung gesendet an {}", msg.getEmail());
        } catch (Exception e) {
            log.error("Fehler beim Senden der Bestätigung: {}", e.getMessage());
        }
    }
}
