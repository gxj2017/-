var app = getApp();
var api = require('../../utils/api.js');
Page({
  data: {
    slides: [],
    popup: true,
    particulars:{},
    productNum: 1,
    imgurl: app.globalData.imgurl
  },
  put() {
    this.hidePopup(false);
  },
  close(flag = true) {
    this.setData({
      "popup": flag
    });
  },
  hidePopup(flag = true) {
    this.setData({
      "popup": flag
    });

  },
  shoucang() {
    if (this.data.particulars.is_shoucang == 0) {
      console.log(123)
      api.usershoucang({
        data: {
          id: this.data.particulars.id,
          token: app.globalData.token,
          type: this.data.particulars.type
        },
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          if (res.data.code == 1) {
            console.log(res)
            // this.data.goodsDetail.is_shoucang = 1
          } else {
            console.log(res.data.msg)
          }
        },
      })
    }
  },
  getAddress() {
    api.is_deaddress({
      data: {
        token: app.globalData.token
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          console.log(res.data.data)
          this.setData({
            morengdizhi: res.data.data
          })
        }
      },
    })
  },
  guaige_but() {
    this.setData({
      "guaigebox": true
    });
  },
  guaigeyinc_btn() {
    this.setData({
      "guaigebox": false
    });
  },
  //数量加函数
  numadd: function (e) {
    this.setData({
      productNum: this.data.productNum + 1
    })
  },
  //数量减函数
  numminus: function (e) {
    if (this.data.productNum > 0) {
      this.setData({
        productNum: this.data.productNum - 1
      })
    }
  },
  confirmSpecification() {
    // 选择规格
    this.data.productSpecification = []
    let selectSpecification = `${this.data.productNum}件`
    // 将选择的商品数量加进商品详情
    let goodsDetails = this.data.particulars
    Object.assign(goodsDetails, { 'buygoodsnum': this.data.productNum })
    console.log(goodsDetails)

    console.log("规格：" + selectSpecification)
    this.setData({
      productSpecification: selectSpecification,
      goodsDetail: goodsDetails
    })
    // 关闭弹出层
    this.guaigeyinc_btn()
    // 规格选完跳往订单支付
    wx.navigateTo({
      url: '../payOrder/payOrder',
    })
    wx.setStorageSync('goodsDetail', this.data.goodsDetail);
    wx.setStorageSync('productSpecification', this.data.productSpecification);
    wx.setStorageSync('productNum', this.data.productNum);
    wx.setStorageSync('address', this.data.morengdizhi);
  },
  payOrder(e) {
    var that = this
    if (that.data.productSpecification) {
      var id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: '../payOrder/payOrder',
      })
      wx.setStorageSync('goodsDetail', this.data.goodsDetail);
      wx.setStorageSync('address', that.data.morengdizhi);
    } else {
      that.guaige_but()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取地址
    this.getAddress()
    let goodsid = options.goodsid
    console.log(goodsid)
    api.fenxiaogoods({
      data: {
        token: app.globalData.token,
        goodsid: goodsid
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          console.log(res)
          var str = res.data.data.g_imgs
          var strs = new Array(); //定义一数组 
          strs = str.split(",")
          res.data.data.g_imgs = strs
          this.setData({
            particulars: res.data.data
          })
          console.log(this.data.particulars)
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