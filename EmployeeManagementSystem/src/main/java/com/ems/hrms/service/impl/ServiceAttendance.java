package com.ems.hrms.service.impl;

import com.ems.hrms.dto.DtoAttendance;
import com.ems.hrms.exception.ExceptionAttendance;
import com.ems.hrms.exception.ExceptionEmployee;
import com.ems.hrms.mapper.MapperAttendance;
import com.ems.hrms.model.Attendance;
import com.ems.hrms.model.Employee;
import com.ems.hrms.repository.RepositoryAttendance;
import com.ems.hrms.repository.RepositoryEmployee;
import com.ems.hrms.service.ServiceAttendanceIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ServiceAttendance implements ServiceAttendanceIn {

    @Autowired
    private RepositoryAttendance repositoryAttendance;

    @Autowired
    private RepositoryEmployee repositoryEmployee;

    @Override
    public DtoAttendance checkIn(int employeeId) {
        Employee employee = repositoryEmployee.findById(employeeId).orElseThrow(
                () -> new ExceptionEmployee("The Employee is not found by given id " + employeeId));

        LocalDate today = LocalDate.now();

        repositoryAttendance.findByEmployee_IdAndDate(employeeId, today).ifPresent(a -> {
            throw new ExceptionAttendance("Employee has already checked in today");
        });

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setDate(today);
        attendance.setCheckInTime(LocalTime.now());
        attendance.setStatus("Present");

        return MapperAttendance.mapToDto(repositoryAttendance.save(attendance));
    }

    @Override
    public DtoAttendance checkOut(int employeeId) {
        LocalDate today = LocalDate.now();

        Attendance attendance = repositoryAttendance.findByEmployee_IdAndDate(employeeId, today).orElseThrow(
                () -> new ExceptionAttendance("Employee has not checked in today"));

        if (attendance.getCheckOutTime() != null) {
            throw new ExceptionAttendance("Employee has already checked out today");
        }

        attendance.setCheckOutTime(LocalTime.now());

        long minutes = Duration.between(attendance.getCheckInTime(), attendance.getCheckOutTime()).toMinutes();
        attendance.setStatus(minutes < 240 ? "Half-Day" : "Present"); // less than 4 hours -> Half-Day

        return MapperAttendance.mapToDto(repositoryAttendance.save(attendance));
    }

    @Override
    public DtoAttendance markAttendance(DtoAttendance dtoAttendance) {
        Employee employee = repositoryEmployee.findById(dtoAttendance.getEmployeeId()).orElseThrow(
                () -> new ExceptionEmployee("The Employee is not found by given id " + dtoAttendance.getEmployeeId()));

        LocalDate date = dtoAttendance.getDate() != null ? dtoAttendance.getDate() : LocalDate.now();

        Attendance attendance = repositoryAttendance.findByEmployee_IdAndDate(dtoAttendance.getEmployeeId(), date)
                .orElseGet(Attendance::new);

        attendance.setEmployee(employee);
        attendance.setDate(date);
        attendance.setStatus(dtoAttendance.getStatus());
        // manual entries (e.g. Leave, Absent) don't carry check-in/out times

        return MapperAttendance.mapToDto(repositoryAttendance.save(attendance));
    }

    @Override
    public List<DtoAttendance> getAttendanceByEmployee(int employeeId, LocalDate startDate, LocalDate endDate) {
        return repositoryAttendance.findByEmployee_IdAndDateBetweenOrderByDateAsc(employeeId, startDate, endDate)
                .stream()
                .map(MapperAttendance::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DtoAttendance> getAttendanceByDate(LocalDate date) {
        return repositoryAttendance.findByDate(date)
                .stream()
                .map(MapperAttendance::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getMonthlySummary(int employeeId, int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Attendance> records = repositoryAttendance
                .findByEmployee_IdAndDateBetweenOrderByDateAsc(employeeId, startDate, endDate);

        long presentDays = records.stream().filter(a -> "Present".equalsIgnoreCase(a.getStatus())).count();
        long halfDays = records.stream().filter(a -> "Half-Day".equalsIgnoreCase(a.getStatus())).count();
        long leaveDays = records.stream().filter(a -> "Leave".equalsIgnoreCase(a.getStatus())).count();
        long absentDays = records.stream().filter(a -> "Absent".equalsIgnoreCase(a.getStatus())).count();

        double totalWorkingHours = records.stream()
                .filter(a -> a.getCheckInTime() != null && a.getCheckOutTime() != null)
                .mapToDouble(a -> Duration.between(a.getCheckInTime(), a.getCheckOutTime()).toMinutes() / 60.0)
                .sum();

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("employeeId", employeeId);
        summary.put("year", year);
        summary.put("month", month);
        summary.put("presentDays", presentDays);
        summary.put("halfDays", halfDays);
        summary.put("leaveDays", leaveDays);
        summary.put("absentDays", absentDays);
        summary.put("totalRecordedDays", records.size());
        summary.put("totalWorkingHours", Math.round(totalWorkingHours * 100.0) / 100.0);

        return summary;
    }
}