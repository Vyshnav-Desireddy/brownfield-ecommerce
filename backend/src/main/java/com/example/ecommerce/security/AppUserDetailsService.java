package com.example.ecommerce.security;

import com.example.ecommerce.dao.CustomerRepository;
import com.example.ecommerce.entity.Customer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final CustomerRepository customerRepository;

    public AppUserDetailsService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No customer found with email: " + email));

        if (customer.getPasswordHash() == null) {
            throw new UsernameNotFoundException("Customer has no local password set: " + email);
        }

        return User.builder()
                .username(customer.getEmail())
                .password(customer.getPasswordHash())
                .authorities("ROLE_USER")
                .build();
    }

}
