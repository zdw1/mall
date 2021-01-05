const App = getApp()
import * as ZDW from '../../../utils/global'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: !0,
    carts: {},
    address: {
        item: {},
    },
    addressId: '',
    buyerMsg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({addressId: options.id}) // 从地址选择页面返回的id
    var confirmOrder = wx.getStorageSync('confirmOrder')
    console.log(confirmOrder)
    this.setData({
      carts: confirmOrder
    })
    // 查询用户地址信息
    if(this.data.addressId){
      // 通过地址id查询地址信息
      this.getUserAddressById(this.data.addressId)
    }else{
      // 查询默认的地址信息
      this.getUserAddressDefault(wx.getStorageSync('openid'))
    }
  },
  // 通过地址id查询地址信息
  getUserAddressById: function(id){
    ZDW.sendAjax({
      url: '/user/getUserAddressById?id=' + id,
      data: {},
      success: (res) => {
        if(res){
          this.setData({
            address: {
              item: res
            }
          })
        }else{
          this.showTip()
        }
      }
    })
  },
  // 查询默认的地址信息
  getUserAddressDefault: function(openid){
    ZDW.sendAjax({
      url: '/user/getUserAddressDefault?openid=' + openid + '&status=0' ,
      data: {},
      success: (res) => {
        if(res){
          this.setData({
            address: {
              item: res
            }
          })
        }else{
          // 没有收货地址信息
         this.showTip()
        }
      }
    })
  },
  // 没有收货信息提示
  showTip: function(){
    wx.showModal({
      title: '友情提示', 
      content: '没有收货地址，请先设置', 
      success: (res) => {
        if(res.confirm){
          wx.redirectTo({
            url: '/pages/user/address/add/add',
          })
        }else if(res.cancel){
          wx.navigateBack()
        }
      }
    })
  },
  // 跳转都地址选选择页面
  redirectTo: function(e){
    wx.navigateTo({
      url: '/pages/order/address/address?id=' + e.target.dataset.item.id,
    })
  },
  // 留言
  inputMsg: function(e){
    var msg = e.detail.value
    this.data.buyerMsg = msg
  },
  // 提交订单
  addOrder: function(){
    console.log(this.data.carts)
    var items = this.data.carts.items
    console.log(items)
    var OrderItems = []
    items.forEach(n => {
      var OrderItem = {}
      OrderItem.cartid = n.cart.cartid
      OrderItem.goodsId = n.cart.goodsId
      OrderItem.goodsName = n.cart.goodsName
      OrderItem.goodsImage = n.cart.image
      OrderItem.num = n.cart.num
      OrderItem.price = n.cart.price
      OrderItem.totalFee = n.cart.num * n.cart.price
      OrderItems.push(OrderItem)
    })
    var sendMsg = {
      openid: items[0].cart.openid,
      payment: this.data.carts.totalAmount,
      status: '1', //状态：1-未付款，2-已付款，3-未发货，4-已发货，5-交易成功，6-交易关闭
      buyerName: this.data.address.item.name,
      buyerPhone: this.data.address.item.phone,
      buyerAddress: this.data.address.item.address,
      buyerMsg: this.data.buyerMsg,
      items: OrderItems
    }
    console.log(sendMsg)
    ZDW.sendAjax({
      url: '/order/addOrder',
      data: sendMsg ,
      success: (res) => {
        console.log(res)
        // wx.showToast({
        //   title: '提交成功',
        // })
        wx.redirectTo({
          url: '/pages/order/detail/detail?orderid=' + res
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