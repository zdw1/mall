const App = getApp()
import * as ZDW from '../../../../utils/global'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    prompt: {
        hidden: !0,
        icon: '../../../../assets/images/iconfont-addr-empty.png',
        title: '还没有收货地址呢',
        text: '暂时没有相关数据',
    },

  },
  // 新增地址
  toAddressAdd: function(){
    wx.navigateTo({
      url: '/pages/user/address/add/add',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onload")
    

  },
  // 查询用户地址信息
  getUserAddress: function(){
    ZDW.sendAjax({
      url: '/user/getUserAddressList?openid=' + wx.getStorageSync('openid'),
      data: {},
      success: (res) => {
        console.log(res)
        var address = {}
        address.items = res
        address.total = res.length
        this.setData({
          address: address
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
    console.log("onshow")
    // 查询用户地址信息
    this.getUserAddress()
  },
  // 点击设为默认
  setDefalutAddress: function(e){
    console.log(e.currentTarget.dataset)
    var index = e.currentTarget.dataset.index //选中的地址
    var items = this.data.address.items
    ZDW.sendAjax({
      url: '/user/updateUserAddress',
      data: {
        id: items[index].id,
        status: '0'
      },
      success: (res) => {
        // 设置选中的为默认，默认的为不默认
        items[index].status = '0'
        items.forEach(n => {
          if(n.id === items[index].id){
            return
          }
          if(n.status === '0'){
            n.status = '1'
            ZDW.sendAjax({
              url: '/user/updateUserAddress',
              data: {
                id: n.id,
                status: '1'
              },
              success: (res) => {
              }
            })
          }
        })
        this.setData({
          address: {
            items: items,
            total: items.length
          }
        })
        wx.showToast({
          title: '设置成功'
        })
      }
    })
  },
  // 点击编辑按钮
  toAddressEdit: function(e){
    var index = e.currentTarget.dataset.index //选中的地址
    wx.setStorageSync('addressItemEdit', this.data.address.items[index])
    wx.navigateTo({
      url: '/pages/user/address/edit/edit?id=' + this.data.address.items[index].id
    })
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