package com.ems.hrms.dto;

public class DtoDepartment {

    private int id;
    private String departmentName;
    private String departmentCode;
    private String description;
    private String status;

    public DtoDepartment() {
    }

    public DtoDepartment(int id,
                         String departmentName,
                         String departmentCode,
                         String description,
                         String status) {

        this.id = id;
        this.departmentName = departmentName;
        this.departmentCode = departmentCode;
        this.description = description;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }


    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}