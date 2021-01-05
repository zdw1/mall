package com.jysg.mall.controller;

import com.jysg.mall.entity.UserEntity;
import com.jysg.mall.entity.request.WeChatLoginRequest;
import com.jysg.mall.service.WeChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/weChat")
public class WeChatController {

    @Autowired
    private WeChatService weChatService;


    /**
     * 小程序登录
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/login")
    public UserEntity weChatLogin(@RequestBody WeChatLoginRequest request) throws Exception {
        return weChatService.weChatLogin(request);
    }




}
