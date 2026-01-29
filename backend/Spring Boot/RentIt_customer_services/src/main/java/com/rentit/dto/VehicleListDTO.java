package com.rentit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
