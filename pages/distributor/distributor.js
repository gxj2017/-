// pages/distributor/distributor.js
var app = getApp()
var api = require("../../utils/api.js")
var utils = require("../../utils/util.js")
var languageData = require("../../utils/language.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['一级分销', '二级分销'],
    currentTab: 0,
    imgurl: app.globalData.imgurl,
    page: 1,
    fenXiaoList: []
  },
  navbarTap: function (e) {
    console.log(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      page: 1,
      fenXiaoList: []
    })
    console.log(this.data.currentTab)
    if(this.data.currentTab==0) {
      this.oneFenList()
    }else if(this.data.currentTab==1) {
      this.twoFenList()
    }
  },
  oneFenList(){
    var data = {
      token: app.globalData.token,
      page: this.data.page
    }
    api.oneFenList({
      data,
      success: (res) => {
        console.log(res)
        var list = res.data.data
        if(list.length) {
          list.forEach((item,index) => {
            var newtime = utils.formatTimeTwo(item.addtime,"Y年M月D日 h:m")
            Object.assign(item, {"addtime":newtime})
          })
        }
        this.setData({
          fenXiaoList: this.data.fenXiaoList.concat(list)
        })
      }
    })
  },
  twoFenList() {
    var data = {
      token: app.globalData.token,
      page: this.data.page
    }
    api.twoFenList({
      data,
      success: (res) => {
        var list = res.data.data
        if (list.length) {
          list.forEach((item, index) => {
            var newtime = utils.formatTimeTwo(item.addtime, "Y年M月D日 m:s")
            Object.assign(item, { "addtime": newtime })
          })
        }
        this.setData({
          fenXiaoList: this.data.fenXiaoList.concat(list)
        })
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
        navbar: languageData.Chinese.navbar_fenxiao
      })
    } else if (language == 2) {
      this.setData({
        navbar: languageData.Italian.navbar_fenxiao
      })
    } else if (language == 3) {
      this.setData({
        navbar: languageData.English.navbar_fenxiao
      })
    }
    if(!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    }else{
      that.oneFenList()
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
    if(this.data.currentTab==0) {
      this.oneFenList()
    }else if(this.data.currentTab==1) {
      this.twoFenList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})