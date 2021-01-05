package com.jysg.mall.entity;

import lombok.Data;

@Data
public class CartEntity {

    private int cartid;

    private String openid;

    private int goodsId;

    private String goodsName;

    private int num;

    private String price;

    private String image;

    private String status;

    private String createTime;

    private String updateTime;
}
