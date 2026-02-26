package com.example.contactform.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class ApiErrorResponse {

    private int status;
    private String error;
    private String message;
    private LocalDateTime timestamp;
    private Map<String, String> fieldErrors;

    public ApiErrorResponse(int status, String error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    public ApiErrorResponse(int status, String error, String message, Map<String, String> fieldErrors) {
        this(status, error, message);
        this.fieldErrors = fieldErrors;
    }

    public int getStatus() { return status; }
    public String getError() { return error; }
    public String getMessage() { return message; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public Map<String, String> getFieldErrors() { return fieldErrors; }
}