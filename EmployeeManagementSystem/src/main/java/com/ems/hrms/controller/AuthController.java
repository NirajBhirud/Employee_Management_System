package com.ems.hrms.controller;

import com.ems.hrms.dto.DtoAuthResponse;
import com.ems.hrms.dto.DtoLoginRequest;
import com.ems.hrms.dto.DtoRegisterRequest;
import com.ems.hrms.service.ServiceAuthIn;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ServiceAuthIn serviceAuth;

    @PostMapping("/register")
    public ResponseEntity<DtoAuthResponse> register(@Valid @RequestBody DtoRegisterRequest request) {
        DtoAuthResponse response = serviceAuth.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<DtoAuthResponse> login(@Valid @RequestBody DtoLoginRequest request) {
        DtoAuthResponse response = serviceAuth.login(request);
        return ResponseEntity.ok(response);
    }
}