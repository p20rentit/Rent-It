package com.p20.rentit.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p20.rentit.dto.ForgotPasswordRequest;
import com.p20.rentit.dto.LoginRequest;
import com.p20.rentit.dto.LoginResponse;
import com.p20.rentit.dto.RegisterRequest;
import com.p20.rentit.dto.ResetPasswordRequest;
import com.p20.rentit.dto.SecurityQuestionResponse;
import com.p20.rentit.dto.VerifyAnswerRequest;
import com.p20.rentit.entities.SecurityQuestion;
import com.p20.rentit.entities.User;
import com.p20.rentit.repositories.SecurityQuestionRepository;
import com.p20.rentit.security.JwtUtil;
import com.p20.rentit.services.AuthService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
    private SecurityQuestionRepository securityQuestionRepository;

	@Autowired
	private AuthService authService;
	
	@Autowired
	private JwtUtil jwtUtil;

    AuthController(SecurityQuestionRepository securityQuestionRepository) {
        this.securityQuestionRepository = securityQuestionRepository;
    }
	
	// login they insert data 
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
	
	
	// register
	@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {

        User savedUser = authService.register(registerRequest);

        return ResponseEntity.ok(savedUser);
    }
	
	
	// forgot-password
	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest){
		
		SecurityQuestion question = authService.getSecurityQuestion(forgotPasswordRequest.getEmail());
		
		SecurityQuestionResponse response = new SecurityQuestionResponse(
				question.getQuestionId(),
				question.getQuestion()
				);
		
		System.out.print(question.getQuestion());
		return ResponseEntity.ok(List.of(response));
	}
	
	@PostMapping("/verify-security-answer")
	public ResponseEntity<?> verifySecurityAnswer(
	        @RequestBody VerifyAnswerRequest request) {
		
	    if (request.getQuestionId() == null) {
	        return ResponseEntity
	                .badRequest()
	                .body("Security question not selected");
	    }

	    authService.verifySecurityAnswer(
	            request.getEmail(),
	            request.getQuestionId(),
	            request.getAnswer()
	    );

	    return ResponseEntity.ok(
	    	    Map.of("status", "VERIFIED")
	    	);

	}


	
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(
	        @RequestBody ResetPasswordRequest request) {

	    authService.resetPassword(
	            request.getEmail(),
	            request.getNewPassword()
	    );

	    return ResponseEntity.ok("PASSWORD_RESET_SUCCESS");
	}
	
	 @GetMapping("/security-questions")
	    public ResponseEntity<List<SecurityQuestion>> getAllQuestions() {
	        return ResponseEntity.ok(securityQuestionRepository.findAll());
	    }

	
}
