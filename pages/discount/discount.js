var app = getApp();
var api = require('../../utils/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    page: 1,
    commodity: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    that.getZheKouList()
  },
  getZheKouList() {
    var that = this
    api.zhekouList({
      data: {
        page: that.data.page
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            commodity: that.data.commodity.concat(res.data.data)
          })
        } else {
          console.log(res.data.msg)
        }
      },
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
    this.setData({
      page: this.data.page + 1
    })
    console.log(this.data.page)
    this.getZheKouList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})