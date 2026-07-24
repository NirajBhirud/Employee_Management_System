package com.ems.hrms.service;

import com.ems.hrms.dto.DtoLeaveDecision;
import com.ems.hrms.dto.DtoLeaveRequest;

import java.util.List;

public interface ServiceLeaveIn {

    DtoLeaveRequest submitRequest(DtoLeaveRequest request);

    List<DtoLeaveRequest> getMyRequests();

    List<DtoLeaveRequest> getPendingRequests();

    List<DtoLeaveRequest> getAllRequests();

    DtoLeaveRequest approve(int id, DtoLeaveDecision decision);

    DtoLeaveRequest reject(int id, DtoLeaveDecision decision);

}