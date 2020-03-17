// pages/task/task.js
var app = getApp()
var api = require("../../utils/api.js")
var languageData = require("../../utils/language.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    onlinTaskList:[],
    taskpage: {
      tocomplete: "去完成",
      ranking: "排行榜",
      title_bg: "完成任务得佣金",
      picktask: "快来领取你的任务吧！",
      task_specification: "任务说明",
      task_content: "这是任务说明文字介绍，请仔细阅读。"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    console.log(language)
    if (language == 1) {
      this.setData({
        taskpage: languageData.Chinese.taskpage
      })
    } else if (language == 2) {
      this.setData({
        taskpage: languageData.Italian.taskpage
      })
    } else if (language == 3) {
      this.setData({
        taskpage: languageData.English.taskpage
      })
    }

    if(!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    }else{
      that.getOnlinTaskList()
    }
  },
  getOnlinTaskList() {
    api.getOnlinTaskList({
      data: {
        token: app.globalData.token
      },
      success: (res) => {
        console.log(res)
        this.setData({
          onlinTaskList: res.data.data
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