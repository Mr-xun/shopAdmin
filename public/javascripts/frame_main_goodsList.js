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
	send()
	//模糊查询
	search.click(function(){
		keyWord = $(".keyWord").val()
		var len =$(".selectPage option").length - 1;
		goodsList_tbody.children("tr:gt(0)").remove();
		currentOption = "1"
		send()
	})
	//设置每页记录数
	pageRecord.keydown(function(e){
		if(e.keyCode == 13){
			goodsList_tbody.children("tr:gt(0)").remove();
			currentOption = "1"
			selectPage.children("option").eq(0).attr("selected",true);
			selectPage.children("option").eq(0).siblings().attr("selected",false);
			send()
		}
	})
	//封装ajax事件
	function send(){
		$.ajax({
		url : "index/goodsList_ajax",
		type: "POST",
		async : false,
		data:{
			keyWord : keyWord,
			pageNow : currentOption,
			pageRecord : pageRecord.val()
		},
		success:function(res){
			var data = res.res
			goodsList_tbody.children("tr:gt(0)").remove();
			for(var key in data){
				var _tr = "";
				_tr += `<tr>
							<td><input type="checkbox" name="checkOne" id="checkOne" value="" /><span>${data[key].num}</span></td>
							<td><span title="点击修改内容" class="changename">${data[key].goodsName}</span><input type="text" class="changeName" /></td>
							<td><span title="点击修改内容" class="changenum">${data[key].goodsNum}</span><input type="text"   class="changeNum"/></td>
							<td><span title="点击修改内容" class="changeprice">${data[key].price}</span><input type="text"  class="changePrice"/><i>.00</i></td>
							<td class="putaway"><img src="/images/admin/yes.gif"/></td>
							<td class="boutique"><img src="/images/admin/yes.gif"/></td>
							<td class="newGood"><img src="/images/admin/yes.gif"/></td>
							<td class="hotSell"><img src="/images/admin/yes.gif"/></td>
							<td><span title="点击修改内容" class="changesort">${data[key].sugg}</span><input type="text" class="changeSort" /></td>
							<td><span title="点击修改内容" class="changestock">${data[key].stock}</span><input type="text" class="changeStock" /></td>
							<td><span title="点击修改内容" class="changesales">${data[key].virtualSales}</span><input type="text" class="changeSales" /></td>
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
				trash();
				change();
			}
				
		})
	}
	//修改商品
	function change(){
		$(".goodsList_tbody tr td span").click(function(){
		$(this).css("display","none");
		$(this).siblings("input").css("display","inline-block")
		$(this).siblings("i").css("display","none");
		$(this).parent().siblings().children("span").css("display","inline-block")
		$(this).parent().siblings().children("i").css("display","inline-block")
		$(this).parent().siblings().children("input:gt(0)").css("display","none");
		})
		$(".goodsList_tbody tr td span").hover(function(){
			$(this).css({"background":"red","color":"#000"})
		},
		function(){
			$(this).css({"background":"#fff","color":"#000"})
		}
		)
		for(var i = 0 ; i < $(".goodsList_tbody tr td span").length;i ++){
			$(".goodsList_tbody tr td input:gt(0)").eq(i).val(""+$(".goodsList_tbody tr td span").eq(i+1).html())
		}
		$(".goodsList_tbody tr td input").blur(function(){
			var change = $(this).val();
			var index = $(this).parent().parent().index();
			$(this).siblings("span").html(""+change);
			var changeName = $("tr").eq(index).children().children(".changeName").val();
			var changeNum = $("tr").eq(index).children().children(".changeNum").val();
			var changePrice = $("tr").eq(index).children().children(".changePrice").val();
			var changeSort = $("tr").eq(index).children().children(".changeSort").val();
			var changeStock = $("tr").eq(index).children().children(".changeStock").val();
			var changeSales = $("tr").eq(index).children().children(".changeSales").val();
			var num = $(this).parent().siblings().eq(0).children("span").html();
			$(this).css("display","none");
			$(this).siblings("span").css("display","inline-block")
			$(this).siblings("i").css("display","inline-block");
			$.ajax({
				url : "/index/goodsList_update",
				type: "POST",
				data:{
					num :  num,
					changeName : changeName,
					changeNum : changeNum,
					changePrice : changePrice,
					changeSort : changeSort,
					changeStock : changeStock,
					changeSales : changeSales
				},
				success : function(res){
					console.log(res.message)
				}
			})
		})
	}
	//回收站
	function trash(){
		$(".trash").click(function(){
		var page = Number(currentPage.html());
		var clearGoodNO = $(this).parent().siblings().eq(0).children("span").html();
		$(this).parent().parent().remove();
		$.ajax({
			type:"post",
			url:"index/goodsList_remove",
			data:{
				clearGoodNO : clearGoodNO
			},
			succcess : function(res){
				console.log(res.message);
			}
		});
		send();
	})
	}
	//上一页
	upPage.click(function(){
		var page = Number(currentPage.html());
		if(page == 1){
			page = 0;
		}else{
			page -= 2; 
		}
		skipPage(page);
	})
	//下一页
	downPage.click(function(){
		var page = Number(currentPage.html());
		skipPage(page);
	})
	//第一页
	firstPage.click(function(){
		var page = 0;
		skipPage(page);
	})
	//最后一页
	lastPage.click(function(){
		var page = $(".selectPage option").length - 1;;
		console.log(page)
		skipPage(page);
	})
	//选择页
	selectPage.change(function(){
		var page = $(this).children('option:selected').val()-1
		skipPage(page);
	})
	//封装跳转
	function skipPage(page){
		selectPage.children("option").eq(page).attr("selected",true);
		selectPage.children("option").eq(page).addClass("on").siblings().removeClass().attr("selected",false);
		currentOption = $(".selectPage .on").html()	
		send()
	}
})