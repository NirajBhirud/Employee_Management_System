package com.ems.hrms.service.impl;

import com.ems.hrms.dto.DtoAuthResponse;
import com.ems.hrms.dto.DtoLoginRequest;
import com.ems.hrms.dto.DtoRegisterRequest;
import com.ems.hrms.exception.ExceptionAuth;
import com.ems.hrms.exception.ExceptionEmployee;
import com.ems.hrms.model.Employee;
import com.ems.hrms.model.Role;
import com.ems.hrms.model.User;
import com.ems.hrms.repository.RepositoryEmployee;
import com.ems.hrms.repository.UserRepository;
import com.ems.hrms.security.JwtUtil;
import com.ems.hrms.service.ServiceAuthIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ServiceAuth implements ServiceAuthIn {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RepositoryEmployee repositoryEmployee;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public DtoAuthResponse register(DtoRegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ExceptionAuth("Username is already taken");
        }

        Role role;
        try {
            role = Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ExceptionAuth("Role must be one of ADMIN, HR, EMPLOYEE");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        if (role == Role.EMPLOYEE) {
            if (request.getEmployeeId() == null) {
                throw new ExceptionAuth("employeeId is required when registering an EMPLOYEE-role user");
            }
            Employee employee = repositoryEmployee.findById(request.getEmployeeId()).orElseThrow(
                    () -> new ExceptionEmployee("No employee found with id " + request.getEmployeeId()));
            user.setEmployee(employee);
        }

        User saved = userRepository.save(user);

        String token = jwtUtil.generateToken(saved.getUsername(), saved.getRole().name());
        Integer employeeId = saved.getEmployee() != null ? saved.getEmployee().getId() : null;

        return new DtoAuthResponse(token, saved.getUsername(), saved.getRole().name(), employeeId);
    }

    @Override
    public DtoAuthResponse login(DtoLoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        } catch (BadCredentialsException e) {
            throw new ExceptionAuth("Invalid username or password");
        }

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ExceptionAuth("Invalid username or password"));

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        Integer employeeId = user.getEmployee() != null ? user.getEmployee().getId() : null;

        return new DtoAuthResponse(token, user.getUsername(), user.getRole().name(), employeeId);
    }
}