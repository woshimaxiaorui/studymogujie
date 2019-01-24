$(window).load(function(){
	var arr = JSON.parse(getCookie("shoplist"));
//	console.log(arr)
	var str="";
	for( var i = 0 ; i < arr.length ; i++ ){
		var shopinfo = arr[i]
		str += `<div class="car-list">
							<ul>
								<li class="car-list-vm"><input type="checkbox" class="ck" /></li>
								<li class="car-list-desc">
									<a href="#" class="car-list-desc-img">
										<img src="img/product/${shopinfo.src}"/>
									</a>
									<a href="#" class="car-list-desc-t">${shopinfo.name}</a>
								</li>
								<li class="car-list-sku">
									<p class="sku-color">颜色:${shopinfo.color}色</p>
									<p class="sku-color">尺码：${shopinfo.size}</p>
								</li>
								<li class="car-list-price">
									<p class="sku-color" style="font-weight: 700;">${shopinfo.price}</p>
								</li>
								<li class="car-list-num">
									<div class="list-num">
										<input type="text" class="list-num-inp" value="${shopinfo.count}"/>
										<span class="list-num-add" data-num="1"></span>
										<span class="list-num-reduce" data-num="-1"></span>
									</div>
								</li>
								<li class="car-list-total">
									<p class="car-list-xiaoji">${shopinfo.price*shopinfo.count}</p>
								</li>
								<li class="car-list-del">
									<a href="javascript:;" style="color: #333;" data-pid=${shopinfo.pid}>删除</a>
								</li>
							</ul>
						</div>`
	}
	$("#car-row").html(str);
	
	$(".car-list-del").find("a").click(function(){//删除
		var pid = $(this).data("pid");
		if( confirm("确定要删除吗？") ){
			for( var i = 0 ; i < arr.length ; i++ ){
				if( pid == arr[i].pid ){
					arr.splice(i,1);
					setCookie("shoplist",JSON.stringify(arr));
					$(this).parent().parent().parent().remove();
					jiesuan()
					break;
				}
			}
		}
	})
	
	$(".list-num").find("span").click(function(){//数量加减
		var pid = $(this).parent().parent().parent().find(".car-list-del").find("a").data("pid");
		var num = $(this).data("num");
		var count = $(this).parent().find(".list-num-inp").val();
		if( num == -1 && count == 1 ){
			return;
		}
		for( var i = 0 ; i < arr.length ; i++ ){
			if( pid == arr[i].pid ){
				arr[i].count += num;
				setCookie("shoplist",JSON.stringify(arr));
				$(this).parent().find(".list-num-inp").val(arr[i].count);
				$(this).parent().parent().parent().find(".car-list-total").find(".car-list-xiaoji").html(arr[i].count*arr[i].price)
				jiesuan();
				break;
			}
		}
	})
	
	//结算函数
	function jiesuan(){
		var count = 0;
		var money = 0;
		$(".ck:checked").each(function(){
			count += Number($(this).parent().parent().find(".car-list-num").find(".list-num").find(".list-num-inp").val());
			money += Number( $(this).parent().parent().find(".car-list-total").find(".car-list-xiaoji").html() );
			
		})
		$(".car-row-jiesuan-right").find("span").html(count);
		$(".zongji").html("￥"+money);
	}
	
	//复选框点击结算
	$(".ck").click(function(){
		jiesuan();
	})
	//全选按钮
	$("#selectAll").click(function(){
		$(".ck").prop("checked",$(this).prop("checked"));
		$("#selectA").prop("checked",$(this).prop("checked"));
		jiesuan();
	})
	$("#selectA").click(function(){
		$(".ck").prop("checked",$(this).prop("checked"));
		$("#selectAll").prop("checked",$(this).prop("checked"));
		jiesuan();
	})
	
	$("#paygo").click(function(){
		alert("买买买！购物愉快！")
	})
})
