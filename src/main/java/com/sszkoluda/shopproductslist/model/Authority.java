package com.sszkoluda.shopproductslist.model;


import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "authority")
public class Authority {

    @Getter
    @Id
    @Column(name = "name")
    private String name;


}
