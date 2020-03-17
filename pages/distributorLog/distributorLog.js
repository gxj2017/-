// pages/distributor/distributor.js
var app = getApp()
var api = require("../../utils/api.js")
var utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['兑换商品', '抽奖记录', '所集卡片', '兑奖记录'],
    currentTab: 0,
    imgurl: app.globalData.imgurl,
    page: 1,
    awardList: [],
    errMsg: "暂无数据"
  },
  navbarTap: function(e) {
    console.log(e);
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      page: 1,
      awardList: []
    })
    console.log(this.data.currentTab)
    if (this.data.currentTab == 0) {
      this.duijiangList()
    } else if (this.data.currentTab == 1) {
      this.choujiangLogList()
    } else if (this.data.currentTab == 2) {
      this.cardsList()
    } else if (this.data.currentTab == 3) {
      this.yiduigoodsList()
    }
  },
  duijiangList() {
    var data = {
      token: app.globalData.token
    }
    api.duijiangList({
      data,
      success: (res) => {
        console.log(res)
        if(res.data.code==1) {
          var list = res.data.data
          if (list.length) {
            list.forEach((item, index) => {
              var newtime = utils.formatTimeTwo(item.addtime, "Y年M月D日 m:s")
              Object.assign(item, {
                "addtime": newtime
              })
            })
          }
          this.setData({
            awardList: this.data.awardList.concat(list)
          })
        }else{
          this.setData({
            errMsg: res.data.msg
          })
        }
      }
    })
  },
  choujiangLogList() {
    var data = {
      token: app.globalData.token
    }
    api.choujiangLogList({
      data,
      success: (res) => {
        if(res.data.code==1) {
          var list = res.data.data
          if (list.length) {
            list.forEach((item, index) => {
              var newtime = utils.formatTimeTwo(item.addtime, "Y年M月D日 m:s")
              Object.assign(item, {
                "addtime": newtime
              })
            })
          }
          this.setData({
            awardList: this.data.awardList.concat(list)
          })
        }else{
          this.setData({
            errMsg: res.data.msg
          })
        }
      }
    })
  },
  cardsList() {
    var data = {
      token: app.globalData.token
    }
    api.cardsList({
      data,
      success: (res) => {
        if(res.data.code==1) {
          var list = res.data.data
          if (list.length) {
            list.forEach((item, index) => {
              var newtime = utils.formatTimeTwo(item.addtime, "Y年M月D日 m:s")
              Object.assign(item, {
                "addtime": newtime
              })
            })
          }
          this.setData({
            awardList: this.data.awardList.concat(list)
          })
        }else{
          this.setData({
            errMsg: res.data.msg
          })
        }
      }
    })
  },
  yiduigoodsList() {
    var data = {
      token: app.globalData.token
    }
    api.yiduigoodsList({
      data,
      success: (res) => {
        if(res.data.code==1){
          var list = res.data.data
          if (list.length) {
            list.forEach((item, index) => {
              var newtime = utils.formatTimeTwo(item.addtime, "Y年M月D日 m:s")
              Object.assign(item, {
                "addtime": newtime
              })
            })
          }
          this.setData({
            awardList: this.data.awardList.concat(list)
          })
        }else{
          this.setData({
            errMsg: res.data.msg
          })
        }
      }
    })
  },
  toExchangeGoods(e) {
    var data = {
      token: app.globalData.token,
      id: JSON.stringify(e.currentTarget.dataset.id)
    }
    api.exchangeGoods({
      data,
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if(res.data.code==1) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail: (err) => {
        wx.showModal({
          title: '提示',
          content: err.data.msg,
          showCancel: false
        })
      }
    })
  },
  toChangeGoods() {
    this.setData({
      currentTab: 0,
      page: 1,
      awardList: []
    })
    this.duijiangList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    } else {
      that.duijiangList()
    }
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
    // this.setData({
    //   page: this.data.page + 1
    // })
    // console.log(this.data.page)
    // if(this.data.currentTab==0) {
    //   this.duijiangList()
    // }else if(this.data.currentTab==1) {
    //   this.twoFenList()
    // } else if (this.data.currentTab == 2) {
    //this.cardsList()
    //}
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})