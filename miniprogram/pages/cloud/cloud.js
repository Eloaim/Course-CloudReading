// miniprogram/pages/cloud/cloud.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
  },
  Insert: function(){
    db.collection('user').add({
      data: {
        name: "Eloaim",
        age: 18,
        sex: "male"
      },
      success: res=>{
        console.log(res);
      },
      fail: res=>{
        console.log(res);
      }
    })
  },
  Updata: function(){
    db.collection('user').doc('593e51e65eaa72150027091b01f6f3ed').update({
      data: {
        age: 20
      },
      success: res=>{
        console.log('success',res);
      },
      fail: res=>{
        console.log('fail',res);
      }
    })
  },
  Search: function(){
    db.collection('user').where({
        age: 18
    }).get({
      success: res=>{
        console.log(res);
      },
      fail: res=>{
        console.log(res);
      }
    })
  },
  Delete: function(){
    db.collection('user').doc('da5f6ae65eaa77f4001ff41b4584817c').remove({
      success: res=>{
        console.log(res);
      },
      fail: res=>{
        console.log(res);
      }
    })
  },
  Sum: function(){
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 2,
        b: 3
      },
     success: res=>{
        console.log('success',res);
      },
      fail: res=>{
        console.log('fail',res);
      }
    })
  },
  muldelete: function(){
    wx.cloud.callFunction({
      name: 'muldelete',
     success: res=>{
        console.log('success',res);
      },
      fail: res=>{
        console.log('fail',res);
      }
    })
  },
  upload: function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths',tempFilePaths);
        console.log('this',this);
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime()+'.png', // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            db.collection('image').add({
              data: {
                fileID: res.fileID
              },
              success: res=>{
                console.log('success',res);
              },
              fail: res=>{
                console.log('fail',res);
              }
            })
          },
          fail: console.error
        })
      }
    })
  },
  download: function(){
    wx.cloud.callFunction({
      name: 'login',
      success: res=>{
        console.log('success',res);
        db.collection('image').where({
          _openid: res.result.openid
        }).get({
          success: res=>{
            console.log('imagesuccess',res);
            this.setData({
              images: res.data
            })
          },
          fail: res=>{
            console.log('imagefail',res);
          }
        })
      },
      fail: res=>{
        console.log('fail',res);
      }
    })
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