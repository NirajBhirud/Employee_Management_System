package com.ems.hrms.service;

import com.ems.hrms.dto.DtoAttendance;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ServiceAttendanceIn {

    DtoAttendance checkIn(int employeeId);

    DtoAttendance checkOut(int employeeId);

    DtoAttendance markAttendance(DtoAttendance dtoAttendance);

    List<DtoAttendance> getAttendanceByEmployee(int employeeId, LocalDate startDate, LocalDate endDate);

    List<DtoAttendance> getAttendanceByDate(LocalDate date);

    Map<String, Object> getMonthlySummary(int employeeId, int year, int month);

}