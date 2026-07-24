package com.ems.hrms.mapper;

import com.ems.hrms.dto.DtoPayslip;
import com.ems.hrms.model.Payslip;

public class MapperPayslip {

    public static DtoPayslip mapToDto(Payslip payslip) {
        DtoPayslip dto = new DtoPayslip();
        dto.setId(payslip.getId());
        dto.setMonth(payslip.getMonth());
        dto.setYear(payslip.getYear());
        dto.setBasicSalary(payslip.getBasicSalary());
        dto.setAllowances(payslip.getAllowances());
        dto.setDeductions(payslip.getDeductions());
        dto.setLeaveDeductionDays(payslip.getLeaveDeductionDays());
        dto.setNetPay(payslip.getNetPay());
        dto.setGeneratedDate(payslip.getGeneratedDate());

        if (payslip.getEmployee() != null) {
            dto.setEmployeeId(payslip.getEmployee().getId());
            dto.setEmployeeName(
                    payslip.getEmployee().getFirstname() + " " +
                            (payslip.getEmployee().getLastname() != null ? payslip.getEmployee().getLastname() : "")
            );
            if (payslip.getEmployee().getDepartment() != null) {
                dto.setDepartmentName(payslip.getEmployee().getDepartment().getDepartmentName());
            }
        }

        return dto;
    }
}