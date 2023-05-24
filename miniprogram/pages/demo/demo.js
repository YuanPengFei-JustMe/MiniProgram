let urlArr = [];
let filePath = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onbtn() {
    wx.chooseMedia({
      success: res => {
        filePath = res.tempFiles;
        filePath.forEach((item, idx) => {
          let filiName = Date.now() + "_" + idx;
          this.cloudFile(filiName, item.tempFilePath)
        });
      }
    })
  },
  cloudFile(filiname, path) {
    wx.showLoading({
      title: '正在上传...',
      mask: true
    })
    wx.cloud.uploadFile({
      cloudPath: filiname + ".jpg",
      filePath: path
    }).then(res => {
      urlArr.push(res.fileID);
      console.log('filePath.length',filePath.length);
      console.log('urlArr.length',urlArr.length);
      if (filePath.length == urlArr.length) {
        this.setData({
          urlArr
        })
      }
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})