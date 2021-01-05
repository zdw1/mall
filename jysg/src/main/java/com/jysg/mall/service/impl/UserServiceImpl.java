package com.jysg.mall.service.impl;

import com.jysg.mall.dao.UserDao;
import com.jysg.mall.entity.UserAddress;
import com.jysg.mall.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;

@Service
public class UserServiceImpl implements UserService {

    private static final SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserDao userDao;

    @Override
    public void insertUserAddress(UserAddress userAddress) {
        logger.info("========insertUserAddress=======开始");
        userAddress.setCreateTime(FORMAT.format(System.currentTimeMillis()));
        // 设为默认地址时，先判断其他的地址时否有默认地址，有就更改为不默认
        if("0".equals(userAddress.getStatus())){
            // 查询所有的地址
            ArrayList<UserAddress> list = userDao.getUserAddressList(userAddress.getOpenid());
            for (UserAddress address: list){
                if ("0".equals(address.getStatus())){
                    address.setStatus("1"); // 设置为不默认
                    address.setUpdateTime(FORMAT.format(System.currentTimeMillis()));
                    userDao.updateUserAddress(address);
                    break;
                }
            }
        }
        userDao.insertUserAddress(userAddress);
        logger.info("========insertUserAddress=======结束");
    }

    @Override
    public void updateUserAddress(UserAddress userAddress) {
        logger.info("========updateUserAddress=======开始");
        UserAddress address = userDao.getUserAddressById(userAddress.getId());
        // 修改默认地址时，先判断其他的地址时否有默认地址，有就更改为不默认
        if(userAddress.getStatus().equals("0")) {
            // 查询所有的地址
            ArrayList<UserAddress> list = userDao.getUserAddressList(address.getOpenid());
            for (UserAddress ad : list) {
                if ("0".equals(ad.getStatus())) {
                    ad.setStatus("1"); // 设置为不默认
                    ad.setUpdateTime(FORMAT.format(System.currentTimeMillis()));
                    userDao.updateUserAddress(ad);
                    break;
                }
            }
        }
        address.setStatus(userAddress.getStatus());
        if (userAddress.getName() != null) {
            address.setName(userAddress.getName());
        }
        if (userAddress.getPhone() != null) {
            address.setPhone(userAddress.getPhone());
        }
        if (userAddress.getAddress() != null) {
            address.setAddress(userAddress.getAddress());
        }
        address.setUpdateTime(FORMAT.format(System.currentTimeMillis()));
        userDao.updateUserAddress(address);
        logger.info("========updateUserAddress=======结束");
    }

    public ArrayList<UserAddress> getUserAddressList(String openid){
        return userDao.getUserAddressList(openid);
    }

    public UserAddress getUserAddressDefault(String openid, String status){
        return userDao.getUserAddressDefault(openid, status);
    }

    public void deleteUserAddressById(int id){
        userDao.deleteUserAddressById(id);
    }

    public UserAddress getUserAddressById(int id){
        return userDao.getUserAddressById(id);
    }
}
