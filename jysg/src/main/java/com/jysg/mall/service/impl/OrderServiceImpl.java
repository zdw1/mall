package com.jysg.mall.service.impl;

import com.jysg.mall.dao.CartDao;
import com.jysg.mall.dao.OrderDao;
import com.jysg.mall.entity.OrderEntity;
import com.jysg.mall.entity.OrderItem;
import com.jysg.mall.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    private static final SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private CartDao cartDao;

    @Override
    public OrderEntity getOrderByOrderId(String orderid) {
        OrderEntity orderEntity = orderDao.getOrderByOrderid(orderid);
        ArrayList<OrderItem> orderItems = orderDao.getOrderItem(orderid);
        orderEntity.setItems(orderItems);
        return orderEntity;
    }

    @Override
    public ArrayList<OrderEntity> getOrderList(String openid, String status) {
        Map<String, Object> map = new HashMap<String, Object>();
        ArrayList<OrderEntity> orderList = orderDao.getOrderByOpenid(openid, status);
        if (orderList != null){
            for (OrderEntity orderEntity: orderList){
                orderEntity.setItems(orderDao.getOrderItem(orderEntity.getOrderid()));
            }
            return orderList;
        }
        return null;
    }

    @Override
    public String addOrder(OrderEntity orderEntity) {
        // 生成orderid
        String date = FORMAT.format(System.currentTimeMillis());
        String orderid = date.replaceAll("-", "")
                            .replaceAll(" ","")
                            .replaceAll(":","");
        logger.info("===orderid:{}===", orderid);
        orderEntity.setOrderid(orderid);
        orderEntity.setCreateTime(date);
        orderDao.insertOrder(orderEntity);
        ArrayList<OrderItem> items = orderEntity.getItems();
        for (OrderItem item: items){
            item.setOrderid(orderid);
            item.setCreateTime(date);
            orderDao.insertOrderItem(item);
            // 清除购物车中提交的商品，
            cartDao.deleteCartByCartId(item.getCartid());
            // 更新购物车表m_cart的status状态
//            cartDao.getCartByCartId();
//            cartDao.updateCart();
        }
        return orderid;
    }

    @Override
    public void deleteOrder(String orderid) {
        // 删除m_order表记录
        orderDao.deleteOrder(orderid);
        // 删除m_order_item表记录
        orderDao.deleteOrderItem(orderid);
    }

    @Override
    public void updateOrderStatus(String orderid, String status) {
        // 确认收货，修改订单状态
        orderDao.updateOrderStatus(orderid, status);
    }

    @Override
    public void buyAgain(String orderid) {
        OrderEntity orderEntity = orderDao.getOrderByOrderid(orderid);
        // 生成orderid
        String date = FORMAT.format(System.currentTimeMillis());
        String orderid_new = date.replaceAll("-", "")
                .replaceAll(" ","")
                .replaceAll(":","");
        logger.info("===orderid_new:{}===", orderid_new);
        orderEntity.setOrderid(orderid_new);
        orderEntity.setStatus("1");
        orderEntity.setCreateTime(date);
        orderDao.insertOrder(orderEntity);
        ArrayList<OrderItem> orderItems = orderDao.getOrderItem(orderid);
        for (OrderItem item: orderItems) {
            item.setOrderid(orderid_new);
            item.setCreateTime(date);
            orderDao.insertOrderItem(item);
        }
    }


}
