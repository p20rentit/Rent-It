package com.rentit.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicle_type")
public class VehicleType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_type_id")
    private Integer vehicleTypeId;

    @Column(name = "vehicle_type_name")
    private String vehicleTypeName;

    @Column(name = "rate")
    private Double rate;

    @Column(name = "deposit")
    private Double deposit;

    @Column(name = "price_unit")
    private String priceUnit;

    public VehicleType() {
    }

    public VehicleType(Integer vehicleTypeId, String vehicleTypeName, Double rate, Double deposit, String priceUnit) {
        this.vehicleTypeId = vehicleTypeId;
        this.vehicleTypeName = vehicleTypeName;
        this.rate = rate;
        this.deposit = deposit;
        this.priceUnit = priceUnit;
    }

    public Integer getVehicleTypeId() {
        return vehicleTypeId;
    }

    public void setVehicleTypeId(Integer vehicleTypeId) {
        this.vehicleTypeId = vehicleTypeId;
    }

    public String getVehicleTypeName() {
        return vehicleTypeName;
    }

    public void setVehicleTypeName(String vehicleTypeName) {
        this.vehicleTypeName = vehicleTypeName;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Double getDeposit() {
        return deposit;
    }

    public void setDeposit(Double deposit) {
        this.deposit = deposit;
    }

    public String getPriceUnit() {
        return priceUnit;
    }

    public void setPriceUnit(String priceUnit) {
        this.priceUnit = priceUnit;
    }

    @Override
    public String toString() {
        return "VehicleType{" +
                "vehicleTypeId=" + vehicleTypeId +
                ", vehicleTypeName='" + vehicleTypeName + '\'' +
                ", rate=" + rate +
                ", deposit=" + deposit +
                ", priceUnit='" + priceUnit + '\'' +
                '}';
    }
}
