package ru.kata.spring.boot_security.demo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/admin/api")
public class AdminRestController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findOne(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @GetMapping("/new")
    public String newPerson(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("roles", roleService.getAllRoles());
        return "redirect:/admin";
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> create(@RequestBody @Valid User user,
                                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException();
        }
        userService.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}/edit")
    public String edit(Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.findOne(id));
        model.addAttribute("roles", roleService.getAllRoles());
        return "redirect:/admin";
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> update(@Valid @RequestBody User user,
                                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException();
        }
        userService.update(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delete(@PathVariable("id") Long id) {
        User user = userService.findOne(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        userService.delete(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
