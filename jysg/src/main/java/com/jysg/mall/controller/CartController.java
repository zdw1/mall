package com.jysg.mall.controller;

import com.jysg.mall.entity.CartEntity;
import com.jysg.mall.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping("/getCartByCartId")
    public CartEntity getCartByCartId(@RequestParam("cartid") int cartid){
        return cartService.getCartByCartId(cartid);
    }

    @RequestMapping("/getCartByCartIdAndStatus")
    public CartEntity getCartByCartIdAndStatus(@RequestParam("cartid") int cartid, @RequestParam("openid") String openid){
        return cartService.getCartByCartIdAndStatus(cartid, openid);
    }

    @RequestMapping("/getCartList")
    public ArrayList<CartEntity> getCartList(@RequestParam("openid") String openid){
        return cartService.getCartList(openid);
    }

    @RequestMapping("/getCartListByOpenid")
    public List getCartListByOpenid(@RequestParam("openid") String openid){
        return cartService.getCartListByOpenid(openid);
    }


    @RequestMapping("/getCartListAndStatus")
    public ArrayList<CartEntity> getCartList2(@RequestParam("openid") String openid, @RequestParam("status") String status){
        return cartService.getCartList2(openid, status);
    }

    @RequestMapping("/insertCart")
    public void insertCart(@RequestBody CartEntity cartEntity){
        cartService.insertCart(cartEntity);
    }

    @RequestMapping("/updateCart")
    public void updateCart(@RequestBody CartEntity cartEntity){
        cartService.updateCart(cartEntity);
    }

}
