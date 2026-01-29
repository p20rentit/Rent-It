package com.rentit.dto;

import java.time.LocalDateTime;

public class VehicleImageDTO {

    private Integer vehicleImageId;
    private String imageBase64; // Base64 encoded image
    private Byte isPrimary;
    private LocalDateTime createdAt;

    public VehicleImageDTO() {
    }

    public VehicleImageDTO(Integer vehicleImageId, String imageBase64, Byte isPrimary, LocalDateTime createdAt) {
        this.vehicleImageId = vehicleImageId;
        this.imageBase64 = imageBase64;
        this.isPrimary = isPrimary;
        this.createdAt = createdAt;
    }

    public Integer getVehicleImageId() {
        return vehicleImageId;
    }

    public void setVehicleImageId(Integer vehicleImageId) {
        this.vehicleImageId = vehicleImageId;
    }

    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
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
        return "VehicleImageDTO{" +
                "vehicleImageId=" + vehicleImageId +
                ", imageBase64='" + (imageBase64 != null ? "..." : "null") + '\'' +
                ", isPrimary=" + isPrimary +
                ", createdAt=" + createdAt +
                '}';
    }
}
