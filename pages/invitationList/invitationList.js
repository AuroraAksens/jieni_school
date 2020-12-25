
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myuser:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },


  getData() {
    let token = wx.getStorageSync('token')
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'partner/cumulative', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          that.setData({
            myuser: res.data.data.list
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
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

})