package com.ems.hrms.service.impl;

import com.ems.hrms.dto.DtoEmployee;
import com.ems.hrms.exception.ExceptionDepartment;
import com.ems.hrms.exception.ExceptionEmployee;
import com.ems.hrms.mapper.MapperEmployee;
import com.ems.hrms.model.Department;
import com.ems.hrms.model.Employee;
import com.ems.hrms.repository.DepartmentRepository;
import com.ems.hrms.repository.RepositoryAttendance;
import com.ems.hrms.repository.RepositoryEmployee;
import com.ems.hrms.repository.RepositoryPayslip;
import com.ems.hrms.repository.UserRepository;
import com.ems.hrms.service.ServiceEmployeeIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceEmployee implements ServiceEmployeeIn {
    @Autowired
    private RepositoryEmployee repositoryEmployee;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RepositoryAttendance repositoryAttendance;

    @Autowired
    private RepositoryPayslip repositoryPayslip;


    @Override
    public DtoEmployee createEmployee(DtoEmployee dtoEmployee) {
        Employee employee = MapperEmployee.mapTOEmployee(dtoEmployee);

        if (dtoEmployee.getDepartmentId() != null) {
            Department department = departmentRepository.findById(dtoEmployee.getDepartmentId())
                    .orElseThrow(() -> new ExceptionDepartment(
                            "No department found with id " + dtoEmployee.getDepartmentId()));
            employee.setDepartment(department);
        }

        Employee savedEmployee = repositoryEmployee.save(employee);
        return MapperEmployee.mapToDtoEmployee(savedEmployee);
    }

    @Override
    public DtoEmployee findById(int id) {
        Employee employee=repositoryEmployee.findById(id).orElseThrow(
                ()-> new ExceptionEmployee("The Employee is not founded by this give Id" +id));
        return MapperEmployee.mapToDtoEmployee(employee);
    }

    @Override
    public List<DtoEmployee> findAllEmployee() {
        List<Employee> employees= repositoryEmployee.findAll();
        return employees.stream().map(
                (employee) -> MapperEmployee.mapToDtoEmployee(employee)).collect(Collectors.toList());

    }

    @Override
    public DtoEmployee updateEmployee(int id, DtoEmployee updatedemployee) {
        Employee employee = repositoryEmployee.findById(id).orElseThrow(
                () -> new ExceptionEmployee("The Employee is not exist or found by given id " + id));
        employee.setFirstname(updatedemployee.getFirstname());
        employee.setLastname(updatedemployee.getLastname());
        employee.setEmail(updatedemployee.getEmail());
        employee.setPhone(updatedemployee.getPhone());
        employee.setDesignation(updatedemployee.getDesignation());
        employee.setSalary(updatedemployee.getSalary());
        employee.setJoiningDate(updatedemployee.getJoiningDate());
        employee.setStatus(updatedemployee.getStatus());

        if (updatedemployee.getDepartmentId() != null) {
            Department department = departmentRepository.findById(updatedemployee.getDepartmentId())
                    .orElseThrow(() -> new ExceptionDepartment(
                            "No department found with id " + updatedemployee.getDepartmentId()));
            employee.setDepartment(department);
        }

        return MapperEmployee.mapToDtoEmployee(repositoryEmployee.save(employee));
    }

    @Override
    @Transactional
    public void deleteEmployee(int id) {
        Employee employee = repositoryEmployee.findById(id).orElseThrow(
                () -> new ExceptionEmployee("The Employee is not exist or found by given id " + id));

        // Clean up dependent records first, so the FK constraints on
        // users.employee_id / attendance.employee_id / payslip.employee_id don't block the delete.
        userRepository.deleteByEmployee_Id(id);
        repositoryAttendance.deleteByEmployee_Id(id);
        repositoryPayslip.deleteByEmployee_Id(id);

        repositoryEmployee.delete(employee);
    }

    @Override
    public List<DtoEmployee> findByDepartment(int departmentId) {
        return repositoryEmployee.findByDepartment_Id(departmentId).stream()
                .map(MapperEmployee::mapToDtoEmployee)
                .collect(Collectors.toList());
    }

}