const URL = 'https://api.douban.com/v2/';
//请求数据
function http(path,data,callback){
  wx.request({
    url: URL+path,
    data:data,
    success:function(res){
      callback&&callback(res)
    }.bind(this)
  })
}
//评分模块
function starsFormat(score){
  var arr = [];
  var i = 0;
  var int = ~~score;
  var star = score - 0.4 > int?int+1:int;//本身-0.4大于本身取整则划为上一档，否则化为自身这一档
  var rank = star/2;//0 1 1.5 2 2.5 3 3.5 ...
  while(i<5){
    if (i < ~~rank) {
      arr.push(1);
    } else if (rank > ~~rank && arr.indexOf(0.5) == -1) {
      arr.push(0.5);
    } else {
      arr.push(0);
    }
    i++;
  }
  return arr;
}

//var time = new Date() tiem.format('yyyy-MM-dd ww H:m')
function initTimeFormat() {
  Date.prototype.format = function (format) {
    var o = {
      "M+": this.getMonth() + 1,  //月
      "d+": this.getDate(),   //日
      "h+": this.getHours(),  //时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(),  //秒

    }
    if (/(y+)/.test(format)) { //年
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    if (/(w+)/.test(format)) { //年
      var week = '';
      switch (this.getDay() + "") {
        case '0':
          week = '星期天';
          break;
        case '1':
          week = '星期一';
          break;
        case '2':
          week = '星期二';
          break;
        case '3':
          week = '星期三';
          break;
        case '4':
          week = '星期四';
          break;
        case '5':
          week = '星期五';
          break;
        case '6':
          week = '星期六';
          break;
        default:
          break;
      }
      format = format.replace(RegExp.$1, week);

    }
    for (var key in o) {
      if (new RegExp("(" + key + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[key] : ("00" + o[key]).substr(("" + o[key]).length))
      }
    }
    return format;
  }

}
module.exports = {
  http:http,
  starsFormat: starsFormat,
  initTimeFormat: initTimeFormat
}
