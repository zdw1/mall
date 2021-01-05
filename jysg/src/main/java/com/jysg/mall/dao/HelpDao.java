package com.jysg.mall.dao;

import com.jysg.mall.entity.HelpEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface HelpDao {

    public HelpEntity getHelpById(@Param("id") int id);

    public ArrayList<HelpEntity> getHelpList();

}
