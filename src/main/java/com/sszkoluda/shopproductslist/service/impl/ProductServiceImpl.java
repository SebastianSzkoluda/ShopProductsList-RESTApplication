package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Product;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.repository.ProductRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import com.sszkoluda.shopproductslist.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    private final FamilyUserRepository familyUserRepository;

    private final ProductRepository productRepository;

    private final FamilyUserService familyUserService;

    @Autowired
    public ProductServiceImpl(FamilyUserRepository familyUserRepository, ProductRepository productRepository, FamilyUserService familyUserService) {
        this.familyUserRepository = familyUserRepository;
        this.productRepository = productRepository;
        this.familyUserService = familyUserService;
    }


    @Override
    public Optional<Product> saveProductForCurrentFamily(Product product, Integer familyId) {
        Optional<FamilyUser> familyUser = this.familyUserService.getCurrentUser();
        return familyUser.flatMap(fU -> fU.getUserFamilies().stream()
                .filter(family -> family.getFamilyId().equals(familyId))
                .findFirst()
                .map(family -> {
                    product.setFamily(family);
                    family.getProductsList().add(product);
                    return productRepository.save(product);
                }));
    }

    @Override
    public List<Product> getProductsForFamily(Integer familyId) {
        Optional<FamilyUser> familyUser = this.familyUserService.getCurrentUser();
        return familyUser.map(fU -> fU.getUserFamilies().stream()
                .filter(family -> family.getFamilyId().equals(familyId))
                .findFirst()
                .map(Family::getProductsList).orElse(Collections.emptyList())).get();
    }

    @Override
    public Optional<Product> findOne(String productName) {
        return productRepository.findByProductName(productName);
    }

    @Override
    public Iterable<Product> listAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public boolean removeProduct(Integer productId) {
        this.productRepository.deleteById(productId);
        return true;
    }
}
