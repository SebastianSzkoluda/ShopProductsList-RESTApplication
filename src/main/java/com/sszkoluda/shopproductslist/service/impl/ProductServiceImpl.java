package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.Product;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.repository.ProductRepository;
import com.sszkoluda.shopproductslist.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    private final FamilyUserRepository familyUserRepository;

    private final ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(FamilyUserRepository familyUserRepository, ProductRepository productRepository) {
        this.familyUserRepository = familyUserRepository;
        this.productRepository = productRepository;
    }


    @Override
    public Optional<Product> saveProductForCurrentFamily(Product product, String familyName) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());

        return familyUser.map(fU -> fU.getUserFamilies().stream()
                .filter(family -> family.getFamilyName().equals(familyName))
                .findFirst()
                .map(family -> {
                    product.setFamily(family);
                    family.getProductsList().add(product);
                    return productRepository.save(product);
                }))
                .orElse(Optional.empty());
    }

    @Override
    public Set<Product> getProductsForFamily(String familyName) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());
        return familyUser.map(fU -> fU.getUserFamilies().stream()
                .filter(family -> family.getFamilyName().equals(familyName))
                .findFirst()
                .map(Family::getProductsList).orElse(Collections.emptySet())).get();
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
