package com.example.demo.repository;

import com.example.demo.POJOS.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.*;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByDeliveryManId(Integer id);
}
