var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var api = require('../../utils/api.js');
var languageData = require("../../utils/language.js");
Page({
  data: {
    slides: [],
    popup: true,
    particulars: {},
    goodsComment: {},
    productNum: 1,
    productSpecification: null,
    guaigebox: false,
    imgurl: app.globalData.imgurl,
    mkfl: "",
    content: "",
    morengdizhi: "",
    sellparticulars: {
      kefu: "客服",
      collect: "收藏",
      onlypay: "单独购买",
      pintuan: "发起拼团",
      tuwenDetail: "图文详情",
      address: "地址",
      add_address: "请添加收货地址",
      guige: "规格",
      canshu: "参数",
      select_guige: "请选择规格",
      lookgoodscanshu: "查看商品详细参数",
      goodsEvaluation: "商品评价",
      shuliang: "数量",
      jian: "件",
      comfirm: "确认",
      share: "立即分享",
      onebottle: "一瓶装",
      buy: "购买",
      guigecanshu: "常规",
    },
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
  guaige_but() {
    this.setData({
      "guaigebox": true
    })
  },
  guaigeyinc_btn() {
    this.setData({
      "guaigebox": false
    });
  },
  //数量加函数
  numadd: function(e) {
    this.setData({
      productNum: this.data.productNum + 1
    })
  },
  //数量减函数
  numminus: function(e) {
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
    if (this.data.particulars.type == 2 || this.data.particulars.type == 4) {
      Object.assign(goodsDetails, {
        "buysprice": this.data.particulars.price,
        'buygoodsnum': this.data.productNum,
        "buytype": 2
      })
    } else if (this.data.particulars.type == 5){
      Object.assign(goodsDetails, {
        "buysprice": 9.9,
        'buygoodsnum': this.data.productNum,
        "buytype": 2
      })
    }
    console.log(goodsDetails)

    console.log("规格：" + selectSpecification)
    this.setData({
      productSpecification: selectSpecification,
      goodsDetail: goodsDetails
    })
    // 关闭弹出层
    this.guaigeyinc_btn()
    // 规格选完跳往订单支付
    // 秒杀的商品未开始或已结束不能打开
    console.log(this.data.miao_status==2)
    if (this.data.miao_status != 0 && this.data.miao_status != 2) {
      wx.navigateTo({
        url: '../payOrder/payOrder',
      })
    }else{
      wx.showToast({
        title: '该商品不在秒杀时间段内！',
        icon: "none",
        duration: 2000
      })
    }
    wx.setStorageSync('goodsDetail', this.data.goodsDetail);
    wx.setStorageSync('productSpecification', this.data.productSpecification);
    wx.setStorageSync('productNum', this.data.productNum);
    wx.setStorageSync('address', this.data.morengdizhi);
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
            Object.assign(this.data.particulars, {
              'is_shoucang': 1
            })
            wx.showToast({
              title: '收藏成功',
              icon: 'none',
              duration: 2000,
            })
            this.setData({
              particulars: this.data.particulars
            })
          } else {
            console.log(res.data.msg)
          }
        },
      })
    }
  },
  payOrder(e) {
    var that = this
    console.log(e)
    var buysprice = e.currentTarget.dataset.goodsprice
    Object.assign(that.data.particulars, {
      "buysprice": buysprice
    })
    console.log(that.data.particulars)
    if (that.data.productSpecification) {
      var id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: '../payOrder/payOrder',
      })
      wx.setStorageSync('goodsDetail', that.data.particulars);
      wx.setStorageSync('address', that.data.morengdizhi);
    } else {
      that.guaige_but()
    }
  },
  miaoTip(e){
    console.log(e)
    if(e.currentTarget.dataset.miaostatus==2){
      wx.showToast({
        title: '秒杀活动还未开始！',
        icon: 'none',
        duration: 2000,
      })
    } else if (e.currentTarget.dataset.miaostatus == 0) {
      wx.showToast({
        title: '秒杀活动已结束！',
        icon: 'none',
        duration: 2000,
      })
    }
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
        if (comment !=null && comment.list.length != 0) {
          Object.assign(comment, {
            "commentShow": true
          })
          comment.list.forEach((item, index) => {
            var addtime = utils.formatTimeTwo(item.addtime, "Y年M月D日")
            Object.assign(item, {
              "img": item.img.split(","),
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
  onLoad: function(options) {
    var that = this

    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    console.log(language)
    if (language == 1) {
      this.setData({
        sellparticulars: languageData.Chinese.sellparticulars
      })
    } else if (language == 2) {
      this.setData({
        sellparticulars: languageData.Italian.sellparticulars
      })
    } else if (language == 3) {
      this.setData({
        sellparticulars: languageData.English.sellparticulars
      })
    }

    let mkfl = options.mkfl
    let goodsid = options.goodsid
    console.log(options)
    that.setData({
      mkfl: mkfl
    })
    that.getGoodsCommentList()
    if (mkfl == "miaosha") {
      let miao_id = options.miao_id
      let goodsid = options.goodsid
      let miao_status = options.miaostatus
      let type = options.type
      let buytype = options.buytype
      that.setData({
        miao_status: miao_status
      })
      api.temaimiaosha({
        data: {
          miao_id: miao_id,
          goodsid: goodsid,
          token: app.globalData.token
        },
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          if (res.data.code == 1) {
            console.log(res)
            var str = res.data.data.g_imgs
            if (str) {
              var strs = new Array(); //定义一数组 
              strs = str.split(",")
            }
            res.data.data.g_imgs = strs
            // 给秒杀商品添加类型和购买方式
            Object.assign(res.data.data,{
              "type": Number(type),
              "buytype": Number(buytype)
            })
            that.setData({
              particulars: res.data.data,
              content: res.data.data.content,
            })
            console.log(that.data.particulars)
            WxParse.wxParse('content', 'html', res.data.data.content, that);
          } else {
            console.log(res.data.msg)
          }
        },
      })
    } else if (mkfl == "pinpaiqingc") {
      let goodsid = options.goodsid
      api.qingcangGoods({
        data: {
          goodsid: goodsid,
          token: app.globalData.token
        },
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          if (res.data.code == 1) {
            console.log(res)
            var str = res.data.data.g_imgs
            if (str) {
              var strs = new Array(); //定义一数组 
              strs = str.split(",")
            }
            res.data.data.g_imgs = strs
            that.setData({
              particulars: res.data.data,
              content: res.data.data.content,
            })
            console.log(that.data.particulars)
            WxParse.wxParse('content', 'html', res.data.data.content, that);
          } else {
            console.log(res.data.msg)
          }
        },
      })
    } else if (mkfl == "mingpinzhek") {
      let goodsid = options.goodsid
      api.zhekougoods({
        data: {
          goodsid: goodsid,
          token: app.globalData.token
        },
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          if (res.data.code == 1) {
            console.log(res)
            var str = res.data.data.g_imgs
            if (str) {
              var strs = new Array(); //定义一数组 
              strs = str.split(",")
            }
            res.data.data.g_imgs = strs
            res.data.data.zhekou_price = (res.data.data.g_price * res.data.data.sale).toFixed(2)
            that.setData({
              particulars: res.data.data,
              content: res.data.data.content,
            })
            WxParse.wxParse('content', 'html', res.data.data.content, that);
          } else {
            console.log(res.data.msg)
          }
        },
      })

    } else if (mkfl == "jiukuaijiu") {
      let goodsid = options.goodsid
      api.temaiDetail({
        data: {
          goodsid: goodsid,
          token: app.globalData.token
        },
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          if (res.data.code == 1) {
            console.log(res)
            var str = res.data.data.g_imgs
            if (str) {
              var strs = new Array(); //定义一数组 
              strs = str.split(",")
            }
            res.data.data.g_imgs = strs
            res.data.data.jiukuaijiu_price = res.data.data.g_price
            that.setData({
              particulars: res.data.data,
              content: res.data.data.content,
            })
            WxParse.wxParse('content', 'html', res.data.data.content, that);
          } else {
            console.log(res.data.msg)
          }
        },
      })
    }
    that.getAddress()
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
          this.setData({
            morengdizhi: res.data.data
          })
        }
      }
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
    this.getAddress()
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