import api from "../api/axios";

export const getEmployees = () => api.get("/employee");

export const getEmployee = (id) => api.get(`/employee/${id}`);

export const createEmployee = (employee) =>
    api.post("/employee", employee);

export const updateEmployee = (id, employee) =>
    api.put(`/employee/${id}`, employee);

export const deleteEmployee = (id) =>
    api.delete(`/employee/${id}`);