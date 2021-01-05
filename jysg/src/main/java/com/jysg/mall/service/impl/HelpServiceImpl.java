package com.jysg.mall.service.impl;

import com.jysg.mall.dao.HelpDao;
import com.jysg.mall.entity.HelpEntity;
import com.jysg.mall.service.HelpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class HelpServiceImpl implements HelpService {

    @Autowired
    private HelpDao helpDao;

    @Override
    public ArrayList<HelpEntity> getHelpList() {
        return helpDao.getHelpList();
    }

    @Override
    public HelpEntity getHelpById(int id) {
        return helpDao.getHelpById(id);
    }
}
