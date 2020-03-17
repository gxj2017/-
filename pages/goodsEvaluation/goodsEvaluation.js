// pages/goodsEvaluation/goodsEvaluation.js
var app = getApp()
var api = require('../../utils/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {},
    evaluationTag: null,
    evaluationContent: null,
    currentTag: 0,
    tagContent: null,
    pics: [], //图片
    imgurl: app.globalData.imgurl
  },
  contentLength() {
    if (this.data.evaluationContent.length < 10) {
      wx.showToast({
        title: '评价内容不能少于10个字',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 获取商品评价标签
  getEvaluationTag() {
    var that = this
    let data = {
      token: app.globalData.token,
      goodsid: that.data.goodsDetail.g_id
    }
    api.goodsEvaluationTag({
      data,
      success(res) {
        console.log(res.data.data)
        that.setData({
          evaluationTag: res.data.data
        })
      }
    })
  },
  selectTag(e) {
    console.log(e)
    this.setData({
      currentTag: Number(e.currentTarget.dataset.index),
      tagContent: e.currentTarget.dataset.tag
    })
    console.log(this.data.tagContent)
  },
  evaluationContent(e) {
    let that = this
    console.log(e)
    let value = e.detail.value
    that.setData({
      evaluationContent: value
    })
    console.log(that.data.evaluationContent)
  },
  submitEvaluation() {
    let that = this
    if (that.data.evaluationContent == null) {
      wx.showToast({
        title: '请输入评价内容',
        icon: 'none',
        duration: 2000
      })
    } else {
      let data = {
        token: app.globalData.token,
        content: that.data.evaluationContent,
        orderid: that.data.goodsDetail.id.toString(),
        label: that.data.tagContent.toString()
      }
      if (that.data.pics.length) {
        Object.assign(data, {
          img: that.data.pics.toString()
        })
      } else {
        Object.assign(data, {
          img: null
        })
      }
      console.log(data)
      api.sendGoodsEvaluation({
        data,
        method: 'POST',
        header: {
          Accept: 'application/json',
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success(res) {
          console.log(res)
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }
  },
  /**
   * 图片放大查看
   */
  previewImg: function(e) {
    var index = e.target.dataset.index; //当前图片地址
    var imgArr = e.target.dataset.list; //所有要预览的图片的地址集合 数组形式
    console.log(index, imgArr)
    wx.previewImage({
      current: imgArr[index],
      urls: imgurl+imgArr,
    })
  },
  // 上传图片开始
  chooseImg: function(e) {
    var that = this
    var pics = this.data.pics
    console.log(pics)
    if (pics.length < 5) {
      wx.chooseImage({
        count: 5, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          console.log(res);
          // for (var i = 0; i < tempFilePaths.length;i++) {
          //   pics.push(tempFilePaths[i])
          // }
          wx.uploadFile({
            url: 'https://wine.gengyouplay.cn/api/common/upload', //真实的接口地址
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'accept': 'application/json',
              'token': app.globalData.token //若有token，此处换上你的token，没有的话省略 
            },
            success(res) {
              var data = JSON.parse(res.data)
              console.log(data)
              if(data.code==1){
                pics.push(data.data.url);
              }
              that.setData({
                pics: pics
              })
              console.log(that.data.pics)
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传5张图片',
        icon: 'none',
        duration: 3000
      });
    }
  },
  // 删除图片
  deleteImg: function(e) {
    var that = this;
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    console.log(pics)
    this.setData({
      pics: pics,
    })
  },
  // 预览图片
  previewImg1: function(e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var pics = this.data.pics;
    wx.previewImage({
      //当前显示图片
      current: pics[index],
      //所有图片
      urls: pics
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(JSON.parse(options.orderitem))
    this.setData({
      goodsDetail: JSON.parse(options.orderitem)
    })

    // 获取商品评价标签
    this.getEvaluationTag()
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