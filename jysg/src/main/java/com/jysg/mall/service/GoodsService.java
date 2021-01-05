package com.jysg.mall.service;

import com.jysg.mall.entity.GoodsEntity;
import com.jysg.mall.entity.request.GoodsListRequest;

import java.util.ArrayList;

public interface GoodsService {

    /**
     * 通过goodsId查询商品信息
//     * @param request
     * @return
     */
//    public GoodsEntity getGoodsByGoodsId(GoodsIdRequest request) throws Exception;
    public GoodsEntity getGoodsByGoodsId(int goodsId) throws Exception;

    /**
     * 获取商品总数
     * @return
     */
    public Integer getGoodsSize() throws Exception;

    /**
     * 获取商品列表
     * @param request
     * @return
     */
    public ArrayList<GoodsEntity> getGoodsList(GoodsListRequest request) throws Exception;

    /**
     * 获取商品列表2
     * @param request
     * @return
     */
    public ArrayList<GoodsEntity> getGoodsListByClassifyId(GoodsListRequest request) throws Exception;


}
