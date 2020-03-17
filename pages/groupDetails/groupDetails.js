// pages/groupDetails/groupDetails.js
var app = getApp()
var api = require("../../utils/api.js")
var languageData = require("../../utils/language.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    goodsDetails: {},
    groupPepoleList: [],
    groupDetail: {
      addgroupseccess: "参团成功",
      xuyao: "还需要",
      cantuan: "人来参团",
      share: "快去邀请小伙伴参与吧！",
      tuan: "人团",
      grouppeploe: "已参团的人",
      pintuan: "人拼团成功",
      tuan_end: "拼团已结束",
      tuan_price: "拼团价",
      yaoqing: "邀请好友参团",
      shengyu: "剩余",
      end: "结束"
    }
  },
  getGroupPepole() {
    var data = {
      token: app.globalData.token,
      tuanid: this.data.goodsDetails.id
    }
    api.getGroupPepole({
      data,
      success: (res) => {
        console.log(res)
        this.setData({
          groupPepoleList: res.data.data
        })
      }
    })
  },
  // 时间格式化输出，每1s都会调用一次,倒计时的秒数
  dateformat(micro_second) {
    console.log(micro_second)
    if (micro_second <= 0) {
      return 0
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
      return hrStr + ":" + minStr + ":" + secStr;
    } else {
      return day + "天" + hrStr + ":" + minStr + ":" + secStr;
    }
  },
  //倒计时
  countDown(endTime) {
    
    var that = this
    var endTime = endTime;
    // 转为十位时间戳
    var nowTime = parseInt(new Date().getTime() / 1000); 
    var total_second = endTime - nowTime;
    
    var daojishi = that.dateformat(total_second)
    console.log(endTime, nowTime, total_second)
    
    if (total_second <= 0) {
      Object.assign(that.data.goodsDetails, { "daojishi": "已结束" })
    }else{
      Object.assign(that.data.goodsDetails, { "daojishi": daojishi })
    }
    that.setData({
      goodsDetails: that.data.goodsDetails
    })
    daojishi--;
    console.log(that.data.goodsDetails)

    setTimeout(function() {
      that.countDown(endTime);
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    console.log(language)
    if (language == 1) {
      this.setData({
        groupDetail: languageData.Chinese.groupDetail
      })
    } else if (language == 2) {
      this.setData({
        groupDetail: languageData.Italian.groupDetail
      })
    } else if (language == 3) {
      this.setData({
        groupDetail: languageData.English.groupDetail
      })
    }
    var goodsitem = wx.getStorageSync("goodsDetail")
    that.setData({
      goodsDetails: goodsitem
    })
    that.getGroupPepole()
    that.countDown(that.data.goodsDetails.expiretime)
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