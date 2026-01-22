package com.p20.rentit.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p20.rentit.dto.LoginRequest;
import com.p20.rentit.dto.LoginResponse;
import com.p20.rentit.dto.RegisterRequest;
import com.p20.rentit.dto.UpdatePasswordRequest;
import com.p20.rentit.entities.User;
import com.p20.rentit.security.JwtUtil;
import com.p20.rentit.services.AuthService;


@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private AuthService authService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request){
		try {
            User user = authService.login(request.getEmail(),request.getPassword());

            String token = jwtUtil.generateToken(user);
            
            LoginResponse response = new LoginResponse(
                    user.getUserId(),
                    user.getEmail(),
                    user.getRole().getRoleName(),
                    token
            );
            
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
	}
	
	@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {

        User savedUser = authService.register(registerRequest);

        return ResponseEntity.ok(savedUser);
    }
	
	@PostMapping("/update-password")
	public ResponseEntity<?> updatePassword(
	        @RequestBody UpdatePasswordRequest request) {

	    User updatedUser = authService.updatePassword(
	            request.getUserId(),
	            request.getNewPassword()
	    );

	    return ResponseEntity.ok("Password updated successfully");
	}


	
	
}
