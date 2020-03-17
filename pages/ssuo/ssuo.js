var app = getApp();
var api = require('../../utils/api.js');
Page({
  data: {
    search: "",
    commodity: [],
    xxx: false,
    noun: [],
    imgurl: app.globalData.imgurl,
    is_fenxiaoshang: "",
  },
  searchInput: function(e) {
    this.setData({
      search: e.detail.value,
      xxx:false
    })
  },
  // 点击搜索
  searchbtn: function() {
    if (this.data.search != "") {
      var str=this.data.search
      api.search({
        data: {
          keywords: str,
          token: app.globalData.token,
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
          }
        },
      })
      this.data.noun.unshift(str)
      this.setData({
        xxx: true
      })
      this.setData({
        noun: this.data.noun
      })
    }
  },
  eliminate:function(){
    this.setData({
      noun:[]
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    console.log(language)
    this.setData({
      is_fenxiaoshang: app.globalData.is_fenxiaoshang
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