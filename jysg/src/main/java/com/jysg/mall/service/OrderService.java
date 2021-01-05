package com.jysg.mall.service;

import com.jysg.mall.entity.OrderEntity;

import java.util.ArrayList;

public interface OrderService {

    public OrderEntity getOrderByOrderId(String orderid);

    public ArrayList<OrderEntity> getOrderList(String openid, String status);

    public String addOrder(OrderEntity orderEntity);

    public void deleteOrder(String orderid);

    public void updateOrderStatus(String orderid, String status);

    public void buyAgain(String orderid);

}
