package com.jysg.mall.entity;

import lombok.Data;

@Data
public class UserAddress {

    private int id;

    private String openid;

    private String name;

    private String phone;

    private String address;

    private String status;

    private String createTime;

    private String updateTime;
}
