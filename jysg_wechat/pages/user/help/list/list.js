import * as ZDW from '../../../../utils/global'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    helps: [],
    prompt: {
        hidden: !0,
        icon: '../../../../assets/images/iconfont-empty.png',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHelpList()
  },
  // 查询帮助表信息
  getHelpList: function(){
    ZDW.sendAjax({
      url: '/help/getHelpList',
      data: {},
      success: (res) => {
        console.log(res)
        this.setData({
          helps: res
        })
      }
    })
  },
  navigateTo: function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/user/help/detail/detail?id=' + id
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