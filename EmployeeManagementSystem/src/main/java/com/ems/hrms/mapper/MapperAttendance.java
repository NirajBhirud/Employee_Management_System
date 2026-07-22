package com.ems.hrms.mapper;

import com.ems.hrms.dto.DtoAttendance;
import com.ems.hrms.model.Attendance;
import com.ems.hrms.model.Employee;

import java.time.Duration;

public class MapperAttendance {

    public static Attendance mapToAttendance(DtoAttendance dto, Employee employee) {
        Attendance attendance = new Attendance();
        attendance.setId(dto.getId());
        attendance.setEmployee(employee);
        attendance.setDate(dto.getDate());
        attendance.setCheckInTime(dto.getCheckInTime());
        attendance.setCheckOutTime(dto.getCheckOutTime());
        attendance.setStatus(dto.getStatus());
        return attendance;
    }

    public static DtoAttendance mapToDto(Attendance attendance) {
        DtoAttendance dto = new DtoAttendance();
        dto.setId(attendance.getId());
        dto.setDate(attendance.getDate());
        dto.setCheckInTime(attendance.getCheckInTime());
        dto.setCheckOutTime(attendance.getCheckOutTime());
        dto.setStatus(attendance.getStatus());

        if (attendance.getEmployee() != null) {
            dto.setEmployeeId(attendance.getEmployee().getId());
            dto.setEmployeeName(
                    attendance.getEmployee().getFirstname() + " " +
                            (attendance.getEmployee().getLastname() != null ? attendance.getEmployee().getLastname() : "")
            );
        }

        if (attendance.getCheckInTime() != null && attendance.getCheckOutTime() != null) {
            long minutes = Duration.between(attendance.getCheckInTime(), attendance.getCheckOutTime()).toMinutes();
            dto.setWorkingHours(Math.round((minutes / 60.0) * 100.0) / 100.0);
        }

        return dto;
    }
}