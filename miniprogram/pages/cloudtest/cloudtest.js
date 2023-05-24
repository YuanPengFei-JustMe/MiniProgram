// pages/cloudtest/cloudtest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },
  getdata(num = 5, page = 0) {
    wx.cloud.callFunction({
      name: "getData",
      data: {
        num: num,
        page: page
      }
    }).then(res => {
      let oldData = this.data.dataList;
      let newData = oldData.concat(res.result.data)
      this.setData({
        dataList: newData
      })
    })
  },
  // 点击次数加
  clickRow(res) {
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    let {
      id,
      idx
    } = res.currentTarget.dataset;
    wx.cloud.callFunction({
      name: "addNum",
      data: {
        id: id
      }
    }).then(res => {
      let newData = this.data.dataList;
      newData[idx].age += 4;
      this.setData({
        dataList: newData
      })
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getdata()
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
    let page = this.data.dataList.length;
    this.getdata(2, page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})