package com.jysg.mall.service;

import com.jysg.mall.entity.ClassifyEntity;
import com.jysg.mall.entity.request.ClassifyListRequest;

import java.util.ArrayList;

public interface ClassifyService {

    /**
     * 通过id查询商品分类
     * @param id
     * @return
     * @throws Exception
     */
    public ClassifyEntity getClassifyEntityById(int id) throws Exception;

    /**
     * 获取商品分类表总数
     * @return
     */
    public Integer getClassifySize() throws Exception;

    /**
     * 获取商品分类表列表
     * @param request
     * @return
     * @throws Exception
     */
    public ArrayList<ClassifyEntity> getClassifyList(ClassifyListRequest request) throws Exception;
}
