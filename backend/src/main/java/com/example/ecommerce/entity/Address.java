package com.example.ecommerce.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class Address {

    private String street;
    private String city;
    private String state;
    private String country;
    private String zipCode;

}
