package com.ems.hrms.controller;

import com.ems.hrms.dto.DtoAttendance;
import com.ems.hrms.service.ServiceAttendanceIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/attendance")
public class ControllerAttendance {

    @Autowired
    private ServiceAttendanceIn serviceAttendance;

    @PostMapping("/check-in/{employeeId}")
    public ResponseEntity<DtoAttendance> checkIn(@PathVariable int employeeId) {
        DtoAttendance dto = serviceAttendance.checkIn(employeeId);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @PostMapping("/check-out/{employeeId}")
    public ResponseEntity<DtoAttendance> checkOut(@PathVariable int employeeId) {
        DtoAttendance dto = serviceAttendance.checkOut(employeeId);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/mark")
    public ResponseEntity<DtoAttendance> markAttendance(@Valid @RequestBody DtoAttendance dtoAttendance) {
        DtoAttendance dto = serviceAttendance.markAttendance(dtoAttendance);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<DtoAttendance>> getAttendanceByEmployee(
            @PathVariable int employeeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<DtoAttendance> records = serviceAttendance.getAttendanceByEmployee(employeeId, startDate, endDate);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<DtoAttendance>> getAttendanceByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<DtoAttendance> records = serviceAttendance.getAttendanceByDate(date);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/summary/{employeeId}")
    public ResponseEntity<Map<String, Object>> getMonthlySummary(
            @PathVariable int employeeId,
            @RequestParam int year,
            @RequestParam int month) {

        Map<String, Object> summary = serviceAttendance.getMonthlySummary(employeeId, year, month);
        return ResponseEntity.ok(summary);
    }
}