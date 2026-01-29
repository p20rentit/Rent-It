package com.rentit.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "vehicle_image")
public class VehicleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_image_id")
    private Integer vehicleImageId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;

    @Column(name = "is_primary")
    private Byte isPrimary;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public VehicleImage() {
    }

    public VehicleImage(Integer vehicleImageId, Vehicle vehicle, byte[] image, Byte isPrimary,
            LocalDateTime createdAt) {
        this.vehicleImageId = vehicleImageId;
        this.vehicle = vehicle;
        this.image = image;
        this.isPrimary = isPrimary;
        this.createdAt = createdAt;
    }

    public Integer getVehicleImageId() {
        return vehicleImageId;
    }

    public void setVehicleImageId(Integer vehicleImageId) {
        this.vehicleImageId = vehicleImageId;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Byte getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(Byte isPrimary) {
        this.isPrimary = isPrimary;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "VehicleImage{" +
                "vehicleImageId=" + vehicleImageId +
                ", vehicle=" + (vehicle != null ? vehicle.getVehicleId() : "null") + // Avoid circular dependency in
                                                                                     // toString
                ", isPrimary=" + isPrimary +
                ", createdAt=" + createdAt +
                '}';
    }
}
