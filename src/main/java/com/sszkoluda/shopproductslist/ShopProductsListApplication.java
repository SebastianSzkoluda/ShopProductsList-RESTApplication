package com.sszkoluda.shopproductslist;

import com.sszkoluda.shopproductslist.service.StorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;

@SpringBootApplication
public class ShopProductsListApplication implements CommandLineRunner {

    @Resource
    StorageService storageService;

    public static void main(String[] args) {
        SpringApplication.run(ShopProductsListApplication.class, args);
    }

    @Override
    public void run(String... arg) throws Exception {
        storageService.deleteAll();
        storageService.init();
    }
}
