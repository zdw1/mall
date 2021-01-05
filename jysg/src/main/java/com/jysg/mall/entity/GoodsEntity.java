package com.jysg.mall.entity;

import lombok.Data;

import java.util.ArrayList;

@Data
public class GoodsEntity {

    private int goodsId;

    private String name;

    private int classifyId;

    private String classifyName;

    private String price;

    private String content;

    private String image;

    private int num;

    private String createTime;

    private String updateTime;

    private ArrayList<GoodsImages> images;

}
