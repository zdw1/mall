var app = getApp()
import * as ZDW from '../../../utils/global'
import { ENV } from "../../../config/config"
Page({
  data: {
    // 顶部菜单切换
    navbar: ['全部', '待付款', "待发货", "待收货", "已完成"],
    // 默认选中菜单
    currentTab: 0,
    index: 0,
    pick_name: "",
    path: ENV.imageBasePath,
    list: []
  },
 
  // 初始化加载
  onLoad: function() {
    // 查询订单信息
    this.getOrderList(this.data.currentTab)
  },
  // 查询订单信息
  getOrderList: function(currentTab){
    console.log(currentTab)
    var status = ''
    switch(currentTab){
      case 0:
        status = ''
        break
      case 1:
        status = '1'
        break
      case 2:
        status = '2'
        break
      case 3:
        status = '3'
        break
      case 4:
        status = '5'
        break
      default:
        status = ''
    }
    ZDW.sendAjax({
      url: '/order/getOrderList?openid=' + wx.getStorageSync('openid') + '&status=' + status,
      data: {},
      success: (res) => {
        console.log(res)
        this.setData({
          list: res
        })
      }
    })
  },
  //顶部tab切换
  navbarTap: function(e) {
    console.log(e.currentTarget.dataset.idx)
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    this.getOrderList(this.data.currentTab)
  },
  // 取消订单
  cancel: function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index
    this.data.list[index]
    ZDW.sendAjax({
      url: '/order/deleteOrder?orderid=' + this.data.list[index].orderid,
      data: {},
      success: (res) => {
        wx.showToast({
          title: '取消成功'
        })
        this.getOrderList(this.data.currentTab)
      }
    })
  },
  // 确认收货
  comfirm: function(e){
    console.log(e)
    var index = e.currentTarget.dataset.index
    ZDW.sendAjax({
      url: '/order/confirmOrder?orderid=' + this.data.list[index].orderid,
      data: {},
      success: (res) => {
        wx.showToast({
          title: '确认成功'
        })
        this.getOrderList(this.data.currentTab)
      }
    })
  },
  // 再来一单
  buyAgain: function(e){
    var index = e.currentTarget.dataset.index
    ZDW.sendAjax({
      url: '/order/buyAgain?orderid=' + this.data.list[index].orderid,
      data: {},
      success: (res) => {
        wx.showToast({
          title: '再来一单成功'
        })
        this.getOrderList(this.data.currentTab)
      }
    })
  }

 
})