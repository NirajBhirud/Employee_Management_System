package com.ems.hrms.service;

import com.ems.hrms.dto.DtoDepartment;

import java.util.List;

public interface ServiceDepartmentIn {

    // Create Department
    DtoDepartment createDepartment(DtoDepartment dtoDepartment);

    // Get Department by Id
    DtoDepartment getDepartmentById(int id);

    // Get All Departments
    List<DtoDepartment> getAllDepartments();

    // Update Department
    DtoDepartment updateDepartment(int id, DtoDepartment updatedDepartment);

    // Delete Department
    void deleteDepartment(int id);

}