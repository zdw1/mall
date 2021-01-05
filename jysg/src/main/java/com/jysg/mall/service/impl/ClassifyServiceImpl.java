package com.jysg.mall.service.impl;

import com.jysg.mall.dao.ClassifyDao;
import com.jysg.mall.entity.ClassifyEntity;
import com.jysg.mall.entity.request.ClassifyListRequest;
import com.jysg.mall.service.ClassifyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ClassifyServiceImpl implements ClassifyService {

    private Logger logger = LoggerFactory.getLogger(ClassifyServiceImpl.class);

    @Autowired
    private ClassifyDao classifyDao;

    @Override
    public ClassifyEntity getClassifyEntityById(int id) throws Exception {
        logger.info("======getClassifyEntityById=======");
        return classifyDao.getClassifyEntityById(id);
    }

    @Override
    public Integer getClassifySize() throws Exception{
        logger.info("======getClassifySize=======");
        return classifyDao.getClassifySize();
    }

    @Override
    public ArrayList<ClassifyEntity> getClassifyList(ClassifyListRequest request) throws Exception {
        logger.info("======getClassifyList=======");
        return classifyDao.getClassifyList(request);
    }
}
