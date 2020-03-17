var app = getApp()
var api = require("../../utils/api.js")
var languageData = require("../../utils/language.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ['全部', '待付款', '待发货', '已发货', '待评价'],
    btnAndStatus:{
      quxiao: "取消订单",
      pay: "付款",
      unpay: "待付款",
      unsend: "待发货",
      sended: "已发货",
      unevulation: "待评价",
      tuikuanbtn: "申请退款",
      tixingfahuo: "提醒发货",
      chakanwuliu: "查看物流",
      confirm: "确认收货",
      delorder: "删除订单",
      evaluation: "评价",
      complete: "已完成",
      tihuoway: "到店取货",
      pickup: "已取货",
      notpickup: "未取货",
      kuaidi: "快递"
    },
    currentTab: 0,
    page: '1',
    orderList: [],
    imgurl: app.globalData.imgurl,
    orderForm:[
      {
        id:1,
        orderNumber:"3265232656565",
        title:"待付款",
        name: "圣芝红酒法国波尔多AOC银圣芝红酒法国波尔多AOC银",
        number:6,
        summation:"￥26.90",
        specification:"6支"
      },
      {
        id: 2,
        orderNumber: "3265232656565",
        title: "交易已取消",
        name: "圣芝红酒法国波尔多AOC银圣芝红酒法国波尔多AOC银",
        number: 6,
        summation: "￥26.90",
        specification: "6支"
      },
      {
        id: 3,
        orderNumber: "3265232656565",
        title: "待付款",
        name: "圣芝红酒法国波尔多AOC银圣芝红酒法国波尔多AOC银",
        number: 6,
        summation: "￥26.90",
        specification: "6支"
      },
      {
        id: 4,
        orderNumber: "3265232656565",
        title: "待付款",
        name: "圣芝红酒法国波尔多AOC银圣芝红酒法国波尔多AOC银",
        number: 6,
        summation: "￥26.90",
        specification: "6支"
      },
      {
        id: 5,
        orderNumber: "3265232656565",
        title: "待付款",
        name: "圣芝红酒法国波尔多AOC银圣芝红酒法国波尔多AOC银",
        number: 6,
        summation: "￥26.90",
        specification: "6支"
      },
      {
        id: 6,
        orderNumber: "3265232656565",
        title: "待付款",
        name: "圣芝红酒法国波尔多AOC银圣芝红酒法国波尔多AOC银",
        number: 6,
        summation: "￥26.90",
        specification: "6支"
      }
    ]
  },
  // teb栏切换
  onTabsItem (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id,
      page: '1',
      orderList: [] //菜单栏切换时清空数据
    })
    console.log(e)
    if (this.data.currentTab == 0){
      this.getAllOrder()
    } else if (this.data.currentTab == 1) {
      this.getUnPayOrder()
    } else if (this.data.currentTab == 2) {
      this.getUnSendOrder()
    } else if (this.data.currentTab == 3) {
      this.getSendOrder()
    } else if (this.data.currentTab == 4) {
      this.getCommentOrder()
    }
  },
  skiporderdetail(e){
    wx.navigateTo({
      url: '/pages/indentParticulars/indentParticulars?orderno='+e.currentTarget.dataset.orderno + "&is_tihuo=" + e.currentTarget.dataset.istihuo + "&orderid=" + e.currentTarget.dataset.orderid,
    })
  },
  pinglun:function(){
    wx.redirectTo({
      url: '/pages/goodsEvaluation/goodsEvaluation'
    })
  },
  payOrder(e) {
    console.log(e)
    // 规格选完跳往订单支付
    wx.navigateTo({
      url: '../payOrder/payOrder',
    })
    wx.setStorageSync('productNum', e.currentTarget.dataset.orderitem.g_num);
    Object.assign(e.currentTarget.dataset.orderitem, { "buysprice": e.currentTarget.dataset.orderitem.singleprice})
    wx.setStorageSync('goodsDetail', e.currentTarget.dataset.orderitem);
  },
  // 获取所有订单
  getAllOrder() {
    var that = this
    var data = {
      token: app.globalData.token,
      page: that.data.page
    }
    api.allOrder({
      data,
      success: (res) => {
        console.log(res.data.data.list)
        that.setData({
          orderList: that.data.orderList.concat(res.data.data.list) || []
        })
      }
    })
    console.log(that.data.orderList)
  },
  // 获取待付款订单
  getUnPayOrder() {
    var that = this
    var data = {
      token: app.globalData.token,
      page: that.data.page
    }
    api.unPayOrder({
      data,
      success: (res) => {
        console.log(res.data.data.list)
        that.setData({
          orderList: that.data.orderList.concat(res.data.data.list) || []
        })
      }
    })
    console.log(that.data.orderList)
  },
  // 获取待发货订单
  getUnSendOrder() {
    var that = this
    var data = {
      token: app.globalData.token,
      page: that.data.page
    }
    api.unSendOrder({
      data,
      success: (res) => {
        console.log(res.data.data.list)
        that.setData({
          orderList: that.data.orderList.concat(res.data.data.list) || []
        })
      }
    })
    console.log(that.data.orderList)
  },
  // 申请退款
  applicationForDrawback() {
    wx.showModal({
      title: '申请退款',
      content: '平台暂未提供自动退款，您可以主动联系商家进行退款。电话：029-888888',
      success: (res) => {
        // 调起客服
      }
    })
  },
  // 提醒发货
  noticeSend() {
    wx.showModal({
      title: '提示',
      content: '提醒商家尽快为您发货！',
      success: (res) => {
        wx.showToast({
          title: '您已成功提醒商家',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 获取已发货订单
  getSendOrder() {
    var that = this
    var data = {
      token: app.globalData.token,
      page: that.data.page
    }
    api.sendOrder({
      data,
      success: (res) => {
        console.log(res.data.data.list)
        that.setData({
          orderList: that.data.orderList.concat(res.data.data.list) || []
        })
      }
    })
    console.log(that.data.orderList)
  },
  // 获取待评价订单
  getCommentOrder() {
    var that = this
    var data = {
      token: app.globalData.token,
      page: that.data.page
    }
    api.commentOrder({
      data,
      success: (res) => {
        console.log(res.data.data.list)
        that.setData({
          orderList: that.data.orderList.concat(res.data.data.list) || []
        })
      }
    })
    console.log(that.data.orderList)
  },
  // 取消订单
  cancelOrder(e) {
    var that = this
    console.log(e)
    var data = {
      token: app.globalData.token,
      orderid: e.currentTarget.dataset.orderid
    }
    api.cancelOrder({
      data,
      method: 'post',
      success: (res) => {
        wx.showToast({
          title: '取消成功',
          icon: 'none',
          duration: 1500,
          success: () => {
            that.setData({
              page: 1,
              orderList: []
            })
            that.getUnPayOrder()
          }
        })
      }
    })
  },
  // 删除订单
  delOrder(e) {
    var that = this
    console.log(e)
    var data = {
      token: app.globalData.token,
      orderid: e.currentTarget.dataset.orderid
    }
    api.delOrder({
      data,
      method: 'post',
      success: (res) => {
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 1500,
          success: () => {
            that.setData({
              page: 1,
              orderList: []
            })
            that.getCommentOrder()
          }
        })
      }
    })
  },
  checkwuliu(e){
    console.log(e)
    wx.showToast({
      title: '暂不支持物流信息查看',
      icon: "none",
      duration: 2000
    })
  },
  // 确认收货
  confirmOrder(e) {
    var that = this
    console.log(e)
    var data = {
      token: app.globalData.token,
      orderid: e.currentTarget.dataset.orderid
    }
    api.confirmOrder({
      data,
      method: 'post',
      success: (res) => {
        wx.showModal({
          title: '确认收货',
          content: '在点击确定前，请确保您已经收到商品',
          success: (res) => {
            console.log(res)
            if (res.confirm) {
              that.setData({
                page: 1,
                orderList: []
              })
              that.getSendOrder()
            }
          }
        })
      }
    })
  },
  evaluation(e) {
    console.log(e)
    var orderitem = JSON.stringify(e.currentTarget.dataset.orderitem)
    wx.navigateTo({
      url: '/pages/goodsEvaluation/goodsEvaluation?orderitem=' + orderitem,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    console.log(language)
    if (language == 1) {
      this.setData({
        tabList: languageData.Chinese.tabList,
        btnAndStatus: languageData.Chinese.btnAndStatus
      })
    } else if (language == 2) {
      this.setData({
        tabList: languageData.Italian.tabList,
        btnAndStatus: languageData.Italian.btnAndStatus
      })
    } else if (language == 3) {
      this.setData({
        tabList: languageData.English.tabList,
        btnAndStatus: languageData.English.btnAndStatus
      })
    }
    console.log(options.currentab, this.data.btnAndStatus)
    if (options.currentab == undefined || options.currentab == null) {
      this.setData({
        currentTab: 0
      })
      this.getAllOrder()
    }else{
      this.setData({
        currentTab: options.currentab
      })
      if (options.currentab==1){
        this.getUnPayOrder()
      } else if (options.currentab == 2) {
        this.getUnSendOrder()
      } else if (options.currentab == 3) {
        this.getSendOrder()
      } else if (this.data.currentTab == 4) {
        this.getCommentOrder()
      }
    }
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
    this.setData({
      page: '1',
      orderList: [] //菜单栏切换时清空数据
    })
    console.log(this.data.currentTab)
    if (this.data.currentTab == 1) {
      this.getUnPayOrder()
    } else if (this.data.currentTab == 2) {
      this.getUnSendOrder()
    } else if (this.data.currentTab == 3) {
      this.getSendOrder()
    } else if (this.data.currentTab == 4) {
      this.getCommentOrder()
    }
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
    var pages = Number(this.data.page) + 1
    this.setData({
      page: JSON.stringify(pages)
    })
    console.log(this.data.page)
    if (this.data.currentTab == 0) {
      this.getAllOrder()
    } else if (this.data.currentTab == 1) {
      this.getUnPayOrder()
    } else if (this.data.currentTab == 2) {
      this.getUnSendOrder()
    } else if (this.data.currentTab == 3) {
      this.getSendOrder()
    } else if (this.data.currentTab == 4) {
      this.getCommentOrder()
    }
    console.log(this.data.orderList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})