package com.blogapp.backend.controller;

import com.blogapp.backend.dto.request.LoginRequest;
import com.blogapp.backend.dto.request.SignupRequest;
import com.blogapp.backend.dto.response.JwtResponse;
import com.blogapp.backend.dto.response.MessageResponse;
import com.blogapp.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody SignupRequest request) {
        String message = authService.registerUser(request);
        return ResponseEntity.ok(new MessageResponse(message));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> loginUser(@Valid @RequestBody LoginRequest request) {
        JwtResponse response = authService.loginUser(request);
        return ResponseEntity.ok(response);
    }
}
