package com.ems.hrms.controller;

import com.ems.hrms.dto.DtoLeaveDecision;
import com.ems.hrms.dto.DtoLeaveRequest;
import com.ems.hrms.service.ServiceLeaveIn;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/leave")
public class ControllerLeave {

    @Autowired
    private ServiceLeaveIn serviceLeave;

    @PostMapping("/request")
    public ResponseEntity<DtoLeaveRequest> submitRequest(@Valid @RequestBody DtoLeaveRequest request) {
        DtoLeaveRequest dto = serviceLeave.submitRequest(request);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<DtoLeaveRequest>> getMyRequests() {
        return ResponseEntity.ok(serviceLeave.getMyRequests());
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping("/pending")
    public ResponseEntity<List<DtoLeaveRequest>> getPendingRequests() {
        return ResponseEntity.ok(serviceLeave.getPendingRequests());
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping
    public ResponseEntity<List<DtoLeaveRequest>> getAllRequests() {
        return ResponseEntity.ok(serviceLeave.getAllRequests());
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @PutMapping("/{id}/approve")
    public ResponseEntity<DtoLeaveRequest> approve(@PathVariable int id, @RequestBody DtoLeaveDecision decision) {
        return ResponseEntity.ok(serviceLeave.approve(id, decision));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @PutMapping("/{id}/reject")
    public ResponseEntity<DtoLeaveRequest> reject(@PathVariable int id, @RequestBody DtoLeaveDecision decision) {
        return ResponseEntity.ok(serviceLeave.reject(id, decision));
    }
}