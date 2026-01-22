package com.p20.rentit.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.p20.rentit.dto.RegisterRequest;
import com.p20.rentit.entities.Role;
import com.p20.rentit.entities.User;
import com.p20.rentit.repositories.RoleRepository;
import com.p20.rentit.repositories.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ---------- LOGIN ----------
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("RAW PASSWORD (input) = [" + password + "]");
        System.out.println("DB PASSWORD (stored) = [" + user.getPassword() + "]");

        boolean match = passwordEncoder.matches(password, user.getPassword());
        System.out.println("PASSWORD MATCH = " + match);
        System.out.println(new BCryptPasswordEncoder().encode("Rohit@1234"));

        if (!match) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
    
    // ---------- REGISTER ----------
    public User register(RegisterRequest request) {

        // 1️⃣ Check email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // 2️⃣ Create User object
        User user = new User();
        user.setFname(request.getFname());
        user.setLname(request.getLname());
        user.setEmail(request.getEmail());
        

        // 3️⃣ Encode password ONCE
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // 4️⃣ Set role
        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);

        // 5️⃣ Save user
        return userRepository.save(user);
    }
    
    public User updatePassword(int userId, String newPassword) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Encode NEW password
        user.setPassword(passwordEncoder.encode(newPassword));

        return userRepository.save(user);
    }

}
