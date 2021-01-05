package com.jysg.mall.controller;

import com.jysg.mall.entity.ClassifyEntity;
import com.jysg.mall.entity.request.ClassifyListRequest;
import com.jysg.mall.service.ClassifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/classify")
public class ClassifyController {

    @Autowired
    private ClassifyService classifyService;

    /**
     * 通过id查询商品分类
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping("/getClassifyById")
    public ClassifyEntity getClassifyEntityById(int id) throws Exception {
        return classifyService.getClassifyEntityById(id);
    }


    /**
     * 获取商品分类表列表
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/getClassifyList")
    public ArrayList<ClassifyEntity> getClassifyList(@RequestBody ClassifyListRequest request) throws Exception{
        return classifyService.getClassifyList(request);
    }

}
