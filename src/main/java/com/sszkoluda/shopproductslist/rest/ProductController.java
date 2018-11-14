package com.sszkoluda.shopproductslist.rest;


import com.sszkoluda.shopproductslist.model.Product;
import com.sszkoluda.shopproductslist.repository.ProductRepository;
import com.sszkoluda.shopproductslist.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public List<Product> getProductsForFamily(@RequestParam Integer familyId) {
        return this.productService.getProductsForFamily(familyId);
    }

    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable("id") Integer productId) {
        return this.productRepository.findById(productId).get();
    }

    @PostMapping("/product")
    public ResponseEntity<Product> saveProductForCurrentFamily(@RequestBody Product product, @RequestParam Integer familyId) {
        return this.productService.saveProductForCurrentFamily(product, familyId)
                .map(p -> new ResponseEntity<>(p,HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    @PutMapping("/product/{id}")
    public Optional<Product> editProduct(@PathVariable("id") Integer productId, @RequestBody Product product) {
        return this.productRepository.findById(productId).map(productEdit -> {
            productEdit.setPrice(product.getPrice());
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
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

}
