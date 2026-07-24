package com.ems.hrms.service.impl;

import com.ems.hrms.dto.DtoPayslip;
import com.ems.hrms.exception.ExceptionEmployee;
import com.ems.hrms.exception.ExceptionPayroll;
import com.ems.hrms.mapper.MapperPayslip;
import com.ems.hrms.model.Attendance;
import com.ems.hrms.model.Employee;
import com.ems.hrms.model.Payslip;
import com.ems.hrms.repository.RepositoryAttendance;
import com.ems.hrms.repository.RepositoryEmployee;
import com.ems.hrms.repository.RepositoryPayslip;
import com.ems.hrms.service.ServicePayrollIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicePayroll implements ServicePayrollIn {

    @Autowired
    private RepositoryPayslip repositoryPayslip;

    @Autowired
    private RepositoryEmployee repositoryEmployee;

    @Autowired
    private RepositoryAttendance repositoryAttendance;

    @Override
    public DtoPayslip generatePayslip(DtoPayslip request) {
        Employee employee = repositoryEmployee.findById(request.getEmployeeId()).orElseThrow(
                () -> new ExceptionEmployee("The Employee is not found by given id " + request.getEmployeeId()));

        repositoryPayslip.findByEmployee_IdAndMonthAndYear(request.getEmployeeId(), request.getMonth(), request.getYear())
                .ifPresent(p -> {
                    throw new ExceptionPayroll("A payslip already exists for this employee for "
                            + request.getMonth() + "/" + request.getYear());
                });

        if (employee.getSalary() == null) {
            throw new ExceptionPayroll("Employee has no salary configured; cannot generate payslip");
        }

        LocalDate startDate = LocalDate.of(request.getYear(), request.getMonth(), 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Attendance> records = repositoryAttendance
                .findByEmployee_IdAndDateBetweenOrderByDateAsc(employee.getId(), startDate, endDate);

        int deductionDays = (int) records.stream()
                .filter(a -> "Absent".equalsIgnoreCase(a.getStatus())
                        || ("Leave".equalsIgnoreCase(a.getStatus()) && Boolean.FALSE.equals(a.getPaid())))
                .count();

        double perDayRate = employee.getSalary() / startDate.lengthOfMonth();
        double leaveDeductionAmount = perDayRate * deductionDays;

        double allowances = request.getAllowances() != null ? request.getAllowances() : 0.0;
        double deductions = request.getDeductions() != null ? request.getDeductions() : 0.0;

        double netPay = employee.getSalary() + allowances - deductions - leaveDeductionAmount;

        Payslip payslip = new Payslip();
        payslip.setEmployee(employee);
        payslip.setMonth(request.getMonth());
        payslip.setYear(request.getYear());
        payslip.setBasicSalary(employee.getSalary());
        payslip.setAllowances(allowances);
        payslip.setDeductions(deductions);
        payslip.setLeaveDeductionDays(deductionDays);
        payslip.setNetPay(Math.round(netPay * 100.0) / 100.0);
        payslip.setGeneratedDate(LocalDate.now());

        return MapperPayslip.mapToDto(repositoryPayslip.save(payslip));
    }

    @Override
    public DtoPayslip getPayslipById(int id) {
        Payslip payslip = repositoryPayslip.findById(id).orElseThrow(
                () -> new ExceptionPayroll("No payslip found with id " + id));
        return MapperPayslip.mapToDto(payslip);
    }

    @Override
    public List<DtoPayslip> getPayslipsForEmployee(int employeeId) {
        return repositoryPayslip.findByEmployee_IdOrderByYearDescMonthDesc(employeeId).stream()
                .map(MapperPayslip::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DtoPayslip> getPayslipsForMonth(int month, int year) {
        return repositoryPayslip.findByMonthAndYear(month, year).stream()
                .map(MapperPayslip::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public DtoPayslip updatePayslip(int id, DtoPayslip request) {
        Payslip payslip = repositoryPayslip.findById(id).orElseThrow(
                () -> new ExceptionPayroll("No payslip found with id " + id));

        double allowances = request.getAllowances() != null ? request.getAllowances() : payslip.getAllowances();
        double deductions = request.getDeductions() != null ? request.getDeductions() : payslip.getDeductions();

        double perDayRate = payslip.getBasicSalary() / LocalDate.of(payslip.getYear(), payslip.getMonth(), 1).lengthOfMonth();
        double leaveDeductionAmount = perDayRate * payslip.getLeaveDeductionDays();

        double netPay = payslip.getBasicSalary() + allowances - deductions - leaveDeductionAmount;

        payslip.setAllowances(allowances);
        payslip.setDeductions(deductions);
        payslip.setNetPay(Math.round(netPay * 100.0) / 100.0);

        return MapperPayslip.mapToDto(repositoryPayslip.save(payslip));
    }

    @Override
    public void deletePayslip(int id) {
        Payslip payslip = repositoryPayslip.findById(id).orElseThrow(
                () -> new ExceptionPayroll("No payslip found with id " + id));
        repositoryPayslip.delete(payslip);
    }
}