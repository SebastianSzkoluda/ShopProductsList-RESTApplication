package com.sszkoluda.shopproductslist.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class LoginUser {
    @Getter
    private String username;
    @Getter
    private String password;
}
