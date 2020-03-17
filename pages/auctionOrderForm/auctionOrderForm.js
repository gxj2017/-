// pages/auctionOrderForm/auctionOrderForm.js
var app = getApp()
var api = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    morengdizhi: "",
    inputprice: 0.00,
    goodsDetail: {}
  },
  getAddress() {
    api.is_deaddress({
      data: {
        token: app.globalData.token
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          console.log(res.data.data)
          this.setData({
            morengdizhi: res.data.data
          })
        }
      },
    })
  },
  inputPrice(e) {
    let that = this
    console.log(e)
    let value = e.detail.value
    that.setData({
      inputprice: value
    })
    console.log(that.data.inputprice)
  },
  paimaiPay() {
    var that = this
    var data = {
      token: app.globalData.token,
      goodsid: that.data.goodsDetail.g_id
    }
    api.paimaiPay({
      data,
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        var Payment = res.data
        wx.requestPayment({
          timeStamp: Payment.timeStamp,
          nonceStr: Payment.nonceStr,
          package: Payment.package,
          signType: 'MD5',
          paySign: Payment.paySign,
          success(res) {
            wx.showModal({
              title: '支付成功',
              content: "您已成功参与该商品的竞拍",
            })
          },
          fail(err) {
            wx.showModal({
              title: '提示',
              content: err.data.msg,
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options)
    that.getAddress()
    that.setData({
      inputprice: options.paimaimoney
    })
    // 获取商品数据
    var goodsDetail = wx.getStorageSync("goodsDetail")
    that.setData({
      goodsDetail: goodsDetail
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})