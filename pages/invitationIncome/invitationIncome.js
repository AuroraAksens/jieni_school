let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: true,
    start: "",
    stop: "",
    date: '2020-07',
    listData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  showrili() {
    this.setData({
      state: false
    })
  },

  select(e) {
    console.log(e.detail.begin)
    console.log(e.detail.over)
    this.setData({
      state: true
    })
    this.setData({
      start: e.detail.begin.text,
      stop: e.detail.over.text
    });
  },

  cancel() {
    this.setData({
      state: true
    })
  },

  goPayitem() {
    wx.navigateTo({
      url: '/pages/owner/pay/pay',
    })
  },

  //获取选择日期数据
  bindDateChange: function(e) {
    let that = this
    let token = wx.getStorageSync('token')
    let date = e.detail.value
    console.log(date)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'partner/revenue?date=' + date, //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          that.setData({
            listData: res.data.data,
            date: e.detail.value
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

  //获取数据
  getData() {
    let token = wx.getStorageSync('token')
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'partner/revenue', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          that.setData({
            listData: res.data.data
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