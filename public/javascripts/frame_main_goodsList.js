$(function(){
	var goodsList_tbody = $(".goodsList_tbody");
	var recordAll = $(".recordAll");
	var pageAll = $(".pageAll");
	var currentPage = $(".currentPage");
	var pageRecord = $(".pageRecord");
	var selectPage = $(".selectPage");
	var currentOption = $(".selectPage .on").html();
	var firstPage = $(".firstPage");
	var lastPage = $(".lastPage");
	var upPage = $(".upPage");
	var downPage = $(".downPage");
	var keyWord = $(".keyWord").val();
	var search = $(" .search");
	var clearGoodNO = null;
	send()
	//修改内容
//	var changeName = $(".changeName");
//	var changeNum = $(".changeNum");
//	var changePrice = $(".changePrice");
//	var changeSort = $(".changeSort");
//	var changeName = $(".changeName");
//	var changeStock = $(".changeStock");
//	var changeSpan = $(".goodsList_tbody tr td span");
//	$(".goodsList_tbody tr td span").click(function(){
//		$(this).css("display","none");
//		$(this).siblings("input").css("display","block")
//		$(this).siblings("i").css("display","none");
//		$(this).parent().siblings().children("span").css("display","block")
//		$(this).parent().siblings().children("i").css("display","block")
//		$(this).parent().siblings().children("input").css("display","none");
//		var changeHtml = $(this).siblings("input").val();
//		console.log(changeHtml)
//		$(this).html(""+changeHtml);
//	})
	
	//模糊查询
	search.click(function(){
		keyWord = $(".keyWord").val()
		var len =$(".selectPage option").length - 1;
		console.log(keyWord)
		goodsList_tbody.children("tr:gt(0)").remove();
		currentOption = "1"
		send()
	})
	//设置每页记录数
	pageRecord.keydown(function(e){
		if(e.keyCode == 13){
			console.log(pageRecord.val())
			goodsList_tbody.children("tr:gt(0)").remove();
			currentOption = "1"
			selectPage.children("option").eq(0).attr("selected",true);
			selectPage.children("option").eq(0).siblings().attr("selected",false);
			send()
		}
	})
	//回收站
	console.log($(".trash"))
	$(".trash").click(function(){
		clearGoodNO = $(this).parent().siblings().eq(0).children("span").html();
//		$(this).parent().parent().remove();
		send()
		location.reload();
		console.log($(".trash"))
	})
	//封装ajax事件
	function send(){
		$.ajax({
		url : "index/goodsList_ajax",
		type: "POST",
		async : false,
		data:{
			clearGoodNO : clearGoodNO,
			keyWord : keyWord,
			pageNow : currentOption,
			pageRecord : pageRecord.val()
		},
		success:function(res){
			var data = res.res
			goodsList_tbody.children("tr:gt(0)").remove();
			for(var key in data){
				console.log(data[key].flag )
				var _tr = "";
				_tr += `<tr>
							<td><input type="checkbox" name="checkOne" id="checkOne" value="" /><span>${data[key].num}</span></td>
							<td><span title="点击修改内容" class="goodsname">${data[key].goodsName}</span></td>
							<td><span title="点击修改内容">${data[key].goodsNum}</span></td>
							<td><span title="点击修改内容">${data[key].price}</span><i>.00</i></td>
							<td class="putaway"><img src="/images/admin/yes.gif"/></td>
							<td class="boutique"><img src="/images/admin/yes.gif"/></td>
							<td class="newGood"><img src="/images/admin/yes.gif"/></td>
							<td class="hotSell"><img src="/images/admin/yes.gif"/></td>
							<td><span title="点击修改内容">${data[key].sugg}</span></td>
							<td><span title="点击修改内容">${data[key].stock}</span></td>
							<td><span title="点击修改内容">${data[key].virtualSales}</span></td>
							<td>
								<a href="javascript:;" class="view" title="查看"><img src="/images/admin/icon_view.gif"/></a>
								<a href="javascript:;" class="edit" title="编辑"><img src="/images/admin/icon_edit.gif"/></a>
								<a href="javascript:;" class="copy" title="复制"><img src="/images/admin/icon_copy.gif"/></a>
								<a href="javascript:;" class="trash" title="回收站"><img src="/images/admin/icon_trash.gif"/></a>
							</td>
					</tr> `
				
				goodsList_tbody.append(_tr);
				var index = parseInt(key) + 1;
				if(data[key].putaway == "false"){
					$(".goodsList_tbody tr").eq(index).children("td:eq(4)").children("img").attr("src","/images/admin/no.gif")
				}
				if(data[key].boutique == "false"){
					$(".goodsList_tbody tr").eq(index).children("td:eq(5)").children("img").attr("src","/images/admin/no.gif")
				}
				if(data[key].newGood == "false"){
					$(".goodsList_tbody tr").eq(index).children("td:eq(6)").children("img").attr("src","/images/admin/no.gif")
				}
				if(data[key].hotSell == "false"){
					$(".goodsList_tbody tr").eq(index).children("td:eq(7)").children("img").attr("src","/images/admin/no.gif")
				}
				}
				var pages = Math.ceil(res.count / pageRecord.val());
				//获取option数量
				var optionsLen = $(".selectPage option").length;
				var len = pages - 1
				if(pages > optionsLen){
					for(var k = optionsLen + 1 ; k <= pages ; k ++){
						var _option = "";
						_option += `<option value=${k}>${k}</option>`
						selectPage.append(_option);	
					}
				}else{
					selectPage.children("option:gt("+len+")").remove()
				}
				currentPage.html(currentOption)
				pageAll.html(pages);
				recordAll.html(res.count);
			}
		})
	}
	setTimeout(function(){
		var options = $(".selectPage option");
		//上一页
		upPage.click(function(){
			var page = Number(currentPage.html());
			var len =$(".selectPage option").length - 1;
			if(page == 1){
				page = 0;
			}else{
				page -= 2; 
			}
			skipPage(page,len);
		})
		//下一页
		downPage.click(function(){
			var page = Number(currentPage.html());
			var len =$(".selectPage option").length - 1;
			skipPage(page,len);
			location.reload();
		})
		//第一页
		firstPage.click(function(){
			var len =$(".selectPage option").length - 1;
			var page = 0;
			skipPage(page,len);
		})
		//最后一页
		lastPage.click(function(){
			var len =$(".selectPage option").length - 1;
			var page = len;
			console.log(page)
			skipPage(page,len);
		})
		//选择页
		selectPage.change(function(){
			var len =$(".selectPage option").length - 1;
			var page = $(this).children('option:selected').val()-1
			skipPage(page,len);
		})
	},30)
	//封装跳转
	function skipPage(page,len){
		selectPage.children("option").eq(page).attr("selected",true);
		selectPage.children("option").eq(page).addClass("on").siblings().removeClass().attr("selected",false);
		currentOption = $(".selectPage .on").html()	
		send()
		location.reload();
	}
})