package com.example.demo.controller;

import com.example.demo.POJOS.AssignRequest;
import com.example.demo.POJOS.DeliveryAssignment;
import com.example.demo.POJOS.DeliveryMan;
import com.example.demo.services.DeliveryAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/delivery")
@CrossOrigin(origins = "http://localhost:5173")
public class DeliveryAssignmentController {

    @Autowired
    private DeliveryAssignmentService service;

    // Admin assigns delivery man manually
    @PostMapping("/assign")
    public DeliveryAssignment assign(@RequestBody AssignRequest req) {
        return service.assignOrder(req.getOrderId(), req.getDeliveryManId());
    }
    //free the delivery man by order
    @PutMapping("/free-by-order/{orderId}")
    public void freeByOrder(@PathVariable Long orderId){
        service.freeDeliveryManByOrder(orderId);
    }
    // Delivery man sees his orders
    @GetMapping("/my/{deliveryManId}")
    public List<DeliveryAssignment> myOrders(@PathVariable Long deliveryManId) {
        return service.getAssignments(deliveryManId);
    }
    // to see the free delivery men
    @GetMapping("/free-men")
    public List<DeliveryMan> getFreeDeliveryMen(){
        return service.getFreeDeliveryMen();
    }
    // Update delivery status
    @PutMapping("/status/{id}")
    public DeliveryAssignment updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateStatus(id, status);
    }
}