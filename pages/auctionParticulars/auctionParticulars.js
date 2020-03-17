var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var api = require('../../utils/api.js');
var utils = require("../../utils/util.js");
var languageData = require("../../utils/language.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slides: [],
    popup: true,
    auction: true,
    imgurl: app.globalData.imgurl,
    goodsDetail: "",
    productSpecification: "",
    productNum: 1,
    banner: [],
    morengdizhi: "",
    guaigebox: false,
    goodsComment: {},
    paimaiPersonList: [],
    auctionParticularsPage: {
      kefu: "客服",
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
      jingpaibtn: "立即竞拍",
      lookmore: "查看全部",
      endtime: "结束时间",
      pricetap: "价高者得",
      jingzheng: "人在竞争，可直接参与"
    }
  },
  put() {
    this.hidePopup(false);
  },
  cccc() {
    this.hideAuction(false);
  },
  close(flag = true) {
    this.setData({
      "popup": flag,
      "auction": flag
    });
  },
  hidePopup(flag = true) {
    this.setData({
      "popup": flag,
    });
  },
  hideAuction(flag = true) {
    this.setData({
      "auction": flag,
    });
  },
  // 参与竞拍人员列表
  paimaiPersonList() {
    api.paimaiPersonList({
      data: {
        token: app.globalData.token,
        goodsid: this.data.goodsDetail.g_id
      },
      method: 'get',
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 1) {
          console.log(res.data.data)
          res.data.data.forEach((item, index) => {
            // 将时间戳转为时间
            Object.assign(item, {
              "addtime": utils.formatTimeTwo(item.addtime, 'Y-M-D h:m:s')
            })
          })
          this.setData({
            paimaiPersonList: res.data.data
          })
        }
      },
    })
  },
  // 商品评论列表
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
        if (comment != null && comment.list.length != 0) {
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
    if (this.data.goodsDetail.daojishi == 0) {
      wx.showToast({
        title: '拍卖已结束',
        icon: 'none',
        duration: 2000
      })
    } else {
      // 选择规格
      this.data.productSpecification = []
      let selectSpecification = `${this.data.productNum}件`
      // 将选择的商品数量加进商品详情
      let goodsDetails = this.data.goodsDetail
      if (goodsDetails.buytype == "1") {
        Object.assign(goodsDetails, {
          'buygoodsnum': this.data.productNum,
          "buysprice": this.data.goodsDetail.g_tuan_price
        })
      } else {
        Object.assign(goodsDetails, {
          'buygoodsnum': this.data.productNum,
          "buysprice": this.data.goodsDetail.g_dan_price
        })
      }

      console.log("规格：" + selectSpecification)
      this.setData({
        productSpecification: selectSpecification,
        goodsDetail: goodsDetails
      })
      // 关闭弹出层
      this.guaigeyinc_btn()
      // 规格选完跳往订单支付
      wx.navigateTo({
        url: '../auctionOrderForm/auctionOrderForm',
      })
      wx.setStorageSync('goodsDetail', this.data.goodsDetail);
      wx.setStorageSync('productSpecification', this.data.productSpecification);
      wx.setStorageSync('productNum', this.data.productNum);
      wx.setStorageSync('address', this.data.morengdizhi);
    }
  },
  toAuction() {
    var that = this
    wx.setStorageSync("goodsDetail", that.data.goodsDetail)
    api.paimaiMoney({
      data: {
        token: app.globalData.token,
        goodsid: this.data.goodsDetail.g_id
      },
      success: (res) => {
        if (res.data.code == 1) {
          console.log(res.data.data)
          wx.navigateTo({
            url: '/pages/auctionOrderForm/auctionOrderForm?paimaimoney=' + res.data.data,
          })
        } else if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.goodsid)
    var that = this
    if(!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    }else{
      var language = wx.getStorageSync("language")
      this.setData({
        language: language
      })
      if (language == 1) {
        this.setData({
          auctionParticularsPage: languageData.Chinese.auctionParticularsPage
        })
      } else if (language == 2) {
        this.setData({
          auctionParticularsPage: languageData.Italian.auctionParticularsPage
        })
      } else if (language == 3) {
        this.setData({
          auctionParticularsPage: languageData.English.auctionParticularsPage
        })
      }
      // 获取默认地址
      that.getAddress()
      // 获取商品评论
      that.getGoodsCommentList()

      api.paimaigoodsDetail({
        data: {
          token: app.globalData.token,
          goodsid: options.goodsid
        },
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          console.log(res)
          if (res.data.code == 1) {
            var goodsDetailData = res.data.data
            var str = goodsDetailData.g_imgs
            var strs = new Array(); //定义一数组 
            strs = str.split(",")
            // 将时间戳转为时间
            Object.assign(goodsDetailData, {
              "endtime": utils.formatTimeTwo(goodsDetailData.endtime, 'Y-M-D h:m:s'),
              "g_imgs": strs
            })
            that.setData({
              goodsDetail: goodsDetailData,
              banner: strs,
              concent: goodsDetailData.content,
            })
            WxParse.wxParse('concent', 'html', goodsDetailData.content, that);

            // 获取拍卖人员列表
            that.paimaiPersonList()

          } else {
            console.log(res.data.msg)
          }
        },
      })
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
    // 获取拍卖人员列表
    this.paimaiPersonList()
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