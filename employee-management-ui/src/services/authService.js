import api from "../api/axios";

export const login = (username, password) =>
    api.post("/auth/login", { username, password });

export const register = (payload) =>
    api.post("/auth/register", payload);