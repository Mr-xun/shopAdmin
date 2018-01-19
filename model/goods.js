var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
	kind : String,
	num : String,
	goodsName : String,
	goodsNum : String,
	imgBigPath : String,
	imgSmPath : String,
	price : String,
	putaway :String,
	boutique : String,
	newGood : String,
	hotSell : String,
	sugg : String,
	stock : String,
	flag : String,
	virtualSales : String,
	date : {type:Date,default : Date.now}
})
var goodsModel = mongoose.model("good",Goods);
module.exports = goodsModel;