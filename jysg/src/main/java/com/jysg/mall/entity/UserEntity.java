package com.jysg.mall.entity;

import lombok.Data;

@Data
public class UserEntity {

    private int id;

    private String openid;

    private String name;

    private String phone;

    private String address;

    private String nickName;

    private String headImage;

    private String unionid;

    private String session_key;
}
