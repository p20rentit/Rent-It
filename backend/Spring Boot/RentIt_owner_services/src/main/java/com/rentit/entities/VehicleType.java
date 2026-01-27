package com.rentit.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "vehicle_type")
public class VehicleType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_type_id")
    private int vehicleTypeId;

    @Column(name = "vehicle_type_name")
    private String vehicleTypeName;

    @Column(name = "rate")
    private double rate;

    @Column(name = "deposit")
    private double deposit;

    @JsonIgnoreProperties("vehicleType")
    @OneToMany(mappedBy = "vehicleType", cascade = CascadeType.ALL)
    private Set<Vehicle> vehicles;

    // ---------- Constructors ----------

    public VehicleType() {
        super();
    }

    public VehicleType(int vehicleTypeId, String vehicleTypeName, double rate, double deposit) {
        super();
        this.vehicleTypeId = vehicleTypeId;
        this.vehicleTypeName = vehicleTypeName;
        this.rate = rate;
        this.deposit = deposit;
    }

    // ---------- Getters & Setters ----------

    public int getVehicleTypeId() {
        return vehicleTypeId;
    }

    public void setVehicleTypeId(int vehicleTypeId) {
        this.vehicleTypeId = vehicleTypeId;
    }

    public String getVehicleTypeName() {
        return vehicleTypeName;
    }

    public void setVehicleTypeName(String vehicleTypeName) {
        this.vehicleTypeName = vehicleTypeName;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    public double getDeposit() {
        return deposit;
    }

    public void setDeposit(double deposit) {
        this.deposit = deposit;
    }

    public Set<Vehicle> getVehicles() {
        return vehicles;
    }

    public void setVehicles(Set<Vehicle> vehicles) {
        for (Vehicle v : vehicles) {
            v.setVehicleType(this);
        }
        this.vehicles = vehicles;
    }
}
