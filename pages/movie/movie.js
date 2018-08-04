// pages/movie/movie.js
const util = require("../../util/util.js");
const Data = require("./movieData/movieData.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData:[],
    subjects:[],
    count:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieData = Data.movieData;
    var Top = [];
    var Hot = [];
    var Will = [];
    movieData.forEach((item,index)=>{
      if (item.title == "豆瓣电影Top250"){
        var arr = item.subjects;
        var count = this.data.count;
        arr.forEach((itm,idx)=>{
          if(idx<count){
            Top.push(
              {
                type: "豆瓣电影Top250",
                title: itm.title.charAt(5) ? (itm.title).substr(0, 6) + "..." : itm.title,
                score: itm.rating.average,
                images: itm.images.large,
                star: util.starsFormat(itm.rating.average)
              }
            )
          }
        })
      } else if (item.title == "正在上映的电影-北京"){
        var arr = item.subjects;
        var count = this.data.count;
        arr.forEach((itm, idx) => {
          if (idx < count) {
            Hot.push(
              {
                type: "正在上映的电影-北京",
                title: itm.title.charAt(5) ? (itm.title).substr(0, 6) + "..." : itm.title,
                score: itm.rating.average,
                images: itm.images.large,
                star: util.starsFormat(itm.rating.average)
              }
            );
          }
        })
      }else{
        var arr = item.subjects;
        var count = this.data.count;
        arr.forEach((itm, idx) => {
          if (idx < count) {
            Will.push(
              {
                type: "即将上映的电影",
                title: itm.title.charAt(5)?(itm.title).substr(0,6)+"...":itm.title,
                score: itm.rating.average,
                images:itm.images.large,
                star: util.starsFormat(itm.rating.average)
              }
            );
          }
        })
      }
    })
    this.setData({
      movieData: movieData,
      subjects:[Top,Hot,Will]
    })
    //console.log(this.data.movieData);
    //console.log(this.data.subjects);
  },
  //更多
  toMore(e){
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: './more/more?type='+type,
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