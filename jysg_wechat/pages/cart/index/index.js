import * as ZDW from "../../../utils/global"
import { ENV } from "../../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: ENV.imageBasePath,
    canEdit: !1,
    carts: {
        items: []
    },
    total: 0,
    selectAllFlag: false,
    prompt: {
        hidden: !0,
        icon: '../../../assets/images/iconfont-cart-empty.png',
        title: '购物车空空如也',
        text: '来挑几件好货吧',
        buttons: [
            {
                text: '随便逛',
                bindtap: 'goToIndex',
                type: 'primary'
            },
        ],
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 购物车没有商品，点击随便逛逛，跳转到主页
  goToIndex: function(e){
    console.log(e)
    wx.switchTab({
      url: '/pages/index/index/index',
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
    // 获取用户信息
    var openid = wx.getStorageSync('openid')
    if(openid){
      this.getCarts(openid)
    }else{
      wx.navigateTo({
        url: '/pages/index/login/login'
      })
    }
  },
  // 获取购物车信息
  getCarts: function(openid){
    ZDW.sendAjax({
      url: '/cart/getCartListByOpenid?openid=' + openid,
      data:{},
      method: 'POST',
      success: (res) => {
        // console.log(res)
        res.forEach(n => {
          n.select = false //将是否选中加入到购物车信息中
        });
        console.log(res)
        this.setData({
          carts:{
            items: res
          },
          'prompt.hidden': res.length
        })
      }
    })
  },
  // 点击编辑
  onTapEdit: function(e){
    this.setData({
      canEdit: !!e.currentTarget.dataset.value
    })
  },
  // 点击 + 按钮
  increase: function(e){
    console.log(e.currentTarget.dataset)
    var index = e.currentTarget.dataset.id // 购物车商品数组下标
    var num = e.currentTarget.dataset.num //加入购物车数量
    var items = this.data.carts.items
    var totalNum = items[index].goods.num //商品总数
    if(num == totalNum){
      return 
    }
    num = num + 1
    items[index].cart.num = num

    // 更新购物车数量
    this.updateCart(items, index, num)
  },
  // 点击 - 按钮
  decrease: function(e){
    console.log(e.currentTarget.dataset)
    var index = e.currentTarget.dataset.id // 购物车商品数组下标
    var num = e.currentTarget.dataset.num //加入购物车数量
    var items = this.data.carts.items
    if(num == 1){ //只有1个商品时不能减少
      return
    }
    num = num - 1
    items[index].cart.num = num
    // 更新购物车数量
    this.updateCart(items, index, num)
  },
  // 输入商品数量
  bindKeyInput: function(e){
    console.log(e.currentTarget.dataset)
    var index = e.currentTarget.dataset.id // 购物车商品数组下标
    // var num = e.currentTarget.dataset.num //加入购物车数量
    var num = Math.abs(e.detail.value) // 输入的数量
    var items = this.data.carts.items
    var totalNum = items[index].goods.num //商品总数
    if(num < 0 || num > totalNum){
      return
    }
    // 更新购物车数量
    this.updateCart(items, index, num)
  },
  // 更新购物车数量
  updateCart: function(items, index, num){
     // 更新购物车数量
     ZDW.sendAjax({
      url: '/cart/updateCart',
      data:{
        cartid: items[index].cart.cartid,
        num: num
      },
      method: 'POST',
      success: (res) => {
        this.setData({
          carts:{
            items: items
          }
        })
        this.sum()
      }
    })
  },
  // 选择商品
  bindCheckbox: function(e){
    // console.log(e.currentTarget.dataset)
    var index = e.currentTarget.dataset.index
    //原始icon状态
    var select = this.data.carts.items[index].select
    var items = this.data.carts.items
    // 勾选状态取反
    items[index].select = !select
    this.sum()
    // 更新修改后的数据
    this.setData({
      carts:{
        items: items
      }
    })
    // 有没有选中的商品，就去除全选状态,!select为选择之后的状态，
    // if(!!select){//选择之后的状态为false，即不勾选选中}，相当于if(select){}
    if(select){
      this.setData({
        selectAllFlag: false
      })
    }
    // 如果所有的商品都单独选中
    var flag = true
    var items = this.data.carts.items
    items.forEach(n => {
      if(!n.select ){ // 有商品没选中
        flag = false
      }
    })
    if(flag){ //都单独选中
      this.setData({
        selectAllFlag: true
      })
    }
  },
  // 全选
  bindSelectAll: function(){
    var selectAllFlag = this.data.selectAllFlag
    selectAllFlag = !selectAllFlag //取反
    var items = this.data.carts.items
    items.forEach(n => {
      n.select = selectAllFlag
    })
    this.setData({
      selectAllFlag: selectAllFlag,
      carts: {
        items: items
      }
    })
    this.sum()
  },
  // 计算总价
  sum: function(){
    var total = 0
    this.data.carts.items.forEach(n => {
      if(n.select){ //选中的商品
        total += n.cart.num * n.goods.price
      }
    })
    // console.log(total)
    this.setData({
      total: total
    })
  },
  // 点击图片，跳转到商品详情页面
  goToDetail: function(e){
    // console.log(e.currentTarget.dataset)
    var goodsId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods/detail/index?goodsId=' + goodsId
    })
  },
  // 去结算
  confirmOrder: function(){
    var confirmOrder = {
      items: [],
      totalAmount: this.data.total
    }
    this.data.carts.items.forEach(n => {
      if(n.select){
        confirmOrder.items.push(n)
      }
    })
    console.log(confirmOrder)
    wx.setStorageSync('confirmOrder', confirmOrder)
    wx.navigateTo({
      url: '/pages/order/confirm/confirm'
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