import api from "../api/axios";

// Get all departments
export const getAllDepartments = () => {
    return api.get("/departments");
};

// Get department by ID
export const getDepartmentById = (id) => {
    return api.get(`/departments/${id}`);
};

// Create department
export const createDepartment = (department) => {
    return api.post("/departments", department);
};

// Update department
export const updateDepartment = (id, department) => {
    return api.put(`/departments/${id}`, department);
};

// Delete department
export const deleteDepartment = (id) => {
    return api.delete(`/departments/${id}`);
};