const App = getApp()
import * as ZDW from '../../../utils/global'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logged: false
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        logged: true
      })
      setTimeout( () => {
        // 进入底部菜单（主页，分类，购物车，我的）不能用wx.navigateTo()，要用wx.switchTab()
        wx.switchTab({
          url: '/pages/index/index/index',
        })
      }, 1000)  
    }else{
      this.setData({
        logged: false
      })
    }
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
  /*微信授权获取userInfo */
  getUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      // console.log('授权通过')
      App.globalData.userInfo = e.detail.userInfo
      wx.setStorageSync('userInfo', e.detail.userInfo)
      // 进入底部菜单（主页，分类，购物车，我的）不能用wx.navigateTo()，要用wx.switchTab()
      wx.switchTab({
        url: '/pages/index/index/index',
      })
    }
  }

})