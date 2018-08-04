// pages/book/book.js
const util = require("../../util/util.js");
const bookInitData = require("./bookData/initData.js");
var timer = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    placeholder:"请输入书名",
    inputValue:"",
    msg:"",
    dataList:[],
    initBook:["三杯茶","自控力","天才在左疯子在右","追寻生命的意义","花田半亩","看见","八分钟的温暖","岛上书店","你要配得上自己所受的苦","一个人的朝圣"]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化默认数据
    var data = bookInitData.bookData;
    var dataList = [];
    data.forEach((item, index) => {
      dataList.push({
        id: item.books[0].id,
        cover: item.books[0].image,
        title: item.books[0].title.charAt(8) ? item.books[0].title.substr(0, 8) + "..." : item.books[0].title,
        star: util.starsFormat(item.books[0].rating.average),
        rating: item.books[0].rating.average,
        bookType: ("book/" + item.books[0].author[0] + "/" + item.books[0].pubdate).charAt(25) ? ("book/" + item.books[0].author[0] + "/" + item.books[0].pubdate).substr(0,25) + "..." : "book/" + item.books[0].author[0] + "/" + item.books[0].pubdate,
        write: item.books[0].author[0],
        abstract: item.books[0].summary.charAt(40)?item.books[0].summary.substr(0,40)+"...":item.books[0].summary
      })
    });
    this.setData({
      dataList: dataList
    })
  },
  //搜索框输入
  bookInput(e){
    clearTimeout(timer);
    timer = setTimeout(function(){
      this.setData({
        inputValue:e.detail.value
      });
    }.bind(this),1000)
  },
  //搜索书籍按钮
  bookSearch(){
    //显示加载中
    wx.showLoading({
      title: '努力获取ing...',
    })
    var bookName = this.data.inputValue;
    //正则限制内容不能为空
    if(/^\s*$/g.test(bookName)){
      this.setData({
        placeholder:"请输入正确内容",
        msg:"",
      })
      return;
    }
    wx.request({
      //调用idataapi数据接口
      url: 'http://120.76.205.241:8000/book/douban?apikey=GsJ3OcRyCE3apdpMPqi9IhwA97LbkBsV6q9DcWsG55okS2LEWoWvWbxZAuyeIkg6',
      data: {
        kw: bookName,
      },
      success: function (res) {
        wx.hideLoading();//隐藏加载图
        var data = res.data.data;
        var dataList = [];
        // 获取数据
        data.forEach(function(item,index){
          if (index < 10 && item.abstract){//限制10条
            dataList.push({
              id:item.id,
              cover: item.coverUrl,
              title: item.title.charAt(10)?item.title.substr(0, 10)+"...":item.title,
              star: util.starsFormat(item.rating),
              rating: item.rating,
              bookType: (item.mediaType + "/" + item.writers[0].name + "/" + item.pressDate).charAt(25) ? (item.mediaType + "/" + item.writers[0].name + "/" + item.pressDate) + "..." : (item.mediaType + "/" + item.writers[0].name + "/" + item.pressDate),
              write: item.writers[0].name,
              abstract: item.abstract.charAt(40) ? item.abstract.substr(0, 40) + "..." :item.abstract
            })
          }
        }.bind(this))
        //设置数据
        this.setData({
          dataList: dataList
        })
      }.bind(this)
    })
  },
  //进入详情页
  detail(e){
    var id = e.currentTarget.dataset.id;
    var cover = e.currentTarget.dataset.cover;
    var title = e.currentTarget.dataset.title;
    var author = e.currentTarget.dataset.author;
    console.log(author);
    wx.navigateTo({
      url: './detail/detail?id='+id+'&title='+title+'&cover='+cover+'&author='+author,
    })
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
