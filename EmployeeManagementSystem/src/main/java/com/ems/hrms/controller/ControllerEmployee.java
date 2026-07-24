package com.ems.hrms.controller;

import com.ems.hrms.dto.DtoEmployee;
import com.ems.hrms.exception.ExceptionEmployee;
import com.ems.hrms.model.User;
import com.ems.hrms.security.AuthUtil;
import com.ems.hrms.service.ServiceEmployeeIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/employee")
public class ControllerEmployee {

    @Autowired
    private ServiceEmployeeIn serviceEmployee;

    @Autowired
    private AuthUtil authUtil;

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @PostMapping
    public ResponseEntity<DtoEmployee> createEmployee(@Valid @RequestBody DtoEmployee dtaEmployee){
        DtoEmployee e = serviceEmployee.createEmployee(dtaEmployee);
        return new ResponseEntity<>(e, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping("/{id}")
    public ResponseEntity<DtoEmployee> findById(@PathVariable("id") int id){
        DtoEmployee e=serviceEmployee.findById(id);
        return new ResponseEntity<>(e,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping
    public ResponseEntity<List<DtoEmployee>> findAllEmployee(){
        List<DtoEmployee> employes =serviceEmployee.findAllEmployee();
        return new ResponseEntity<>(employes,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @PutMapping("/{id}")
    public ResponseEntity<DtoEmployee> updateEmployee(@PathVariable("id") int id, @Valid @RequestBody DtoEmployee updatedemployee){
        DtoEmployee updatedemp = serviceEmployee.updateEmployee(id, updatedemployee);
        return new ResponseEntity<>(updatedemp, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") int id){
        serviceEmployee.deleteEmployee(id);
        return ResponseEntity.ok("This Employee is Deleted successfully");
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<DtoEmployee>> findByDepartment(@PathVariable int departmentId){
        List<DtoEmployee> employees = serviceEmployee.findByDepartment(departmentId);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<DtoEmployee> getMyProfile(){
        User user = authUtil.getCurrentUser();
        if (user.getEmployee() == null) {
            throw new ExceptionEmployee("No employee profile linked to this account");
        }
        DtoEmployee dto = serviceEmployee.findById(user.getEmployee().getId());
        return ResponseEntity.ok(dto);
    }
}