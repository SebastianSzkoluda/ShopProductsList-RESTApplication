package com.sszkoluda.shopproductslist.rest;


import com.sszkoluda.shopproductslist.model.Product;
import com.sszkoluda.shopproductslist.model.ProductToBuy;
import com.sszkoluda.shopproductslist.repository.ProductToBuyRepository;
import com.sszkoluda.shopproductslist.service.ProductToBuyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ProductToBuyController {

    private final ProductToBuyService productToBuyService;

    private final ProductToBuyRepository productToBuyRepository;

    @Autowired
    public ProductToBuyController(ProductToBuyService productToBuyService, ProductToBuyRepository productToBuyRepository) {
        this.productToBuyService = productToBuyService;
        this.productToBuyRepository = productToBuyRepository;
    }

    @GetMapping("/productToBuy")
    public List<ProductToBuy> getProductsToBuyForFamily(@RequestParam Integer familyId) {
        return this.productToBuyService.getProductsToBuyForFamily(familyId);
    }

    @GetMapping("/productToBuy/{id}")
    public ProductToBuy getProductToBuy(@PathVariable("id") Integer productToBuyId) {
        return this.productToBuyRepository.findById(productToBuyId).get();
    }

    @PostMapping("/productToBuy")
    public ResponseEntity<ProductToBuy> saveProductToBuyForCurrentFamily(@RequestBody ProductToBuy productToBuy, @RequestParam Integer familyId) {
        return this.productToBuyService.saveProductToBuyForCurrentFamily(productToBuy, familyId)
                .map(p -> new ResponseEntity<>(p, HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    @PutMapping("/productToBuy/{id}")
    public Optional<ProductToBuy> editProductToBuy(@PathVariable("id") Integer productToBuyId, @RequestBody ProductToBuy productToBuy) {
        return this.productToBuyRepository.findById(productToBuyId).map(productEdit -> {
            productEdit.setProductName(productToBuy.getProductName());
            productEdit.setAmountToBuy(productToBuy.getAmountToBuy());
            productEdit.setShop(productToBuy.getShop());
            return productToBuyRepository.save(productEdit);
        });
    }

    @DeleteMapping("/productToBuy/{id}")
    public ResponseEntity<Product> deleteProductToBuy(@PathVariable("id") Integer productToBuyId) {
        if (this.productToBuyService.removeProductToBuy(productToBuyId)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }
}
