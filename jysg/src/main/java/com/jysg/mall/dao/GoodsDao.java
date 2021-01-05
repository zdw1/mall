package com.jysg.mall.dao;

import com.jysg.mall.entity.GoodsEntity;
import com.jysg.mall.entity.GoodsImages;
import com.jysg.mall.entity.request.GoodsListRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface GoodsDao {

    /**
     * 通过goodsId查询商品信息
//     * @param request
     * @return
     */
//    public GoodsEntity getGoodsByGoodsId(@Param("request")GoodsIdRequest request);
    public GoodsEntity getGoodsByGoodsId(@Param("goodsId") int goodsId);



    /**
     * 新增商品
     * @param goodsEntity
     */
    public void insertGoods(@Param("goodsEntity") GoodsEntity goodsEntity);

    /**
     * 更新商品信息
     * @param goodsEntity
     */
    public void updateGoods(@Param("goodsEntity") GoodsEntity goodsEntity);

    /**
     * 获取商品总数
     * @return
     */
    public Integer getGoodsSize();

    /**
     * 获取商品列表
     * @param request
     * @return
     */
    public ArrayList<GoodsEntity> getGoodsList(@Param("request") GoodsListRequest request);

    /**
     * 获取商品列表2
     * @param request
     * @return
     */
    public ArrayList<GoodsEntity> getGoodsListByClassifyId(@Param("request") GoodsListRequest request);

    public ArrayList<GoodsImages> getGoodsImagesByGoodsId(@Param("goodsId") int goodsId);
}
