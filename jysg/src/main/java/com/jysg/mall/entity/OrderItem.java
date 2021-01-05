package com.jysg.mall.entity;

import lombok.Data;

import java.util.ArrayList;

@Data
public class OrderItem {

    private int id;

    private String orderid;

    private int cartid;

    private int goodsId;

    private String goodsName;

    private int num;

    private String price;

    private String totalFee;

    private String goodsImage;

    private String createTime;

    private String updateTime;


}
