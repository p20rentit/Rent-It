package com.p20.rentit.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.p20.rentit.entities.City;
import com.p20.rentit.services.CityService;

@RestController
@RequestMapping("/city")
public class CityController {
	
	@Autowired
	private CityService cityService;
	
	@GetMapping("/all")
	public List<City> getAll(){
		return cityService.getAll();
	}
	
	
}
