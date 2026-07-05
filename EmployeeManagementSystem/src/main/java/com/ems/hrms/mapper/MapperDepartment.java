package com.ems.hrms.mapper;

import com.ems.hrms.dto.DtoDepartment;
import com.ems.hrms.model.Department;

public class MapperDepartment {

    public static Department mapToDepartment(DtoDepartment dtoDepartment) {

        return new Department(

                dtoDepartment.getId(),
                dtoDepartment.getDepartmentName(),
                dtoDepartment.getDepartmentCode(),
                dtoDepartment.getDescription(),
                dtoDepartment.getStatus()

        );

    }

    public static DtoDepartment mapToDtoDepartment(Department department) {

        return new DtoDepartment(

                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentCode(),
                department.getDescription(),
                department.getStatus()

        );

    }

}