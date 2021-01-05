package com.jysg.mall.entity.response;

import lombok.Data;

@Data
public class WeChatLoginResponse {

    private String openid;

    private String session_key;

    private String unionid;

    private String errcode;

    private String errmsg;
}
