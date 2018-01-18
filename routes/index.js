var express = require('express');
var router = express.Router();
var  adminModel = require("../model/admin");
var goodsModel = require("../model/goods");
/* GET home page. */
//主页
router.get('/index', function(req, res, next) {
  res.render('index', {});
});
//登录页
router.get('/login', function(req, res, next) {
  res.render('login', {});
});
router.get('/errOne', function(req, res, next) {
  res.render('errOne', {});
});
router.get('/errTwo', function(req, res, next) {
  res.render('errTwo', {});
});
router.get('/frame_top', function(req, res, next) {
  res.render('frame_top', {});
});
router.post("/api/login4ajax",function(req,res){
	var username = req.body.username;
	var pwd = req.body.pwd;
	var code = req.body.code;
	var security = req.body.security;
	var result = {
		code : 1,
		message : "登录成功"
	}
	if(code != security){
		result.code = -1;
		result.message = "验证码输入错误"
		res.json(result)
	}else{
		  adminModel.find({username:username,pwd:pwd},function(err,docs){
			if(docs.length == 0){
				result.code = -2;
				result.message = "用户名或密码输入有误！"
			}
			res.json(result)
		})
	}
})
//主页
router.post("/html/index/goodsList_ajax",function(req,res){
	var kind = "教学";
	var pageNow = Number(req.body.pageNow);
	var pageRecord = Number(req.body.pageRecord);
	var operate = goodsModel.find({kind,kind});
	operate.skip((pageNow - 1)*pageRecord);
	operate.limit(pageRecord);
		operate.exec(function(err,docs){
			console.log(docs)
			goodsModel.count({},function(err,count){
				res.json({res:docs,count});
			})
		})
})
module.exports = router;
