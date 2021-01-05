package com.jysg.mall.dao;

import com.jysg.mall.entity.CartEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface CartDao {

    /**
     * 通过cartid查询购物车信息
     * @param cartid
     * @return
     */
    public CartEntity getCartByCartId(@Param("cartid") int cartid);

    /**
     * 通过cartid\status查询购物车信息
     * @param cartid
     * @param status
     * @return
     */
    public CartEntity getCartByCartIdAndStatus(@Param("cartid") int cartid, @Param("status") String status);

    /**
     * 通过openid/goodsId查询购物车商品信息
     * @param openid
     * @param goodsId
     * @return
     */
    public CartEntity getCartByOpenIdAndGoodsId(@Param("openid") String openid, @Param("goodsId") int goodsId);

    /**
     * 加入购物车
     * @param cartEntity
     */
    public void insertCart(@Param("cartEntity") CartEntity cartEntity);

    /**
     * 修改购物车
     * @param cartEntity
     */
    public void updateCart(@Param("cartEntity") CartEntity cartEntity);

    /**
     * 通过openid查询购物车信息
     * @param openid
     * @return
     */
    public ArrayList<CartEntity> getCartList(@Param("openid") String openid);

    /**
     * 通过openid和status查询购物车信息
     * @param openid
     * @param status
     * @return
     */
    public ArrayList<CartEntity> getCartList2(@Param("openid") String openid, @Param("status") String status);

    /**
     * 删除购物车商品
     * @param cartid
     */
    public void deleteCartByCartId(@Param("cartid") int cartid);
}
