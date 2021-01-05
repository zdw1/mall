import * as ZDW from '../../../utils/global'
import { ENV } from "../../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: ENV.imageBasePath,
    activeIndex: 0, 
    goods: {},
    classify: {},
    prompt: {
        hidden: !0,
    },
    navParams: {
      pageSize: 10,
      start: 0
    },
    selectNav:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取分类
    this.getClassifyList()
    

  },
  // 获取全部分类
  getClassifyList: function(){
    ZDW.sendAjax({
      url: '/classify/getClassifyList',
      data: this.data.navParams,
      method: 'POST',
      success: (res) => {
        console.log(3333333333)
        console.log(res)
        this.setData({
          'classify.items': res,
          deviceHeight: 500
        })

        // 获取商品
        this.getGoodsList(res[0].id)
      }
    })
  },
  // 点击商品类别事件
  changeTab: function(e){
    console.log(e.currentTarget.dataset)
    this.data.selectNav = e.currentTarget.dataset.id
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    this.getGoodsList(e.currentTarget.dataset.id)
  },
  // 获取对应分类的商品
  getGoodsList: function(classifyId){
    ZDW.sendAjax({
      url: '/goods/getGoodsListByClassifyId',
      data: {
        classifyId: classifyId,
        pageSize: 10,
        start: 0
      },
      method: 'POST',
      success: (res) => {
        console.log(22222222)
        console.log(res)
        this.setData({
          goods:{
            length: res.length,
            items: res
          },
          'prompt.hidden': res.length
        })
      
      }
    })
  },
  // 点击商品跳转到详情页
  navigateTo: function(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/goods/detail/index?goodsId=' + e.currentTarget.dataset.id
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