import * as ZDW from '../../../../utils/global'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: !0,
    form: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var item = wx.getStorageSync('addressItemEdit')
    console.log(options)
    console.log(item)
    // var id = options.id
    this.setData({
      form: item
    })
  },
  // 修改提交确认
  submitForm: function(e){
    var item = e.detail.value
    var status = '1'
    console.log(item)
    if(item.status){
      status = '0'
    }
    var sendData = {
      id: this.data.form.id,
      name: item.name,
      phone: item.phone,
      address: item.address,
      status: status
    }
    console.log(sendData)
    ZDW.sendAjax({
      url: '/user/updateUserAddress',
      data: sendData,
      success: (res) => {
        console.log(res)
        wx.navigateBack()
      }
    })
  },
  // 删除
  delete: function(){
    ZDW.sendAjax({
      url: '/user/deleteUserAddressById?id=' + this.data.form.id,
      data: {},
      success: (res) => {
        wx.navigateBack()
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