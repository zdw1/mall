package com.jysg.mall.entity;

import lombok.Data;

import java.util.ArrayList;

@Data
public class OrderEntity {

    private String orderid;

    private String openid;

    private String payment;

    private String postFee;

    private String status;

    private String payTime;

    private String postTime;

    private String createTime;

    private String updateTime;

    private String endTime;

    private String closeTime;

    private String shippingName;

    private String shippingCode;

    private String buyerMsg;

    private String buyerNick;

    private String buyerRate;

    private String buyerName;

    private String buyerPhone;

    private String buyerAddress;

    private ArrayList<OrderItem> items;

}
