package com.ems.hrms.controller;

import com.ems.hrms.dto.DtoPayslip;
import com.ems.hrms.security.AuthUtil;
import com.ems.hrms.service.ServicePayrollIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payroll")
public class ControllerPayroll {

    @Autowired
    private ServicePayrollIn servicePayroll;

    @Autowired
    private AuthUtil authUtil;

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @PostMapping("/generate")
    public ResponseEntity<DtoPayslip> generatePayslip(@Valid @RequestBody DtoPayslip request) {
        DtoPayslip payslip = servicePayroll.generatePayslip(request);
        return new ResponseEntity<>(payslip, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DtoPayslip> getPayslipById(@PathVariable int id) {
        DtoPayslip payslip = servicePayroll.getPayslipById(id);
        authUtil.verifyOwnEmployeeOrStaff(payslip.getEmployeeId());
        return ResponseEntity.ok(payslip);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<DtoPayslip>> getPayslipsForEmployee(@PathVariable int employeeId) {
        authUtil.verifyOwnEmployeeOrStaff(employeeId);
        List<DtoPayslip> payslips = servicePayroll.getPayslipsForEmployee(employeeId);
        return ResponseEntity.ok(payslips);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping
    public ResponseEntity<List<DtoPayslip>> getPayslipsForMonth(
            @RequestParam int month,
            @RequestParam int year) {
        List<DtoPayslip> payslips = servicePayroll.getPayslipsForMonth(month, year);
        return ResponseEntity.ok(payslips);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @PutMapping("/{id}")
    public ResponseEntity<DtoPayslip> updatePayslip(@PathVariable int id, @Valid @RequestBody DtoPayslip request) {
        DtoPayslip payslip = servicePayroll.updatePayslip(id, request);
        return ResponseEntity.ok(payslip);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePayslip(@PathVariable int id) {
        servicePayroll.deletePayslip(id);
        return ResponseEntity.ok("Payslip deleted successfully.");
    }
}