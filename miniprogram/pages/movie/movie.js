// miniprogram/pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    duration: 1500,
    indicatorDots: true,
    circular:true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  bindViewTap(e) {
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      header:{
        'Content-Type':'application/json'
      },
      success(res){
        console.log(res)
        that.setData({
          banner: res.data.top_stories,
          list: [{ header: '今日热闻' }].concat(res.data.stories)
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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