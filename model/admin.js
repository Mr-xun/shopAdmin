var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Admin = new Schema({
	username : String,
	pwd : String,
	date : {type:Date,default : Date.now}
})
var userModel = mongoose.model("admin",Admin);
module.exports = userModel;
