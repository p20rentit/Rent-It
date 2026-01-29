package com.rentit.dto;

import java.util.List;

public class VehicleDetailDTO {

    private Integer vehicleId;
    private Integer ownerId;

    // Vehicle Type Information
    private Integer vehicleTypeId;
    private String vehicleTypeName;
    private Double rate;
    private Double deposit;
    private String priceUnit;

    // Vehicle Model Information
    private Integer modelId;
    private String modelName;
    private Integer brandId;
    private String brandName;

    // Fuel Type Information
    private Integer fuelTypeId;
    private String fuelType;

    // Vehicle Specific Information
    private Integer ac;
    private String status;
    private String vehicleNumber;
    private String vehicleRcNumber;
    private String description;

    // Images
    private List<VehicleImageDTO> images;

    public VehicleDetailDTO() {
    }

    public VehicleDetailDTO(Integer vehicleId, Integer ownerId, Integer vehicleTypeId, String vehicleTypeName,
            Double rate, Double deposit, String priceUnit, Integer modelId, String modelName, Integer brandId,
            String brandName, Integer fuelTypeId, String fuelType, Integer ac, String status, String vehicleNumber,
            String vehicleRcNumber, String description, List<VehicleImageDTO> images) {
        this.vehicleId = vehicleId;
        this.ownerId = ownerId;
        this.vehicleTypeId = vehicleTypeId;
        this.vehicleTypeName = vehicleTypeName;
        this.rate = rate;
        this.deposit = deposit;
        this.priceUnit = priceUnit;
        this.modelId = modelId;
        this.modelName = modelName;
        this.brandId = brandId;
        this.brandName = brandName;
        this.fuelTypeId = fuelTypeId;
        this.fuelType = fuelType;
        this.ac = ac;
        this.status = status;
        this.vehicleNumber = vehicleNumber;
        this.vehicleRcNumber = vehicleRcNumber;
        this.description = description;
        this.images = images;
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

    public Integer getModelId() {
        return modelId;
    }

    public void setModelId(Integer modelId) {
        this.modelId = modelId;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public void setBrandId(Integer brandId) {
        this.brandId = brandId;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Integer getFuelTypeId() {
        return fuelTypeId;
    }

    public void setFuelTypeId(Integer fuelTypeId) {
        this.fuelTypeId = fuelTypeId;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
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

    public List<VehicleImageDTO> getImages() {
        return images;
    }

    public void setImages(List<VehicleImageDTO> images) {
        this.images = images;
    }

    @Override
    public String toString() {
        return "VehicleDetailDTO{" +
                "vehicleId=" + vehicleId +
                ", ownerId=" + ownerId +
                ", vehicleTypeId=" + vehicleTypeId +
                ", vehicleTypeName='" + vehicleTypeName + '\'' +
                ", rate=" + rate +
                ", deposit=" + deposit +
                ", priceUnit='" + priceUnit + '\'' +
                ", modelId=" + modelId +
                ", modelName='" + modelName + '\'' +
                ", brandId=" + brandId +
                ", brandName='" + brandName + '\'' +
                ", fuelTypeId=" + fuelTypeId +
                ", fuelType='" + fuelType + '\'' +
                ", ac=" + ac +
                ", status='" + status + '\'' +
                ", vehicleNumber='" + vehicleNumber + '\'' +
                ", vehicleRcNumber='" + vehicleRcNumber + '\'' +
                ", description='" + description + '\'' +
                ", images=" + images +
                '}';
    }
}
