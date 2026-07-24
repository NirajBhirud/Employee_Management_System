package com.ems.hrms.service.impl;

import com.ems.hrms.dto.DtoLeaveDecision;
import com.ems.hrms.dto.DtoLeaveRequest;
import com.ems.hrms.exception.ExceptionLeave;
import com.ems.hrms.mapper.MapperLeaveRequest;
import com.ems.hrms.model.Attendance;
import com.ems.hrms.model.Employee;
import com.ems.hrms.model.LeaveRequest;
import com.ems.hrms.model.LeaveStatus;
import com.ems.hrms.model.User;
import com.ems.hrms.repository.RepositoryAttendance;
import com.ems.hrms.repository.RepositoryLeaveRequest;
import com.ems.hrms.security.AuthUtil;
import com.ems.hrms.service.ServiceLeaveIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceLeave implements ServiceLeaveIn {

    @Autowired
    private RepositoryLeaveRequest repositoryLeaveRequest;

    @Autowired
    private RepositoryAttendance repositoryAttendance;

    @Autowired
    private AuthUtil authUtil;

    @Override
    public DtoLeaveRequest submitRequest(DtoLeaveRequest request) {
        User user = authUtil.getCurrentUser();
        if (user.getEmployee() == null) {
            throw new ExceptionLeave("No employee profile linked to this account; cannot request leave");
        }

        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new ExceptionLeave("Start date and end date are required");
        }

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new ExceptionLeave("End date cannot be before start date");
        }

        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setEmployee(user.getEmployee());
        leaveRequest.setStartDate(request.getStartDate());
        leaveRequest.setEndDate(request.getEndDate());
        leaveRequest.setReason(request.getReason());
        leaveRequest.setStatus(LeaveStatus.PENDING);
        leaveRequest.setCreatedDate(LocalDateTime.now());

        return MapperLeaveRequest.mapToDto(repositoryLeaveRequest.save(leaveRequest));
    }

    @Override
    public List<DtoLeaveRequest> getMyRequests() {
        User user = authUtil.getCurrentUser();
        if (user.getEmployee() == null) {
            throw new ExceptionLeave("No employee profile linked to this account");
        }
        return repositoryLeaveRequest.findByEmployee_IdOrderByCreatedDateDesc(user.getEmployee().getId())
                .stream().map(MapperLeaveRequest::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<DtoLeaveRequest> getPendingRequests() {
        return repositoryLeaveRequest.findByStatusOrderByCreatedDateAsc(LeaveStatus.PENDING)
                .stream().map(MapperLeaveRequest::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<DtoLeaveRequest> getAllRequests() {
        return repositoryLeaveRequest.findAllByOrderByCreatedDateDesc()
                .stream().map(MapperLeaveRequest::mapToDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DtoLeaveRequest approve(int id, DtoLeaveDecision decision) {
        LeaveRequest leaveRequest = repositoryLeaveRequest.findById(id).orElseThrow(
                () -> new ExceptionLeave("No leave request found with id " + id));

        if (leaveRequest.getStatus() != LeaveStatus.PENDING) {
            throw new ExceptionLeave("This leave request has already been reviewed");
        }

        boolean paid = decision.getPaid() != null ? decision.getPaid() : true;

        leaveRequest.setStatus(LeaveStatus.APPROVED);
        leaveRequest.setPaid(paid);
        leaveRequest.setReviewComment(decision.getComment());
        leaveRequest.setReviewedBy(authUtil.getCurrentUser().getUsername());

        Employee employee = leaveRequest.getEmployee();

        LocalDate date = leaveRequest.getStartDate();
        while (!date.isAfter(leaveRequest.getEndDate())) {
            Attendance attendance = repositoryAttendance.findByEmployee_IdAndDate(employee.getId(), date)
                    .orElseGet(Attendance::new);
            attendance.setEmployee(employee);
            attendance.setDate(date);
            attendance.setStatus("Leave");
            attendance.setPaid(paid);
            repositoryAttendance.save(attendance);
            date = date.plusDays(1);
        }

        return MapperLeaveRequest.mapToDto(repositoryLeaveRequest.save(leaveRequest));
    }

    @Override
    public DtoLeaveRequest reject(int id, DtoLeaveDecision decision) {
        LeaveRequest leaveRequest = repositoryLeaveRequest.findById(id).orElseThrow(
                () -> new ExceptionLeave("No leave request found with id " + id));

        if (leaveRequest.getStatus() != LeaveStatus.PENDING) {
            throw new ExceptionLeave("This leave request has already been reviewed");
        }

        leaveRequest.setStatus(LeaveStatus.REJECTED);
        leaveRequest.setReviewComment(decision.getComment());
        leaveRequest.setReviewedBy(authUtil.getCurrentUser().getUsername());

        return MapperLeaveRequest.mapToDto(repositoryLeaveRequest.save(leaveRequest));
    }
}