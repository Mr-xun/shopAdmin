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
	search.click(function(){
		keyWord = $(".keyWord").val()
		var len =$(".selectPage option").length - 1;
		console.log(keyWord)
		goodsList_tbody.children("tr:gt(0)").remove();
		currentOption = "1"
		send()
	})
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
	//封装ajax事件
	function send(){
		$.ajax({
		url : "index/goodsList_ajax",
		type: "POST",
		data:{
			keyWord : keyWord,
			pageNow : currentOption,
			pageRecord : pageRecord.val()
		},
		success:function(res){
			var data = res.res
			for(var key in data){
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
				if(data[key].putaway == "false"){
					$(".putaway img").attr("src","/images/admin/no.gif")
				}
				if(data[key].boutique == "false"){
					$(".boutique img").attr("src","/images/admin/no.gif")
				}
				if(data[key].newGood == "false"){
					$(".newGood img").attr("src","/images/admin/no.gif")
				}
				if(data[key].hotSell == "false"){
					$(".hotSell img").attr("src","/images/admin/no.gif")
				}
				goodsList_tbody.append(_tr);
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
		goodsList_tbody.children("tr:gt(0)").remove();
		send()

	}
})