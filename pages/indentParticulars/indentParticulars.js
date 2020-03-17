// pages/indentParticulars/indentParticulars.js
var api = require("../../utils/api.js")
var app = getApp()
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail: null,
    imgurl: app.globalData.imgurl
  },
  // 申请退款
  applicationForDrawback() {
    wx.showModal({
      title: '申请退款',
      content: '平台暂未提供自动退款，您可以主动联系商家进行退款。电话：029-888888',
      success: (res) => {
        // 调起客服
      }
    })
  },
  // 提醒发货
  noticeSend() {
    wx.showModal({
      title: '提示',
      content: '提醒商家尽快为您发货！',
      success: (res) => {
        wx.showToast({
          title: '您已成功提醒商家',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 取消订单
  cancelOrder(e) {
    var that = this
    console.log(e)
    var data = {
      token: app.globalData.token,
      orderid: that.data.orderid
    }
    api.cancelOrder({
      data,
      method: 'post',
      success: (res) => {
        wx.showToast({
          title: '取消成功',
          icon: 'none',
          duration: 1500,
          success: () => {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  // 删除订单
  delOrder(e) {
    var that = this
    console.log(e)
    var data = {
      token: app.globalData.token,
      orderid: that.data.orderid
    }
    api.delOrder({
      data,
      method: 'post',
      success: (res) => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 1500,
          success: () => {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  checkwuliu(e) {
    console.log(e)
    wx.showToast({
      title: '暂不支持物流信息查看',
      icon: "none",
      duration: 2000
    })
  },
  // 确认收货
  confirmOrder(e) {
    var that = this
    console.log(e)
    var data = {
      token: app.globalData.token,
      orderid: that.data.orderid
    }
    api.confirmOrder({
      data,
      method: 'post',
      success: (res) => {
        wx.showModal({
          title: '确认收货',
          content: '在点击确定前，请确保您已经收到商品',
          success: (res) => {
            console.log(res)
            if (res.confirm) {
              wx.showToast({
                title: '确认收货成功',
                icon: "none",
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  evaluation(e) {
    console.log(e)
    var orderitem = JSON.stringify(e.currentTarget.dataset.orderitem)
    wx.navigateTo({
      url: '/pages/goodsEvaluation/goodsEvaluation?orderitem=' + orderitem,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      orderno: options.orderno,
      is_tihuo: options.is_tihuo,
      orderid: options.orderid
    })
    that.getOrderDetail()
  },
  getOrderDetail() {
    var that = this
    var data = {
      token: app.globalData.token,
      orderno: that.data.orderno
    }
    api.orderDetail({
      data,
      method: "get",
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: res => {
        console.log(res)
        if(res.data.code==1) {
          var detail = res.data.data
          Object.assign(detail,{
            "addtime": utils.formatTimeTwo(detail.addtime, "Y年M月D日 h:m:s"),
            "completetime": utils.formatTimeTwo(detail.completetime, "Y年M月D日 h:m:s")
          })
          that.setData({
            orderDetail: detail
          })
        }
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