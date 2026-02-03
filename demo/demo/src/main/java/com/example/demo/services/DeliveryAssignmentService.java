package com.example.demo.services;

import com.example.demo.POJOS.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryAssignmentService {

    @Autowired DeliveryAssignmentRepository repo;
    @Autowired DeliveryManRepository deliveryManRepo;

    public DeliveryAssignment assignOrder(Integer orderId, Long deliveryManId) {

        DeliveryMan dm = deliveryManRepo.findById(deliveryManId)
                .orElseThrow(() -> new RuntimeException("Delivery man not found"));

        if (!dm.getStatus().equals("FREE"))
            throw new RuntimeException("Delivery man is not free");

        DeliveryAssignment da = new DeliveryAssignment();
        da.setOrderId(orderId);
        da.setDeliveryStatus("ASSIGNED");
        da.setDeliveryMan(dm);

        dm.setStatus("BUSY");
        deliveryManRepo.save(dm);

        return repo.save(da);
    }
    public void freeDeliveryManByOrder(Long orderId) {

        DeliveryAssignment da = repo.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        da.setDeliveryStatus("DELIVERED");

        DeliveryMan dm = da.getDeliveryMan();
        dm.setStatus("FREE");

        deliveryManRepo.save(dm);
        repo.save(da);
    }
    public List<DeliveryAssignment> getAssignments(Long deliveryManId){
        return repo.findByDeliveryManId(deliveryManId);
    }
    public List<DeliveryMan> getFreeDeliveryMen(){
        return deliveryManRepo.findByStatus("FREE");
    }

    public DeliveryAssignment updateStatus(Long id,String status){
        DeliveryAssignment da = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
        da.setDeliveryStatus(status);

        if(status.equals("DELIVERED")){
            DeliveryMan dm = da.getDeliveryMan();
            dm.setStatus("FREE");
            deliveryManRepo.save(dm);
        }

        return repo.save(da);
    }
}