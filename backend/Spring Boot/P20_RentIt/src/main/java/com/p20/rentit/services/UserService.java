package com.p20.rentit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.p20.rentit.entities.User;
import com.p20.rentit.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	
	public User login(String email, String password) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User Not Found"));
		
		if(!user.getPassword().equals(password))
			throw new RuntimeException("Invalid password");
		
		return user;
	}

}
