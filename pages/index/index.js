// 拿到App里面的数据
let App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  onLoad() {
    this.getLocation();
    this.getImgInfo();
  },
  data: {
    longitude: '', //中心精度
    latitude: '', //中心维度
    controls: [{
      id: 1,
      iconPath: '/img/center.png',
      position: {
        left: 10,
        top: App.globalData.windowHeight - 140,
        width: 40,
        height: 40
      },
      clickable: true
    }],
    markers: []
  },
  /****
  点击控件回到原点
  */
  homing(e) {
    // console.log(e)
    if (e.controlId === 1) {
      // 获取地图组件的上下文对象
      let myMap = wx.createMapContext('map', this);
      myMap.moveToLocation()
    }
  },

  // 获取当前的位置信息
  getLocation() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,

        })
      }
    })
  },
  // 获取交易数据
  getImgInfo() {
    wx.request({
      url: 'http://localhost:3000/posts',
      success: (res) => {
        // console.log(res)
        let data = res.data;
        let markers = [];
        data.forEach(item => {
          markers.push({
            id: item.id-1,
            iconPath: item.type === 'publish' ? '/img/cat.png' : '/img/dog.png',
            longitude: item.longitude,
            latitude: item.latitude,
            width: 40,
            height: 40
          })
        })

        this.setData({
          markers: markers
        })
        console.log(this.data.markers)
      }
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})