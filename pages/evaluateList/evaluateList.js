// pages/evaluateList/evaluateList.js
var app = getApp()
var api = require('../../utils/api.js')
var utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    goodsComment: {}
  },
  imgYu: function(e) {
    // var src = event.currentTarget.dataset.src;//获取data-src
    // var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    console.log(e)
    var preimg = []
    preimg.push(e.currentTarget.dataset.preimg)
    wx.previewImage({
      current: 0, // 当前显示图片的http链接
      urls: preimg // 需要预览的图片http链接列表
    })
  },
  getGoodsCommentList() {
    var data = {
      token: app.globalData.token,
      goodsid: this.data.goodsid,
      page: 1
    }
    api.goodsCommentList({
      data,
      success: (res) => {
        console.log(res)
        var comment = res.data.data
        if (comment.list.length != 0) {
          Object.assign(comment, {
            "commentShow": true
          })
          comment.list.forEach((item,index) => {
            var addtime = utils.formatTimeTwo(item.addtime, "Y年M月D日")
            Object.assign(item,{
              "img":item.img.split(","),
              "addtime": addtime
              })
          })
        }
        this.setData({
          goodsComment: comment
        })
        console.log(this.data.goodsComment)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      goodsid: options.goodsid
    })
    that.getGoodsCommentList()
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