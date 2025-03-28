package com.springboot.dev_spring_boot_demo.controller;
import com.springboot.dev_spring_boot_demo.entity.Product;

import com.springboot.dev_spring_boot_demo.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class HomeController {
    private final ProductService productService;

    public HomeController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/shop")
    public String shop(Model model) {
        List<Product> products = productService.findAll();
        model.addAttribute("products", products);
        return "shop";
    }

    @GetMapping("/about-us")
    public String aboutUs() {
        return "about-us";
    }

    @GetMapping("/contact-us")
    public String contactUs() {
        return "contact-us";
    }

    @GetMapping("/blog")
    public String blog() {
        return "blog";
    }

    @GetMapping("/detailProduct")
    public String detailProduct(@RequestParam("id") int id, Model model) {
        Product product = productService.findById(id);
        model.addAttribute("product", product);
        return "detailProduct";
    }
}