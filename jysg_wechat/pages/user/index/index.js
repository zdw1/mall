// pages/user/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    items: [
			{
				icon: '../../../assets/images/iconfont-order.png',
				text: '我的订单',
				path: '/pages/order/list/list'
			}, 
			{
				icon: '../../../assets/images/iconfont-addr.png',
				text: '收货地址',
				path: '/pages/user/address/list/list'
			}, 
			{
				icon: '../../../assets/images/iconfont-kefu.png',
				text: '联系客服',
				path: '18521708248',
			}, 
			{
				icon: '../../../assets/images/iconfont-help.png',
				text: '常见问题',
				path: '/pages/user/help/list/list',
			},
		],
		settings: [
			{
				icon: '../../../assets/images/iconfont-clear.png',
				text: '清除缓存',
				path: '0.0KB'
			}, 
			{
				icon: '../../../assets/images/iconfont-about.png',
				text: '关于我们',
				path: '/pages/user/about/index/index'
			}, 
		]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    this.getStorageInfo() // 获得缓存信息
  },
  getUserInfo: function(){
    var userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.setData({
        userInfo: userInfo
      })
    }else{
      wx.getUserInfo({
        complete: (res) => {
          this.setData({
            userInfo: res.userInfo
          })
        },
      })
    }
  },
  // 获得缓存信息
  getStorageInfo: function(){
    wx.getStorageInfo({
      complete: (res) => {
        this.setData({
          'settings[0].path': `${res.currentSize}KB`
        })
      }
    })
  },
  bindtap: function(e){
    var index = e.currentTarget.dataset.index
    var path = e.currentTarget.dataset.path

    switch(index){
      case 0:
        wx.showModal({
          title: '友情提示', 
          content: '确定要清除缓存吗？',
          success (res) {
            if (res.confirm) {
              wx.clearStorage({
                complete: (res) => {
                  console.log(res)
                  this.setData({
                    'settings[0].path': `1KB`
                  })
                },
              })
            }
          }
        })
      default:
        wx.navigateTo({
          url: path,
        })
    }
  },
  // 跳转到对应的模块
  navigateTo: function(e){
    var index = e.currentTarget.dataset.index
    var path = e.currentTarget.dataset.path
    switch(index){
      case 2: 
        // 打电话
        wx.makePhoneCall({
          phoneNumber: path
        })
        break
      default: 
        wx.navigateTo({
          url: path
        })
    }
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