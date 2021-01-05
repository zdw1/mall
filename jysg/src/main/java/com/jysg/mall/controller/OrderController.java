package com.jysg.mall.controller;

import com.jysg.mall.entity.CartEntity;
import com.jysg.mall.entity.OrderEntity;
import com.jysg.mall.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * 得到的order中含有orderitem
     * @param orderid
     * @return
     */
    @RequestMapping("/getOrderByOrderId")
    public OrderEntity getOrderByOrderId(@RequestParam("orderid") String orderid){
        return orderService.getOrderByOrderId(orderid);
    }

    @RequestMapping("/getOrderList")
    public ArrayList<OrderEntity> getOrderList(@RequestParam("openid") String openid, @RequestParam("status") String status){
        return orderService.getOrderList(openid, status);
    }

    @RequestMapping("/addOrder")
    public String addOrder(@RequestBody OrderEntity orderEntity){
        return orderService.addOrder(orderEntity);
    }

    @RequestMapping("/deleteOrder")
    public void deleteOrder(@RequestParam("orderid") String orderid){
        orderService.deleteOrder(orderid);
    }

    @RequestMapping("/confirmOrder")
    public void confirmOrder(@RequestParam("orderid") String orderid){
        orderService.updateOrderStatus(orderid, "5"); //5-交易成功
    }

    @RequestMapping("/buyAgain")
    public void buyAgain(@RequestParam("orderid") String orderid){
        orderService.buyAgain(orderid);
    }

}
