package com.ems.hrms.controller;

import com.ems.hrms.dto.DtoDepartment;
import com.ems.hrms.service.ServiceDepartmentIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin("*")
public class DepartmentController {

    @Autowired
    private ServiceDepartmentIn serviceDepartmentIn;

    @PostMapping
    public ResponseEntity<DtoDepartment> createDepartment(@RequestBody DtoDepartment dtoDepartment) {

        DtoDepartment savedDepartment = serviceDepartmentIn.createDepartment(dtoDepartment);

        return new ResponseEntity<>(savedDepartment, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DtoDepartment> getDepartmentById(@PathVariable int id) {

        DtoDepartment dtoDepartment = serviceDepartmentIn.getDepartmentById(id);

        return ResponseEntity.ok(dtoDepartment);
    }

    @GetMapping
    public ResponseEntity<List<DtoDepartment>> getAllDepartments() {

        List<DtoDepartment> departments = serviceDepartmentIn.getAllDepartments();

        return ResponseEntity.ok(departments);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DtoDepartment> updateDepartment(
            @PathVariable int id,
            @RequestBody DtoDepartment dtoDepartment) {

        DtoDepartment updatedDepartment =
                serviceDepartmentIn.updateDepartment(id, dtoDepartment);

        return ResponseEntity.ok(updatedDepartment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable int id) {

        serviceDepartmentIn.deleteDepartment(id);

        return ResponseEntity.ok("Department deleted successfully.");
    }

}