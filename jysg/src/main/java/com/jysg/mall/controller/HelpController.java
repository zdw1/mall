package com.jysg.mall.controller;

import com.jysg.mall.entity.HelpEntity;
import com.jysg.mall.service.HelpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/help")
public class HelpController {

    @Autowired
    private HelpService helpService;

    @RequestMapping("/getHelpList")
    public ArrayList<HelpEntity> getHelpList(){
        return helpService.getHelpList();
    }

    @RequestMapping("/getHelpById")
    public HelpEntity getHelpById(@RequestParam("id") int id){
        return helpService.getHelpById(id);
    }
}
