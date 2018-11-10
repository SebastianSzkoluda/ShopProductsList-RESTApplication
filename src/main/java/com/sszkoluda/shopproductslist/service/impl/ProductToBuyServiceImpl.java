package com.sszkoluda.shopproductslist.service.impl;

import com.sszkoluda.shopproductslist.model.Family;
import com.sszkoluda.shopproductslist.model.FamilyUser;
import com.sszkoluda.shopproductslist.model.ProductToBuy;
import com.sszkoluda.shopproductslist.repository.FamilyUserRepository;
import com.sszkoluda.shopproductslist.repository.ProductToBuyRepository;
import com.sszkoluda.shopproductslist.service.FamilyUserService;
import com.sszkoluda.shopproductslist.service.ProductToBuyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductToBuyServiceImpl implements ProductToBuyService {

    private final FamilyUserRepository familyUserRepository;

    private final ProductToBuyRepository productToBuyRepository;

    private final FamilyUserService familyUserService;

    @Autowired
    public ProductToBuyServiceImpl(FamilyUserRepository familyUserRepository, ProductToBuyRepository productToBuyRepository, FamilyUserService familyUserService) {
        this.familyUserRepository = familyUserRepository;
        this.productToBuyRepository = productToBuyRepository;
        this.familyUserService = familyUserService;
    }


    @Override
    public Optional<ProductToBuy> saveProductToBuyForCurrentFamily(ProductToBuy productToBuy, Integer familyId) {
        Optional<FamilyUser> familyUser = this.familyUserService.getCurrentUser();
        return familyUser.flatMap(fU -> fU.getUserFamilies().stream()
                .filter(family -> family.getFamilyId().equals(familyId))
                .findFirst()
                .map(family -> {
                    productToBuy.setFamily(family);
                    family.getProductsToBuyList().add(productToBuy);
                    return productToBuyRepository.save(productToBuy);
                }));
    }

    @Override
    public List<ProductToBuy> getProductsToBuyForFamily(Integer familyId) {
        Optional<FamilyUser> familyUser = this.familyUserService.getCurrentUser();
        return familyUser.map(fU -> fU.getUserFamilies().stream()
                .filter(family -> family.getFamilyId().equals(familyId))
                .findFirst()
                .map(Family::getProductsToBuyList).orElse(Collections.emptyList())).get();
    }

    @Override
    public Optional<ProductToBuy> findOne(String productName) {
        return productToBuyRepository.findByProductName(productName);
    }

    @Override
    public Iterable<ProductToBuy> listAllProductsToBuy() {
        return productToBuyRepository.findAll();
    }

    @Override
    public boolean removeProductToBuy(Integer productToBuyId) {
        this.productToBuyRepository.deleteById(productToBuyId);
        return true;
    }
}
