package com.example.demo.repository;

import com.example.demo.POJOS.DeliveryMan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeliveryManRepository extends JpaRepository<DeliveryMan,Long> {
    List<DeliveryMan> findByStatus(String status);
    DeliveryMan findByEmail(String email);
}
