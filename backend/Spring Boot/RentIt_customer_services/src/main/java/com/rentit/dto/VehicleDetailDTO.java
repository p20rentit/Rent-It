package com.rentit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
