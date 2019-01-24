$(".topnav-ul").find("li").click(function(){
	$(this).addClass("topon").siblings().removeClass("topon")
})
$(window).load(function(){
	$.ajax({
		type:"get",
		url:"js/data-product.json?"+new Date().getTime(),
		async:true,
		success:function(json){
//			console.log(json);
			var str = "";
			for( var i = 0 ; i < json.product.length ; i++ ){
				var pro = json.product[i];
//				console.log(pro);
				str += `<div class="pro-list">
							<a href="page.html?pid=${pro.id}" class="pro-list-img">
								<img src="img/product/${pro.src}"/>
							</a>
							<a href="javascript:;" class="pro-list-title">
							<p class="pro-list-tit">${pro.name}</p>
							<div class="pro-list-txt">
								<b class="pro-list-b">￥${pro.price}</b>
								<p class="pro-list-p">￥&nbsp;<span>${pro.old}</span></p>
							</div>
							</a>
						</div>`;
			}
			$("#product-list").html(str);
		}
	});
})
