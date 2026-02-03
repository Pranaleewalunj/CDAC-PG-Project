package com.example.demo.POJOS;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class DeliveryAssignment {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer orderId;
    @Column(name = "delivery_status")
    private String deliveryStatus;

    @ManyToOne
    @JoinColumn(name = "delivery_man_id")
    private DeliveryMan deliveryMan;
}
