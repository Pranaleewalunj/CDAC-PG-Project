package com.example.demo.POJOS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignRequest {
    public Integer orderId;
    public Long deliveryManId;
}
