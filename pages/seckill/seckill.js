var app = getApp();
var api = require('../../utils/api.js');
var utils = require('../../utils/util.js');
var languageData = require("../../utils/language.js");
Page({
  data: {
    navbar: ['10:00', '12:00', '14:00', '16:00', '18:00'],
    currentTab: 1,
    commodity: [],
    num: 0,
    imgurl: app.globalData.imgurl,
    page: 1,
    miaoshapage: {
      snap_up: "开枪",
      time_has_not_yet: "未到开抢时间",
      buy: "购买",
      end: "已结束",
      miaosha_end: "秒杀结束",
      sold: "已抢",
      jian: "件"
    }
  },
  navbarTap: function(e) {
    var that = this
    let mid = e.currentTarget.dataset.idx
    that.setData({
      currentTab: e.currentTarget.dataset.idx,
    })

    let daojishi = 0
    // 结束时间时分秒
    let endtime = utils.formatTimeTwo(e.currentTarget.dataset.endtime, "h:m:s")
    // 转为十位时间戳
    var nowtimestamp = parseInt(new Date().getTime() / 1000);
    let nowtime = utils.formatTimeTwo(nowtimestamp, "h:m:s");
    daojishi = utils.timestamp(endtime) - utils.timestamp(nowtime)
    console.log(daojishi)

    api.getmiaoGoodsList({
      data: {
        mid: mid,
        page: that.data.page
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          var listData = res.data.data
          console.log(listData)

          // 计算秒杀进度
          if (listData.list.length != 0) {
            listData.list.forEach((item, index) => {
              var jidu = parseInt((item.salenum / item.kucun) * 100)
              Object.assign(item, {
                "jidu": jidu
              })
            })
          }
          that.setData({
            commodity: listData,
          })
          if (listData.status == 1) {
            this.countDown(daojishi)
          }
        } else {
          console.log(res.data.msg)
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    console.log(language)
    if (language == 1) {
      this.setData({
        miaoshapage: languageData.Chinese.miaoshapage
      })
    } else if (language == 2) {
      this.setData({
        miaoshapage: languageData.Italian.miaoshapage
      })
    } else if (language == 3) {
      this.setData({
        miaoshapage: languageData.English.miaoshapage
      })
    }

    api.miaolist({
      data: {},
      method: "get",
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          let tablist = res.data.data.type

          for (var i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].num = Number(res.data.data.list[i].miao_sales) / Number(res.data.data.list[i].miao_kucun) * 100

            // 结束时间时分秒
            let endtime = utils.formatTimeTwo(tablist[0].end_time, "h:m:s")
            // 转为十位时间戳
            var nowtimestamp = parseInt(new Date().getTime() / 1000);
            let nowtime = utils.formatTimeTwo(nowtimestamp, "h:m:s");

            let daojishi = utils.timestamp(endtime) - utils.timestamp(nowtime)
            this.setData({
              daojishi: daojishi
            })
            console.log(daojishi)
          }

          for (var i = 0; i < tablist.length; i++) {
            // 开始时间
            var newStartTime = utils.formatTimeTwo(tablist[i].start_time, 'h:m:s')
            Object.assign(tablist[i], {
              "starttime": newStartTime
            })
          }
          this.setData({
            commodity: res.data.data,
            navbar: tablist,
          })
          if (res.data.data.status == 1) {
            this.countDown(this.data.daojishi)
          }
        } else {
          console.log(res.data.msg)
        }
      },
    })
  },
  // 时间格式化输出，每1s都会调用一次,倒计时的秒数
  dateformat(micro_second) {
    console.log(micro_second)
    if (micro_second <= 0) {
      return "秒杀结束"
    }else{
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
    }
  },
  //倒计时
  countDown(total_second) {
    var that = this
    console.log(total_second)
    if (total_second <= 0) {
      that.setData({
        daojishi: "已结束"
      });
    }else{
      total_second--
      that.setData({
        daojishi: that.dateformat(total_second)
      })
      var times = setTimeout(function () {
        that.countDown(total_second);
      }, 1000)   
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})