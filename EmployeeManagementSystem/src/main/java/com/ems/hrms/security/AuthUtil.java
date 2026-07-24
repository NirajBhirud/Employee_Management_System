package com.ems.hrms.security;

import com.ems.hrms.exception.ExceptionAuth;
import com.ems.hrms.model.Role;
import com.ems.hrms.model.User;
import com.ems.hrms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ExceptionAuth("Authenticated user not found"));
    }

    /**
     * Passes silently for ADMIN/HR. For an EMPLOYEE, throws AccessDeniedException
     * unless their linked employee record matches the given employeeId.
     */
    public void verifyOwnEmployeeOrStaff(int employeeId) {
        User user = getCurrentUser();
        if (user.getRole() == Role.ADMIN || user.getRole() == Role.HR) {
            return;
        }
        if (user.getEmployee() == null || user.getEmployee().getId() != employeeId) {
            throw new AccessDeniedException("You can only access your own records");
        }
    }
}