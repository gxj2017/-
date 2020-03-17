var app = getApp();
var api = require('../../utils/api.js');
Page({
  data: {
    name:"",
    phone:"",
    street:"",
    list: [],
    region:[],
    id:""
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    this.setData({
      list: e.detail.value
    })
    console.log(this.data.list)
    if (this.data.list.switch) {
      this.data.list.switch = 1
    } else {
      this.data.list.switch = 0
    }
    api.editAdr({
      data: {
        token: app.globalData.token,
        phone: this.data.list.phone,
        uname: this.data.list.name,
        receive_address: this.data.list.city,
        detail_address: this.data.list.street,
        is_default: this.data.list.switch,
        id:this.data.id
      },
      method: "post",
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
          })
        }
      },
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    api.getaddress({
      data: {
        token: app.globalData.token,
        id: options.id
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          // region: res.data.data.receive_address,
          name: res.data.data.uname,
          phone: res.data.data.phone,
          street: res.data.data.detail_address,
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