// pages/setting/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:"",
    longitude:"",
    markers: [{
      iconPath: "/images/icon/marker.png",
      id: 0,
      latitude: 37.73605,
      longitude: 112.56566,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 112.56566,
        latitude: 37.73605
      }, {
        longitude: 112.66576,
        latitude: 37.83609
        }, {
          longitude: 112.68576,
          latitude: 37.84609
      }, {
        longitude: 112.56576,
        latitude: 37.71609
      }],
      color: "#888888",
      width: 2,
      dottedLine: false
    }],
    controls: [{
      id: 1,
      iconPath: '/images/icon/search.png',
      position: {
        left: 30,
        top: 30,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      altitude: true,
      success: function(res) {
        //console.log(res);
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }.bind(this),
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx =  wx.createMapContext("myMap");
    this.mapCtx.getCenterLocation({
      success: function (res) {
        //console.log(res.longitude)
        //console.log(res.latitude)
      }
    })
    this.mapCtx.moveToLocation()
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        //console.log('animation end')
      }
    })
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
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