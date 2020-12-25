// pages/activitySuccess/activitySuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    place: '',
    name: '',
    phone: '',
    starttime: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      place: options.place,
      name: options.name,
      phone: options.phone,
      starttime: options.starttime,
    })
  },

  //跳转我的报名
  goMinebao(){
    wx.redirectTo({
      url: '/pages/activity/activity?sta=1'
    })
  },


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      path: '/pages/activity/activity'
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})