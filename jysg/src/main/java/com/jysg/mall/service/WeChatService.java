package com.jysg.mall.service;

import com.jysg.mall.entity.UserEntity;
import com.jysg.mall.entity.request.WeChatLoginRequest;

public interface WeChatService {

    /**
     * 小程序登录
     * @param weChatLoginRequest
     * @return
     * @throws Exception
     */
    public UserEntity weChatLogin(WeChatLoginRequest weChatLoginRequest) throws Exception;


}
