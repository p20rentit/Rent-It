package com.rentit.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "vehicle")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vehicle_id")
    private Integer vehicleId;

    @Column(name = "owner_id")
    private Integer ownerId;

    @JsonIgnoreProperties("vehicles")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehicle_type_id", nullable = false)
    private VehicleType vehicleType;

    @JsonIgnoreProperties("vehicles")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fuel_type_id")
    private FuelType fuelType;

    @Column(name = "ac")
    private Integer ac;

    @Column(name = "status")
    private String status;

    @Column(name = "vehicle_number")
    private String vehicleNumber;

    @Column(name = "vehicle_rc_number")
    private String vehicleRcNumber;

    @Column(name = "description")
    private String description;

    @JsonIgnoreProperties("vehicles")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "model_id", nullable = false)
    private Model model;

    @OneToMany(mappedBy = "vehicle", fetch = FetchType.LAZY)
    private List<VehicleImage> vehicleImages;
}
