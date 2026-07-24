package com.ems.hrms.dto;

public class DtoAuthResponse {

    private String token;
    private String username;
    private String role;
    private Integer employeeId; // null unless role = EMPLOYEE

    public DtoAuthResponse() {
    }

    public DtoAuthResponse(String token, String username, String role, Integer employeeId) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.employeeId = employeeId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }
}