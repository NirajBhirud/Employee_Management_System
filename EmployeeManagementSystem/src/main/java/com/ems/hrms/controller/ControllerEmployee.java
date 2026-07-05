package com.ems.hrms.controller;

import com.ems.hrms.dto.DtoEmployee;
import com.ems.hrms.service.ServiceEmployeeIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/employee")

public class ControllerEmployee {
    @Autowired
    private ServiceEmployeeIn serviceEmployee;

    @PostMapping
    public ResponseEntity<DtoEmployee> createEmployee(@Valid @RequestBody DtoEmployee dtaEmployee){
        DtoEmployee e = serviceEmployee.createEmployee(dtaEmployee);
        return new ResponseEntity<>(e, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
        public ResponseEntity<DtoEmployee> findById(@PathVariable("id") int id){
        DtoEmployee e=serviceEmployee.findById(id);
        return new ResponseEntity<>(e,HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<List<DtoEmployee>> findAllEmployee(){
        List<DtoEmployee> employes =serviceEmployee.findAllEmployee();
        return new ResponseEntity<>(employes,HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<DtoEmployee> updateEmployee(@PathVariable("id") int id, @Valid @RequestBody DtoEmployee updatedemployee){
        DtoEmployee updatedemp = serviceEmployee.updateEmployee(id, updatedemployee);
        return new ResponseEntity<>(updatedemp, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") int id){
        serviceEmployee.deleteEmployee(id);
        return ResponseEntity.ok("This Employee is Deleted successfully");
    }

}
