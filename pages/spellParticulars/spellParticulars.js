var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var api = require('../../utils/api.js');
var utils = require('../../utils/util.js');
var languageData = require("../../utils/language.js");
Page({
  data: {
    goodsDetail: {},
    goodsComment: {},
    goodsGroupList: [],
    addGroupPepoleNum: 0,
    groupPepoleList: [],
    productNum: 1,
    productSpecification: null,
    banner: [],
    popup: true,
    beifenbi: '',
    yaoqincantuan: false,
    guaigebox: false,
    content: "",
    morengdizhi: '',
    imgurl: app.globalData.imgurl,
    is_fenxiaoshang: app.globalData.is_fenxiaoshang,
    user_id: app.globalData.user_id,
    sharebol: false,
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
      lookmore: "查看全部"
    },
    cardInfo: {
      avater: "https://t2.hddhhn.com/uploads/tu/201806/9999/91480c0c87.jpg", //需要https图片路径
      qrCode: "https://i4.hexun.com/2018-07-05/193365388.jpg", //需要https图片路径
      GoodsName: '这是商品名称', //商品名称
      Gprice: "500.00", //职位
      Mobile: "13888888888", //手机
    }
  },
  share() {
    var that = this
    this.setData({
      sharebol: !this.data.sharebol
    })
    wx.showToast({
      title: '请稍等，海报生成中',
      icon: 'none',
    })
    // // 获取二维码，页面加载时已经获取
    // that.getErWeiMa()
    // 下载商品图片
    that.getAvaterInfo()
    // 商品名称
    let goodsname = this.data.goodsDetail.g_name
    // 商品价格
    let gprice = this.data.goodsDetail.g_price

    Object.assign(that.data.cardInfo, {
      "GoodsName": goodsname,
      "Gprice": gprice
    })
  },

  closeSharePop() {
    var that = this
    that.setData({
      sharebol: false
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/addAddress/addAddress',
    })
  },
  // 商品拼团列表
  getGroupList() {
    api.goodsGroupList({
      data: {
        token: app.globalData.token,
        goodsid: this.data.goodsid
      },
      success: (res) => {
        console.log(res.data)
        var groupList = res.data.data.list
        this.setData({
          goodsGroupList: groupList,
          addGroupPepoleNum: res.data.data.num
        })
        if (groupList.length != 0) {
          for (var i = 0; i < groupList.length; i++) {
            console.log(groupList)
            // 转为十位时间戳
            var nowTime = parseInt(new Date().getTime() / 1000);
            var daojishi = groupList[i].expiretime - nowTime
            Object.assign(groupList[i], {
              "daojishi": daojishi
            })
            this.grouponcountdown(groupList[i].daojishi, i)
          }
        }
      }
    })
  },
  // 时间格式化输出，每1s都会调用一次,倒计时的秒数
  dateformat(micro_second) {
    // console.log(micro_second)
    if (micro_second <= 0) {
      return "该拼团已结束"
    }
    // 总秒数
    var second = Math.floor(micro_second);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟
    var min = Math.floor(second / 60 % 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒
    var sec = Math.floor(second % 60);
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;

    if (day <= 1) {
      // return "剩 " + hrStr + ":" + minStr + ":" + secStr;
      return hrStr + ":" + minStr + ":" + secStr;
    } else {
      return day + "天" + hrStr + ":" + minStr + ":" + secStr;
    }
  },
  //倒计时 //适用于商品列表倒计时，每秒执行一次/** * daojishi int 倒计时秒数 * param int 数组键 */
  grouponcountdown(daojishi, param) {
    var that = this
    var list = that.data.goodsGroupList
    // console.log(daojishi, list)
    list[param].daojishi = that.dateformat(daojishi);
    if (list[param].daojishi <= 0) {
      list[param].daojishi = "已结束"
    }
    that.setData({
      goodsGroupList: list
    })
    daojishi--; // 该函数每秒执行一次，每执行一次，秒数减1
    setTimeout(function() {
      that.grouponcountdown(daojishi, param);
    }, 1000)
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

  //1, 获取二维码
  getErWeiMa() {
    var data = {
      token: app.globalData.token
    }
    api.getErWeiMa({
      data,
      success: (res) => {
        if (res.data.code == 1) {
          // console.log(res.data.data)
          this.setData({
            erWeiMa: res.data.data
          })
        }
      }
    })
  },
  /**
   * 商品缩略图
   */
  getAvaterInfo: function() {
    wx.showLoading({
      title: '生成商品缩略中...',
      mask: true,
    });
    var that = this;
    // 商品图片
    let path = this.data.imgurl + this.data.goodsDetail.g_thumb
    wx.downloadFile({
      url: path, //商品缩略图路径
      success: function(res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          var avaterSrc = res.tempFilePath; //下载成功返回结果
          Object.assign(that.data.cardInfo, {
            "avater": avaterSrc
          })
          that.getQrCode(avaterSrc); //继续下载二维码图片
        } else {
          wx.showToast({
            title: '头像下载失败！',
            icon: 'none',
            duration: 2000,
            success: function() {
              var avaterSrc = "";
              that.getQrCode(avaterSrc);
            }
          })
        }
      }
    })
  },
  /**
   * 下载二维码图片
   */
  getQrCode: function(avaterSrc) {
    var that = this;
    wx.downloadFile({
      url: that.data.erWeiMa.url, //二维码路径
      success: function(res) {
        if (res.statusCode === 200) {
          var codeSrc = res.tempFilePath;
          Object.assign(that.data.cardInfo, {
            "qrCode": codeSrc
          })
          console.log(avaterSrc, codeSrc)         
          that.sharePosteCanvas(avaterSrc, codeSrc);
        } else {
          wx.showToast({
            title: '二维码下载失败！',
            icon: 'none',
            duration: 2000,
            success: function() {
              var codeSrc = "";
              that.sharePosteCanvas(avaterSrc, codeSrc);
            }
          })
        }
      }
    })
  },

  /**
   * 开始用canvas绘制分享海报
   * @param avaterSrc 下载的头像图片路径
   * @param codeSrc   下载的二维码图片路径
   */
  sharePosteCanvas: function(avaterSrc, codeSrc) {
    wx.showLoading({
      title: '生成图片中...',
      mask: true,
    })
    var that = this;
    var cardInfo = that.data.cardInfo; //需要绘制的数据集合
    const ctx = wx.createCanvasContext('myCanvas'); //创建画布
    var width = "";
    wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function(rect) {
      console.log(rect)
      var height = rect.height;
      var right = rect.right;
      width = rect.width * 0.8 + 25;
      var left = rect.left - 10;
      ctx.setFillStyle('#fff');
      ctx.fillRect(0, 0, rect.width, height);

      //商品图片为正方形
      if (avaterSrc) {
        console.log(avaterSrc)
        ctx.drawImage(avaterSrc, left, 20, width, width);
        ctx.setFontSize(14);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
      }

      //商品名称
      if (cardInfo.GoodsName) {
        // 绘制标题不换行
        // ctx.setFontSize(16);
        // ctx.setFillStyle('#000');
        // ctx.setTextAlign('left');
        // ctx.fillText(cardInfo.GoodsName, left, width + 40);

        // 绘制标题换行
        var text = cardInfo.GoodsName; //这是要绘制的文本
        var chr = []
        if (text.length > 17 && text.length < 37){
          chr.push(text.slice(0,18))
          chr.push(text.slice(18))
        } else if (text.length > 37) {
          chr.push(text.slice(0, 18))
          chr.push(text.slice(18, 37))
          chr.push(text.slice(37))
        }
        // console.log(text,chr)
        var temp = "";
        var row = [];
        ctx.setFontSize(16)
        ctx.setFillStyle("#000")
        for (var a = 0; a < chr.length; a++) {
          if (ctx.measureText(temp).width < 250) {
            temp += chr[a];
          } else {
            a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
            row.push(temp);
            temp = "";
          }
        }
        row.push(temp);

        //如果数组长度大于2 则截取前两个
        if (row.length > 2) {
          var rowCut = row.slice(0, 2);
          var rowPart = rowCut[1];
          var test = "";
          var empty = [];
          for (var a = 0; a < rowPart.length; a++) {
            if (ctx.measureText(test).width < 220) {
              test += rowPart[a];
            } else {
              break;
            }
          }
          empty.push(test);
          var group = empty[0] + "..." //这里只显示两行，超出的用...表示
          rowCut.splice(1, 1, group);
          row = rowCut;
        }
        // console.log(row)
        for (var b = 0; b < row.length; b++) {
          // 绘制两行标题
          ctx.fillText(row[0], left, width + 40);
          ctx.fillText(row[1], left, width + 60);
        }
        ctx.save();
      }

      //价格
      if (cardInfo.Gprice) {
        ctx.setFontSize(18);
        ctx.setFillStyle('#f00');
        ctx.setTextAlign('left');
        ctx.fillText(`￥${cardInfo.Gprice}`, left, width + 140);
      }

      //电话
      // if (cardInfo.Mobile) {
      //   ctx.setFontSize(12);
      //   ctx.setFillStyle('#666');
      //   ctx.setTextAlign('left');
      //   ctx.fillText(cardInfo.Mobile, left, width + 105);
      // }

      //  绘制二维码
      if (codeSrc) {
        console.log(codeSrc)
        ctx.drawImage(codeSrc, left + 180, width + 80, width / 3, width / 3)
        ctx.setFontSize(10);
        ctx.setFillStyle('#000');
        ctx.fillText("微信扫码或长按识别", left + 180, width + 190);
      }
      ctx.stroke();
      ctx.draw();

    }).exec()

    setTimeout(function() {
      wx.hideLoading();
    }, 1000)

  },

  /**
   * 多行文字处理，每行显示数量
   * @param text 为传入的文本
   * @param num  为单行显示的字节长度
   */
  textByteLength(text, num) {
    let strLength = 0; // text byte length
    let rows = 1;
    let str = 0;
    let arr = [];
    for (let j = 0; j < text.length; j++) {
      if (text.charCodeAt(j) > 255) {
        strLength += 2;
        if (strLength > rows * num) {
          strLength++;
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      } else {
        strLength++;
        if (strLength > rows * num) {
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      }
    }
    arr.push(text.slice(str, text.length));
    return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
  },
  //点击保存图片
  save() {
    let that = this
    //若二维码未加载完毕，加个动画提高用户体验
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    //判断用户是否授权"保存到相册"
    wx.getSetting({
      success(res) {
        console.log(res)
        //没有权限，发起授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {//用户允许授权，保存图片到相册
            console.log(res)
              that.saveShareImg();
            },
            fail() {//用户点击拒绝授权，跳转到设置页，引导用户授权
              wx.openSetting({
                success() {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                      that.saveShareImg();
                    }
                  })
                }
              })
            }
          })
        } else {//用户已授权，保存到相册
          that.saveShareImg()
        }
      }
    })
  },
  //点击保存到相册
  saveShareImg: function() {
    var that = this;
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function(res) {
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          that.setData({
            haibaoimg: tempFilePath
          })
          console.log(that.data.haibaoimg)
          wx.saveImageToPhotosAlbum({
            filePath: that.data.haibaoimg,
            success(res) {
              console.log(res)
              that.closeSharePop()
              wx.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function(res) {
                  if (res.confirm) {}
                },
                fail: function(res) {}
              })
            },
            fail: function(res) {
              wx.showToast({
                title: res.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      });
    }, 1000);
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
  goPintuan(e) {
    console.log(e)
    this.setData({
      "yaoqincantuan": true,
      "addgroupid": e.currentTarget.dataset.addgroupid,
      "surplusnum": e.currentTarget.dataset.surplusnum,
      "daojishi": e.currentTarget.dataset.daojishi
    });
    this.getGroupPepole()
  },
  getGroupPepole() {
    var data = {
      token: app.globalData.token,
      tuanid: this.data.addgroupid
    }
    api.getGroupPepole({
      data,
      success: (res) => {
        console.log(res)
        this.setData({
          groupPepoleList: res.data.data
        })
      }
    })
  },
  canyu_but() {
    this.setData({
      "yaoqincantuan": false
    });
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
  shoucang() {
    if (this.data.goodsDetail.is_shoucang == 0) {
      console.log(123)
      api.usershoucang({
        data: {
          id: this.data.goodsDetail.id,
          token: app.globalData.token,
          type: this.data.goodsDetail.type
        },
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          if (res.data.code == 1) {
            Object.assign(this.data.goodsDetail, {
              'is_shoucang': 1
            })
            wx.showToast({
              title: '收藏成功',
              icon: 'none',
              duration: 2000,
            })
            this.setData({
              goodsDetail: this.data.goodsDetail
            })
          } else {
            console.log(res.data.msg)
          }
        },
      })
    }
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
    let goodsDetails = this.data.goodsDetail
    if (goodsDetails.buytype == "1") {
      Object.assign(goodsDetails, {
        'buygoodsnum': this.data.productNum,
        "buysprice": this.data.goodsDetail.g_tuan_price,
        "buytype": this.data.goodsDetail.buytype
      })
    } else {
      Object.assign(goodsDetails, {
        'buygoodsnum': this.data.productNum,
        "buysprice": this.data.goodsDetail.price,
        "buytype": this.data.goodsDetail.buytype
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
      url: '../payOrder/payOrder',
    })
    wx.setStorageSync('goodsDetail', this.data.goodsDetail);
    wx.setStorageSync('productSpecification', this.data.productSpecification);
    wx.setStorageSync('productNum', this.data.productNum);
    wx.setStorageSync('address', this.data.morengdizhi);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(options)
    that.setData({
      goodsid: options.goodsid
    })
    // 判断是否登录
    if(!app.globalData.token) {
      if (parseInt(options.skipdetail)==1) {
        wx.navigateTo({
          url: '/pages/impower/impower?skipdetail='+ 1 + "&goodsid="+that.data.goodsid + "&fid="+options.fid,
        })
      }else{
        wx.navigateTo({
          url: '/pages/impower/impower',
        })
      }
    }else{
      var language = wx.getStorageSync("language")
      this.setData({
        language: language
      })
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
      // 获取二维码
      that.getErWeiMa()
      // 获取地址
      that.getAddress()
      console.log(options, that.data.user_id)
      let goodsid = options.goodsid
      let type = options.type
      if (options.fenxiao) {
        that.setData({
          fenxiao: options.fenxiao
        })
      }
      that.setData({
        goodsid: goodsid,
        type: type
      })
      // 获取商品拼团列表
      that.getGroupList()
      // 获取商品评价
      that.getGoodsCommentList()
      // 获取商品详情
      api.goodsDetail({
        data: {
          token: app.globalData.token,
          goodsid: goodsid,
        },
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        success: (res) => {
          console.log(res)
          if (res.data.code == 1) {
            var newGoodsDetail = res.data.data
            var str = res.data.data.g_imgs
            if (str) {
              var strs = new Array(); //定义一数组
              strs = str.split(",")
              Object.assign(newGoodsDetail, {
                "g_imgs": strs
              })
            }
            var beifenbi = ""
            beifenbi = parseInt(Number(res.data.data.g_sellnum) / Number(res.data.data.g_stock) * 100)
            that.setData({
              goodsDetail: newGoodsDetail,
              banner: strs,
              beifenbi: beifenbi,
              concent: res.data.data.content,
            })
            WxParse.wxParse('concent', 'html', res.data.data.content, that);
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
  payOrder(e) {
    console.log(e)
    var that = this
    var buysprice = e.currentTarget.dataset.goodsprice
    var buytype = e.currentTarget.dataset.buytype
    Object.assign(that.data.goodsDetail, {
      "buysprice": buysprice,
      "buytype": buytype
    })
    if (!that.data.goodsDetail.type) {
      Object.assign(that.data.goodsDetail, {
        "type": 1
      })
    }
    if (that.data.productSpecification) {
      var id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: '../payOrder/payOrder',
      })
      wx.setStorageSync('goodsDetail', that.data.goodsDetail);
      wx.setStorageSync('address', that.data.morengdizhi);
    } else {
      that.guaige_but()
    }
  },
  addGroup(e) {
    var that = this
    console.log(that.data.addgroupid, e)
    var buysprice = e.currentTarget.dataset.goodsprice
    var buytype = e.currentTarget.dataset.buytype
    Object.assign(that.data.goodsDetail, {
      "buysprice": buysprice,
      "buytype": buytype,
      "addgroupid": that.data.addgroupid,
      "buygoodsnum": 1
    })
    if (!that.data.goodsDetail.type) {
      Object.assign(that.data.goodsDetail, {
        "type": 1,
      })
    }
    // 参与拼团数量默认 1个
    wx.setStorageSync('productNum', 1);
    console.log(that.data.goodsDetail)
    wx.navigateTo({
      url: '../payOrder/payOrder',
    })
    wx.setStorageSync('goodsDetail', that.data.goodsDetail);
    wx.setStorageSync('address', that.data.morengdizhi);
    // if (that.data.productSpecification) {
    //   var id = e.currentTarget.dataset.id
    //   console.log(id)
    //   wx.navigateTo({
    //     url: '../payOrder/payOrder',
    //   })
    //   wx.setStorageSync('goodsDetail', that.data.goodsDetail);
    //   wx.setStorageSync('address', that.data.morengdizhi);
    // } else {
    //   that.guaige_but()
    // }
  },
  pinTuanOrder(e) {
    var that = this
    var buysprice = e.currentTarget.dataset.goodsprice
    var buytype = e.currentTarget.dataset.buytype
    Object.assign(that.data.goodsDetail, {
      "buysprice": buysprice,
      "buytype": buytype
    })
    if (that.data.productSpecification) {
      var id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: '../payOrder/payOrder',
      })
      wx.setStorageSync('goodsDetail', that.data.goodsDetail);
      wx.setStorageSync('address', that.data.morengdizhi);
    } else {
      that.guaige_but()
    }
  },
  // 监听页面显示
  onShow: function() {
    var that = this
    that.getAddress()
  },
  onShareAppMessage: function () {
    var that = this
    // 将上级id和产品id保存
    app.globalData.fid = that.data.erWeiMa.fid
    app.globalData.goodsid = that.data.goodsDetail.id
    console.log(app.globalData.fid)
    return {
      title: that.data.goodsDetail.g_name,
      path: '/pages/spellParticulars/spellParticulars?goodsid=' + that.data.goodsDetail.id + "&type=" + 1 + "&fenxiao=" + true + "&skipdetail=" + 1 + "&fid=" + that.data.erWeiMa.fid,
      success: function (res) {
        console.log(res)
      }
    }
  }
})