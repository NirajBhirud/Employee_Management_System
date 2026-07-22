package com.ems.hrms.repository;

import com.ems.hrms.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RepositoryAttendance extends JpaRepository<Attendance, Integer> {

    Optional<Attendance> findByEmployee_IdAndDate(int employeeId, LocalDate date);

    List<Attendance> findByEmployee_IdAndDateBetweenOrderByDateAsc(int employeeId, LocalDate startDate, LocalDate endDate);

    List<Attendance> findByDate(LocalDate date);

}