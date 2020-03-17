var app = getApp();
var api = require('../../utils/api.js');
Page({
  data: {
    addressContent:[],
    list:[]
  },
  goAddAddress: function (e) {
    wx.navigateTo({
      url: '/pages/addAddress/addAddress'
    })
  },
  editorAddress: function (e) {
    var wjId = e.currentTarget.id
    console.log(wjId)
    wx.navigateTo({
      url: '/pages/xiugeiaddress/xiugeiaddress?id='+wjId,
    })
  },
  deleteAddress:function(e){
    var wjId = e.currentTarget.id
    console.log(wjId)
    api.deleteAdr({
      data: {
        token: app.globalData.token,
        id:wjId
      },
      method:"post",
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: res.data.msg,
        })
        this.onLoad()
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = app.globalData.token
    api.adrelist({
      data: {
        token: app.globalData.token,
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        this.setData({
          addressContent: res.data.data
        })
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
    api.adrelist({
      data: {
        token: app.globalData.token,
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        this.setData({
          addressContent: res.data.data
        })
      },
    })
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