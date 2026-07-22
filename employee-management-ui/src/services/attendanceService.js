import api from "../api/axios";

export const checkIn = (employeeId) =>
    api.post(`/attendance/check-in/${employeeId}`);

export const checkOut = (employeeId) =>
    api.post(`/attendance/check-out/${employeeId}`);

export const markAttendance = (attendance) =>
    api.post("/attendance/mark", attendance);

export const getAttendanceByEmployee = (employeeId, startDate, endDate) =>
    api.get(`/attendance/employee/${employeeId}`, {
        params: { startDate, endDate }
    });

export const getAttendanceByDate = (date) =>
    api.get(`/attendance/date/${date}`);

export const getMonthlySummary = (employeeId, year, month) =>
    api.get(`/attendance/summary/${employeeId}`, {
        params: { year, month }
    });