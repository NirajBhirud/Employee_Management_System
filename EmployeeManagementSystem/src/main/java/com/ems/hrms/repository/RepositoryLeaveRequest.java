package com.ems.hrms.repository;

import com.ems.hrms.model.LeaveRequest;
import com.ems.hrms.model.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositoryLeaveRequest extends JpaRepository<LeaveRequest, Integer> {

    List<LeaveRequest> findByEmployee_IdOrderByCreatedDateDesc(int employeeId);

    List<LeaveRequest> findByStatusOrderByCreatedDateAsc(LeaveStatus status);

    List<LeaveRequest> findAllByOrderByCreatedDateDesc();

}