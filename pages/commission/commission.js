// pages/commission/commission.js

var app = getApp()
var api = require("../../utils/api.js")
var utils = require("../../utils/util.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectDate: utils.formatTimeTwo(Date.parse(new Date())/1000, "Y-M"),
    startDate: new Date(),
    endDate: '2100-09-01',
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['全年'],//下拉列表的数据
    index: 0,//选择的下拉列表下标
    page: 1,
    yongJinLog: null,
    income: 0
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      selectDate: e.detail.value
    })
    this.getYonngJinLog()
  },
  getYonngJinLog() {
    api.yongJinLog({
      data: {
        token: app.globalData.token,
        page: this.data.page,
        keywords: this.data.selectDate
      },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          yongJinLog: res.data.data.list,
          income: res.data.data.income
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取佣金日志
    that.getYonngJinLog()
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