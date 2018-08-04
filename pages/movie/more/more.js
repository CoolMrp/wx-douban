// pages/movie/more/more.js
const util = require("../../../util/util.js");
const Data = require("../movieData/movieData.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    var DataList = Data.movieData;
    var movieData = [];
    console.log(DataList);
    DataList.forEach((item,index)=>{
      if(item.title==type){
        console.log(item); item.subjects
        var arr = item.subjects;
        arr.forEach((itm,idx)=>{
          movieData.push({
            title: itm.title.charAt(4) ? (itm.title).substr(0, 5) + "..." : itm.title,
            score: itm.rating.average,
            images: itm.images.large,
            star: util.starsFormat(itm.rating.average)
          });
        })
      }
    })
    console.log(movieData);
    this.setData({
      movieData: movieData
    });
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