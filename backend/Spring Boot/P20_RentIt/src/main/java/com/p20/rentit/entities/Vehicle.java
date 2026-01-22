package com.p20.rentit.entities;

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
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_id")
    private int vehicleId;

    // OWNER (User)
    @JsonIgnoreProperties("vehicles")
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    // VEHICLE TYPE
    @JsonIgnoreProperties("vehicles")
    @ManyToOne
    @JoinColumn(name = "vehicle_type_id")
    private VehicleType vehicleType;

    @Column(name = "brand")
    private String brand;

    @Column(name = "model")
    private String model;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "ac")
    private int ac;   // 1 = Yes, 0 = No

    @Column(name = "status")
    private int status; // 0 = Available, 1 = Booked, 2 = Maintenance

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @Column(name = "vehicle_rc_number")
    private String vehicleRcNumber;

    @Column(name = "description")
    private String description;

    // ---------- Constructors ----------

    public Vehicle() {
        super();
    }

    public Vehicle(int vehicleId, User owner, VehicleType vehicleType, String brand, String model,
                   String fuelType, int ac, int status, String vehicleNumber,
                   String vehicleRcNumber, String description) {
        super();
        this.vehicleId = vehicleId;
        this.owner = owner;
        this.vehicleType = vehicleType;
        this.brand = brand;
        this.model = model;
        this.fuelType = fuelType;
        this.ac = ac;
        this.status = status;
        this.vehicleNumber = vehicleNumber;
        this.vehicleRcNumber = vehicleRcNumber;
        this.description = description;
    }

    // ---------- Getters & Setters ----------

    public int getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(int vehicleId) {
        this.vehicleId = vehicleId;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public int getAc() {
        return ac;
    }

    public void setAc(int ac) {
        this.ac = ac;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getVehicleRcNumber() {
        return vehicleRcNumber;
    }

    public void setVehicleRcNumber(String vehicleRcNumber) {
        this.vehicleRcNumber = vehicleRcNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
