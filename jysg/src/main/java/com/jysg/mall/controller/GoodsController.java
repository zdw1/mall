package com.jysg.mall.controller;

import com.jysg.mall.entity.GoodsEntity;
import com.jysg.mall.entity.request.GoodsListRequest;
import com.jysg.mall.service.GoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/goods")
public class GoodsController {


    @Autowired
    private GoodsService goodsService;

    /**
     * 通过goodsId查询商品信息
     * @param goodsId
     * @return
     */
    @RequestMapping("/getGoodsById")
    public GoodsEntity getGoodsByGoodsId2(@RequestParam("goodsId") int goodsId) throws Exception{
//        return goodsService.getGoodsByGoodsId(Integer.valueOf(param.get("goodsId").toString()));
        return goodsService.getGoodsByGoodsId(goodsId);
    }

    /**
     * 获取商品列表
     * @param request
     * @return
     */
    @RequestMapping("/getGoodsList")
    public ArrayList<GoodsEntity> getGoodsList(@RequestBody GoodsListRequest request) throws Exception {
        return goodsService.getGoodsList(request);
    }

    /**
     * 获取商品列表2
     * @param request
     * @return
     */
    @RequestMapping("/getGoodsListByClassifyId")
    public ArrayList<GoodsEntity> getGoodsListByClassifyId(@RequestBody GoodsListRequest request) throws Exception {
        return goodsService.getGoodsListByClassifyId(request);
    }


}
