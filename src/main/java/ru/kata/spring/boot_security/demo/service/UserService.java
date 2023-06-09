package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    boolean save(User user);

    void update(User updateUser);

    void delete(Long id);

    User findOne(Long id);

    User findByName(String username);

}
