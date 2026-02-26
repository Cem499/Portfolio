package com.example.contactform.service;

import com.example.contactform.entity.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${app.mail.recipient}")
    private String recipient;

    @Value("${spring.mail.username}")
    private String senderAddress;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendNotificationEmail(ContactMessage msg) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(senderAddress);
            mail.setTo(recipient);
            mail.setSubject("Neue Kontaktanfrage von " + msg.getName());
            mail.setText("Name: " + msg.getName() + "\nE-Mail: " + msg.getEmail()
                    + "\nDatum: " + msg.getCreatedAt() + "\n\nNachricht:\n" + msg.getMessage());
            mailSender.send(mail);
            log.info("Benachrichtigung gesendet für ID {}", msg.getId());
        } catch (MailException e) {
            log.error("Fehler beim Senden der Benachrichtigung: {}", e.getMessage());
        }
    }

    @Async
    public void sendConfirmationEmail(ContactMessage msg) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(senderAddress);
            mail.setTo(msg.getEmail());
            mail.setSubject("Wir haben deine Nachricht erhalten!");
            mail.setText("Hallo " + msg.getName() + ",\n\nvielen Dank für deine Nachricht. "
                    + "Wir melden uns schnellstmöglich.\n\nMit freundlichen Grüßen,\nDein Support-Team");
            mailSender.send(mail);
            log.info("Bestätigung gesendet an {}", msg.getEmail());
        } catch (MailException e) {
            log.error("Fehler beim Senden der Bestätigung: {}", e.getMessage());
        }
    }
}