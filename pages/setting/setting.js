// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      nickName: "",
      avatar: "",
      sex: "",
      city: ""
    },
    systemInfo:{},
    sysShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function(res) {
        this.setData({
          userInfo:{
            nickName: res.userInfo.nickName,
            avatar: res.userInfo.avatarUrl,
            sex: res.userInfo.gender,
            city: res.userInfo.province
          },
          Data:[
            {
              imgUrl: '/images/icon/wx_app_location.png',
              text: '地图信息',
              bindEvent: 'mapEvent'
            },
            {
              imgUrl: '/images/icon/wx_app_clear.png',
              text: '清除缓存',
              bindEvent: 'cacheEvent'
            },
            {
              imgUrl: '/images/icon/wx_app_cellPhone.png',
              text: '设备信息',
              bindEvent: 'phoneEvent'
            },
            {
              imgUrl: '/images/icon/wx_app_exl.png',
              text: 'excel下载',
              bindEvent: 'exlEvent'
            },
            {
              imgUrl: '/images/icon/wx_app_scan.png',
              text: '二维码识别',
              bindEvent: 'scanEvent'
            },
            {
              imgUrl: '/images/icon/wx_app_network.png',
              text: '网络信息',
              bindEvent: 'netEvent'
            }
          ]
        })
      }.bind(this),
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //地图
  mapEvent(){
    wx.navigateTo({
      url: './map/map',
    })
  },
  //清除缓存
  cacheEvent(){
    wx.showModal({
      title: '提示',
      content: '是否清除缓存',
      showCancel: true,
      cancelText: '取消',
      cancelColor: 'red',
      confirmText: '清除',
      confirmColor: 'green',
      success: function(res) {
        if (res.confirm){//点击确定才清除缓存
          wx.clearStorage();//清除缓存
          wx.showToast({
            title: '缓存已清空',
            icon: 'success',
            duration: 1000,
            mask: true,
          })
        }
      }
    })
  },
  //设备信息
  phoneEvent(){
    wx.getSystemInfo({//获取系统信息
      success: function(res) {
        this.setData({
          systemInfo:{
            model: res.model,
            screenWidth: res.screenWidth,
            screenHeight: res.screenHeight,
            system: res.system,
            version: res.version
          },
          sysShow:true
        })
        var timer = setTimeout(function(){
          this.setData({
            sysShow:false
          })
        }.bind(this),2000);
      }.bind(this)
    })
  },
  //exel下载
  exlEvent(){
    var url = 'https://coding.net/u/airbreak/p/wx_app_files/git/raw/master/top10.xlsx';
    wx.downloadFile({
      url: url,
      success: function(res) {
        wx.openDocument({
          filePath: res.tempFilePath
        })
      },
    })
  },

  // 扫码
  scanEvent(){
    wx.scanCode({
      onlyFromCamera: false,
      success: function(res) {
        console.log(res);
      }
    })
  },
  //网络信息
  netEvent(){
    wx.getNetworkType({
      success: function(res) {
        wx.showModal({
          title: '网络状态',
          content: res.networkType,
          showCancel:true
        })
      }
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