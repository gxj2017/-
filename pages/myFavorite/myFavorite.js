var app = getApp();
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    currentTap: 0,
    checkedList: [],
    newBox: [],
    imgurl: app.globalData.imgurl

  },
  toDetail(e) {
    if (!app.globalData.token) {
      wx.navigateTo({
        url: '/pages/impower/impower',
      })
    } else {
      var type = e.currentTarget.dataset.type
      var goodsid = e.currentTarget.dataset.goodsid
      if (type==1){
        wx.navigateTo({
          url: "/pages/spellParticulars/spellParticulars?goodsid=" + goodsid + "&type=" + type,
        })
      } else if (type == 2) {
        wx.navigateTo({
          url: "/pages/seckillParticulars/seckillParticulars?mkfl=mingpinzhek&goodsid=" + goodsid + "&type=" + type,
        })
      } else if (type == 4) {
        wx.navigateTo({
          url: "/pages/seckillParticulars/seckillParticulars?mkfl=pinpaiqingc&goodsid=" + goodsid + "&type=" + type,
        })
      } else if (type == 5) {
        wx.navigateTo({
          url: "/pages/seckillParticulars/seckillParticulars?mkfl=jiukuaijiu&goodsid=" + goodsid + "&type=" + type,
        })
      }
    }
  },
  bindChange: function(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let cart = this.data.productList;                    // 获取购物车列表
    console.log(cart)
    var selected = cart[index].selected;        // 获取当前商品的选中状态
    Object.assign(cart[index], { "selected": !selected })  // 改变状态
    // cart[index].selected = !selected;              // 改变状态
    this.setData({
      productList: cart
    });
    this.getTotalPrice();                           // 重新获取总价
  },
  goPay: function() {
    for (var i = 0; i < this.data.productList.length; i++) {
      console.log(this.data.productList[i].checked == true)
      if (this.data.productList[i].checked == true) {
        this.data.checkedList.push(this.data.productList[i]);
        console.log(this.data.checkedList)
      }
    }
    this.setData({
      checkedList: this.data.checkedList
    })
    console.log(this.data.checkedList)
  },
  selectShc(e) {
    console.log(e.currentTarget.id)
    api.delshoucang({
      data: {
        token: app.globalData.token,
        id: e.currentTarget.id
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log(res)
        wx.showToast({
          title: '已取消收藏',
          icon: 'none',
          duration: 1500,
        })
        this.getCollectList()
      },
    })
  },
  getCollectList() {
    api.shoucanglist({
      data: {
        token: app.globalData.token,
      },
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        if (res.data.code == 1) {
          console.log(res)
          var cart = res.data.data
          if(cart.length) {
            cart.forEach((item,index) => {
              Object.assign(item, { "selected": false })
            })
          }
          console.log(cart)
          this.setData({
            productList: cart,
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  // 计算总价
  getTotalPrice() {
    let productList = this.data.productList; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < productList.length; i++) { // 循环列表得到每个数据
      if (productList[i].selected) { // 判断选中才会计算价格
        total += productList[i].num * productList[i].price; // 所有价格加起来
      }
    }
    this.setData({ // 最后赋值到data中渲染到页面
      productList: productList,
      totalPrice: total.toFixed(2)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCollectList()
  },
  checkedTap: function(e) {

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