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
	send()
	pageRecord.keydown(function(e){
			if(e.keyCode == 13){
				console.log(pageRecord.val())
				goodsList_tbody.children("tr:gt(0)").remove();
				send()
				setTimeout(function(){
				},30)
			}
		})
	//封装ajax事件
	function send(){
		$.ajax({
		url : "index/goodsList_ajax",
		type: "POST",
		data:{
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
							<td><img src="/images/admin/yes.gif"/></td>
							<td><img src="/images/admin/yes.gif"/></td>
							<td><img src="/images/admin/yes.gif"/></td>
							<td><img src="/images/admin/yes.gif"/></td>
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
				}
				var pages = Math.ceil(res.count / pageRecord.val());
				console.log(pages)
				if(pages > 1){
					for(var k = 2 ; k <= pages ; k ++){
						var _option = "";
						_option += `<option value=${k}>${k}</option>`
						selectPage.append(_option);
					}
				}
				currentPage.html(currentOption)
				pageAll.html(pages);
				recordAll.html(res.count);
			}
		})
	}
	setTimeout(function(){
		var options = $(".selectPage option");
		//设置每页记录数
		//上一页
		upPage.click(function(){
			var up = Number(currentPage.html());
			if(up == 1){
				up = 0;
			}else{
				up -=2; 
			}
			console.log(up)
			selectPage.children().eq(up).addClass("on").siblings().removeClass().attr("selected",false);
			selectPage.children().eq(up).attr("selected",true);
			currentOption = $(".selectPage .on").html()	
			goodsList_tbody.children("tr:gt(0)").remove();
			send()
			setTimeout(function(){
				selectPage.children("option:gt(up)").remove();
			},30)
		})
		//下一页
		downPage.click(function(){
			var down = Number(currentPage.html());
			selectPage.children().eq(down).addClass("on").siblings().removeClass().attr("selected",false);
			selectPage.children().eq(down).attr("selected",true);
			currentOption = $(".selectPage .on").html()	
			goodsList_tbody.children("tr:gt(0)").remove();
			send()
			setTimeout(function(){
				selectPage.children("option:gt(down)").remove();
			},30)
		})
		//第一页
		firstPage.click(function(){
			var len = options.length-1
			selectPage.children().eq(0).addClass("on").siblings().removeClass().attr("selected",false);
			selectPage.children().eq(0).attr("selected",true);
			currentOption = $(".selectPage .on").html()	
			goodsList_tbody.children("tr:gt(0)").remove();
			send()
			setTimeout(function(){
				selectPage.children("option:gt(len)").remove();
			},30)
		})
		//最后一页
		lastPage.click(function(){
			var len = options.length-1
			console.log(len)
			selectPage.children().eq(len).addClass("on").siblings().removeClass().attr("selected",false);
			selectPage.children().eq(len).attr("selected",true);
			currentOption = $(".selectPage .on").html()	
			goodsList_tbody.children("tr:gt(0)").remove();
			send()
			setTimeout(function(){
				selectPage.children("option:gt(len)").remove();
			},30)
		})
		//选择页
		selectPage.change(function(){
			var len4 = options.length-1;
			console.log(len4)
			var value = $(this).children('option:selected').val()-1
			$(this).children().eq(value).addClass("on").siblings().removeClass();
			currentOption = $(".selectPage .on").html()	
			goodsList_tbody.children("tr:gt(0)").remove();
			send()
			setTimeout(function(){
				selectPage.children("option:gt("+len4+")").remove();
			},30)
//			
		})
	},30)
})