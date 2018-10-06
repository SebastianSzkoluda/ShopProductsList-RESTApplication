package com.sszkoluda.shopproductslist.model;

import lombok.Data;
import lombok.Getter;

@Data
public class AuthToken {

    @Getter
    private String token;

    public AuthToken() {

    }

    public AuthToken(String token) {
        this.token = token;
    }
}
