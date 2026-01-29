package com.rentit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleImageDTO {

    private Integer vehicleImageId;
    private String imageBase64; // Base64 encoded image
    private Byte isPrimary;
    private LocalDateTime createdAt;
}
