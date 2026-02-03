package com.example.demo.POJOS;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jdk.jfr.DataAmount;

@Entity
@Table(name="orders")
public class Order {
    @Id
    private Integer orderId;
    private Long deliveryManId;
    private String status;
}
