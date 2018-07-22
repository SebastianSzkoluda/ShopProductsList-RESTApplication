package com.sszkoluda.shopproductslist.configuration;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
@Configuration
@EnableAutoConfiguration
@EntityScan(basePackages = {"com.sszkoluda.shopproductslist.model"})
@EnableJpaRepositories(basePackages = {"com.sszkoluda.shopproductslist.repository"})
@EnableTransactionManagement
public class RepositoryConfiguration {
}
