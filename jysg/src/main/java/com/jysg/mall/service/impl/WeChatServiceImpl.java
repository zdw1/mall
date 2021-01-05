package com.jysg.mall.service.impl;

import com.alibaba.fastjson.JSON;
import com.jysg.mall.dao.UserDao;
import com.jysg.mall.entity.UserEntity;
import com.jysg.mall.entity.request.WeChatLoginRequest;
import com.jysg.mall.entity.response.WeChatLoginResponse;
import com.jysg.mall.service.WeChatService;
import com.jysg.mall.utils.RequestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class WeChatServiceImpl implements WeChatService {

    private Logger logger = LoggerFactory.getLogger(WeChatServiceImpl.class);

    @Value("${wx.app.appid}")
    private String appid;

    @Value("${wx.app.secret}")
    private String secret;

    @Value("${wx.app.login.url}")
    private String loginUrl;

    @Autowired
    private RequestUtils requestUtils;

    @Autowired
    private UserDao userDao;

    @Override
    public UserEntity weChatLogin(WeChatLoginRequest request) throws Exception {
        logger.info("=====weChatLogin=====>>>>>开始");
        // 请求url
        String url = loginUrl.replace("APPID", appid)
                .replace("SECRET", secret)
                .replace("JSCODE", request.getCode());

        //请求头类型
        MediaType mediaType = MediaType.parseMediaType(MediaType.APPLICATION_PROBLEM_JSON_UTF8_VALUE);
        //请求微信服务
        String sessionData = requestUtils.exchangeGet(url,null, mediaType);
        if(StringUtils.isEmpty(sessionData)){
            logger.error("用户登录小程序失败：请求微信服务器登录失败！");
            return null;
        } else {
            WeChatLoginResponse response = JSON.parseObject(sessionData, WeChatLoginResponse.class);
            String openid = response.getOpenid();
            String unionid = response.getUnionid();
            String session_key = response.getSession_key();
            logger.info("小程序登录openid：{}，unionid：{}，session_key：{}", openid, unionid, session_key);
            if (StringUtils.isEmpty(openid) || StringUtils.isEmpty(session_key)){
                logger.error("用户登录小程序失败，用户openid或session_key为空");
                return null;
            }else {
                // 存表 m_user
                // 先用openid查询用户信息是否在
                UserEntity userEntity= userDao.getUserEntityByOpenid(openid);
                UserEntity user = new UserEntity();
                user.setOpenid(openid);
                user.setUnionid(unionid);
                user.setSession_key(session_key);
                if (userEntity != null) {
                    // 更新用户信息
                    logger.info("=====更新用户信息开始=====openid:{}", openid);
                    userDao.updateUser(user);
                    logger.info("=====更新用户信息结束=====");
                } else {
                    // 新建用户信息
                    logger.info("=====新建用户信息开始=====openid：{}", openid);
                    userDao.insertUser(user);
                    logger.info("=====新建用户信息结束=====");
                }
                logger.info("=====weChatLogin=====>>>>>结束");
                return user;
            }
        }
    }

}
