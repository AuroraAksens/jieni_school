// pages/money/money.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:0,

    //钱包数据
    wallet:'',

    // 账户明细
    userDetails:'',

    //银行
    bank:false,

    //选项卡数据
    CardData:[{
      title:'银行卡',
      image:'/images/icon/userMoneycard.png',
      path:'/pages/bank-card/bank-card?sta=' + 1
    },{
      title:'提现记录',
      image:'/images/icon/userMoneylog.png',
      path:'/pages/bank-card-log/bank-card-log'
    },{
      title:'账户明细',
      image:'/images/icon/userMoneydetails.png',
      path:'/pages/userDetails/userDetails'
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  // 点击事件
  selectCoupon:function(){
    this.setData({
      status:0
    })
  },

  selectAccount:function(){
    this.setData({
      status:1
    })
  },


  //跳转提现页
  goTake:function(){
    var money = this.data.wallet
    var bank = this.data.bank
    if(bank){
      wx.navigateTo({
        url: '/pages/bank-card/bank-card?sta=' + 0 + '&money=' + money,
      })
    }else{
      wx.navigateTo({
        url: '/pages/bank-card/bank-card?sta=' + 1 + '&money=' + money,
      })
    }
    
  },

  // 跳转选项卡
  gotoCard: function (e) {
    let data = e.currentTarget.dataset
    let url = data.path
    wx.navigateTo({
      url
    })
  },

  //获取钱包数据
  getMoney:function(){
    var that = this
    var token = wx.getStorageSync('token')
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.url + 'wallet/',
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'token': token
        },
        success:res=> {
          wx.hideLoading();
          if (res.data.code == 200) {
            that.setData({
              wallet:res.data.data.wallet,
              userDetails:res.data.data.bill,
              bank:res.data.data.bank
            })
          } else {
            wx.showToast({
              title: res.data,
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
    this.getMoney()
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