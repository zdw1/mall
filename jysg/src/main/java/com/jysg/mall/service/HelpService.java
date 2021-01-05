package com.jysg.mall.service;

import com.jysg.mall.entity.HelpEntity;

import java.util.ArrayList;

public interface HelpService {

    public ArrayList<HelpEntity> getHelpList();

    public HelpEntity getHelpById(int id);
}
