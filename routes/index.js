var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5');//加密函数
const {UserModel} = require('../db/models');
const filter = {password: 0, _v: 0};//过滤,查询时去掉制定属性

//注册的路由
router.post('/register', function(req, res) {
  //读取请求参数
  const {username, password, type} = req.body;
  //处理：判断用户是否已经存在？若存在，提示错误信息；不存在，成功
  //查询（根据username）
  UserModel.findOne({username: username}, function (error, user) {
    if (user) {
      res.send({code: 1, msg: '此用户已存在'});
    } else {
      new UserModel({username, password: md5(password), type}).save(function (error, user) {
        //生成cookie
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7});
        //返回包含user的信息(json)
        const data = {username, type, _id: user._id};//响应数据中不携带密码
        res.send({code: 0, data: data});
      });
    }
  })
  //
  //返回相响应数据
});
//登陆的路由
router.post('/login', function(req, res) {
  const {username, password} = req.body;
  //根据username和password查询数据库users集合，如果没有，返回提示错误信息，若有，返回登陆成功信息（包含user）
  UserModel.findOne({username, password: md5(password)}, filter, function(error, user) {
    if(user) {//登陆成功
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7});
      //返回登陆信息
      res.send({code: 0, data: user});
    } else {//登陆失败
      res.send({code: 1, msg: '用户名或密码不正确'})
    }
  });
});

module.exports = router;
