package com.ems.hrms.mapper;

import com.ems.hrms.dto.DtoLeaveRequest;
import com.ems.hrms.model.LeaveRequest;

public class MapperLeaveRequest {

    public static DtoLeaveRequest mapToDto(LeaveRequest leaveRequest) {
        DtoLeaveRequest dto = new DtoLeaveRequest();
        dto.setId(leaveRequest.getId());
        dto.setStartDate(leaveRequest.getStartDate());
        dto.setEndDate(leaveRequest.getEndDate());
        dto.setReason(leaveRequest.getReason());
        dto.setStatus(leaveRequest.getStatus().name());
        dto.setPaid(leaveRequest.getPaid());
        dto.setReviewComment(leaveRequest.getReviewComment());
        dto.setReviewedBy(leaveRequest.getReviewedBy());
        dto.setCreatedDate(leaveRequest.getCreatedDate());

        if (leaveRequest.getEmployee() != null) {
            dto.setEmployeeId(leaveRequest.getEmployee().getId());
            dto.setEmployeeName(
                    leaveRequest.getEmployee().getFirstname() + " " +
                            (leaveRequest.getEmployee().getLastname() != null ? leaveRequest.getEmployee().getLastname() : "")
            );
            if (leaveRequest.getEmployee().getDepartment() != null) {
                dto.setDepartmentName(leaveRequest.getEmployee().getDepartment().getDepartmentName());
            }
        }

        return dto;
    }
}