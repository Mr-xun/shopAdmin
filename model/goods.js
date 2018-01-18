var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Goods = new Schema({
	kind : String,
	num : Number,
	goodsName : String,
	goodsNum : String,
	price    : Number,
	putaway :Boolean,
	boutique : Boolean,
	newGood : Boolean,
	hotSell : Boolean,
	sugg : Number,
	stock : Number,
	virtualSales : Number,
	date : {type:Date,default : Date.now}
})
var goodsModel = mongoose.model("good",Goods);
module.exports = goodsModel;