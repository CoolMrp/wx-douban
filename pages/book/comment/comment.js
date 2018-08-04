// pages/book/comment/comment.js
var util = require("../../../util/util.js");
import { DataBook} from "../../../dataBook/dataBook.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookName: "",//书名
    txtCommentMsg: '',//文本信息
    imgCommentMsg: [],//图片信息
    voiceToText: true, //语音输入 <=> 文本输入切换开关
    recording: false, //是否正在录音
    recordAudioURL: '',//语音路径
    controlPanel: false  //添加图片开关
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.initTimeFormat();//时间格式
    this.ID = options.id; //获取ID
    var id = this.ID;
    this.dataSyncExec(); //数据绑定渲染
    this.setData({
      bookName:options.name
    });
  },
  //切换键盘
  changeKeyboard(){
    var toggle = this.data.voiceToText;
    this.setData({
      voiceToText:!toggle
    })
  },
  //文字消息设置
  txtCommentInput(e) {
    var txtCommentMsg = e.detail.value;
    this.setData({ txtCommentMsg: txtCommentMsg })
  },
  //发送消息
  sendComment() {
    var txtCommentMsg = this.data.txtCommentMsg;
    var imgCommentMsg = this.data.imgCommentMsg;

    if (/^\s*$/g.test(txtCommentMsg)) {
      wx.showToast({
        title: '请输入合法文本',
        icon: 'warn',
        duration: 1000,
        mask: true,
      })
      return;
    }
    //新评论
    var newComment = {
      avatar: `/images/avatar/avatar-${~~(Math.random() * 3) + 1}.png`,
      name: ['coolmrp', '清风烟雨'][~~(Math.random() * 2)],
      comment: {
        txt: txtCommentMsg,
        img: imgCommentMsg,
      },
      create_time: Date.now(),
      timeFormat: '',
    }
    this.dbPost.newComment(newComment);//添加到数据数组
    this.dataSyncExec();//数据绑定渲染
    this.dataResetExec();//重置数据
  },
  //数据绑定渲染
  dataSyncExec() {
    this.dbPost = new DataBook({ category: 'BOOK', dataId: this.ID }); //数据实例化
    var comments = this.dbPost.getCommentData();
    this.setData({
      comments: comments
    });
  },
  //重置信息
  dataResetExec() {
    this.setData({
      txtCommentMsg: '',
      imgCommentMsg: []
    })
  },
  //开始录音
  startRecord(){
    this.startTime = Date.now(); // 记录开始时间
    this.setData({ recording: true });//开始录音开关
    wx.startRecord({
      success: function(res) {
        var url = res.tempFilePath;
        var diff = Math.ceil((this.endTime - this.startTime) / 1000);//向上取整获取录音时间
        this.submitRecordComment(url, diff);
      }.bind(this),
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //停止录音
  endRecord() {
    this.setData({ recording: false }); //关闭录音开关
    wx.stopRecord();        //停止录音
    this.endTime = Date.now(); //记录停止时间
  },
  //提交语音评论
  submitRecordComment(url, diff) {
    var newComment = {
      avatar: `/images/avatar/avatar-${~~(Math.random() * 3) + 1}.png`,
      name: ['清风烟雨', 'coolmrp','三杯茶','晴天'][~~(Math.random() * 4)],
      comment: {
        txt: '',
        img: [],
        voc: { url: url, diff: diff, length: Math.min(100, diff * 20) }
      },
      create_time: Date.now(),
      timeFormat: '',
    }
    this.dbPost.newComment(newComment);
    this.dataSyncExec();   //数据绑定渲染
    this.dataResetExec(); //重置信息
    this.subimgSuccess(); //提示信息
  },
  //语音播放
  recordPlay(e) {
    var url = e.target.dataset.voice;
    this.setData({ recordAudioURL: url });//更新当前页面唯一播放音频地址
    wx.stopVoice(); //停止播放
    wx.playVoice({ //开始播放当前点击的音频
      filePath: url
    })
  },
  //评论成功
  subimgSuccess() {
    wx.showToast({
      title: '评论成功',
      icon: 'success',
      duration: 800,
      mask: true,
    })
  },
  //图片添加开关
  UserPhotoAdd() {
    this.setData({ controlPanel: !this.data.controlPanel })
  },
  imgCommentInput: function () {
    var imgArr = [];

    if (imgArr.length >= 3) {
      return;
    }
    //图片选择
    wx.chooseImage({ 
      count: 3, //最大图片选择数量
      sizeType: ['compressed', 'original'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        imgArr = tempFilePaths;
        this.setData({
          imgCommentMsg: imgArr
        });
      }.bind(this),
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //删除图片
  clearImg(e) {
    var index = e.target.dataset.idx;
    wx.showModal({//页面交互
      title: '删除',
      content: '是否确认删除图片',
      showCancel: true,
      confirmText: '删除',
      success: function (res) {
        var imgArr = this.data.imgCommentMsg;
        imgArr.splice(index, 1);
        this.setData({
          imgCommentMsg: imgArr
        })
      }.bind(this),
      fail: function (res) { },
      complete: function (res) { },
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