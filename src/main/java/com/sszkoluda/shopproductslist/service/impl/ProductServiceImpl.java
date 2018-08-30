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

import java.util.Optional;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    final
    FamilyUserRepository familyUserRepository;

    final
    ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(FamilyUserRepository familyUserRepository, ProductRepository productRepository) {
        this.familyUserRepository = familyUserRepository;
        this.productRepository = productRepository;
    }


    @Override
    public Product saveProductForCurrentFamily(Product product, String familyName) {
        Product productTmp;
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());
        Set<Family> families = familyUser.get().getUserFamilies();
        for(Family family: families) {
            if(family.getFamily_name().equals(familyName)){
                productTmp = Product.builder()
                        .product_name(product.getProduct_name())
                        .frequency_of_use(product.getFrequency_of_use())
                        .amount(product.getAmount())
                        .in_stock(product.getIn_stock())
                        .family(family)
                        .build();
                family.getProductsList().add(productTmp);
                return productRepository.save(productTmp);
            }
        }
        return null;
    }

    @Override
    public Set<Product> getProductsForFamily(String familyName) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<FamilyUser> familyUser = familyUserRepository.findByUserName(auth.getName());
        Set<Family> families = familyUser.get().getUserFamilies();
        for(Family family: families)
            if(family.getFamily_name().equals(familyName))
                return family.getProductsList();
         return null;
    }

    @Override
    public Optional<Product> findOne(String productName) {
        return Optional.empty();
    }

    @Override
    public Optional<Product> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public Iterable<Product> listAllProducts() {
        return null;
    }
}
