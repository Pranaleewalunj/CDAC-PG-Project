package com.example.demo.controller;

import com.example.demo.POJOS.Order;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delivery")
public class DeliveryOrderController {
    @Autowired
    OrderRepository orderRepository;
    @GetMapping("/myorders/{id}")
    public List<Order> myOrders(@PathVariable Integer id){
        return orderRepository.findByDeliveryManId(id);
    }
}
