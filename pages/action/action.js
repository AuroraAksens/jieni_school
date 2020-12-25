// pages/index//action/action.js
import drawQrcode from '../../utils/dist/weapp.qrcode.esm'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    actionData: {},
    showTips: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    let that = this
    console.log(token)

    if (token) {
      wx.showLoading({
        title: '加载中',
      })
      console.log(111)
      wx.request({
        url: app.globalData.url + 'write?activity_id=' + options.id, //仅为示例，并非真实的接口地址
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'token': token
        },
        success(res) {
          console.log(111)
          wx.hideLoading()
          if (res.data.code == 200) {
            drawQrcode({
              width: 180,
              height: 170,
              canvasId: 'myCanvas',
              text: res.data.data.qr_code
            })
            that.setData({
              actionData: res.data.data.cancel_code
            })
          } else if (res.data.code == 10003) {
            wx.showToast({
              title: '登录状态已过期，请重新登录',
              icon: 'none'
            })
            wx.setStorageSync('token', '')
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000) //延迟时间 这里是1秒
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        },
      })
    } else {
      wx.showToast({
        title: '您还没有登录哦，请前往我的页面登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1,
        })
      }, 1000) //延迟时间 这里是1秒
    }
  },


  //弹框
  showTips() {
    let show = this.data.showTips
    if (show == true) {
      this.setData({
        showTips: false
      })
    } else {
      this.setData({
        showTips: true
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})