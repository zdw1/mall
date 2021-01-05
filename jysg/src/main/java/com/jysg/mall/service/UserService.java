package com.jysg.mall.service;

import com.jysg.mall.entity.UserAddress;

import java.util.ArrayList;

public interface UserService {

    public void insertUserAddress(UserAddress userAddress);

    public void updateUserAddress(UserAddress userAddress);

    public ArrayList<UserAddress> getUserAddressList(String openid);

    public UserAddress getUserAddressDefault(String openid, String status);

    public void deleteUserAddressById(int id);

    public UserAddress getUserAddressById(int id);

}
