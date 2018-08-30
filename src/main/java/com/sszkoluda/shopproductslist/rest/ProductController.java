package com.sszkoluda.shopproductslist.rest;


import com.sszkoluda.shopproductslist.model.Product;
import com.sszkoluda.shopproductslist.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    final
    ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/getProductsForFamily")
    public Set<Product> getProductsForFamily(@RequestParam String familyName) {
        return productService.getProductsForFamily(familyName);
    }

    @PostMapping("/saveProductForCurrentFamily")
    public Product saveProductForCurrentFamily(@RequestBody Product product, @RequestParam String familyName) {
        System.out.println("Dotarlem");
        return productService.saveProductForCurrentFamily(product,familyName);
    }

}
