package com.example.contactform.repository;

import com.example.contactform.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    long countByEmailAndCreatedAtAfter(String email, LocalDateTime since);
}