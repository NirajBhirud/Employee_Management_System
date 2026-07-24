package com.ems.hrms.service;

import com.ems.hrms.dto.DtoAuthResponse;
import com.ems.hrms.dto.DtoLoginRequest;
import com.ems.hrms.dto.DtoRegisterRequest;

public interface ServiceAuthIn {

    DtoAuthResponse register(DtoRegisterRequest request);

    DtoAuthResponse login(DtoLoginRequest request);

}