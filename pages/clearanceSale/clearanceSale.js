var app = getApp();
var api = require('../../utils/api.js');
Page({


  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    page: 1,
    commodity: [
      {
        id: 1,
        url: "../../images/shangp1.png",
        text: "圣芝红酒法国波尔多AOC银奖干红原瓶进口珍藏葡萄酒类整箱6支原装",
        jiage: "¥26.90"
      },
      {
        id: 2,
        url: "../../images/shangp1.png",
        text: "圣芝红酒法国波尔多AOC银奖干红原瓶进口珍藏葡萄酒类整箱6支原装",
        jiage: "¥26.90"
      },
      {
        id: 3,
        url: "../../images/shangp1.png",
        text: "圣芝红酒法国波尔多AOC银奖干红原瓶进口珍藏葡萄酒类整箱6支原装",
        jiage: "¥26.90"
      },
      {
        id: 4,
        url: "../../images/shangp1.png",
        text: "圣芝红酒法国波尔多AOC银奖干红原瓶进口珍藏葡萄酒类整箱6支原装",
        jiage: "¥26.90"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    api.qingcangList({
      data: {
        page: this.data.page
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            commodity: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      },
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