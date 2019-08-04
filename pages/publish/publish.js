Page({
  data: {
    address: "点击选项，要钩钩哦~"
  },
  staticData: {
    // 有用但是不一定要放在data当中，因为data中数据的改变要引起页面的修改
    latitude: "",
    longitude: "",
    type: "",
    message: "",
    telephone: ""
  },
  selectOfLocation() {
    wx.chooseLocation({
      success: res => {
        this.setData({
          address: res.name
        });
        (this.staticData.latitude = res.latitude),
          (this.staticData.longitude = res.longitude);
      }
    });
  },
  // 获取radio选框中的值
  radioChange(e) {
    this.staticData.type = e.detail.value;
  },
  // 获取输入框的值
  bindReplaceInput(e) {
    this.staticData.message = e.detail.value;
  },
  // 获取联系方式,并对其进行类型判断，如果不是数字且长度不是11，显示提示信息
  getmessage(e) {
    let value = parseInt(e.detail.value);

    if (value === value && typeof value === "number") {
      this.staticData.telephone = value;
      return;
    } else {
      wx.showToast({
        title: "输入必须是数字，且不能为空",
        duration: 2000
      });
      return;
    }
  },
  // 点击提交，发送Ajax请求，（小程序当中没有Ajax提交这一说法），先校验各个输入框是否有值,给出轻提示，提高用户体验感
  handleSubmit() {
    if (
      this.data.address != "点击选项，要钩钩哦~" &&
      this.staticData.message &&
      this.staticData.telephone
    ) {
      wx.request({
        url: "http://localhost:3000/posts",
        method: "POST",
        data: {
          telephone: this.staticData.telephone,
          longitude: this.staticData.longitude,
          latitude: this.staticData.latitude,
          type: this.staticData.type,
          address: this.data.address,
          message: this.staticData.message
        },
        success: res => {
          // console.log(res);
          wx.showToast({
            title: "success",
            duration: 2000
          });
          wx.navigateBack();
        }
      });
    } else {
      wx.showToast({
        title: "提交失败",
        duration: 2000
      });
    }
  }
});
