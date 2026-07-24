package com.ems.hrms.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDate;

public class DtoPayslip {

    private int id;

    @NotNull(message = "Employee id is required")
    private Integer employeeId;

    private String employeeName; // read-only

    private String departmentName; // read-only

    @Min(value = 1, message = "Month must be between 1 and 12")
    @Max(value = 12, message = "Month must be between 1 and 12")
    private int month;

    @Min(value = 2000, message = "Year looks invalid")
    private int year;

    private Double basicSalary; // read-only, snapshotted from Employee at generation time

    @PositiveOrZero(message = "Allowances must be zero or positive")
    private Double allowances = 0.0;

    @PositiveOrZero(message = "Deductions must be zero or positive")
    private Double deductions = 0.0;

    private int leaveDeductionDays; // read-only, computed from Attendance

    private Double netPay; // read-only, computed

    private LocalDate generatedDate; // read-only

    public DtoPayslip() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Double getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(Double basicSalary) {
        this.basicSalary = basicSalary;
    }

    public Double getAllowances() {
        return allowances;
    }

    public void setAllowances(Double allowances) {
        this.allowances = allowances;
    }

    public Double getDeductions() {
        return deductions;
    }

    public void setDeductions(Double deductions) {
        this.deductions = deductions;
    }

    public int getLeaveDeductionDays() {
        return leaveDeductionDays;
    }

    public void setLeaveDeductionDays(int leaveDeductionDays) {
        this.leaveDeductionDays = leaveDeductionDays;
    }

    public Double getNetPay() {
        return netPay;
    }

    public void setNetPay(Double netPay) {
        this.netPay = netPay;
    }

    public LocalDate getGeneratedDate() {
        return generatedDate;
    }

    public void setGeneratedDate(LocalDate generatedDate) {
        this.generatedDate = generatedDate;
    }
}