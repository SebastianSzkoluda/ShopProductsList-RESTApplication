package com.sszkoluda.shopproductslist.model;

import lombok.Getter;

public class AuthToken {

    @Getter
    private String token;

    public AuthToken(){

    }

    public AuthToken(String token){
        this.token = token;
    }
}
