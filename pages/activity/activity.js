// pages/activity/activity.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    sta: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sta: options.sta
    })
  },


  checkTime(i) { //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },

  djs(e) {
    var that = this;
    let djs_time = e
    let datatime= djs_time.replace(/\-/g, "/") 

    var leftTime = (new Date(datatime)) - (new Date()); //计算剩余的毫秒数 
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
    var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
    days = that.checkTime(days);
    hours = that.checkTime(hours);
    minutes = that.checkTime(minutes);
    seconds = that.checkTime(seconds);
    let djs = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒"
    if (days == '00' && hours == '00' && minutes == '00' && seconds == '00') {
      return '已结束'
    }
    return djs
  },

  //跳转活动详情
  goActDate(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/activityDetails/activityDetails?id=' + id
    })
  },




  //获取活动列表数据
  getActData() {
    var that = this
    var token = wx.getStorageSync('token')
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'activity',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: res => {
        wx.hideLoading()
        if (res.data.code == 200) {
          console.log(res.data.data)
          // that.djs(res.data.data.end_time)
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].is_state) {
              res.data.data[i].end_time = "已结束"
            } else {
              let RemainingTime = that.djs(res.data.data[i].end_time)
              res.data.data[i].end_time = RemainingTime
            }
          }
          that.setData({
            listData: res.data.data
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },



  //获取活动列表数据
  getMineData() {
    var that = this
    var token = wx.getStorageSync('token')
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'activity/my_sign',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code == 200) {
          console.log(res.data)
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].is_state) {
              res.data.data[i].end_time = "已结束"
            } else {
              let RemainingTime = that.djs(res.data.data[i].end_time)
              res.data.data[i].end_time = RemainingTime
            }
          }
          that.setData({
            listData: res.data.data
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },



  //搜索
  getText(e) {
    var that = this
    let text = e.detail.value
    var token = wx.getStorageSync('token')
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'activity?search_text=' + text,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code == 200) {
          console.log(res.data)
          that.setData({
            listData: res.data.data
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },


  //出示二维码
  goQRcode(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/action/action?id=' + id
    })
  },


  //已入场
  overCode() {
    wx.showToast({
      title: '您已入场',
      icon: 'none',
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //sta = 0 活动    sta = 1 我的报名 
    if (this.data.sta == 0) {
      this.getActData()
    } else {
      this.getMineData()
    }
  },


})