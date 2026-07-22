package com.ems.hrms.repository;

import com.ems.hrms.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositoryEmployee extends JpaRepository<Employee, Integer> {

    List<Employee> findByDepartment_Id(int departmentId);

}