package com.example.demo.services;

import com.example.demo.POJOS.DeliveryMan;
import com.example.demo.repository.DeliveryManRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryManService {
    @Autowired
    private DeliveryManRepository repo;
    public DeliveryMan create(DeliveryMan d){
        d.setStatus("AVAILABLE");
        return repo.save(d);
    }
    public List<DeliveryMan> getAll(){
        return repo.findAll();
    }
}

