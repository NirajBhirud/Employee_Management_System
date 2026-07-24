import api from "../api/axios";

export const generatePayslip = (payslip) =>
    api.post("/payroll/generate", payslip);

export const getPayslipById = (id) =>
    api.get(`/payroll/${id}`);

export const getPayslipsForEmployee = (employeeId) =>
    api.get(`/payroll/employee/${employeeId}`);

export const getPayslipsForMonth = (month, year) =>
    api.get("/payroll", { params: { month, year } });

export const updatePayslip = (id, payslip) =>
    api.put(`/payroll/${id}`, payslip);

export const deletePayslip = (id) =>
    api.delete(`/payroll/${id}`);