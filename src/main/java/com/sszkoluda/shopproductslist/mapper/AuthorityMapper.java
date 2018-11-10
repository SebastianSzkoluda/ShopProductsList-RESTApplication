package com.sszkoluda.shopproductslist.mapper;

import com.sszkoluda.shopproductslist.DTO.AuthorityDTO;
import com.sszkoluda.shopproductslist.model.Authority;

public class AuthorityMapper {

    public static Authority AuthorityDTOtoAuthority(AuthorityDTO authorityDTO){
        return Authority.builder()
                .name(authorityDTO.getName())
                .build();
    }

    public static AuthorityDTO AuthoritytoAuthorityDTO(Authority authority){
        return AuthorityDTO.builder()
                .name(authority.getName())
                .build();
    }
}
