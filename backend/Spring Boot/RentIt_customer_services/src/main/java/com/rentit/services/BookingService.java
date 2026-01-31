package com.rentit.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rentit.dto.CreateBookingDTO;
import com.rentit.entities.Booking;
import com.rentit.entities.BookingRecord;
import com.rentit.entities.BookingStatus;
import com.rentit.entities.PaymentStatus;
import com.rentit.entities.User;
import com.rentit.entities.Vehicle;
import com.rentit.entities.VehicleBookingStatus;
import com.rentit.repositories.BookingRecordRepository;
import com.rentit.repositories.BookingRepository;
import com.rentit.repositories.UserRepository;
import com.rentit.repositories.VehicleRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRecordRepository bookingRecordRepository;

    @Transactional
    public Booking createBooking(CreateBookingDTO bookingDTO) {
        // 1. Validate Dates
        if (bookingDTO.getStartingDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Starting date cannot be in the past.");
        }
        if (bookingDTO.getEndDate().isBefore(bookingDTO.getStartingDate())) {
            throw new RuntimeException("End date cannot be before starting date.");
        }

        // Check for overlaps at datetime precision (uses pickup/return times)
        java.time.LocalDateTime requestedStart = bookingDTO.getStartingDate().atTime(
                bookingDTO.getPickupTime() != null ? bookingDTO.getPickupTime() : java.time.LocalTime.MIN);
        java.time.LocalDateTime requestedEnd = bookingDTO.getEndDate().atTime(
                bookingDTO.getReturnTime() != null ? bookingDTO.getReturnTime() : java.time.LocalTime.MAX);

        if (isVehicleBooked(bookingDTO.getVehicleId(), requestedStart, requestedEnd)) {
            throw new RuntimeException("Vehicle is already booked for the selected dates/times.");
        }

        Vehicle vehicle = vehicleRepository.findById(bookingDTO.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        long days = ChronoUnit.DAYS.between(bookingDTO.getStartingDate(), bookingDTO.getEndDate()) + 1;
        if (days <= 0)
            days = 1;

        BigDecimal pricePerDay = BigDecimal.ZERO;
        BigDecimal depositAmount = BigDecimal.ZERO;

        // Use Pricing from VehicleType as requested
        if (vehicle.getVehicleType() != null) {
            pricePerDay = BigDecimal.valueOf(vehicle.getVehicleType().getRate());
            depositAmount = BigDecimal.valueOf(vehicle.getVehicleType().getDeposit());
        } else {
            // If VehicleType is null, price is 0 (should not happen if data is integrity
            // checked)
            pricePerDay = BigDecimal.ZERO;
        }

        BigDecimal totalRentAmount = pricePerDay.multiply(BigDecimal.valueOf(days));

        // 2. Create Booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setVehicle(vehicle);
        booking.setBookingDate(LocalDateTime.now());
        booking.setStartingDate(bookingDTO.getStartingDate());
        booking.setStartingDate(bookingDTO.getStartingDate());
        booking.setEndDate(bookingDTO.getEndDate());
        booking.setPickupTime(bookingDTO.getPickupTime());
        booking.setReturnTime(bookingDTO.getReturnTime());

        booking.setTotalAmount(totalRentAmount); // Total Cost of Service
        booking.setDepositAmount(depositAmount); // Security Deposit
        // User pays Deposit at booking time
        booking.setPaidAmount(depositAmount);

        // Default Statuses
        booking.setBookingStatus(BookingStatus.CONFIRMED);
        booking.setPaymentStatus(PaymentStatus.SUCCESS); // Assuming immediate deposit payment logic via "paidAmount"

        Booking savedBooking = bookingRepository.save(booking);

        // 3. Create Booking Record
        BookingRecord record = new BookingRecord();
        record.setBooking(savedBooking);
        record.setVehicleStatus(VehicleBookingStatus.BOOKED);
        // record.setActionDatetime(LocalDateTime.now()); // DB handles this via
        // insertable=false, check if DB default exists.
        // If not, we might need to set it or rely on DB trigger/default.
        // Based on "insertable=false", it expects DB to handle it (e.g. DEFAULT
        // CURRENT_TIMESTAMP).
        // Safest is to let DB handle if schema supports it, otherwise change entity.
        // For now trusting the entity definition.

        bookingRecordRepository.save(record);

        return savedBooking;
    }

    public List<Booking> getBookingsByUser(int userId) {
        return bookingRepository.findByUser_UserId(userId);
    }

    public List<LocalDate> getBookedDates(int vehicleId) {
        List<Booking> bookings = bookingRepository.findActiveBookingsByVehicleId(vehicleId);
        return bookings.stream()
                .flatMap(b -> b.getStartingDate().datesUntil(b.getEndDate().plusDays(1)))
                .distinct()
                .sorted()
                .collect(java.util.stream.Collectors.toList());
    }

    /**
     * Returns true if there exists an active booking for vehicleId that overlaps the given date-time range
     */
    public boolean isVehicleBooked(int vehicleId, java.time.LocalDateTime reqStart, java.time.LocalDateTime reqEnd) {
        List<Booking> bookings = bookingRepository.findActiveBookingsByVehicleId(vehicleId);
        for (Booking b : bookings) {
            java.time.LocalDateTime existingStart = b.getStartingDate().atTime(
                    b.getPickupTime() != null ? b.getPickupTime() : java.time.LocalTime.MIN);
            java.time.LocalDateTime existingEnd = b.getEndDate().atTime(
                    b.getReturnTime() != null ? b.getReturnTime() : java.time.LocalTime.MAX);
            // Overlap check: reqStart < existingEnd && reqEnd > existingStart
            if (reqStart.isBefore(existingEnd) && reqEnd.isAfter(existingStart)) {
                return true;
            }
        }
        return false;
    }
}
