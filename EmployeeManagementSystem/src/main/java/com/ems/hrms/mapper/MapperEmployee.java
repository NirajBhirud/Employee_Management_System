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
                dtoEmployee.getDepartment(),
                dtoEmployee.getDesignation(),
                dtoEmployee.getSalary(),
                dtoEmployee.getJoiningDate(),
                dtoEmployee.getStatus()

        );

    }

    public static DtoEmployee mapToDtoEmployee(Employee employee) {

        return new DtoEmployee(

                employee.getId(),
                employee.getFirstname(),
                employee.getLastname(),
                employee.getEmail(),
                employee.getPhone(),
                employee.getDepartment(),
                employee.getDesignation(),
                employee.getSalary(),
                employee.getJoiningDate(),
                employee.getStatus()

        );

    }

}