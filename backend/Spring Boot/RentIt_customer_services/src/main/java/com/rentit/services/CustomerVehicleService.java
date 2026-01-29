package com.rentit.services;

import com.rentit.dto.VehicleDTO;

import java.util.List;

public interface CustomerVehicleService {

    /**
     * Get all active vehicles
     * 
     * @return List of all ACTIVE vehicles with owner and address details
     */
    List<VehicleDTO> getAllActiveVehicles();

    /**
     * Get a single active vehicle by ID
     * 
     * @param vehicleId Vehicle ID
     * @return VehicleDTO if found and ACTIVE
     * @throws RuntimeException if vehicle not found or not ACTIVE
     */
    VehicleDTO getActiveVehicleById(int vehicleId);
}
