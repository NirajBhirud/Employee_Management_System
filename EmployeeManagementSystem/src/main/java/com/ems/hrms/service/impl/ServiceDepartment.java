package com.ems.hrms.service.impl;

import com.ems.hrms.dto.DtoDepartment;
import com.ems.hrms.exception.ExceptionDepartment;
import com.ems.hrms.mapper.MapperDepartment;
import com.ems.hrms.model.Department;
import com.ems.hrms.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceDepartment implements com.ems.hrms.service.ServiceDepartmentIn {

    private final DepartmentRepository departmentRepository;

    public ServiceDepartment(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public DtoDepartment createDepartment(DtoDepartment dtoDepartment) {

        if (departmentRepository.existsByDepartmentName(dtoDepartment.getDepartmentName())) {
            throw new RuntimeException("Department name already exists.");
        }

        if (departmentRepository.existsByDepartmentCode(dtoDepartment.getDepartmentCode())) {
            throw new RuntimeException("Department code already exists.");
        }

        Department department = MapperDepartment.mapToDepartment(dtoDepartment);

        Department savedDepartment = departmentRepository.save(department);

        return MapperDepartment.mapToDtoDepartment(savedDepartment);
    }

    @Override
    public DtoDepartment getDepartmentById(int id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ExceptionDepartment("Department not found with id : " + id));

        return MapperDepartment.mapToDtoDepartment(department);
    }

    @Override
    public List<DtoDepartment> getAllDepartments() {

        List<Department> departments = departmentRepository.findAll();

        return departments.stream()
                .map(MapperDepartment::mapToDtoDepartment)
                .collect(Collectors.toList());
    }

    @Override
    public DtoDepartment updateDepartment(int id, DtoDepartment updatedDepartment) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ExceptionDepartment("Department not found with id : " + id));

        department.setDepartmentName(updatedDepartment.getDepartmentName());
        department.setDepartmentCode(updatedDepartment.getDepartmentCode());
        department.setDescription(updatedDepartment.getDescription());
        department.setStatus(updatedDepartment.getStatus());

        Department savedDepartment = departmentRepository.save(department);

        return MapperDepartment.mapToDtoDepartment(savedDepartment);
    }

    @Override
    public void deleteDepartment(int id) {

        Department department = departmentRepository.findById(id)
                .orElseThrow(() ->
                        new ExceptionDepartment("Department not found with id : " + id));

        departmentRepository.delete(department);
    }
}