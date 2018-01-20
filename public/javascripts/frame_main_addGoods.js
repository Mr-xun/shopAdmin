$(function(){
	var confirmBtn = $(".confirmBtn");
	var resetBtn = $(".resetBtn");
	var num = 100;
	var commonInfo = $(".commonInfo");
	var detialInfo = $(".detialInfo");
	var otherInfo = $(".otherInfo");
	var goodsAttribute = $(".goodsAttribute");
	var goodsPhoto = $(".goodsPhoto");
	var confirm = $(".confirm");
	var ulLi = $("#wrap ul li");
	ulLi.click(function(){
		var index = $(this).index();
		var $box = $(".content>form>div");
		$(this).css("background","#fff");
		$(this).siblings().css("background","#efefef")
		$box.eq(index).css("display","block");
		$box.eq(index).siblings("div:lt(4)").css("display","none");
	})
	confirmBtn.click(function(){
		var putaway = $(".putaway").is(":checked") ? true : false;
		var boutique = $(".boutique").is(":checked") ? true : false;
		var newGood = $(".newGood").is(":checked") ? true : false;
		var hotSell = $(".hotSell").is(":checked") ? true : false;
		var flag = "on";
		console.log(putaway,boutique,newGood,hotSell)
		var goodsName = $(".goodsName").val()|| "课本";
		var goodsNum = $(".goodsNum").val();
		var kind = $(".kind option:selected").val() || "教学"
		var price = $(".price").val() || 1001;
		var sugg = $(".sugg").val() || 100;
		var stock = $(".stock").val() || 100;
		var virtualSales = $(".virtualSales").val() || 100;
		var imgBigPath = document.getElementsByClassName("imgBigPath")[0].files[0];
		var imgSmPath = document.getElementsByClassName("imgSmPath")[0].files[0];
		var form = new FormData;
		form.append("kind",kind);
		form.append("goodsName",goodsName);
		form.append("goodsNum",goodsNum);
		form.append("price",price);
		form.append("sugg",sugg);
		form.append("stock",stock);
		form.append("virtualSales",virtualSales);
		form.append("imgBigPath",imgBigPath);
		form.append("imgSmPath",imgSmPath);
		form.append("putaway",putaway);
		form.append("boutique",boutique);
		form.append("newGood",newGood);
		form.append("hotSell",hotSell);
		form.append("flag",flag);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "index/addGoods_ajax");
		xhr.onreadystatechange = function(res){
			if (xhr.readyState==4 && xhr.status==200) {
				console.log(xhr.responseText);
				var res = JSON.parse(xhr.responseText);
			}
		}
		xhr.send(form);
	})
})