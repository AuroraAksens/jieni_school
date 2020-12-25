// pages/activityDetails/activityDetails.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['/images/icon/21.png', '/images/icon/21.png', '/images/icon/21.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,

    actID: '',
    dateData: '',

    intervarID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      actID: options.id
    })

    let that = this
    let id = that.data.actID
    let token = wx.getStorageSync('token')
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'activity/details?activity_id=' + id,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: res => {
        if (res.data.code == 200) {
          wx.hideLoading()
          console.log(res.data)
          // wx.setStorageSync('end_time', res.data.data.end_time)
          // that.dynamic(res.data.data)
          that.setData({
            dateData: res.data.data
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


  checkTime(i) { //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  },

  djs(e) {
    var that = this;
    let djs_time = e
    let datatime = djs_time.replace(/\-/g, "/")

    var leftTime = (new Date(datatime)) - (new Date()); //计算剩余的毫秒数 
    var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 
    var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 
    days = that.checkTime(days);
    hours = that.checkTime(hours);
    minutes = that.checkTime(minutes);
    seconds = that.checkTime(seconds);
    var djs = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒"
    if (days == '00' && hours == '00' && minutes == '00' && seconds == '00') {
      clearInterval(that.data.intervarID);
      return '结束了'
    }
    return djs
  },


  //获取活动列表数据
  getDetaData() {
    let that = this
    let id = that.data.actID
    let token = wx.getStorageSync('token')
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'activity/details?activity_id=' + id,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token': token
      },
      success: res => {
        if (res.data.code == 200) {
          console.log(res.data)
          wx.setStorageSync('end_time', res.data.data.end_time)
          that.dynamic(res.data.data)
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

  dynamic(e) {
    let that = this
    let end_time = wx.getStorageSync('end_time')
    wx.hideLoading();
    this.data.intervarID = setInterval(function () {
      let RemainingTime = that.djs(end_time)
      e.end_time = RemainingTime
      that.setData({
        dateData: e
      })
    }, 1000)
  },

  //跳转报名成功
  goSuccess(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let place = e.currentTarget.dataset.place
    let name = e.currentTarget.dataset.name
    let phone = e.currentTarget.dataset.phone
    let starttime = e.currentTarget.dataset.starttime
    let token = wx.getStorageSync('token')
    wx.showModal({
      title: '报名提示',
      content: '确定要报名本次活动吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: app.globalData.url + 'activity/sign_up',
            method: 'POST',
            data: {
              activity_id: id
            },
            header: {
              'content-type': 'application/json',
              'token': token
            },
            success: res => {
              wx.hideLoading();
              if (res.data.code == 200) {
                console.log(res.data)
                wx.navigateTo({
                  url: '/pages/activitySuccess/activitySuccess?place=' + place + '&name=' + name + '&phone=' + phone + '&starttime=' + starttime
                })
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },




  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetaData()
  },

})