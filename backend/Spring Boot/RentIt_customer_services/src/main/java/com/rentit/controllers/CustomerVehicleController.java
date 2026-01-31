package com.rentit.controllers;

import com.rentit.dto.VehicleDTO;
import com.rentit.services.CustomerVehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerVehicleController {

    private final CustomerVehicleService customerVehicleService;

    // Constructor-based dependency injection
    public CustomerVehicleController(CustomerVehicleService customerVehicleService) {
        this.customerVehicleService = customerVehicleService;
    }

    /**
     * Browse all active vehicles
     * GET /api/customer/vehicles
     * 
     * @return List of all ACTIVE vehicles with owner and address details
     */
    @GetMapping("/vehicles")
    public ResponseEntity<List<VehicleDTO>> getAllActiveVehicles() {
        System.out.println("DEBUG: Request received for get all active vehicles");
        try {
            List<VehicleDTO> vehicles = customerVehicleService.getAllActiveVehicles();
            System.out.println("DEBUG: Found " + (vehicles != null ? vehicles.size() : "null") + " vehicles");
            return ResponseEntity.ok(vehicles);
        } catch (Exception e) {
            System.err.println("DEBUG: Error processing request inside Controller:");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * View single active vehicle by ID
     * GET /api/customer/vehicles/{vehicleId}
     * 
     * @param vehicleId Vehicle ID
     * @return Single ACTIVE vehicle details or 404 if not found/not active
     */
    @GetMapping("/vehicles/{vehicleId}")
    public ResponseEntity<VehicleDTO> getActiveVehicleById(@PathVariable int vehicleId) {
        try {
            VehicleDTO vehicle = customerVehicleService.getActiveVehicleById(vehicleId);
            return ResponseEntity.ok(vehicle);
        } catch (RuntimeException e) {
            // Vehicle not found or not active
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
