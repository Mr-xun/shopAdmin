$(function(){
	var listLi = $(".wrap .list");
//	var listSonLi = $(".wrap .list li ul li");
//	console.log(listSonLi)
//	listSonLi.click(function(event){
//		console.log($(this))
//		return false
//	})
	listLi.click(function(){
		var index = $(this).index()
		var siblings = $(this).siblings();
		var listSonLi = $(this).find("li");
		console.log(listSonLi)
		listSonLi.click(function(event){
			var num = $(this).index();
			console.log(num)
			listSonLi.eq(num).css("background","#A1A1A1");
			listSonLi.eq(num).children().css("color","#fff")
			listSonLi.eq(num).siblings().css("background","#575757 ")
			listSonLi.eq(num).siblings().children().css("color","#d7d7d7")
			event.stopPropagation()
		})
		if($(this).attr("class") == "list_" + (index + 1)  + "_on"){
			$(this).removeClass().addClass("list_" + (index + 1));
		}else{
			$(this).removeClass().addClass("list_" + (index + 1)  + "_on");
			for(var i = 0 ; i < siblings.length ; i ++){
				siblings.eq(i).removeClass().addClass("list_"+ (siblings.eq(i).index()+1))
				siblings.eq(i).children("ul").css("display","none")
			}
		}
		if($(this).attr("class") == "list_" + (index + 1)  + "_on"){
			$(this).children("ul").css("display","block")
		}else{
			$(this).children("ul").css("display","none")	
		}
	})
})