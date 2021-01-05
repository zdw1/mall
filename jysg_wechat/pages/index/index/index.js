import * as ZDW from '../../../utils/global'
import { ENV } from "../../../config/config"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: true,
    path: ENV.imageBasePath,
    images: [],
    activeIndex: 0, // 分类导航栏默认展示分类
    navParams: {
      pageSize: 3,
      start: 0
    },
    navList: [],
    goods: {},
    prompt: {
      hidden: !0
    },
    selectNav: '' // 选择的分类
  },
  swiperchange: function(e){
    // console.log(e.detail.current)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanners()
    this.getClassify()
    
  },
  // 获得banner轮播图
  getBanners: function(){
    this.setData({
      images: [
        {path: '../../../assets/images/banner/banner1.jpg'},
        {path: '../../../assets/images/banner/banner2.jpg'},
        {path: '../../../assets/images/banner/banner3.jpg'}
      ]
    })
  },
  // 搜索栏跳转
  search: function(){

  },
  // 获得商品导航栏
  getClassify: function(){
    ZDW.sendAjax({
      url: '/classify/getClassifyList',
      data: this.data.navParams,
      method: 'POST',
      success: (res) => {
        this.setData({
          navList: res
        })
        // console.log(res[0].id)
        // 获得初始商品
        // 第一列导航栏的商品分类id为：res[0].id
        this.getList(res[0].id)
      }
    })
  },
  // 点击商品导航栏
  onTapTag: function(e){
    // console.log(e.currentTarget.dataset)
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    var type = e.currentTarget.dataset.type
    this.data.selectNav = type
    this.getList(type)
  },
  // 获取商品列表
  getList: function(classifyId){
    ZDW.sendAjax({
      url: '/goods/getGoodsListByClassifyId',
      data: {
        classifyId: classifyId,
        pageSize: 10,
        start: 0
      },
      method: 'POST',
      success: (res) => {
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
  // 点击商品进入商品详情
  navigateTo: function (e) {
    // console.log(e.currentTarget.dataset)
    var goodsId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/goods/detail/index?goodsId=' + goodsId
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
    console.log("onPullDownRefresh")
    this.getList(this.data.selectNav)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})