package com.jysg.mall.controller;

import com.jysg.mall.entity.UserAddress;
import com.jysg.mall.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 新增用户收货地址
     * @param userAddress
     */
    @RequestMapping("/insertUserAddress")
    public void insertUserAddress(@RequestBody UserAddress userAddress){
        userService.insertUserAddress(userAddress);
    }

    /**
     * 修改用户收货地址
     * @param userAddress
     */
    @RequestMapping("updateUserAddress")
    public void updateUserAddress(@RequestBody UserAddress userAddress){
        userService.updateUserAddress(userAddress);
    }

    /**
     * 查询用户地址信息列表
     * @param openid
     * @return
     */
    @RequestMapping("/getUserAddressList")
    public ArrayList<UserAddress> getUserAddressList(@RequestParam("openid") String openid){
        return userService.getUserAddressList(openid);
    }

    /**
     * 查询用户默认地址
     * @param openid
     * @param status
     * @return
     */
    @RequestMapping("/getUserAddressDefault")
    public UserAddress getUserAddressDefault(@RequestParam("openid")String openid, @RequestParam("status") String status){
        return userService.getUserAddressDefault(openid, status);
    }

    /**
     * 通过地址id查询地址信息
     * @param id
     * @return
     */
    @RequestMapping("/getUserAddressById")
    public UserAddress getUserAddressById(@RequestParam("id") int id){
        return userService.getUserAddressById(id);
    }

    /**
     * 删除地址信息
     * @param id
     */
    @RequestMapping("/deleteUserAddressById")
    public void deleteUserAddressById(@RequestParam("id") int id){
        userService.deleteUserAddressById(id);
    }
}
