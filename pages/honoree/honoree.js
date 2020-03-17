var app = getApp();
var api = require('../../utils/api.js');
var languageData = require("../../utils/language.js");
//计数器
var interval = null;
//值越大旋转时间越长 即旋转速度
var intime = 50;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    color: [1, 1, 1, 1, 1, 1, 1, 1],
    imgurl: app.globalData.imgurl,
    prize: [],
    //中奖位置
    luckPosition: 0,
    //点击事件
    clickLuck: 'clickLuck',
    integral: 10,
    jifenAndYongjin: null,
    title: "",
    choujiangpage: {
      bg_title1: "幸运大转盘",
      bg_title2: "天天有好运",
      myintegral: "我的积分",
      lucky_draw: "立即抽奖",
      current_balance: "您的当前余额",
      integral: "积分",
      lookLuckyDraw: "查看我的抽奖",
      activity_description: "活动说明",
      description: [
        "1.用户每次抽奖会消耗10积分",
        "2.如果用户所抽奖品为卡片，集齐5中不同类型的卡片，可兑换商品",
        "3.如果用户所抽奖品不是卡片，奖品即为用户所抽中物品"
      ]
    }
  },
  jifenAndYongjin() {
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    } else {
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
  // parseInt(Math.random()*(max+1),10);
  // Math.floor(Math.random() * (max + 1));
  //生成从minNum到maxNum的随机数
  randomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var randomnum = Min + Math.floor(Rand * Range); //舍去
    this.setData({
      randomnum: randomnum
    })
    console.log(this.data.randomnum)
    return randomnum;
  },
  //点击抽奖按钮
  clickLuck: function() {
    var that = this
    if (that.data.jifenAndYongjin.score > that.data.integral) {
      // // 调用函数生成0到8的随机数
      // that.randomNum(0,8)
      let data = {
        token: app.globalData.token
      }
      api.baoxiangindex({
        data,
        method: "post",
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          console.log(res.data)
          if (res.data.code == 1) {
            that.setData({
              luckPosition: res.data.data.id - 1,
              title: res.data.data.prize
            })
          } else {
            console.log(res.data.msg)
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false
            })
            return
          }
        },
      })
      var e = this;
      e.setData({
        aggregateScore: that.data.aggregateScore - that.data.integral
      })
      //清空计时器
      clearInterval(interval);
      var index = 0;
      //循环设置每一项的透明度
      interval = setInterval(function() {
        if (index > 7) {
          index = 0;
          e.data.color[7] = 0.5
        } else if (index != 0) {
          e.data.color[index - 1] = 0.5
        }
        e.data.color[index] = 1
        e.setData({
          color: e.data.color,
        })
        index++;
      }, intime);

      //模拟网络请求时间  设为两秒
      var stoptime = 2000;
      setTimeout(function() {
        e.stop(e.data.luckPosition);
      }, stoptime)
    } else {
      wx.showToast({
        title: '积分不足，不能参与抽奖',
        icon: 'none',
        duration: 2000
      })
    }
  },
  stop: function(which) {
    var e = this;
    //清空计数器
    clearInterval(interval);
    //初始化当前位置
    var current = -1;
    var color = e.data.color;
    for (var i = 0; i < color.length; i++) {
      if (color[i] == 1) {
        current = i;
      }
    }
    //下标从1开始
    var index = current + 1;
    e.stopLuck(which, index, intime, 10);
  },
  lookMyHonoree() {
    wx.navigateTo({
      url: '/pages/distributorLog/distributorLog',
    })
  },
  /**
   * which:中奖位置
   * index:当前位置
   * time：时间标记
   * splittime：每次增加的时间 值越大减速越快
   */
  stopLuck: function(which, index, time, splittime) {
    var e = this;
    //值越大出现中奖结果后减速时间越长
    var color = e.data.color;
    setTimeout(function() {
      //重置前一个位置
      if (index > 7) {
        index = 0;
        color[7] = 0.5
      } else if (index != 0) {
        color[index - 1] = 0.5
      }
      //当前位置为选中状态
      color[index] = 1
      e.setData({
        color: color,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行
      //直到旋转至中奖位置
      if (time < 400 || index != which) {
        //越来越慢
        splittime++;
        time += splittime;
        //当前位置+1
        index++;
        e.stopLuck(which, index, time, splittime);
      } else {
        //1秒后显示弹窗
        setTimeout(function() {
          wx.showModal({
            title: '中奖提示',
            content: "恭喜您抽中：" + e.data.title,
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                //设置按钮可以点击
                e.setData({
                  clickLuck: 'clickLuck',
                })
              }
            }
          })
        }, 1000);
        // 获取积分
        e.jifenAndYongjin()
      }
    }, time);
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
        choujiangpage: languageData.Chinese.choujiangpage
      })
    } else if (language == 2) {
      this.setData({
        choujiangpage: languageData.Italian.choujiangpage
      })
    } else if (language == 3) {
      this.setData({
        choujiangpage: languageData.English.choujiangpage
      })
    }
    console.log(app.globalData.token)
    // 获取积分
    this.jifenAndYongjin()
    // 奖品列表
    let data = {
      token: app.globalData.token
    }
    api.baoxianglist({
      data,
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        this.setData({
          prize: res.data.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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