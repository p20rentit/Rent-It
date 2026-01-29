package com.rentit.controllers;

import com.rentit.dto.VehicleDetailDTO;
import com.rentit.dto.VehicleListDTO;
import com.rentit.services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customer/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    /**
     * Browse all available vehicles
     * GET /api/customer/vehicles
     */
    @GetMapping
    public ResponseEntity<?> browseAvailableVehicles() {
        try {
            List<VehicleListDTO> vehicles = vehicleService.browseAvailableVehicles();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Vehicles retrieved successfully");
            response.put("data", vehicles);
            response.put("count", vehicles.size());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to retrieve vehicles: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Browse vehicles by vehicle type
     * GET /api/customer/vehicles/type/{vehicleTypeId}
     */
    @GetMapping("/type/{vehicleTypeId}")
    public ResponseEntity<?> browseVehiclesByType(@PathVariable Integer vehicleTypeId) {
        try {
            List<VehicleListDTO> vehicles = vehicleService.browseVehiclesByType(vehicleTypeId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Vehicles retrieved successfully");
            response.put("data", vehicles);
            response.put("count", vehicles.size());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to retrieve vehicles: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Browse vehicles by brand
     * GET /api/customer/vehicles/brand/{brandId}
     */
    @GetMapping("/brand/{brandId}")
    public ResponseEntity<?> browseVehiclesByBrand(@PathVariable Integer brandId) {
        try {
            List<VehicleListDTO> vehicles = vehicleService.browseVehiclesByBrand(brandId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Vehicles retrieved successfully");
            response.put("data", vehicles);
            response.put("count", vehicles.size());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to retrieve vehicles: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Browse vehicles by fuel type
     * GET /api/customer/vehicles/fuel/{fuelTypeId}
     */
    @GetMapping("/fuel/{fuelTypeId}")
    public ResponseEntity<?> browseVehiclesByFuelType(@PathVariable Integer fuelTypeId) {
        try {
            List<VehicleListDTO> vehicles = vehicleService.browseVehiclesByFuelType(fuelTypeId);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Vehicles retrieved successfully");
            response.put("data", vehicles);
            response.put("count", vehicles.size());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to retrieve vehicles: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * Get vehicle details by ID
     * GET /api/customer/vehicles/{vehicleId}
     */
    @GetMapping("/{vehicleId}")
    public ResponseEntity<?> getVehicleDetails(@PathVariable Integer vehicleId) {
        try {
            VehicleDetailDTO vehicle = vehicleService.getVehicleDetails(vehicleId);

            if (vehicle == null) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("success", false);
                errorResponse.put("message", "Vehicle not found with ID: " + vehicleId);

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Vehicle details retrieved successfully");
            response.put("data", vehicle);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to retrieve vehicle details: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
