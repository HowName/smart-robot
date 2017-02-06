//index.js

var app = getApp();
var that;
var chatListData = [];

Page({
  data: {
    askWord: '',
    userInfo: {},
    chatList: [],
  },
  onLoad: function () {
    that = this;
    //获取用户信息
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      });
    });
  },
  onReady: function () {
    //问候语
    setTimeout(function () {
      that.addChat('你好啊！', 'l');
    }, 1000);
  },
  sendChat: function (e) {

    let word = e.detail.value.ask_word ? e.detail.value.ask_word : e.detail.value;//支持两种提交方式
    that.addChat(word, 'r');

    //请求api获取回答
    app.req('post', 'openapi/api', {
      'data': { 'info': word, 'loc': '广州', 'userid': '123' },
      'success': function (resp) {
        that.addChat(resp.text, 'l');
        if (resp.url) {
          that.addChat(resp.url, 'l');
        }
      },
    });

    //清空输入框
    that.setData({
      askWord: ''
    });
  },
  //新增聊天列表
  addChat: function (word, orientation) {
    let ch = { 'text': word, 'time': new Date().getTime(), 'orientation': orientation };
    chatListData.push(ch);
    that.setData({
      chatList: chatListData
    });
  }
})
