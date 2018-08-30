package com.sszkoluda.shopproductslist.model;


import lombok.*;

import javax.persistence.*;

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
