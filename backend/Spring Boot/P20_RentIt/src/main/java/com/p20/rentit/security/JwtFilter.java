package com.p20.rentit.security;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	private final String SECRET_KEY = "rentit_secret_key";
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		// If no token → allow only auth endpoints
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        String token = authHeader.substring(7);
        
        try {
        	Claims claims = Jwts.parserBuilder()
        	        .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
        	        .build()
        	        .parseClaimsJws(token)
        	        .getBody();

            // Save user info for later use
            request.setAttribute("userId", claims.get("userId"));
            request.setAttribute("role", claims.get("role"));

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired token");
            return;
        }

        filterChain.doFilter(request, response);

		
	}
}
