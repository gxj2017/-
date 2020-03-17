// pages/payOrder/payOrder.js
const app = getApp()
var api = require('../../utils/api.js')
var time = require('../../utils/util.js')
var languageData = require("../../utils/language.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dd: 1,
    imgurl: app.globalData.imgurl,
    goodsDetail: {},
    productSpecification: '',
    productNum: 1,
    userMsg: {},
    shippingAddress: {},
    totalPrice: 0,
    remarkContent: null,
    couponList: [],
    showConpon: false,
    conponprice: null,
    couponId: 0,
    radioitems: [
      { name: '0', value: '快递', checked: 'true' },
      { name: '1', value: '到店取货' }
    ],
    is_tihuo: 0,
    shoplistbol: false,
    shopindex: 0,
    shoplist: [
      { id: 1, address: '陕西省西安市雁塔区科技五路9527号', phone: '13588888888' },
      { id: 2, address: '陕西省西安市莲湖区科技五路9527号', phone: '13766666666' }
    ],
    payorderpage: {
      consignee: "收货人",
      delivery_address: "收货地址",
      add_address: "请添加收货地址",
      needtopay: "需付",
      immediate_payment: "立即支付",
      buynum: "购买数量",
      jian: "件",
      wechatpay: "微信支付",
      tuijian: "推荐",
      sendway: "配送方式",
      quhuoaddress: "取货地址"
    }
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
        payorderpage: languageData.Chinese.payorderpage
      })
    } else if (language == 2) {
      this.setData({
        payorderpage: languageData.Italian.payorderpage
      })
    } else if (language == 3) {
      this.setData({
        payorderpage: languageData.English.payorderpage
      })
    }
    
    that.setData({
      imgurl: app.globalData.imgurl,
      goodsDetail: wx.getStorageSync('goodsDetail'),
      address: wx.getStorageSync('address'),
      productNum: wx.getStorageSync('productNum'),
      productSpecification: wx.getStorageSync('productSpecification')
    })
    if (that.data.goodsDetail) {
      var str = that.data.goodsDetail.g_imgs
      console.log(typeof(str) == String)
      if (typeof(str) == String) {
        if (str) {
          var strs = new Array(); //定义一数组 
          strs = str.split(",")
        }
        Object.assign(that.data.goodsDetail, {
          "g_imgs": strs
        })
      }
      console.log(that.data.goodsDetail)
      that.setData({
        goodsDetail: that.data.goodsDetail
      })
    }
    that.totalPrice()
    // 将未使用优惠券之前的总价保存
    // that.setData({
    //   preTotalPrice: that.data.totalPrice
    // })
    // console.log(that.data.totalPrice)
    // 获取已领取优惠券
    // that.getCouponList()
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      is_tihuo: e.detail.value
    })
  },
  closepop(){
    this.setData({
      shoplistbol: false
    })
  },
  selectShopAddress() {
    this.setData({
      shoplistbol: !this.data.shoplistbol
    })
  },
  selectaddress(e){
    this.setData({
      shopindex: e.currentTarget.dataset.shopindex
    })
    this.setData({
      shoplistbol: false
    })
  },


  getCouponList() {
    var that = this
    let data = {
      token: app.globalData.token
    }
    api.notUsedCoupons({
      data,
      success: (res) => {
        console.log(res)
        let newData = []
        res.data.data.forEach((item, index) => {
          // 加时间戳转为格式日期
          let starttime = time.formatTimeTwo(item.starttime, 'Y.M.D')
          let endtime = time.formatTimeTwo(item.endtime, 'Y.M.D')
          Object.assign(item, {
            'starttime': starttime,
            'endtime': endtime
          })
          newData.push(item)
        })
        console.log(newData)
        that.setData({
          couponList: newData
        })
      }
    })
  },
  conponPop() {
    this.setData({
      showConpon: !this.data.showConpon
    })
  },
  closeConponPop() {
    this.setData({
      showConpon: !this.data.showConpon
    })
  },
  // 选择优惠券
  selectConpon(e) {
    console.log(e, Number(this.data.totalPrice), Number(e.currentTarget.dataset.conponprice))
    // 每次使用优惠券之前初识总价
    this.setData({
      totalPrice: this.data.preTotalPrice
    })
    let newTotalPrice = Number(this.data.totalPrice) - Number(e.currentTarget.dataset.conponprice)
    this.setData({
      showConpon: false,
      conponprice: Number(e.currentTarget.dataset.conponprice),
      couponId: Number(e.currentTarget.dataset.id),
      totalPrice: newTotalPrice
    })
    console.log(this.data.totalPrice)
  },
  inputReMarkContent(e) {
    console.log(e)
    this.setData({
      remarkContent: e.detail.value
    })
    console.log(this.data.remarkContent)
  },
  // 总价计算
  totalPrice() {
    let num = this.data.productNum
    let price = Number(this.data.goodsDetail.buysprice)
    let totalPrices = (num * price).toFixed(2)
    this.setData({
      totalPrice: totalPrices
    })
    console.log(price, num, this.data.totalPrice)
  },
  //数量加函数
  numadd: function(e) {
    this.setData({
      productNum: this.data.productNum + 1
    })
    this.totalPrice()
  },
  //数量减函数
  numminus: function(e) {
    if (this.data.productNum > 0) {
      this.setData({
        productNum: this.data.productNum - 1
      })
    }
    this.totalPrice()
  },
  changeAddress() {
    wx.navigateTo({
      url: '/pages/addressManager/addressManager',
    })
  },
  buy(e) {
    var that = this
    wx.showLoading({
      title: '请稍后>>',
      mask: true
    })
    console.log(e)
    var goodsid = JSON.stringify(e.currentTarget.dataset.id)
    var type = JSON.stringify(e.currentTarget.dataset.type)
    var addressid = JSON.stringify(e.currentTarget.dataset.addressid)
    var buytype = JSON.stringify(e.currentTarget.dataset.buytype)
    if (addressid==undefined) {
      wx.showModal({
        title: '提示',
        content: '请添加收货地址',
      })
    }
    var data = {
      token: app.globalData.token,
      goodsid: goodsid,
      type: type,
      buytype: buytype,
      goodsnum: JSON.stringify(that.data.productNum),
      addressid: addressid
    }
    if (that.data.goodsDetail.addgroupid) {
      Object.assign(data, {
        "tuanid": that.data.goodsDetail.addgroupid
      })
    }
    // 如果到店取货
    if (that.data.is_tihuo == 1 ){
      Object.assign(data, {
        "is_tihuo": 1,
        "addressid": 0
      })
    } else if (that.data.is_tihuo == 0){
      Object.assign(data, {
        "is_tihuo": 0
      })
    }
    api.pay({
      data,
      method: "post",
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if(res.data.code==0) {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            success: (res) => {
              console.log(res)
            },
          })
        }else{
          wx.hideLoading()
          var Payment = res.data
          wx.requestPayment({
            timeStamp: Payment.timeStamp,
            nonceStr: Payment.nonceStr,
            package: Payment.package,
            signType: 'MD5',
            paySign: Payment.paySign,
            success(res) {
              console.log(res)
              if (buytype == 1 && that.data.goodsDetail.addgroupid) {
                wx.showModal({
                  title: '支付成功',
                  content: '您已成功参与拼团！！',
                  success: (res) => {
                    console.log(res)
                    wx.switchTab({
                      url: '/pages/group/group'
                    })
                  },
                  fail: (err) => {
                    console.log(err)
                  }
                })
              } else if (buytype == 1) {
                wx.showModal({
                  title: '支付成功',
                  content: '您已成功发起该商品拼团！！',
                  success: (res) => {
                    console.log(res)
                    wx.switchTab({
                      url: '/pages/group/group'
                    })
                  },
                  fail: (err) => {
                    console.log(err)
                  }
                })
              } else {
                wx.showModal({
                  title: '支付成功',
                  content: '您已成功购买此商品！！',
                  success: (res) => {
                    console.log(res)
                  },
                })
              }
            },
            fail(err) {
              console.log(err)
            }
          })
        }
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
  onShow: function() {
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
            address: res.data.data
          })
        }
      },
    })
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