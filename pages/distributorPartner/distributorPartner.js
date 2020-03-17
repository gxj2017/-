var app = getApp();
var api = require('../../utils/api.js');
var languageData = require("../../utils/language.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distributorId: app.globalData.is_fenxiaoshang,
    fenxiaoMoney: null,
    commodity: [],
    navbar: [],
    goodspage: 1,
    currentTab: 1
  },
  fenxiaoPepole() {
    api.fenxiaoPepole({
      data: {
        token: app.globalData.token
      },
      method: "post",
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        this.setData({
          distributorId: 1
        })
      }
    })
  },
  agreeBtn:function(){
    var that = this
    wx.showModal({
      title: '确定是否成为分销商',
      confirmColor:'#D93652',
      success(res) {
        console.log(res)
        if (res.confirm) {
          api.upFenxiao({
            data: {
              token: app.globalData.token
            },
            method:"post",
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
                  console.log(res)
                  that.fenxiaoPepole()
                  // app.globalData.is_fenxiaoshang = 1
                  // that.setData({
                  //   distributorId: app.globalData.is_fenxiaoshang,           
                  // })
                },
                fail(err) {
                  console.log(err)
                }
              })
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 获取成为分销商的金额
  getFenXiaoMoney() {
    api.buyFenxiao({
      data: {
        token: app.globalData.token
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            fenxiaoMoney: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    var is_fenxiaoshang = app.globalData.is_fenxiaoshang
    // 获取成为分销商所需金额
    this.getFenXiaoMoney()
    var imgurl = app.globalData.imgurl
    this.setData({
      imgurl: imgurl,
      distributorId: is_fenxiaoshang
    })
    console.log(this.data.distributorId)
    api.categoryindex({
      data: {},
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            navbar: res.data.data.type,
            commodity: res.data.data.list,
          })
        }
      },
    })
  },
  navbarTap(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    api.getGoodsList({
      data: {
        token: app.globalData.token,
        page: this.data.goodspage,
        cid: this.data.currentTab
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            commodity: res.data.data
          })
        }
      },
    })
  },
  skipDetail(e) {
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    } else {
      wx.navigateTo({
        url: "/pages/spellParticulars/spellParticulars?goodsid=" + e.currentTarget.dataset.goodsid + "&type=" + 1 + "&fenxiao=" + e.currentTarget.dataset.fenxiao,
      })
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
      goodspage: this.data.goodspage + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})