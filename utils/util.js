const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 时间格式化
function formatTimeOne(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTimeTwo(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  
  var date = new Date(number * 1000);
  
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
//倒计时
function countDown(that) {
  var endTime = new Date(that.data.end_time.replace(/-/g, '/')).getTime();
  var nowTime = new Date().getTime();
  var total_second = endTime - nowTime;
  that.setData({
    clock: dateformat(total_second)
  });
  if (total_second <= 0) {
    that.setData({
      clock: "已结束"
    });
  }
  setTimeout(function () {
    countDown(that);
  }, 1000)
}

// 时间格式化输出，每1s都会调用一次,倒计时的秒数
function dateformat(micro_second) {
  if (micro_second==0) {
    return "拍卖结束"
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
    return "剩 " + hrStr + ":" + minStr + ":" + secStr;
  } else {
    return "剩" + day + "天" + hrStr + ":" + minStr + ":" + secStr;
  }
}

//时分秒转为时间戳

function timestamp(time) {
  var s = 0;
  var hour = time.split(':')[0];
  var min = time.split(':')[1];
  var sec = time.split(':')[2];
  s = Number(hour * 3600) + Number(min * 60) + Number(sec);
  return s;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTimeOne: formatTimeOne,
  formatTimeTwo: formatTimeTwo,
  dateformat: dateformat,
  timestamp: timestamp
}
