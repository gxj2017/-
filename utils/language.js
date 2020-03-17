// utils/language.js.js
var Chinese = {
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
  // 个人中心数据
  myPageData: {
    address_title: "地址管理",
    collect_title: "我的收藏",
    language_title: "语言切换",
    myorder: "我的订单",
    lookmore: "查看所有订单",
    unpay: "待付款",
    unsend: "待发货",
    sended: "已发货",
    total_commission: "累计佣金",
    balance: "账户余额"
  },
  // 我的订单菜单
  tabList: ['全部', '待付款', '待发货', '已发货', '待评价'],
  btnAndStatus: {
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
    notpickup: "待取货",
    kuaidi: "快递"
  },
  // 我的团
  navbar: ['我发起的团', '我参与的团'],
  teambar: ["全部", "待成团", "已成团"],
  grouppage: {
    lookdetail: "查看详情",
    groupnum: "人团",
    cha: "还差",
    chengtuan: "单成团"
  },
  groupDetail: {
    addgroupseccess: "参团成功",
    xuyao: "还需要",
    cantuan: "人来参团",
    share: "快去邀请小伙伴参与吧！",
    tuan: "人团",
    grouppeploe: "已参团的人",
    pintuan: "人拼团成功",
    tuan_end: "拼团已结束",
    tuan_price: "拼团价",
    yaoqing: "邀请好友参团",
    shengyu: "剩余",
    end: "结束"
  },
  // 我的分销
  navbar_fenxiao: ['一级分销', '二级分销'],
  // 普通商品详情页
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
    jingzheng: "人在竞争，可直接参与"
  },
  // 支付页面
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
  },
  // 秒杀页面
  miaoshapage: {
    snap_up: "开枪",
    time_has_not_yet: "未到开抢时间",
    buy: "购买",
    end: "已结束",
    miaosha_end: "秒杀结束",
    sold: "已抢",
    jian: "件"
  },
  // 在线任务页面
  taskpage: {
    tocomplete: "去完成",
    ranking: "排行榜",
    title_bg: "完成任务得佣金",
    picktask: "快来领取你的任务吧！",
    task_specification: "任务说明",
    task_content: "这是任务说明文字介绍，请仔细阅读。"
  },
  // 抽奖
  choujiangpage: {
    bg_title1: "幸运大转盘",
    bg_title2: "天天有好运",
    myintegral: "我的积分",
    lucky_draw: "立即抽奖",
    current_balance: "您的当前余额",
    integral: "积分",
    lookLuckyDraw: "查看我的抽奖",
    activity_description: "活动说明",
    description: [
      "1.用户每次抽奖会消耗10积分",
      "2.如果用户所抽奖品为卡片，集齐5中不同类型的卡片，可兑换商品",
      "3.如果用户所抽奖品不是卡片，奖品即为用户所抽中物品"
    ]
  }
}

// 意大利语言Italian

var Italian = {
  categories: [{
      id: 1,
      imgurl: "../../images/categories(8).png",
      text: "Diventare distributori",
      src: "/pages/distributorPartner/distributorPartner"
    },
    {
      id: 2,
      imgurl: "../../images/categories(1).png",
      text: "La pac secondi uccisa",
      src: "/pages/seckill/seckill"
    },
    {
      id: 3,
      imgurl: "../../images/categories(2).png",
      text: "Autorizzazione di marca",
      src: "/pages/clearanceSale/clearanceSale"
    },
    {
      id: 4,
      imgurl: "../../images/categories(3).png",
      text: "Sconti di marca",
      src: "/pages/discount/discount"
    },
    {
      id: 5,
      imgurl: "../../images/categories(4).png",
      text: "9.9 Effettuare vendite",
      src: "/pages/specialSale/specialSale"
    },
    {
      id: 6,
      imgurl: "../../images/categories(5).png",
      text: "Compiti online",
      src: "/pages/task/task"
    },
    
    {
      id: 8,
      imgurl: "../../images/categories(7).png",
      text: "Dischi ritirare",
      src: "/pages/honoree/honoree"
    }
  ],
  // 个人中心数据
  myPageData: {
    address_title: "Indirizzo di gestione",
    collect_title: "La mia collezione",
    language_title: "italia",
    myorder: "I miei ordini",
    lookmore: "Controllare tutte le ordinazioni",
    unpay: "Pagamenti in attesa",
    unsend: "In attesa di una spedizione",
    sended: "Già la spedizione",
    total_commission: "Totale commissione",
    balance: "saldo"
  },
  // 我的订单菜单
  tabList: ['Tutti ordini', 'Pagamenti in attesa', 'Quinte disponibil', 'Già la spedizione', 'Da valutare'],
  btnAndStatus: {
    quxiao: "Cancellare l’ordine",
    pay: "pagamenti",
    unpay: "Pagamenti in attesa",
    unsend: "Quinte disponibil",
    sended: "Già la spedizione",
    unevulation: "Da valutare",
    tuikuanbtn: "Domande di rimborso",
    tixingfahuo: "Ricorda la spedizione",
    chakanwuliu: "Visualizzare la logistica",
    confirm: "Conferma di ricevimento",
    delorder: "Cancellare ordini",
    evaluation: "valutazione",
    complete: "completato",
    tihuoway: "Al negozio dai",
    pickup: "Sono dai",
    notpickup: "Attesa dai",
    kuaidi: "corriere"
  },
  // 我的团
  navbar: ['Ho avviato', 'Ho la partecipazione'],
  teambar: ["totale", "Attesa dell’adesione", "Hanno già aderito"],
  grouppage: {
    lookdetail: "Guarda i dettagli",
    groupnum: "persone",
    cha: "E’ ancora peggio di ",
    chengtuan: " monogruppi"
  },
  groupDetail: {
    addgroupseccess: "Osservabili successo",
    xuyao: "Sono necessarie altre ",
    cantuan: " persone per partecipare al gruppo",
    share: "Andate presto ad invitare i partner più piccoli a partecipare!",
    tuan: "gruppi di persone",
    grouppeploe: "Presidente. — ha facoltà di parlare l’onorevole pannella",
    pintuan: "Anche il gruppo di 12 persone ha avuto successo",
    tuan_end: "Scrive di successo",
    tuan_price: "Scrive di prezzo",
    yaoqing: "Invito a partecipare al gruppo amici amici",
    shengyu: "residuo",
    end: "fine"
  },
  // 我的分销
  navbar_fenxiao: ['Agente a livello', 'Agente secondario'],
  // 普通商品详情页
  sellparticulars: {
    kefu: "servizio",
    collect: "collezioni",
    onlypay: "separatamente",
    pintuan: "Scrive reggimento",
    tuwenDetail: "Dettagli grafica",
    address: "indirizzo",
    add_address: "Indirizzo di ricevimento aggiunto",
    guige: "Le specifiche",
    canshu: "parametri",
    select_guige: "Scelte specifiche",
    lookgoodscanshu: "Esame dei parametri relativi alle merci",
    goodsEvaluation: "Valutazione delle merci",
    shuliang: "numero",
    jian: "cosa",
    comfirm: "confermare",
    share: "condividere",
    onebottle: "Una bottiglia",
    buy: "acquisti",
    guigecanshu: "convenzionali"
  },
  auctionParticularsPage: {
    kefu: "servizio",
    tuwenDetail: "Dettagli grafica",
    address: "indirizzo",
    add_address: "Indirizzo di ricevimento aggiunto",
    guige: "Le specifiche",
    canshu: "parametri",
    select_guige: "Scelte specifiche",
    lookgoodscanshu: "Esame dei parametri relativi alle merci",
    goodsEvaluation: "Valutazione delle merci",
    shuliang: "numero",
    jian: "cosa",
    comfirm: "confermare",
    share: "condividere",
    onebottle: "Una bottiglia",
    jingpaibtn: "Immediately the bidding",
    lookmore: "Visualizzare la totale",
    jingzheng: "Sta concorrenza"
  },
  // 支付页面
  payorderpage: {
    consignee: "Ricevimento ren",
    delivery_address: "Ricevimento indirizzo",
    add_address: "Indirizzo di ricevimento aggiunto",
    needtopay: "Per pagare",
    immediate_payment: "Pagamento immediato",
    buynum: "Acquistare quantitativi",
    jian: "cosa",
    wechatpay: "Wechat pagamento",
    tuijian: "raccomandata",
    sendway: "Modalità di distribuzione",
    quhuoaddress: "Dai l’indirizzo"
  },
  // 秒杀页面
  miaoshapage: {
    snap_up: "sfuggire",
    time_has_not_yet: "Non a tempo",
    buy: "acquisti",
    end: "Sono stati chiusi",
    miaosha_end: "Secondi ucciso fine",
    sold: "Ha venduto",
    jian: "cosa"
  },
  // 在线任务页面
  taskpage: {
    tocomplete: "A completamento",
    ranking: "classifica",
    title_bg: "Per l’assolvimento dei compiti è possibile ottenere una commissione",
    picktask: "Prendetevi il vostro compito!",
    task_specification: "Descrizione dei compiti",
    task_content: "Si tratta di una nota introduttiva che va letta con attenzione."
  },
  // 抽奖
  choujiangpage: {
    bg_title1: "Fortunatamente si girano",
    bg_title2: "Buona fortuna ogni giorno",
    myintegral: "Il mio punteggio",
    lucky_draw: "vincite",
    current_balance: "Saldo delle partite correnti",
    integral: "point",
    lookLuckyDraw: "Controlla la mia estrazione",
    activity_description: "Rendiconto di attività",
    description: [
      "1.L’utente consuma 10 punti per ogni estrazione",
      "2.Se il prezzo pagato dall’utente è un cartoncini, si possono combinare vari tipi di cartoncini del 5.",
      "3.Se il premio assegnato dall’utente non è una tessera, il premio è un oggetto estratto dall’utente."
    ]
  }
}



// 英语

var English = {
  categories: [{
      id: 1,
      imgurl: "../../images/categories(8).png",
      text: "Become a distributor",
      src: "/pages/distributorPartner/distributorPartner"
    },
    {
      id: 2,
      imgurl: "../../images/categories(1).png",
      text: "Limited-time seconds kill",
      src: "/pages/seckill/seckill"
    },
    {
      id: 3,
      imgurl: "../../images/categories(2).png",
      text: "big treatment",
      src: "/pages/clearanceSale/clearanceSale"
    },
    {
      id: 4,
      imgurl: "../../images/categories(3).png",
      text: "Brand discount",
      src: "/pages/discount/discount"
    },
    {
      id: 5,
      imgurl: "../../images/categories(4).png",
      text: "9.9 special sale",
      src: "/pages/specialSale/specialSale"
    },
    {
      id: 6,
      imgurl: "../../images/categories(5).png",
      text: "Online task",
      src: "/pages/task/task"
    },
    
    {
      id: 8,
      imgurl: "../../images/categories(7).png",
      text: "Rotary award",
      src: "/pages/honoree/honoree"
    }
  ],

  // 个人中心数据
  myPageData: {
    address_title: " address administration",
    collect_title: "my favorite",
    language_title: "language",
    myorder: "My order",
    lookmore: "View all orders",
    unpay: "Waiting for payment",
    unsend: "en_unsend",
    sended: "Wait for delivery",
    total_commission: "total commission",
    balance: "account balance"
  },
  // 我的订单菜单
  tabList: ['Tutti ordini', 'Waiting for payment', 'Wait for delivery', 'delivereddai', 'Waiting for evaluation'],
  btnAndStatus: {
    quxiao: "cancellation of order",
    pay: "payment",
    unpay: "Waiting for payment",
    unsend: "Wait for delivery",
    sended: "delivereddai",
    unevulation: "Waiting for evaluation",
    tuikuanbtn: "application for drawback",
    tixingfahuo: "Remind the delivery",
    chakanwuliu: "check the logistics",
    confirm: "confirm receipt",
    delorder: "Delete the order",
    evaluation: "evaluate",
    complete: "completed",
    tihuoway: "To store pickup",
    pickup: "Have take goods",
    notpickup: "Waiting for the pickup",
    kuaidi: "express"
  },
  // 我的团
  navbar: ['spell group', 'Participate in group'],
  teambar: ["all", "Waiting ", "already"],
  grouppage: {
    lookdetail: "view details",
    groupnum: "person",
    cha: "We're still ",
    chengtuan: " blocks away"
  },
  groupDetail: {
    addgroupseccess: "Tuxedo success",
    xuyao: "still need",
    cantuan: " people to tuxedo",
    share: "Invite your friends to join us!",
    tuan: "people group",
    grouppeploe: "People who are already in the group",
    pintuan: "people are needed to join the group successfully",
    tuan_end: "The tour is over",
    tuan_price: "Spell group price",
    yaoqing: "Invite friends to join the group",
    shengyu: "residue",
    end: "over"
  },
  // 我的分销
  navbar_fenxiao: ['One class representative', 'The secondary agent'],
  // 普通商品详情页
  sellparticulars: {
    kefu: "servizio",
    collect: "collezioni",
    onlypay: "separatamente",
    pintuan: "spell group",
    tuwenDetail: "Graphic details",
    address: "address",
    add_address: "Please add address",
    guige: "specification",
    canshu: "parameter",
    select_guige: "Choose specifications",
    lookgoodscanshu: "View detailed product parameters",
    goodsEvaluation: "Reviews",
    shuliang: "quantityyi",
    jian: "piece",
    comfirm: "notarize",
    share: "share",
    onebottle: "A bottle of",
    buy: "buy",
    guigecanshu: "routine",
  },
  auctionParticularsPage: {
    kefu: "servizio",
    tuwenDetail: "Dettagli grafica",
    address: "indirizzo",
    add_address: "Indirizzo di ricevimento aggiunto",
    guige: "Le specifiche",
    canshu: "parametri",
    select_guige: "Scelte specifiche",
    lookgoodscanshu: "Esame dei parametri relativi alle merci",
    goodsEvaluation: "Valutazione delle merci",
    shuliang: "numero",
    jian: "cosa",
    comfirm: "confermare",
    share: "condividere",
    onebottle: "Una bottiglia",
    jingpaibtn: "Offerte immediatamente",
    lookmore: "Look at all",
    jingzheng: " people are competing"
  },
  // 支付页面
  payorderpage: {
    consignee: "consignee",
    delivery_address: "delivery address",
    add_address: "Please add address",
    needtopay: "Need to pay",
    immediate_payment: "immediate payment",
    buynum: "purchase quantity",
    jian: "piece",
    wechatpay: "WeChat Pay",
    tuijian: "recommend",
    sendway: "Select Shipping Method",
    quhuoaddress: "pick up address"
  },
  // 秒杀页面
  miaoshapage: {
    snap_up: "snap up",
    time_has_not_yet: "Time has't yet",
    buy: "snap up",
    end: "Has ended",
    miaosha_end: "Seconds kill end",
    sold: "sold out",
    jian: "piece"
  },
  // 在线任务页面
  taskpage: {
    tocomplete: "To Complete",
    ranking: "Ranking List",
    title_bg: "A commission will be given on the completion of the task",
    picktask: "Come and get your quests!",
    task_specification: "task specification",
    task_content: "This is the text of the mission statement. Please read it carefully."
  },
  // 抽奖
  choujiangpage: {
    bg_title1: "wheel of fortune",
    bg_title2: "Good luck every day",
    myintegral: "My bonus points",
    lucky_draw: "lucky draw",
    current_balance: "Your current balance",
    integral: "integral",
    lookLuckyDraw: "View my sweepstakes",
    activity_description: "activity description",
    description: [
      "1.Each draw costs the user 10 points",
      "2.If the prize drawn by the user is a card, collect 5 different types of CARDS and redeem the goods",
      "3.If the prize drawn by the user is not a card, the prize is the item drawn by the user"
    ]
  }
}


// 定义数据出口
module.exports = {
  Chinese: Chinese,
  Italian: Italian,
  English: English
}