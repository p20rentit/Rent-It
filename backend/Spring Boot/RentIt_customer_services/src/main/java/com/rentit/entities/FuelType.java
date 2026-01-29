package com.rentit.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fuel_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuelType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fuel_id")
    private Integer fuelId;

    @Column(name = "fuel_type")
    private String fuelType;
}
