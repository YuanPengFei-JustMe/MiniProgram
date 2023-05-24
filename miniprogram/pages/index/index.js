const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataObj: "",
    myvalue: "",
    dataArr: []
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
      mask: true
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
  // 提交表单
  btnSub(res) {
    // 解构赋值
    // let {
    //   name,
    //   age,
    //   phone
    // } = res.detail.value;
    // db.collection("userlist").add({
    //   data: {
    //     name: name,
    //     age: age,
    //     phone: phone
    //   }
    // }).then(res => {
    //   console.log(res);
    // })
    // 直接赋值
    let resValue = res.detail.value;
    db.collection("userlist").add({
      data: resValue
    }).then(res => {
      console.log(res);
    })
  },
  // 修改
  changeData() {
    db.collection("userlist").where({
      name: "李四"
    }).update({
      data: {
        name: "熊大",
        like: "熊二"
      }
    }).then(res => {
      console.log(res);
    })
  },
  // 删除
  delData() {
    db.collection("userlist").doc(this.data.myvalue).remove().then(res => {
      console.log(res);
    })
  },
  myid(res) {
    this.setData({
      myvalue: res.detail.value
    })
    console.log(this.data.myvalue);
  },
  showData() {
    db.collection('userlist').get().then(res => {
      this.setData({
        dataArr: res.data
      })
    })
  },
  // 数据筛选
  shaiData() {
    // db.collection('userlist').where({
    //     age: _.or(_.eq(9999),_.eq(45))
    //   }).get()
    //   .then(res => {
    //     console.log(res);
    //     this.setData({
    //       dataList: res.data
    //     })
    //   })
    // 多个或条件
    // db.collection('userlist').where(_.or([{
    //       age: _.eq(9999)
    //     },
    //     {
    //       name: _.eq('步美')
    //     }
    //   ])).get()
    //   .then(res => {
    //     console.log(res);
    //     this.setData({
    //       dataList: res.data
    //     })
    //   })
    // 查询特殊字段
    db.collection('userlist').where({
        like:_.exists(true)
      }).get()
      .then(res => {
        console.log(res);
        this.setData({
          dataList: res.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showData();
    db.collection('userlist').watch({
      onChange: res => {
        this.setData({
          dataArr: res.docs
        });
        console.log(res);
      },
      onError: err => {
        console.log(err);
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