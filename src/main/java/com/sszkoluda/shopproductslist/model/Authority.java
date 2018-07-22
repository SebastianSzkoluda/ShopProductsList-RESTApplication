package com.sszkoluda.shopproductslist.model;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;

@Data
@Builder
@Entity
@Table(name = "authority")
public class Authority {

    @Getter
    @Id
    @Column(name = "product_id")
    private String name;


}
