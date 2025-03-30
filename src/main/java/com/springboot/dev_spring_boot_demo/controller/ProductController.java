package com.springboot.dev_spring_boot_demo.controller;

import com.springboot.dev_spring_boot_demo.entity.Product;
import com.springboot.dev_spring_boot_demo.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/admin/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        binder.registerCustomEditor(String.class, stringTrimmerEditor);
    }

    @GetMapping("/list-product")
    public String listProducts(Model model) {
        List<Product> products = productService.findAll();
        model.addAttribute("products", products);
        return "admin/products/list-product";
    }

    @GetMapping("/product-form-insert")
    public String formInsert(Model model) {
        model.addAttribute("product", new Product());
        return "admin/products/product-form-insert";
    }

    @PostMapping("/save")
    public String saveProduct(@ModelAttribute("product") @Valid Product product, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "admin/products/product-form-insert";
        }
        productService.save(product);
        return "redirect:/admin/products/list-product";
    }

    @GetMapping("/product-form-update")
    public String formUpdate(@RequestParam("id") int id, Model model) {
        Product product = productService.findById(id);
        if (product != null) {
            model.addAttribute("product", product);
            return "admin/products/product-form-update";
        }
        return "redirect:/admin/products/list-product";
    }

    @GetMapping("/delete")
    public String deleteProduct(@RequestParam("id") int id) {
        Product product = productService.findById(id);
        if (product != null) {
            productService.deleteById(id);
        }
        return "redirect:/admin/products/list-product";
    }
}
