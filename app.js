//app.js
var api = require('./utils/api.js');
App({
  onLaunch: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function(res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function() {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function(res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function() {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 登录
    var that = this;
    wx.login({
      //获取code
      success: function(res) {
        that.globalData.code = res.code
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              const data = {
                code: that.globalData.code,
                username: res.userInfo.nickName,
                avatar: res.userInfo.avatarUrl,
                gender: res.userInfo.gender
              };
              api.login({
                method: 'POST',
                header: {
                  Accept: 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                data,
                success: (res) => {
                  console.log(res)
                  var token = res.data.data.token
                  var fenxiaoshang = res.data.data.is_fenxiaoshang
                  var user_id = res.data.data.user_id
                  var money = res.data.data.money
                  var score = res.data.data.score
                  that.globalData.token = token
                  that.globalData.is_fenxiaoshang = fenxiaoshang
                  that.globalData.user_id = user_id
                  that.globalData.money = money
                  that.globalData.score = score
                },
              })
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // tabbar语言设置
    var language = wx.getStorageSync("language")
    console.log(language)
    if (language == 1) {
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
  },
  globalData: {
    imgurl: 'https://wine.gengyouplay.cn',
    userInfo: '',
    is_fenxiaoshang: 0,
    openid: '',
    avatarUrl: '',
    nickName: '',
    province: '',
    country: '',
    city: '',
    gender: '',
  },


})