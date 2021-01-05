const App = getApp()
import * as ZDW from '../../../../utils/global'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: !0,
    form: {
			name   : '', 
			gender : 'male', 
			tel    : '', 
			address: '', 
			is_def : !1, 
    },
    radio: [
      {
        name: '先生', 
        value: 'male', 
        checked: !0, 
      },
      {
        name: '女士', 
        value: 'female', 
      },
    ]

  },
  // 提交确定
  submitForm: function(e){
    console.log(e.detail.value)
    var param = e.detail.value
    var status = '1'
    if(param.is_def){
      // 设为默认
      status = '0' // 0-默认，1-其他
    }
    // 新增用户地址信息
    ZDW.sendAjax({
      url: '/user/insertUserAddress',
      data: {
        openid: wx.getStorageSync('openid'),
        name: param.name,
        phone: param.tel,
        address: param.address,
        status: status
      },
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '新增成功'
        })
        // 返回到list页面
        wx.navigateBack({
          complete: (res) => {
            console.log(res)
          },
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.chooseAddress({
    //   complete: (res) => {
    //     console.log(res)
    //   },
    // })
    
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