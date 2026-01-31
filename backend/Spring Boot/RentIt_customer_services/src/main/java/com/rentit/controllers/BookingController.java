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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.format.annotation.DateTimeFormat;

import com.rentit.dto.CreateBookingDTO;
import com.rentit.entities.Booking;
import com.rentit.services.BookingService;

@RestController
@RequestMapping("/customer/bookings")
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

    // Check if vehicle is available for the given date & time range
    @GetMapping("/vehicle/{vehicleId}/availability")
    public ResponseEntity<?> checkAvailability(
            @PathVariable int vehicleId,
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.time.LocalDate end,
            @RequestParam("pickupTime") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) java.time.LocalTime pickupTime,
            @RequestParam("returnTime") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) java.time.LocalTime returnTime) {
        java.time.LocalDateTime reqStart = start.atTime(pickupTime != null ? pickupTime : java.time.LocalTime.MIN);
        java.time.LocalDateTime reqEnd = end.atTime(returnTime != null ? returnTime : java.time.LocalTime.MAX);
        boolean booked = bookingService.isVehicleBooked(vehicleId, reqStart, reqEnd);
        return ResponseEntity.ok(java.util.Map.of("available", !booked));
    }
}
