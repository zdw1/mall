import * as ZDW from '../../../utils/global'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: !1,
    autoplay: !1,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: !1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindload: function (){
    var userInfo = wx.getStorageSync('userInfo')
    setTimeout(userInfo ? this.goIndex : this.goLogin, 3000)
  },
  goIndex() {
    // 进入底部菜单（主页，分类，购物车，我的）不能用wx.navigateTo()，要用wx.switchTab()
    wx.switchTab({
      url: '/pages/index/index/index'
    })
  },
  goLogin() {
    ZDW.goPage('index/login')
  },

})