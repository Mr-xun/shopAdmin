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
//分页和查询
router.post("/html/index/goodsList_ajax",function(req,res){
	var keyWord =req.body.keyWord;
	var pageNow = Number(req.body.pageNow);
	var pageRecord = Number(req.body.pageRecord);
	var operate = goodsModel.find({"goodsName":{$regex:keyWord},"flag":"on"});
	operate.skip((pageNow - 1)*pageRecord);
	operate.limit(pageRecord);
		operate.exec(function(err,docs){
			goodsModel.count({"goodsName":{$regex:keyWord},"flag":"on"},function(err,count){
				console.log(count)
				res.json({res:docs,count});
			})
		})
})
//修改商品
router.post("/index/goodsList_update",function(req,res){
	var num = req.body.num;
	var updateName = req.body.changeName;
	var updateNum = req.body.changeNum;
	var updatePrice = req.body.changePrice;
	var updateSugg = req.body.changeSort;
	var updateStock = req.body.changeStock;
	var updateSale = req.body.changeSales;
	goodsModel.update({"num":num},{$set:{goodsName:updateName,goodsNum:updateNum,price:updatePrice,sugg:updateSugg,stock:updateStock,virtualSales:updateSale}},function(err){
		var result = {
			code : 2,
			message : "修改成功"
		}
		if(err){
			console.log(err);
		}else{
			console.log("成功")
			res.json(result);
		}
	})
})

//删除商品
router.post("/html/index/goodsList_remove",function(req,res){
	var clearGoodNO = req.body.clearGoodNO;
	goodsModel.update({"num":clearGoodNO},{$set:{flag:"off"}},function(err){
			var result = {
			code : 3,
		message : "删除成功"
		}
		if(!err){
			console.log("删除成功")
			res.json(result)
		}
	})
})

//增加商品信息
router.post("/html/index/addGoods_ajax",function(req,res){
	var form = new multiparty.Form({
		uploadDir:"public/images/upload"
	});
	var result = {
		code : 1,
		message : "增加成功"
	}
	//商品编号自增
	goodsModel.count({},function(err,count){
		form.parse(req, function(err, body, files){
		if(err) {
			console.log(err);
		}
		var kind = body.kind;
		var  num = count;
		if(count < 10){
			num = "00" + count;
		}else if(count >=10 && count < 100){
			num = "0" + count
		}else{
			num = count;
		}
		var goodsName = body.goodsName;
		var goodsNum = body.goodsNum ;
		console.log(Boolean(goodsNum))
		if(body.goodsNum == ""){
			goodsNum = "XIAO" + num
		}
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
		var flag = body.flag;
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
		gm.flag = flag;
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
		
})
module.exports = router;
