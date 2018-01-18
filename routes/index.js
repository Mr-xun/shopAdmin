var express = require('express');
var router = express.Router();
var  adminModel = require("../model/admin");
var goodsModel = require("../model/goods");
var multiparty = require("multiparty");
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
	var keyWord =req.body.keyWord;
	var pageNow = Number(req.body.pageNow);
	var pageRecord = Number(req.body.pageRecord);
//	var operate = goodsModel.find({$or:[{kind:{$regex:keyWord},goodsName:{$regex:keyWord}}]});
	var operate = goodsModel.find({"goodsName":{$regex:keyWord}});
	operate.skip((pageNow - 1)*pageRecord);
	operate.limit(pageRecord);
		operate.exec(function(err,docs){
			goodsModel.count({"goodsName":{$regex:keyWord}},function(err,count){
				console.log(count)
				res.json({res:docs,count});
			})
		})
})
//增加商品信息
router.post("/html/index/addGoods_ajax",function(req,res){
	var form = new multiparty.Form({
		uploadDir:"public/images/upload"
	});
	var result = {
		code : 1,
		message : "成功"
	}
	form.parse(req, function(err, body, files){
		if(err) {
			console.log(err);
		}
		console.log(body);
		var kind = body.kind;
		var num = body.num;
		var goodsName = body.goodsName;
		var goodsNum = body.goodsNum;
		var price = body.price[0];
		var putaway = body.putaway;
		var boutique = body.boutique;
		var newGood = body.newGood;
		var hotSell = body.hotSell;
		var sugg = body.sugg;
		var stock = body.stock;
		var virtualSales = body.virtualSales[0];
		var imgBigPath = files["imgBigPath"][0].path.replace("public\\", "");
		var imgSmPath = files["imgSmPath"][0].path.replace("public\\", "");
		console.log(imgBigPath);
		var gm = new goodsModel();
		gm.kind = kind;
		gm.num = num;
		gm.goodsName = goodsName;
		gm.goodsNum = goodsNum;
		gm.price = price;
		gm.sugg = sugg;
		gm.stock = stock;
		gm.virtualSales = virtualSales;
		gm.imgBigPath = imgBigPath;
		gm.imgSmPath = imgSmPath;
		gm.putaway = putaway;
		gm.boutique = boutique;
		gm.newGood = newGood;
		gm.hotSell = hotSell;
		gm.save(function(err){
			if(err) {
				console.log(err)
				result.code = -99;
				result.message = "商品保存失败";
			}
			res.json(result);
		})
	})	
})
module.exports = router;
