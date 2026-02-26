package com.example.contactform.dto;

import java.time.LocalDateTime;

public class ContactResponse {

    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
    private String status;

    public ContactResponse(Long id, String name, String email, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
        this.status = "Nachricht erfolgreich gesendet";
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getStatus() { return status; }
}