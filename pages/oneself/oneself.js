var app = getApp();
var api = require('../../utils/api.js');
var languageData = require("../../utils/language.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',
    jifenAndYongjin: null,
    select: false,
    tihuoWay: "1",
    language: null,
    myPageData: {
      address_title: "地址管理",
      collect_title: "我的收藏",
      language_title: "语言切换",
      myorder: "我的订单",
      lookmore: "查看所有订单",
      unpay: "待付款",
      unsend: "待发货",
      sended: "已发货",
      total_commission: "累计佣金",
      balance: "账户余额"
    },
    language_country: [
      {
        chinese: "中文",
        italian: "意大利语",
        english: "英语",
      },
      {
        chinese: "Cinese",
        italian: "Italian",
        english: "Inglese",
      },
      {
        chinese: "Chinese",
        italian: "Italian",
        english: "English",
      }
    ]
  },
  balance() {
    if (!app.globalData.token){
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    }else{
      wx.navigateTo({
        url: '/pages/balance/balance',
      })
    }
  },
  commission() {
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    } else {
      wx.navigateTo({
        url: '/pages/commission/commission',
      })
    }
  },
  qiehuanyuyan(){
    this.setData({
      select: !this.data.select
    })
    console.log(this.data.language)
  },
  mySelectLanguage(e) {
    var language = parseInt(e.currentTarget.dataset.language)
    this.setData({
      language: language
    })
    wx.setStorageSync("language", this.data.language)
    console.log(language)
    // 获取语言设置
    if (language == 1) {
      this.setData({
        myPageData: languageData.Chinese.myPageData
      })
      // 设置tabbar语言
      wx.setTabBarItem({
        index: 0,
        text: '首页'
      })
      wx.setTabBarItem({
        index: 1,
        text: '我的团'
      })
      wx.setTabBarItem({
        index: 2,
        text: '我的分销'
      })
      wx.setTabBarItem({
        index: 3,
        text: '我的'
      })
      this.onLoad()
    } else if (language == 2) {
      this.setData({
        myPageData: languageData.Italian.myPageData
      })
      // 设置tabbar语言
      wx.setTabBarItem({
        index: 0,
        text: 'pagina'
      })
      wx.setTabBarItem({
        index: 1,
        text: 'squadra'
      })
      wx.setTabBarItem({
        index: 2,
        text: 'La mia distribuzione'
      })
      wx.setTabBarItem({
        index: 3,
        text: 'La mia'
      })
      this.onLoad()
    } else if (language == 3) {
      this.setData({
        myPageData: languageData.English.myPageData
      })
      // 设置tabbar语言
      wx.setTabBarItem({
        index: 0,
        text: 'Home page'
      })
      wx.setTabBarItem({
        index: 1,
        text: 'My group'
      })
      wx.setTabBarItem({
        index: 2,
        text: 'My distribution'
      })
      wx.setTabBarItem({
        index: 3,
        text: 'Mine'
      })
      this.onLoad()
    }
    this.setData({
      tihuoWay: language,
      select: false
    })
  },
  jifenAndYongjin() {
    if(!app.globalData.token){
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    }else{
      api.jifenAndYongjin({
        data: {
          token: app.globalData.token
        },
        success: (res) => {
          console.log(res.data.data)
          this.setData({
            jifenAndYongjin: res.data.data
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var language = wx.getStorageSync("language")
    console.log(language)
    if(language==null||language==undefined){
      this.setData({
        language: 1
      })
    }else{
      this.setData({
        language: language
      })
    }
    // 获取语言设置
    if (language == 1) {
      this.setData({
        myPageData: languageData.Chinese.myPageData
      })
      // 设置tabbar语言
      wx.setTabBarItem({
        index: 0,
        text: '首页'
      })
      wx.setTabBarItem({
        index: 1,
        text: '我的团'
      })
      wx.setTabBarItem({
        index: 2,
        text: '我的分销'
      })
      wx.setTabBarItem({
        index: 3,
        text: '我的'
      })
    } else if (language == 2) {
      this.setData({
        myPageData: languageData.Italian.myPageData
      })
      // 设置tabbar语言
      wx.setTabBarItem({
        index: 0,
        text: 'pagina'
      })
      wx.setTabBarItem({
        index: 1,
        text: 'squadra'
      })
      wx.setTabBarItem({
        index: 2,
        text: 'distribuzione'
      })
      wx.setTabBarItem({
        index: 3,
        text: 'La mia'
      })
    } else if (language == 3) {
      this.setData({
        myPageData: languageData.English.myPageData
      })
      // 设置tabbar语言
      wx.setTabBarItem({
        index: 0,
        text: 'Home page'
      })
      wx.setTabBarItem({
        index: 1,
        text: 'My group'
      })
      wx.setTabBarItem({
        index: 2,
        text: 'My distribution'
      })
      wx.setTabBarItem({
        index: 3,
        text: 'Mine'
      })
    }
    // 获取积分和佣金总数
    that.jifenAndYongjin()
    var _this = this;
    wx.getUserInfo({
      success: function (res) {
        // var avatarUrl = res.userInfo.avatarUrl;

        console.log(res)
        // this.setData({
        //   [avatarUrl]: res.userInfo.avatarUrl,
        //   [nickName]: res.userInfo.nickName,
        // })
        _this.setData(
          {
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          }
        )
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
    // 获取语言设置
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    if (language == 1) {
      this.setData({
        myPageData: languageData.Chinese.myPageData
      })
    } else if (language == 2) {
      this.setData({
        myPageData: languageData.Italian.myPageData
      })
    } else if (language == 3) {
      this.setData({
        myPageData: languageData.English.myPageData
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})