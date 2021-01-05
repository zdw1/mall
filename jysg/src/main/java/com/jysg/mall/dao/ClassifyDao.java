package com.jysg.mall.dao;

import com.jysg.mall.entity.ClassifyEntity;
import com.jysg.mall.entity.request.ClassifyListRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface ClassifyDao {

    /**
     * 通过id查询商品分类
     * @param id
     * @return
     */
    public ClassifyEntity getClassifyEntityById(@Param("id") int id);

    /**
     * 新增商品分类
     * @param classifyEntity
     */
    public void insertClassifyEntity(@Param("classifyEntity") ClassifyEntity classifyEntity);

    /**
     * 更新商品分类
     * @param classifyEntity
     */
    public void updateClassifyEntity(@Param("classifyEntity") ClassifyEntity classifyEntity);

    /**
     * 获取商品分类表总数
     * @return
     */
    public Integer getClassifySize();

    /**
     * 获取商品分类表列表
     * @param request
     * @return
     */
    public ArrayList<ClassifyEntity>getClassifyList(@Param("request") ClassifyListRequest request);
}
