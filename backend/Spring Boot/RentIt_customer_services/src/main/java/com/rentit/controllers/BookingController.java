package com.rentit.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentit.dto.CreateBookingDTO;
import com.rentit.entities.Booking;
import com.rentit.services.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody CreateBookingDTO bookingDTO) {
        try {
            Booking booking = bookingService.createBooking(bookingDTO);
            return ResponseEntity.ok(booking);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable int userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUser(userId));
    }

    @GetMapping("/vehicle/{vehicleId}/booked-dates")
    public ResponseEntity<List<java.time.LocalDate>> getBookedDates(@PathVariable int vehicleId) {
        return ResponseEntity.ok(bookingService.getBookedDates(vehicleId));
    }
}
