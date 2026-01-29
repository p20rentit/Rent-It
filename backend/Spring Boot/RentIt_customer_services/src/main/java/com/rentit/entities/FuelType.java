package com.rentit.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "fuel_type")
public class FuelType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fuel_id")
    private Integer fuelId;

    @Column(name = "fuel_type")
    private String fuelType;

    public FuelType() {
    }

    public FuelType(Integer fuelId, String fuelType) {
        this.fuelId = fuelId;
        this.fuelType = fuelType;
    }

    public Integer getFuelId() {
        return fuelId;
    }

    public void setFuelId(Integer fuelId) {
        this.fuelId = fuelId;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    @Override
    public String toString() {
        return "FuelType{" +
                "fuelId=" + fuelId +
                ", fuelType='" + fuelType + '\'' +
                '}';
    }
}
