package com.jysg.mall.utils;

import com.sun.org.apache.bcel.internal.generic.NEW;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.IntervalTask;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.util.Date;

@Component
public class RequestUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(RequestUtils.class);

    @Autowired
    @Qualifier(value = "restTemplate")
    private RestTemplate restTemplate;

    /**
     * 发送get请求
     * @param url  请求url
     * @param t    请求参数，map或sting
     * @param type 请求头ContentType类型
     * @param <T>
     * @return
     */
    public <T> String exchangeGet(String url, T t, MediaType type){
        LOGGER.info("=========请求开始=========");
        LOGGER.info("请求url：" + url);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(type);
        HttpEntity<T> httpEntity = new HttpEntity<T>(t, headers);

        //调用exchange方法
        long startTime = new Date().getTime();
        LOGGER.info("=========请求开始时间startTime:{}=========", startTime);
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, httpEntity, String.class);
        long endTime = new Date().getTime();
        long timeInterval = endTime - startTime;
        LOGGER.info("=========请求结束时间endTime:{}，时间差timeInterval:{}=========", endTime, timeInterval);
        String result = null;
        if (responseEntity != null && responseEntity.getStatusCode() == HttpStatus.OK){
            try {
                result = new String(responseEntity.getBody().getBytes("ISO-8859-1"), "utf-8");
            } catch (UnsupportedEncodingException e) {
                LOGGER.info("======请求结束======");
                e.printStackTrace();
            }
        }
        return result;
    }
}
