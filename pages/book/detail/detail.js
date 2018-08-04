// pages/book/detail/detail.js
import {DataBook} from "../../../dataBook/dataBook.js"
const util = require("../../../util/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookMsg:[{
      id:"",//书本id
      title:"",//书名
      cover:"",//封面
      publish:"",//出版社
      rating:"",//评分
      star:[],//评分星星
      pressDate:"",//出版日期
      page: "",//总页数
      abstract:"",//摘要
      writerInfo:"",//作者信息
      commentCount: "",//总评论数量
      ratingCount: "",//总评分数
      price: "",//价格
    }],
    bookCollectStatus:false,//收藏状态
    bookCollectNum:0,//收藏数量
    bookUpStatus:false,//喜欢状态
    bookUpNum:0,//喜欢数量
    bookCommentsNum:0//评论数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    });
    var id = options.id;
    this.Id  = id;
    this.name = options.title;
    var title = options.title;
    var cover = options.cover;
    var author = options.author.charAt(4)?options.author.substr(0, 10) + "..." :options.author;
    //全部数据
    this.dataBook = new DataBook({ category: "BOOK", dataId:id});
    this.itemData = this.dataBook.getPostItemById().data;//具体数据
    wx.getStorage({
      key: 'bookID'+id,
      success: function(res) {
        //重新设置数据
        this.setData({
          collectFlag:res.data.collectFlag
        })
      }.bind(this),
    })
    wx.request({
      url: 'http://120.76.205.241:8000/book/douban?apikey=GsJ3OcRyCE3apdpMPqi9IhwA97LbkBsV6q9DcWsG55okS2LEWoWvWbxZAuyeIkg6',
      data: {
        id: id
      },
      success:function(res){
        wx.hideLoading();
        var data = res.data.data[0];
        this.setData({
          bookMsg:[{
            id:id,
            title: title,
            author:author,
            cover: cover,
            publish: data.publishOrg,
            rating: data.rating,
            star: util.starsFormat(data.rating),
            abstract: data.abstract,
            writerInfo: data.writerInfo,
            pressDate: data.pressDate,
            page: data.pageNum,
            commentCount: data.commentCount,
            ratingCount: data.ratingCount,
            price: data.price,
          }],
          bookCollectStatus: this.itemData.collectStatus,
          bookCollectNum: this.itemData.collectNum,
          bookUpStatus: this.itemData.upStatus,
          bookUpNum: this.itemData.upNum,
          bookCommentsNum: this.itemData.commentsNum
        })
      }.bind(this)
    })
  },

  //收藏功能
  onCollect(){
    var collect = this.dataBook.collect();//统一获取当前数据 保证collect操作只有一次!!!
    this.setData({
      //重新设置数据
      bookCollectStatus: collect.collectStatus,
      bookCollectNum: collect.collectNum
    })
    wx.showToast({ //模拟弹窗
      title: collect.collectStatus?"收藏成功":"取消收藏",
      icon:"success",
      duration:1000,
      mask:true
    })
  },
  //评论功能
  onComments(){
    wx.navigateTo({
      url: '../comment/comment?id=' + this.Id+'&name='+this.name,
    })
  },
  // 喜欢功能
  onLove() {
    var love = this.dataBook.love();//统一获取当前数据 保证collect操作只有一次!!!
    this.setData({
      //重新设置数据
      bookUpStatus: love.upStatus,
      bookUpNum: love.upNum
    })
    wx.showToast({ //模拟弹窗
      title: love.upStatus ? "喜欢" : "取消",
      icon: "success",
      duration: 1000,
      mask: true
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