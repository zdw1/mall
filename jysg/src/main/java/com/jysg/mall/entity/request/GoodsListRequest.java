package com.jysg.mall.entity.request;

import lombok.Data;

@Data
public class GoodsListRequest {

    private String classifyId;

    private int pageSize;

    private int start;
}
