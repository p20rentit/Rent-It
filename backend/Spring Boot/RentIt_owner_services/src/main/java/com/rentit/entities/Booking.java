package com.rentit.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int bookingId;

    // ---------- CUSTOMER ----------
    @JsonIgnoreProperties({"vehicles", "area", "role"})
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // ---------- VEHICLE ----------
    @JsonIgnoreProperties({"owner", "vehicleType"})
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    // ---------- DATES ----------
    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    @Column(name = "starting_date")
    private LocalDate startingDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    // ---------- STATUS ----------
    @Column(name = "booking_status")
    private String bookingStatus;   // Pending / Confirmed / Cancelled / Completed

    @Column(name = "payment_status")
    private String paymentStatus;   // Pending / Paid

    // ---------- Constructors ----------

    public Booking() {
        super();
    }

    public Booking(int bookingId, User user, Vehicle vehicle,
                   LocalDateTime bookingDate, LocalDate startingDate,
                   LocalDate endDate, String bookingStatus, String paymentStatus) {
        super();
        this.bookingId = bookingId;
        this.user = user;
        this.vehicle = vehicle;
        this.bookingDate = bookingDate;
        this.startingDate = startingDate;
        this.endDate = endDate;
        this.bookingStatus = bookingStatus;
        this.paymentStatus = paymentStatus;
    }

    // ---------- Getters & Setters ----------

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public LocalDateTime getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDateTime bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalDate getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(LocalDate startingDate) {
        this.startingDate = startingDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}
