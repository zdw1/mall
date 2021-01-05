package com.jysg.mall.dao;

import com.jysg.mall.entity.OrderEntity;
import com.jysg.mall.entity.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface OrderDao {

    public OrderEntity getOrderByOrderid(@Param("orderid") String orderid);

    public ArrayList<OrderEntity> getOrderByOpenid(@Param("openid") String openid, @Param("status") String status);

    public ArrayList<OrderItem> getOrderItem(@Param("orderid") String orderid);

    // 新增订单信息
    public void insertOrder(@Param("orderEntity") OrderEntity orderEntity);

    // 新增订单详细信息
    public void insertOrderItem(@Param("orderItem") OrderItem orderItem);

    // 删除订单表信息
    public void deleteOrder(@Param("orderid") String orderid);

    // 删除订单详细表信息
    public void deleteOrderItem(@Param("orderid") String orderid);

    // 修该订单状态
    public void updateOrderStatus(@Param("orderid") String orderid, @Param("status") String status);
}
