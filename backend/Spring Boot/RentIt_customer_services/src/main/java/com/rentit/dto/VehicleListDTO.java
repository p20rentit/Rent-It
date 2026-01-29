package com.rentit.dto;

public class VehicleListDTO {

    private Integer vehicleId;
    private String vehicleTypeName;
    private String brandName;
    private String modelName;
    private String fuelType;
    private Integer ac;
    private String status;
    private String vehicleNumber;
    private Double rate;
    private String priceUnit;
    private String primaryImageBase64; // Base64 encoded primary image

    public VehicleListDTO() {
    }

    public VehicleListDTO(Integer vehicleId, String vehicleTypeName, String brandName, String modelName,
            String fuelType, Integer ac, String status, String vehicleNumber, Double rate, String priceUnit,
            String primaryImageBase64) {
        this.vehicleId = vehicleId;
        this.vehicleTypeName = vehicleTypeName;
        this.brandName = brandName;
        this.modelName = modelName;
        this.fuelType = fuelType;
        this.ac = ac;
        this.status = status;
        this.vehicleNumber = vehicleNumber;
        this.rate = rate;
        this.priceUnit = priceUnit;
        this.primaryImageBase64 = primaryImageBase64;
    }

    public Integer getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getVehicleTypeName() {
        return vehicleTypeName;
    }

    public void setVehicleTypeName(String vehicleTypeName) {
        this.vehicleTypeName = vehicleTypeName;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
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

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public String getPriceUnit() {
        return priceUnit;
    }

    public void setPriceUnit(String priceUnit) {
        this.priceUnit = priceUnit;
    }

    public String getPrimaryImageBase64() {
        return primaryImageBase64;
    }

    public void setPrimaryImageBase64(String primaryImageBase64) {
        this.primaryImageBase64 = primaryImageBase64;
    }

    @Override
    public String toString() {
        return "VehicleListDTO{" +
                "vehicleId=" + vehicleId +
                ", vehicleTypeName='" + vehicleTypeName + '\'' +
                ", brandName='" + brandName + '\'' +
                ", modelName='" + modelName + '\'' +
                ", fuelType='" + fuelType + '\'' +
                ", ac=" + ac +
                ", status='" + status + '\'' +
                ", vehicleNumber='" + vehicleNumber + '\'' +
                ", rate=" + rate +
                ", priceUnit='" + priceUnit + '\'' +
                ", primaryImageBase64='" + (primaryImageBase64 != null ? "..." : "null") + '\'' +
                '}';
    }
}
