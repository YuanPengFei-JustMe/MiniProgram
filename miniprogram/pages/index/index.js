const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: ""
  },
  getData() {
    // 获取单一数据
    // db.collection("userlist").doc("a98d4250646ccf87000d295e38676b31").get({
    //   success:res=>{
    //     console.log(res);
    //     this.setData({
    //       dataObj:res.data
    //     })
    //   }
    // })
    // 获取数据列表
    // db.collection("userlist").get({
    //   success:res=>{
    //     console.log(res);
    //     this.setData({
    //       dataObj:res.data
    //     })
    //   }
    // })
    // 链式回调
    // db.collection("userlist").get().then(res => {
    //   this.setData({
    //     dataObj: res.data
    //   })
    // })
    // 条件查询
    db.collection("userlist").where({
      name: '张三'
    }).get().then(res => {
      this.setData({
        dataObj: res.data
      })
    })
  },
  addData() {
    wx.showLoading({
      title: '数据加载中...',
      mask:true
    })
    db.collection("userlist").add({
      data: {
        name: '王五',
        age: 80,
        phone: '13567890556'
      }
    }).then(res => {
      console.log(res);
      wx.hideLoading()
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