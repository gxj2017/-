// pages/group/group.js
var app = getApp()
var api = require("../../utils/api.js")
var languageData = require("../../utils/language.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    page: 1,
    type: 1,
    navbar: ['我发起的团', '我参与的团'],
    currentTab: 0,
    teambar: ["全部", "待成团","已成团"],
    currentsFilter:0,
    teamList:[],
    team:[],
    grouppage: {
      lookdetail: "查看详情",
      groupnum: "人团",
      cha: "还差",
      chengtuan: "单成团"
    }
  },
  navbarTap: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      type: e.currentTarget.dataset.idx + 1,
      page: 1,
      teamList: []
    })
    this.myGroup()
  },
  teambarTap:function(e){
    this.setData({
      currentsFilter: e.currentTarget.dataset.idx,
      page: 1,
      teamList: []
    })
    this.myGroup()
  },
  groupDetails(e) {
    console.log(e)
    // var goodsitem = JSON.stringify(e.currentTarget.dataset.goodsitem)
    wx.setStorageSync("goodsDetail", e.currentTarget.dataset.goodsitem)
    wx.navigateTo({
      url: '/pages/groupDetails/groupDetails'
    })
  },
  myGroup() {
    var data = {
      token: app.globalData.token,
      page: this.data.page,
      type: this.data.type,
    }
    if ((this.data.currentsFilter != undefined || this.data.currentsFilter != null) && this.data.currentsFilter != 0) {
      Object.assign(data, { "status": this.data.currentsFilter - 1})
    }
    api.myGroup({
      data,
      success: (res) => {
        this.setData({
          teamList: this.data.teamList.concat(res.data.data)
        })
        console.log(this.data.teamList)
      }
    })
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
        navbar: languageData.Chinese.navbar,
        teambar: languageData.Chinese.teambar,
        grouppage: languageData.Chinese.grouppage
      })
    } else if (language == 2) {
      this.setData({
        navbar: languageData.Italian.navbar,
        teambar: languageData.Italian.teambar,
        grouppage: languageData.Italian.grouppage
      })
    } else if (language == 3) {
      this.setData({
        navbar: languageData.English.navbar,
        teambar: languageData.English.teambar,
        grouppage: languageData.English.grouppage
      })
    }
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    } else {
      that.myGroup()
    }
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
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    console.log(language)
    if (language == 1) {
      this.setData({
        navbar: languageData.Chinese.navbar,
        teambar: languageData.Chinese.teambar
      })
    } else if (language == 2) {
      this.setData({
        navbar: languageData.Italian.navbar,
        teambar: languageData.Italian.teambar
      })
    } else if (language == 3) {
      this.setData({
        navbar: languageData.English.navbar,
        teambar: languageData.English.teambar
      })
    }
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
    this.setData({
      page: this.data.page + 1
    })
    console.log(this.data.page)
    this.myGroup()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})