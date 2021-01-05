import * as ZDW from '../../../utils/global'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: !0,
    address: {},
    addressId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111111111111)
    console.log(options)
    this.setData({
      addressId: options.id
    })
    this.getAddressList()
  },
  // 查询所有的地址信息
  getAddressList: function(){
    ZDW.sendAjax({
      url: '/user/getUserAddressList?openid=' + wx.getStorageSync('openid'),
      data: {},
      success: (res) => {
        console.log(res)
        var items = res
        items.forEach(n => {
          // n.checked = n.id === this.data.addressId
          if(n.id == this.data.addressId){
            n.checked = true
          }
        })
        this.setData({
          address: {
            items: res,
            total: res.length
          }
        })
      }
    })
  },
  // 选择地址
  radioChange: function(e){
    console.log(e.detail.value)
    wx.redirectTo({
      url: '/pages/order/confirm/confirm?id=' + e.detail.value,
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