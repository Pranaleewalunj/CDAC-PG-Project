package com.example.demo.controller;

import com.example.demo.POJOS.DeliveryMan;
import com.example.demo.POJOS.LocationDTO;
import com.example.demo.repository.DeliveryManRepository;
import com.example.demo.services.DeliveryManService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/delivery-men")
public class DeliveryManController {
    @Autowired
    private DeliveryManService service;

    @Autowired
    private DeliveryManRepository deliveryManRepository;

    @PostMapping
    public DeliveryMan create(@RequestBody DeliveryMan d){
        return service.create(d);
    }
    @GetMapping

    public List<DeliveryMan> getAll(){
        return service.getAll();
    }
    @PutMapping("/location/{id}")
    public DeliveryMan updateLocation(@PathVariable Long id,@RequestBody LocationDTO dto){
        DeliveryMan dm=deliveryManRepository.findById(id).orElseThrow();
        dm.setLatitude(dto.getLat());
        dm.setLongitude(dto.getLng());
        return deliveryManRepository.save(dm);
    }
}
