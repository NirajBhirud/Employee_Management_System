package com.ems.hrms.mapper;

import com.ems.hrms.dto.DtoEmployee;
import com.ems.hrms.model.Employee;

public class MapperEmployee {

    public static Employee mapTOEmployee(DtoEmployee dtoEmployee) {

        return new Employee(
                dtoEmployee.getId(),
                dtoEmployee.getFirstname(),
                dtoEmployee.getLastname(),
                dtoEmployee.getEmail(),
                dtoEmployee.getPhone(),
                null, // department is resolved and set in the service layer, not here
                dtoEmployee.getDesignation(),
                dtoEmployee.getSalary(),
                dtoEmployee.getJoiningDate(),
                dtoEmployee.getStatus()
        );
    }

    public static DtoEmployee mapToDtoEmployee(Employee employee) {
        DtoEmployee dto = new DtoEmployee();
        dto.setId(employee.getId());
        dto.setFirstname(employee.getFirstname());
        dto.setLastname(employee.getLastname());
        dto.setEmail(employee.getEmail());
        dto.setPhone(employee.getPhone());
        dto.setDesignation(employee.getDesignation());
        dto.setSalary(employee.getSalary());
        dto.setJoiningDate(employee.getJoiningDate());
        dto.setStatus(employee.getStatus());

        if (employee.getDepartment() != null) {
            dto.setDepartmentId(employee.getDepartment().getId());
            dto.setDepartmentName(employee.getDepartment().getDepartmentName());
        }
        return dto;
    }
}