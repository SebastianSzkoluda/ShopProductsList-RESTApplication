package com.sszkoluda.shopproductslist.rest;


import com.sszkoluda.shopproductslist.model.Product;
import com.sszkoluda.shopproductslist.repository.ProductRepository;
import com.sszkoluda.shopproductslist.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductService productService, ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @GetMapping("/product")
    public Set<Product> getProductsForFamily(@RequestParam String familyName) {
        return this.productService.getProductsForFamily(familyName);
    }

    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable("id") Integer productId) {
        return this.productRepository.findById(productId).get();
    }

    @PostMapping("/product")
    public ResponseEntity<Product> saveProductForCurrentFamily(@RequestBody Product product, @RequestParam String familyName) {
        return this.productService.saveProductForCurrentFamily(product, familyName)
                .map(p -> new ResponseEntity<Product>(HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    @PutMapping("/product/{id}")
    public Optional<Product> editProduct(@PathVariable("id") Integer productId, @RequestBody Product product) {
        return this.productRepository.findById(productId).map(productEdit -> {
            productEdit.setAmount(product.getAmount());
            productEdit.setFrequencyOfUse(product.getFrequencyOfUse());
            productEdit.setInStock(product.getInStock());
            productEdit.setProductName(product.getProductName());
            productEdit.setUserComment(product.getUserComment());
            return productRepository.save(productEdit);
        });
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable("id") Integer productId) {
        if (this.productService.removeProduct(productId)) {
            return ResponseEntity.ok().build();
        } else {
            return null;
        }

    }

}
