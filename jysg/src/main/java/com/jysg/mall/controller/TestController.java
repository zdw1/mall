package com.jysg.mall.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;

@RestController
public class TestController {

    @RequestMapping("/test")
    public String test(){
        return "ok ok ok !!!";
    }

    @RequestMapping("/date")
    public void test2(){
        SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
        System.out.println("==1111=");
        System.out.println(FORMAT.format(System.currentTimeMillis()));
        String date = FORMAT.format(System.currentTimeMillis());
        String time = date.replaceAll("-", "").replaceAll(" ","").replaceAll(":","");

        System.out.println(time);
    }
}
