// pages/checkCode/checkCode.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  //拉起扫码
  checkCode() {
    wx.scanCode({
      success(res) {
        let result = res.result
        if (res.errMsg = 'scanCode:ok') {
          wx.showModal({
            title: '提示',
            content: '是否确认入场',
            success(res) {
              if (res.confirm) {
                let that = this;
                let token = wx.getStorageSync('token')
                wx.showLoading({
                  title: '加载中',
                })
                wx.request({
                  url: app.globalData.url + 'write/cancellation',
                  method: 'POST',
                  header: {
                    'token': token,
                    'content-type': 'application/json' // 默认值
                  },
                  data: {
                    qr_code: result,
                    code: 0
                  },
                  success(res) {
                    wx.hideLoading()
                    if (res.data.code == 200) {
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
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

        } else {
          console.log(222)
        }
      }
    })
  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})