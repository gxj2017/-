// pages/rankingList/rankingList.js
var app = getApp()
var api = require("../../utils/api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: null,
    myStatus: null,
    myRank: null,
    ranking:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.getUserInfo()
    console.log(options, that.data.nickName)
    that.setData({
      goodsid: options.goodsid
    })
    that.rankingList()
  },
  rankingList() {
    var that = this
    api.onlineTaskRanking({
      data: {
        goodsid: that.data.goodsid
      },
      success: (res) => {
        that.setData({
          ranking: res.data.data
        })
      }
    })
  },
  getUserInfo() {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.setData(
          {
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          }
        )
        console.log(that.data.nickName)
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