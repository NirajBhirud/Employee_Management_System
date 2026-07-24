package com.ems.hrms.service;

import com.ems.hrms.dto.DtoPayslip;

import java.util.List;

public interface ServicePayrollIn {

    DtoPayslip generatePayslip(DtoPayslip request);

    DtoPayslip getPayslipById(int id);

    List<DtoPayslip> getPayslipsForEmployee(int employeeId);

    List<DtoPayslip> getPayslipsForMonth(int month, int year);

    DtoPayslip updatePayslip(int id, DtoPayslip request);

    void deletePayslip(int id);

}