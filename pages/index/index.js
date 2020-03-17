// pages/group/group.js
var app = getApp();
var api = require('../../utils/api.js');
var languageData = require("../../utils/language.js")
Page({
  data: {
    search: "",
    slides: [],
    index: 1,
    autoplay: false,
    interval: 2000,
    duration: 500,
    popup: true,
    goodspage: 1,
    categories: [{
        id: 1,
        imgurl: "../../images/categories(8).png",
        text: "成为分销商",
        src: "/pages/distributorPartner/distributorPartner"
      },
      {
        id: 2,
        imgurl: "../../images/categories(1).png",
        text: "限时秒杀",
        src: "/pages/seckill/seckill"
      },
      {
        id: 3,
        imgurl: "../../images/categories(2).png",
        text: "品牌清仓",
        src: "/pages/clearanceSale/clearanceSale"
      },
      {
        id: 4,
        imgurl: "../../images/categories(3).png",
        text: "名品折扣",
        src: "/pages/discount/discount"
      },
      {
        id: 5,
        imgurl: "../../images/categories(4).png",
        text: "9块9特卖",
        src: "/pages/specialSale/specialSale"
      },
      {
        id: 6,
        imgurl: "../../images/categories(5).png",
        text: "线上任务",
        src: "/pages/task/task"
      },
      
      {
        id: 8,
        imgurl: "../../images/categories(7).png",
        text: "转盘领奖",
        src: "/pages/honoree/honoree"
      }
    ],
    navbar: [],
    currentTab: 1,
    commodity: [],
    message: [{
        id: 1,
        name: "安于生活",
        text: "购买了圣芝红酒2313",
        imgSrc: "../../images/tx1.png"
      },
      {
        id: 2,
        name: "安于生活",
        text: "购买了圣芝",
        imgSrc: "../../images/tx1.png"
      },
      {
        id: 3,
        name: "安于生活",
        text: "购买红酒",
        imgSrc: "../../images/tx1.png"
      },
      {
        id: 4,
        name: "安于生活",
        text: "购买了圣芝红酒",
        imgSrc: "../../images/tx1.png"
      }
    ],
    imgurl: app.globalData.imgurl,
    is_fenxiaoshang: app.globalData.is_fenxiaoshang
  },
  menuSkip(e) {
    console.log(e)
    if(!app.globalData.token){
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    }else{
      wx.navigateTo({
        url: e.currentTarget.dataset.skipurl,
      })
    }
  },
  skipDetail(e){
    // wx.navigateTo({
    //   url: "/pages/spellParticulars/spellParticulars?goodsid=" + e.currentTarget.dataset.goodsid + "&type=" + 1,
    // })
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    } else {
      wx.navigateTo({
        url: "/pages/spellParticulars/spellParticulars?goodsid="+e.currentTarget.dataset.goodsid+"&type="+1,
      })
    }
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
  ssuo: function() {
    console.log(app.globalData.token)
    if (!app.globalData.token) {
      wx.navigateTo({
        url: "/pages/impower/impower"
      });
    } else {
      wx.navigateTo({
        url: '../ssuo/ssuo'
      })
    }
  },
  navbarTap(e) {
    // 切换tabbar时清空列表数据，初始化页码为1
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      goodspage: 1,
      commodity: []
    })
    api.getGoodsList({
      data: {
        token: app.globalData.token,
        page: this.data.goodspage,
        cid: this.data.currentTab
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            commodity: this.data.commodity.concat(res.data.data)
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取语言设置
    var language = wx.getStorageSync("language")
    if(language=="") {
      language = 1
    }
    this.setData({
      language: language
    })
    wx.setStorageSync('language', language)
    if(language==1) {
      this.setData({
        categories: languageData.Chinese.categories
      })
    } else if (language == 2){
      this.setData({
        categories: languageData.Italian.categories
      })
    } else if (language == 3) {
      this.setData({
        categories: languageData.English.categories
      })
    }
    // console.log(options, options.q)
    api.banner({
      data: {},
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            slides: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      },
    })
    api.categoryindex({
      data: {},
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            navbar: res.data.data.type,
            commodity: res.data.data.list,
          })
        }
      },
    })

    if (options.scene) {
      let scan_url = decodeURIComponent(options.scene);
      console.log("scan_url:" + scan_url)
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
    // 获取语言设置
    var language = wx.getStorageSync("language")
    this.setData({
      language: language
    })
    if (language == 1) {
      this.setData({
        categories: languageData.Chinese.categories
      })
    } else if (language == 2) {
      this.setData({
        categories: languageData.Italian.categories
      })
    } else if (language == 3) {
      this.setData({
        categories: languageData.English.categories
      })
    }
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
    this.setData({
      goodspage: this.data.goodspage + 1
    })
    console.log(this.data.goodspage)
    api.getGoodsList({
      data: {
        token: app.globalData.token,
        page: this.data.goodspage,
        cid: this.data.currentTab
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        if (res.data.code == 1) {
          this.setData({
            commodity: this.data.commodity.concat(res.data.data)
          })
        }
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})