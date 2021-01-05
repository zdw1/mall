package com.jysg.mall.service;

import com.jysg.mall.entity.CartEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface CartService {

    public CartEntity getCartByCartId(int cartid);

    public CartEntity getCartByCartIdAndStatus(int cartid, String openid);

    public ArrayList<CartEntity> getCartList(String openid);

    public List getCartListByOpenid(String openid);

    public ArrayList<CartEntity> getCartList2(String openid, String status);

    public void insertCart(CartEntity cartEntity);

    public void updateCart(CartEntity cartEntity);
}
