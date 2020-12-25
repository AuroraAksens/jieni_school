// pages/take/take.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //金额
    money: '',

    // 银行卡ID
    bankID: '',

    // 银行卡名称
    bankName: '',

    //用户名字
    username: '',

    // 用户头像
    userimg: '',

    // 余额
    money: '',

    // 零钱余额
    moneys: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userID = options.userID //用户ID
    var username = app.globalData.userInfo.nickName //用户名称
    var userimg = app.globalData.userInfo.avatarUrl //用户头像
    var bankID = options.bankID //银行卡ID
    var bankName = options.bankName //银行卡名称
    var money = options.money //余额
    this.setData({
      bankID: bankID,
      username,
      userimg,
      bankName,
      moneys: money
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //金额
  takeMoney: function (e) {
    this.setData({
      money: e.detail.value
    })
  },

  //全部提现
  getOll: function () {
    var money = this.data.moneys
    this.setData({
      money: money
    })
  },

  //提交提现数据
  takePost: function () {
    var that = this
    var token = wx.getStorageSync('token')
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'wallet/toBalance',
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token': token
      },
      data: {
        banId: this.data.bankID, //银行卡ID
        price: this.data.money, //金额
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code == 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 2,
              success: res => {
                wx.navigateTo({
                  url: '/pages/bank-card-log/bank-card-log',
                })
              }
            })
          }, 1500)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
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