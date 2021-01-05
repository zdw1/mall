package com.jysg.mall.service.impl;

import com.jysg.mall.dao.CartDao;
import com.jysg.mall.dao.GoodsDao;
import com.jysg.mall.entity.CartEntity;
import com.jysg.mall.entity.GoodsEntity;
import com.jysg.mall.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CartServiceImpl implements CartService {

    private static final SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private CartDao cartDao;

    @Autowired
    private GoodsDao goodsDao;


    @Override
    public CartEntity getCartByCartId(int cartid) {
        return cartDao.getCartByCartId(cartid);
    }

    @Override
    public CartEntity getCartByCartIdAndStatus(int cartid, String openid) {

        return cartDao.getCartByCartIdAndStatus(cartid, openid);
    }

    @Override
    public ArrayList<CartEntity> getCartList(String openid) {
        return cartDao.getCartList(openid);
    }

    @Override
    public List getCartListByOpenid(String openid) {
        ArrayList<CartEntity> cartEntityList = cartDao.getCartList(openid);
        List list = new ArrayList();
        for(CartEntity cartEntity: cartEntityList ){
            Map<String, Object> map = new HashMap<String, Object>();
            int goodsId = cartEntity.getGoodsId();
            GoodsEntity goodsEntity = goodsDao.getGoodsByGoodsId(goodsId);
            goodsEntity.setImages(goodsDao.getGoodsImagesByGoodsId(goodsId));
            map.put("goods", goodsEntity);
            map.put("cart", cartEntity);
            list.add(map);
        }
        return list;
    }


    @Override
    public ArrayList<CartEntity> getCartList2(String openid, String status) {
        return cartDao.getCartList2(openid, status);
    }

    @Override
    public void insertCart(CartEntity cartEntity) {
        // 判断该商品是否已经在购物车，是则update数量+1，不是则insert
        CartEntity cart = cartDao.getCartByOpenIdAndGoodsId(cartEntity.getOpenid(), cartEntity.getGoodsId());
        if(cart != null){
            // 数量+1
            cart.setNum(cart.getNum() + 1);
            cartDao.updateCart(cart);
        }else{
            cartEntity.setCreateTime(FORMAT.format(System.currentTimeMillis()));
            cartDao.insertCart(cartEntity);
        }
    }

    @Override
    public void updateCart(CartEntity cartEntity) {
        CartEntity cart = cartDao.getCartByCartId(cartEntity.getCartid());
        cart.setNum(cartEntity.getNum());
        cart.setUpdateTime(FORMAT.format(System.currentTimeMillis()));
        cartDao.updateCart(cart);
    }


}
