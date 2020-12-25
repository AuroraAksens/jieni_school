// pages/partner/partner.js
let app = getApp()
import Poster from '../../miniprogram_dist/poster/poster';

const posterConfig = {
  jdConfig: {
    width: 750,
    height: 1300,
    backgroundColor: '#f1f1f1',
    debug: false,
    pixelRatio: 1,
    images: [{
      width: 186,
      height: 186,
      x: 110,
      y: 970,
      url: '',
      borderRadius: 20,
      zIndex: '10'
    }, {
      width: 750,
      height: 1300,
      x: 0,
      y: 0,
      url: '/images/icon/31.png',
      borderRadius: 20
    }]

  }
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImg: false,
    listData: '',
    listData2: '',
    posterConfig: posterConfig.jdConfig,
    isShow: 0
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    this.getListData()
  },

  //跳转我的邀请
  goInvList() {
    wx.navigateTo({
      url: '/pages/invitationList/invitationList'
    })
  },


  //跳转累计收入
  goInvCome() {
    wx.navigateTo({
      url: '/pages/invitationIncome/invitationIncome'
    })
  },

  //跳转我的钱包
  goMoney() {
    wx.navigateTo({
      url: '/pages/userDetails/userDetails',
    })
  },

  goMoneys() {
    wx.navigateTo({
      url: '/pages/money/money',
    })
  },


  //分享预览图片
  preImage() {
    let image = ['/images/icon/28.png']
    wx.previewImage({
      urls: image // 需要预览的图片http链接列表
    })
  },

  //显示分享图片
  tapBut() {
    let showImg = this.data.showImg
    if (showImg) {
      this.setData({
        showImg: false
      })
    } else {
      this.setData({
        showImg: true
      })
    }
  },

  //获取二维码
  getData() {
    let token = wx.getStorageSync('token')
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'partner', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          console.log(res)
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


  //获取数据
  getListData() {
    let token = wx.getStorageSync('token')
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'partner/promote', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          console.log(res)
          that.setData({
            listData2: res.data.data
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

  // 获取合伙人状态
  getPartnerSta() {
    let token = wx.getStorageSync('token')
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + 'partner/get_partner', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'token': token
      },
      success(res) {
        wx.hideLoading()
        if (res.data.code == 200) {
          that.setData({
            isShow: res.data.data
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




  onPosterSuccess(e) {
    const {
      detail
    } = e;
    wx.previewImage({
      current: detail,
      urls: [detail]
    })
  },
  onPosterFail(err) {
    console.error(err);
  },

  /**
   * 异步生成海报
   */
  onCreateOtherPoster() {
    let ewm = this.data.listData.wx_url
    console.log(ewm)
    posterConfig.jdConfig.images[0].url = ewm
    console.log(posterConfig.jdConfig)
    this.setData({
      posterConfig: posterConfig.jdConfig
    }, () => {
      Poster.create(true); // 入参：true为抹掉重新生成 
    });
  },


  // 申请合伙人
  getExamine() {
    let token = wx.getStorageSync('token')
    let that = this
    wx.showModal({
      title: '申请合伙人提示',
      content: '确定申请为合伙人吗？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          })
          wx.request({
            url: app.globalData.url + 'partner/set_partner', //仅为示例，并非真实的接口地址
            method: 'POST',
            header: {
              'content-type': 'application/json', // 默认值
              'token': token
            },
            success(res) {
              wx.hideLoading()
              if (res.data.code == 200) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 4000
                })
                that.onShow()
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 4000
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
    this.getPartnerSta()
  },

})