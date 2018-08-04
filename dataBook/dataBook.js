const dateForamt = require('../util/util.js').initTimeFormat;
dateForamt();
class DataBook {
  constructor(params){
    this.category = params.category;
    this.dataId = params.dataId;
  }

  //获取类目
  getCategory(){
    var postData = wx.getStorageSync(this.category);//从缓存中获取
    if(!postData){
      var Data = require("../postData/postData.js").data;//引入数据
      postData = Data[this.category];//Book数据
      this.execSetStorageSync(postData); //初始化数据到缓存中
    }
    return postData;
  }
  execSetStorageSync(data){
    wx.setStorageSync(this.category, data)//设置数据到缓存中
  }

  //根据id获取对应数据
  getPostItemById() {
    var postData = this.getCategory();//存储数据数组
    var dataId = this.dataId;
    var itemData = {}//初始化精准数据池
    postData.forEach((item,idx)=>{//根据id得到具体数据
      if (item.DataID == dataId){
        itemData = {
          index:idx,
          data:item
        }
      }
    })
    //如果没有找到本地数据库缓存信息 创建一条信息
    if (!itemData.data) {
      var item = {
        "DataID": this.DataID,
        "collectStatus": false,
        "collectNum": 0,
        "upStatus": false,
        "upNum": 0,
        "comments": [],
        "commentsNum": 0
      }
      postData.push(item); //在数列栈中添加新数据
      itemData = {
        index: postData.length - 1,
        data: item
      }
      this.execSetStorageSync(postData);
    }
    return itemData;
  }

  //获取评论数据
  getCommentData(){
    var itemData = this.getPostItemById().data; 
    itemData.comments.sort(this.compareWithTime);//按时间先后排序
    itemData.comments.map(function (item) {
      var date = new Date(item.create_time * 1);
      item.timeFormat = date.format('yyyy-MM-dd www hh:mm');
    })
    return itemData.comments;
  }
  //排序
  compareWithTime(pre,next){
    var flag = parseFloat(pre.create_time) - parseFloat(next.create_time);
    if(flag<0){
      return 1;
    }else if(flag>0){
      return -1;
    }else{
      return 0;
    }
  }
  
  //收藏功能
  collect(){
    return this.updataPostData("collect");
  }

  //喜欢功能
  love(){
    return this.updataPostData("up");
  }

  //评论
  newComment(newComment){
    return this.updataPostData("comments", newComment);
  }
  updataPostData(category,newComment){
    var allPostData = this.getCategory(); //总数据
    var itemData = this.getPostItemById(); //当前id对应数据 
    var postData = itemData.data; //具体数据
    switch (category){
      case "collect":
        if (!postData.collectStatus){console.log(1);
          postData.collectStatus = true;
          postData.collectNum++;
        } else {
          console.log(0);
          postData.collectStatus = false;
          postData.collectNum--;
        };
        break;
      case "up":
        if (!postData.upStatus) {
          postData.upStatus = true;
          postData.upNum++;
        } else {
          postData.upStatus = false;
          postData.upNum--;
        };
        break;
      case "comments":
        postData.comments.push(newComment);
        postData.commentsNum++;
        break;
      default:
      break;
    }
    allPostData[itemData.index] = postData;//依据下标替换局部数据
    this.execSetStorageSync(allPostData);//同步所有该类目数据到 本地缓存中去
    return postData;
  }
}
export { DataBook}