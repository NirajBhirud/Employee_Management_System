package com.ems.hrms.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "payslip",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"employee_id", "month", "year"})
        }
)
public class Payslip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private int month; // 1-12

    @Column(nullable = false)
    private int year;

    @Column(nullable = false)
    private Double basicSalary;

    @Column(nullable = false)
    private Double allowances;

    @Column(nullable = false)
    private Double deductions;

    @Column(nullable = false)
    private int leaveDeductionDays;

    @Column(nullable = false)
    private Double netPay;

    @Column(nullable = false)
    private LocalDate generatedDate;

    public Payslip() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
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