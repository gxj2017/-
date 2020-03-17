// pages/impower/impower.js
var app = getApp();
var api = require('../../utils/api.js');
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lang: "zh_CN"
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  onAuth() {
    var that = this
    wx.getSetting({
      success: (res) => {
        wx.getUserInfo({
          success: function(res) {
            console.log(res.userInfo)
            // console.log(app.globalData.code)
            app.globalData.userInfo = res.userInfo
            // var username
            const data = {
              code: app.globalData.code,
              username: app.globalData.userInfo.nickName,
              gender: app.globalData.userInfo.gender,
              avatar: app.globalData.userInfo.avatarUrl,
            };
            console.log(that.data.fid)
            if (that.data.skipdetail == 1 ){
              Object.assign(data,{
                refree: that.data.fid
              })
            }

            api.login({
              data, 
              header: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              method: 'post',
              success: (res) => {
                console.log(res)
                var token = res.data.data.token
                console.log(token)
                app.globalData.token = token
                app.globalData.is_fenxiaoshang = res.data.data.is_fenxiaoshang
                // 登录成功后设置默认语言为中文
                wx.setStorageSync("language", 1)
                // 登陆成功后判断是否调到详情页
                if (that.data.skipdetail==1) {
                  console.log(app.globalData.goodsid)
                  wx.reLaunch({
                    url: '/pages/spellParticulars/spellParticulars?goodsid=' + app.globalData.goodsid + '&token=' + token + '&type=' + 1 + "&fenxiao=" + true,
                  })
                } else {
                  wx.reLaunch({
                    url: '../index/index',
                  })
                }
              },
            })
          }
        })
        
        if (res.authSetting['scope.userInfo']) {
          if (that.data.skipdetail==1) {
            console.log(app.globalData.goodsid)
            wx.reLaunch({
              url: '/pages/spellParticulars/spellParticulars?goodsid=' + app.globalData.goodsid + '&token=' + token + '&type=' + 1 + "&fenxiao=" + true,
            })
          }else{
            wx.reLaunch({
              url: '../index/index',
            })
          }
        }
      }
    })
  },
  onShow: function() {
    this.onLoad();
  },
  onLoad: function (options) {
    var that = this
    app.globalData.goodsid = options.goodsid
    that.setData({
      goodsid: options.goodsid,
      fid: options.fid
    })
    console.log(options, app.globalData.fid)
    if (options.skipdetail != undefined ) {
      that.setData({
        skipdetail: parseInt(options.skipdetail)
      })
    }else{
      that.setData({
        skipdetail: 0
      })
    }
  }
})