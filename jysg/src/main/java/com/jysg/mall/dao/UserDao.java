package com.jysg.mall.dao;

import com.jysg.mall.entity.UserAddress;
import com.jysg.mall.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface UserDao {

    // 通过地址id查询用户地址信息
    public UserAddress getUserAddressById(@Param("id") int id);

    /**
     * 通过openid查询用户信息
     * @param openid
     * @return
     */
    public UserEntity getUserEntityByOpenid(@Param("openid") String openid);

    /**
     * 新建用户信息
     * @param userEntity
     */
    public void insertUser(@Param("userEntity") UserEntity userEntity);

    /**
     * 更新用户信息
     * @param userEntity
     */
    public void updateUser(@Param("userEntity") UserEntity userEntity);


    // 新增用户收货地址
    public void insertUserAddress(@Param("userAddress") UserAddress userAddress);

    // 修改用户收货地址
    public void updateUserAddress(@Param("userAddress") UserAddress userAddress);

    // 查询用户地址信息
    public ArrayList<UserAddress> getUserAddressList(@Param("openid") String openid);

    // 查询默认的地址信息
    public UserAddress getUserAddressDefault(@Param("openid") String openid, @Param("status") String status);

    // 通过id删除地址信息
    public void deleteUserAddressById(@Param("id") int id);
}
