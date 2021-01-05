package com.jysg.mall.service.impl;

import com.jysg.mall.dao.GoodsDao;
import com.jysg.mall.entity.GoodsEntity;
import com.jysg.mall.entity.request.GoodsListRequest;
import com.jysg.mall.service.GoodsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class GoodsServiceImpl implements GoodsService {

    private Logger logger = LoggerFactory.getLogger(GoodsServiceImpl.class);


    @Autowired
    private GoodsDao goodsDao;

    @Override
    public GoodsEntity getGoodsByGoodsId(int goodsId) throws Exception {
        logger.info("==========getGoodsByGoodsId============");
        GoodsEntity goodsEntity = goodsDao.getGoodsByGoodsId(goodsId);
        goodsEntity.setImages(goodsDao.getGoodsImagesByGoodsId(goodsId));
        return goodsEntity;
    }

    @Override
    public Integer getGoodsSize() throws Exception {
        logger.info("==========getGoodsSize============");
        return goodsDao.getGoodsSize();
    }

    @Override
    public ArrayList<GoodsEntity> getGoodsList(GoodsListRequest request) throws Exception {
        logger.info("==========getGoodsList============");
        return goodsDao.getGoodsList(request);
    }

    @Override
    public ArrayList<GoodsEntity> getGoodsListByClassifyId(GoodsListRequest request) throws Exception {
        logger.info("==========getGoodsListByClassifyId============");
        return goodsDao.getGoodsListByClassifyId(request);
    }
}
