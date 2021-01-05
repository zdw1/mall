import * as ZDW from "../../../utils/global"
import { ENV } from "../../../config/config"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: !0,
    vertical: !1,
    autoplay: !1,
    interval: 3000,
    duration: 1000,
    current: 0,
    goodsitem: {},
    goodsId: '',
    path: ENV.imageBasePath
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(ENV.imageBasePath)
    // console.log(options)
    this.data.goodsId = options.goodsId
    // 获取商品详细信息
    this.getGoodsInfo(options.goodsId)
  },
  // 获取商品详细信息
  getGoodsInfo: function(goodsId){
    ZDW.sendAjax({
      url: '/goods/getGoodsById?goodsId=' + goodsId,
      success: (res) => {
        console.log(res)
        this.setData({
          goodsitem: res
        })
      }
    })
  },
  // 滑动图片事件
  swiperchange(e) {
    this.setData({
        current: e.detail.current, 
    })
  },
  // 点击加入购物车
  addCart: function(){
    var cartInfo = {
      openid: wx.getStorageSync('openid'),
      goodsId: this.data.goodsId,
      goodsName: this.data.goodsitem.name,
      num: 1,
      price: this.data.goodsitem.price,
      image: this.data.goodsitem.image,
      status: '0' //购物车商品状态 0-只加入购物车，1-已提交订单，2-购买成功，3-删除了购物车失效
    }
    ZDW.sendAjax({
      url: '/cart/insertCart',
      data: cartInfo,
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '加入购物车成功',
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})