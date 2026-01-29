package com.rentit.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_id")
    private Integer vehicleId;

    @Column(name = "owner_id")
    private Integer ownerId;

    @JsonIgnoreProperties("vehicles")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehicle_type_id", nullable = false)
    private VehicleType vehicleType;

    @JsonIgnoreProperties("vehicles")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fuel_type_id")
    private FuelType fuelType;

    @Column(name = "ac")
    private Integer ac;

    @Column(name = "status")
    private String status;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @Column(name = "vehicle_rc_number")
    private String vehicleRcNumber;

    @Column(name = "description")
    private String description;

    @JsonIgnoreProperties("vehicles")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleImage> vehicleImages;

    public Vehicle() {
    }

    public Vehicle(Integer vehicleId, Integer ownerId, VehicleType vehicleType, FuelType fuelType, Integer ac,
            String status, String vehicleNumber, String vehicleRcNumber, String description, Model model,
            List<VehicleImage> vehicleImages) {
        this.vehicleId = vehicleId;
        this.ownerId = ownerId;
        this.vehicleType = vehicleType;
        this.fuelType = fuelType;
        this.ac = ac;
        this.status = status;
        this.vehicleNumber = vehicleNumber;
        this.vehicleRcNumber = vehicleRcNumber;
        this.description = description;
        this.model = model;
        this.vehicleImages = vehicleImages;
    }

    public Integer getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public FuelType getFuelType() {
        return fuelType;
    }

    public void setFuelType(FuelType fuelType) {
        this.fuelType = fuelType;
    }

    public Integer getAc() {
        return ac;
    }

    public void setAc(Integer ac) {
        this.ac = ac;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
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

    public Model getModel() {
        return model;
    }

    public void setModel(Model model) {
        this.model = model;
    }

    public List<VehicleImage> getVehicleImages() {
        return vehicleImages;
    }

    public void setVehicleImages(List<VehicleImage> vehicleImages) {
        this.vehicleImages = vehicleImages;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "vehicleId=" + vehicleId +
                ", ownerId=" + ownerId +
                ", vehicleType=" + vehicleType +
                ", fuelType=" + fuelType +
                ", ac=" + ac +
                ", status='" + status + '\'' +
                ", vehicleNumber='" + vehicleNumber + '\'' +
                ", vehicleRcNumber='" + vehicleRcNumber + '\'' +
                ", description='" + description + '\'' +
                ", model=" + model +
                ", vehicleImages=" + vehicleImages +
                '}';
    }
}
