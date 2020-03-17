var app = getApp();
var api = require('../../utils/api.js');
var utils = require('../../utils/util.js');
Page({
  data: {
    page: 1,
    auction: [],
    imgurl: app.globalData.imgurl
  },
  auction(e) {
    if (!app.globalData.token) {
      wx.navigateTo({
        url: "/pages/impower/impower"
      })
    } else {
      wx.navigateTo({
        url: '/pages/auctionParticulars/auctionParticulars?goodsid=' + e.currentTarget.dataset.goodsid,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    api.paimaiIndex({
      data: {
        page: that.data.page
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        if (res.data.code == 1) {
          let tablist = res.data.data
          that.setData({
            auction: tablist
          })
          var list = that.data.auction
          console.log(list)
          for (var i = 0; i < list.length; i++) {
            console.log(list)
            that.grouponcountdown(list[i].daojishi, i)
          }
          // console.log(that.data.auction)
        }
      },
    })
  },
  // 时间格式化输出，每1s都会调用一次,倒计时的秒数
  dateformat(micro_second) {
    // console.log(micro_second)
    if (micro_second <= 0) {
      return "拍卖结束"
    }
    // 总秒数
    var second = Math.floor(micro_second);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟
    var min = Math.floor(second / 60 % 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒
    var sec = Math.floor(second % 60);
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;

    if (day <= 1) {
      return "剩 " + hrStr + ":" + minStr + ":" + secStr;
    } else {
      return "剩" + day + "天" + hrStr + ":" + minStr + ":" + secStr;
    }
  },
  //倒计时 //适用于商品列表倒计时，每秒执行一次/** * daojishi int 倒计时秒数 * param int 数组键 */
  grouponcountdown(daojishi, param) {
    var that = this
    var list = that.data.auction
    // console.log(daojishi, list)
    list[param].daojishi = that.dateformat(daojishi);
    if (list[param].daojishi <= 0) {
      list[param].daojishi = "已结束"
    }
    that.setData({
      auction: list
    })
    daojishi--; // 该函数每秒执行一次，每执行一次，秒数减1
    setTimeout(function() {
      that.grouponcountdown(daojishi, param);
    }, 1000)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})