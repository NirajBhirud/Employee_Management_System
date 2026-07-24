package com.ems.hrms.repository;

import com.ems.hrms.model.Payslip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositoryPayslip extends JpaRepository<Payslip, Integer> {

    Optional<Payslip> findByEmployee_IdAndMonthAndYear(int employeeId, int month, int year);

    List<Payslip> findByEmployee_IdOrderByYearDescMonthDesc(int employeeId);

    List<Payslip> findByMonthAndYear(int month, int year);

    void deleteByEmployee_Id(int employeeId);

}