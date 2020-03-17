//服务器地址
// const localURL = 'http://192.168.1.254/api/';
const localURL = 'https://wine.gengyouplay.cn/api/';
const wxRequest = (params, url) => {
  wx.request({
    url,
    method: params.method || 'GET',
    data: params.data || {},
    header: params.header || {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        // params.complete(res);
      }
    },
  });
};

//登录接口
const login = (params) => {
  wxRequest(params, `${localURL}login/login`);
}
// 获取用户信息
const userinfo = (params) => {
  wxRequest(params, `${localURL}login/getUserInfo`);
}
//选择
const question = (params) => {
  wxRequest(params, `${localURL}question`);
}
//常识
const changshi = (params) => {
  wxRequest(params, `${localURL}changshi`);
}
//收藏
const shoucang = (params) => {
  wxRequest(params, `${localURL}shoucang`);
}
//轮播图
const banner = (params) => {
  wxRequest(params, `${localURL}banner/index`);
}
//抽奖列表
const baoxianglist = (params) => {
  wxRequest(params, `${localURL}baoxiang/list`);
}
//用户抽奖
const baoxiangindex = (params) => {
  wxRequest(params, `${localURL}baoxiang/index`);
}
//可兑换商品兑换列表
const duijiangList = (params) => {
  wxRequest(params, `${localURL}baoxiang/huanGoods`);
}
//抽奖记录列表
const choujiangLogList = (params) => {
  wxRequest(params, `${localURL}baoxiang/jiangList`);
}
//所集卡片列表
const cardsList = (params) => {
  wxRequest(params, `${localURL}baoxiang/kapianList`);
}
//兑奖记录
const yiduigoodsList = (params) => {
  wxRequest(params, `${localURL}baoxiang/duihuanList`);
}
//兑奖商品
const exchangeGoods = (params) => {
  wxRequest(params, `${localURL}baoxiang/duihuan`);
}
//商品分类列表
const categoryindex = (params) => {
  wxRequest(params, `${localURL}category/index`);
}
//根据分类获取商品列表
const getGoodsList = (params) => {
  wxRequest(params, `${localURL}category/getGoodsList`);
}
//商品详情
const goodsDetail = (params) => {
  wxRequest(params, `${localURL}goods/goodsDetail`);
}
//商品详情-评论列表
const goodsCommentList = (params) => {
  wxRequest(params, `${localURL}goods/getCommentList`);
}
//普通商品团购列表
const goodsGroupList = (params) => {
  wxRequest(params, `${localURL}goods/getGroupList`);
}
//升级分销商
const upFenxiao = (params) => {
  wxRequest(params, `${localURL}distributor/upFenxiao`);
}
//购买分销商
const buyFenxiao = (params) => {
  wxRequest(params, `${localURL}distributor/getFenxiao`);
}
//秒杀商品列表
const miaolist = (params) => {
  wxRequest(params, `${localURL}category/miaolist`);
}
//秒杀时间段列表
const getmiaoGoodsList = (params) => {
  wxRequest(params, `${localURL}category/getmiaoGoodsList`);
}
//秒杀商品详情
const temaimiaosha = (params) => {
  wxRequest(params, `${localURL}temai/miaosha`);
}
//9块9商品列表
const temai = (params) => {
  wxRequest(params, `${localURL}temai/index`);
}
//9块9商品详情
const temaiDetail = (params) => {
  wxRequest(params, `${localURL}temai/temaiDetail`);
}
//名品折扣列表
const zhekouList = (params) => {
  wxRequest(params, `${localURL}category/zhekou`);
}
//名品折扣详情
const zhekougoods = (params) => {
  wxRequest(params, `${localURL}goods/zhekou`);
}
//品牌清仓列表
const qingcangList = (params) => {
  wxRequest(params, `${localURL}qingcang/index`);
}
//品牌清仓详情
const qingcangGoods = (params) => {
  wxRequest(params, `${localURL}qingcang/goodsDetail`);
}
//分销商商品列表
const fenxiaolist = (params) => {
  wxRequest(params, `${localURL}fenxiaogoods/index`);
}
//分销商商品详情
const fenxiaogoods = (params) => {
  wxRequest(params, `${localURL}fenxiaogoods/goodsDetail`);
}
//分销商身份回调
const fenxiaoPepole = (params) => {
  wxRequest(params, `${localURL}distributor/this_Up`);
}
//商品搜索
const search = (params) => {
  wxRequest(params, `${localURL}goods/seachGoods`);
}
//添加地址
const address = (params) => {
  wxRequest(params, `${localURL}addre/address`);
}
//获取地址列表
const adrelist = (params) => {
  wxRequest(params, `${localURL}addre/adrelist`);
}
//获取地址
const getaddress = (params) => {
  wxRequest(params, `${localURL}addre/getid`);
}
//获取默认地址
const is_deaddress = (params) => {
  wxRequest(params, `${localURL}addre/is_de`);
}
//修改地址
const editAdr = (params) => {
  wxRequest(params, `${localURL}addre/editAdr`);
}
//删除地址
const deleteAdr = (params) => {
  wxRequest(params, `${localURL}addre/del`);
}
//竞拍商品列表
const paimaiIndex = (params) => {
  wxRequest(params, `${localURL}paimai/index`);
}
//竞拍商品详情
const paimaigoodsDetail = (params) => {
  wxRequest(params, `${localURL}paimai/goodsDetail`);
}
//竞拍人员列表
const paimaiPersonList = (params) => {
  wxRequest(params, `${localURL}jingpai/pai_list`);
}
//竞拍支付
const paimaiPay = (params) => {
  wxRequest(params, `${localURL}jingpai/index`);
}
//竞拍金额
const paimaiMoney = (params) => {
  wxRequest(params, `${localURL}jingpai/showNeedMoney`);
}
//支付调试
const pay = (params) => {
  wxRequest(params, `${localURL}pay/buyGoods`);
}
//支付
const pays = (params) => {
  wxRequest(params, `${localURL}wxpay/index`);
}

//收藏商品
const usershoucang = (params) => {
  wxRequest(params, `${localURL}shoucang/index`);
}
//取消收藏
const delshoucang = (params) => {
  wxRequest(params, `${localURL}shoucang/delgoods`);
}
//收藏列表
const shoucanglist = (params) => {
  wxRequest(params, `${localURL}shoucang/shoucanglist`);
}
//全部订单
const allOrder = (params) => {
  wxRequest(params, `${localURL}orders/getAllOrders`);
}
//待付款订单
const unPayOrder = (params) => {
  wxRequest(params, `${localURL}orders/toPayOrders`);
}
//待发货订单
const unSendOrder = (params) => {
  wxRequest(params, `${localURL}orders/toSendOrders`);
}
//待发货订单
const sendOrder = (params) => {
  wxRequest(params, `${localURL}orders/toConfirmOrders`);
}
//待评价订单
const commentOrder = (params) => {
  wxRequest(params, `${localURL}orders/toCommentOrders`);
}
//取消订单
const cancelOrder = (params) => {
  wxRequest(params, `${localURL}orders/cancelOrder`);
}
//删除订单
const delOrder = (params) => {
  wxRequest(params, `${localURL}orders/delOrder`);
}
//确认收货
const confirmOrder = (params) => {
  wxRequest(params, `${localURL}orders/confirmOrder`);
}
//商品评价标签
const goodsEvaluationTag = (params) => {
  wxRequest(params, `${localURL}orders/getLabel`);
}
//订单详情
const orderDetail = (params) => {
  wxRequest(params, `${localURL}orders/orderDetails`);
}
//上传图片
const uploadPic = (params) => {
  wxRequest(params, `${localURL}common/upload`);
}
//订单评价
const sendGoodsEvaluation = (params) => {
  wxRequest(params, `${localURL}orders/orderComment`);
}
//一级分销列表
const oneFenList = (params) => {
  wxRequest(params, `${localURL}fenxiao/oneFenList`);
}
//一级分销列表
const twoFenList = (params) => {
  wxRequest(params, `${localURL}fenxiao/twoFenList`);
}
//获取个人积分及佣金总数
const jifenAndYongjin = (params) => {
  wxRequest(params, `${localURL}person/getPersonInfo`);
}
//佣金日志
const yongJinLog = (params) => {
  wxRequest(params, `${localURL}person/getIncomeLog`);
}
//我的团
const myGroup = (params) => {
  wxRequest(params, `${localURL}mygroup/getMyGroupList`);
}
//获取拼团人员
const getGroupPepole = (params) => {
  wxRequest(params, `${localURL}mygroup/getGroupPerson`);
}
//线上任务列表
const getOnlinTaskList = (params) => {
  wxRequest(params, `${localURL}renwu/index`);
}
//线上任务排行榜
const onlineTaskRanking = (params) => {
  wxRequest(params, `${localURL}renwu/getRank`);
}

//获取二维码
const getErWeiMa = (params) => {
  wxRequest(params, `${localURL}erweima/index`);
}




//对外暴露  该接口
module.exports = {
  question,
  login,
  userinfo,
  changshi,
  shoucang,
  banner,
  baoxianglist,
  baoxiangindex,
  categoryindex,
  getGoodsList,
  goodsDetail,
  upFenxiao,
  buyFenxiao,
  miaolist,
  temai,
  temaimiaosha,
  getmiaoGoodsList,
  temaiDetail,
  zhekouList,
  zhekougoods,
  qingcangList,
  qingcangGoods,
  fenxiaolist,
  fenxiaogoods,
  fenxiaoPepole,
  search,
  address,
  adrelist,
  getaddress,
  editAdr,
  deleteAdr,
  paimaiIndex,
  paimaigoodsDetail,
  paimaiPersonList,
  paimaiPay,
  paimaiMoney,
  pay,
  pays,
  usershoucang,
  delshoucang,
  shoucanglist,
  is_deaddress,
  allOrder,
  unPayOrder,
  unSendOrder,
  sendOrder,
  commentOrder,
  cancelOrder,
  delOrder,
  confirmOrder,
  orderDetail,
  goodsEvaluationTag,
  sendGoodsEvaluation,
  uploadPic,
  oneFenList,
  twoFenList,
  goodsCommentList,
  jifenAndYongjin,
  yongJinLog,
  goodsGroupList,
  myGroup,
  duijiangList,
  choujiangLogList,
  cardsList,
  yiduigoodsList,
  exchangeGoods,
  getGroupPepole,
  getOnlinTaskList,
  onlineTaskRanking,
  getErWeiMa
};
