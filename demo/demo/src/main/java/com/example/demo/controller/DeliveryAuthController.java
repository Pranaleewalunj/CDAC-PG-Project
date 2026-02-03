package com.example.demo.controller;

import com.example.demo.POJOS.DeliveryMan;
import com.example.demo.POJOS.DeliveryLoginRequest;
import com.example.demo.POJOS.JwtUtil;
import com.example.demo.repository.DeliveryManRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/delivery")
@CrossOrigin("*")
public class DeliveryAuthController {

    @Autowired
    DeliveryManRepository repo;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody DeliveryLoginRequest req) {

        DeliveryMan dm = repo.findByEmail(req.getEmail());

        if (dm == null) {
            return ResponseEntity.status(401).body("Invalid Email");
        }

        if (!dm.getPassword().equals(req.getPassword())) {
            return ResponseEntity.status(401).body("Invalid Password");
        }

        String token = jwtUtil.generateToken(dm.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "deliveryMan", dm
        ));
    }
}