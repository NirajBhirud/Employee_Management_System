import api from "../api/axios";

export const requestLeave = (payload) => api.post("/leave/request", payload);

export const getMyLeaveRequests = () => api.get("/leave/my");

export const getPendingLeaveRequests = () => api.get("/leave/pending");

export const getAllLeaveRequests = () => api.get("/leave");

export const approveLeave = (id, decision) => api.put(`/leave/${id}/approve`, decision);

export const rejectLeave = (id, decision) => api.put(`/leave/${id}/reject`, decision);