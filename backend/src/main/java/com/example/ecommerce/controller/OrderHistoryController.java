package com.example.ecommerce.controller;

import com.example.ecommerce.dao.OrderRepository;
import com.example.ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderHistoryController {

    private final OrderRepository orderRepository;

    public OrderHistoryController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public Page<Order> getOrderHistory(Authentication authentication, Pageable pageable) {
        String email = authentication.getName();
        return orderRepository.findByCustomerEmailOrderByDateCreatedDesc(email, pageable);
    }

}
