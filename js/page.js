//底部二维码
$(".erweicode").parent().css({"position":"relative"});
$(".erweicode").css({"width":"70px","height":"70px","display":"block","position":"absolute","top":"-14px","left":"-77px","display":"none"});
$(".erweicode").prev().mouseenter(function(){
	$(this).parent().find("img").css({"display":"block"})
}).mouseleave(function(){
	$(this).parent().find("img").css({"display":"none"})
})
	
//显示用户登录状态
if( getCookie("userinfo") ){
	var loginname =	JSON.parse(getCookie("userinfo")) ;
if( loginname.length != 0 ){
//			console.log(loginname.uname)
	$("#loginbox-a").css("display","none");
	$("#loginbox-aa").css("display","none");
	$("#loginbox-p").html(loginname.uname).css("display","inline-block")
	$("#loginbox-pp").html(loginname.uname).css("display","inline-block")
	}
}
////商品小图移入左右切换
//$(".small-img-ul").find("li").mouseenter(function(){
//	var index = $(this).index();
//	$(this).addClass("small-imgon").siblings().removeClass("small-imgon");
//	$("#big-img").find("img").attr("src",`img/product/1-${index+1}.jpg`);
//})
//商品详情选项卡切换
$("#xiangqing-tab-list").find("li").click(function(){
	$(this).addClass("xiangqing-tab-list-active").siblings().removeClass("xiangqing-tab-list-active");
})
//右侧扩展模块
$("#kuozhan-zhuti-ul").find("li").hover(function(){
		$(this).css("background","url(img/kuozhan-selected.png) no-repeat").find("a").css({"color": "#333","font-weight":700,"background-position":"0 -238px"});
},function(){
	$(this).css("background","").find("a").css({"color":"#666","font-weight":"100","background-position":"0 -158px"});
})
$("#kuozhan-zhuti-ul").find("li").click(function(){
	$(this).addClass("kuozhan-selected").siblings().removeClass("kuozhan-selected");
})


//请求ajax填数据
$(window).load(function(){
	var str = location.href;
	var btr = str.split("?")[1];
	var arr = btr.split("&");
	var pid = arr[0].split("=")[1];
	$.ajax({
		type:"get",
		url:"js/data-product.json?"+new Date().getTime(),
		async:true,
		success:function(json){
			var list = json.product;
			for( var i = 0 ; i < list.length ; i++ ){
				var pro = list[i];
				if( pid == pro.id ){
					$("title").html(pro.name);
//					console.log(pro.name)
					$("#proname").html(pro.name);
					$("#oldprice").html("￥"+pro.old);
					$("#newprice").html("￥"+pro.price);
					var str = "";
					for(var j = 0 ; j< pro.small.length ; j++){
//						console.log(j)
						str += `<li data-color=${pro.color[j]}><img src="img/product/${pro.small[j]}"/></li>`;
					}
					$("#procolor").html(str);
					var btr =`<img src="img/product/${pro.big[0]}" id="small"/>`;
					$("#big-img").html(btr)
					var ctr="";
					for( var t = 0 ; t < pro.small.length ; t++ ){
						if( t==0 ){
							ctr+=`<li class="small-imgon"><img src="img/product/${pro.small[0]}"/><i></i></li>`
						}else{
							ctr+=`<li><img src="img/product/${pro.small[t]}"/><i></i></li>`
						}
					}
					$("#smallul").html(ctr);
					$("#miaoshu").html(pro.txt);
					var dtr="";
					for( var x of pro.pic ){
						dtr+=`<div class="pro-pic">
									<img src="img/product/${pid}/${x}"/>
								</div>`
					};
					$("#czxg").html(dtr);
					
					$("#big").attr("src",`img/product/${pro.big[0]}`)
					
					var etr = `<a href="javascript:;" class="pro-buy-b">购买</a>
							   <a href="javascript:;" id="shopcarbtn" class="pro-buy-car" data-pid=${pro.id} data-pname=${pro.name} data-price=${pro.price}>加入购物车</a>`;
					$("#pro-buy").html(etr);
				}
			}
			//商品小图移入左右切换
				$(".small-img-ul").find("li").mouseenter(function(){
					var index = $(this).index();
					$(this).addClass("small-imgon").siblings().removeClass("small-imgon");
					$("#big-img").find("img").attr("src",`img/product/${pid}-${index+1}.jpg`);
					$("#big").attr("src",`img/product/${pid}-${index+1}.jpg`);
				})
			//商品颜色移入移出
//				$("#procolor").find("li").mouseenter(function(){
//					$(this).find("img").css({"border":"2px solid #666"}).end().siblings().find("img").css("border","2px solid transparent")
//				})
			//商品颜色移入点击	
				$("#procolor").find("li").click(function(){
					$(this).find("img").css({"border":"2px solid #666"})
					$(this).addClass("pro-color-on").siblings().removeClass("pro-color-on").find("img").css("border","2px solid transparent");
				})
			//商品颜色点击切换
				$("#procolor").find("li").click(function(){
					var index = $(this).index();
					$("#big-img").find("img").attr("src",`img/product/${pid}-${index+1}.jpg`);
				})
			//商品尺码点击
				$("#pro-size").find("li").click(function(){
					$(this).addClass("pro-size-on").siblings().removeClass("pro-size-on")
				})
			//数量加减点击
				$(".numjiage").click(function(){
					var num = Number($("#pronum").val());
					num+=Number($(this).attr("mata"));
					if( num == 0 ){
						num = 1;
					}
					$("#pronum").val(num);
				})
			//商品放大镜	
				var zoomp = new ZoomPro();
				zoomp.init();
			//购物车添加商品功能
				$("#shopcarbtn").click(function(){
					if($("#procolor").find("li").hasClass("pro-color-on") ){
//						console.log($("#procolor").find("li.pro-color-on").data("color"))//颜色
						if( $("#pro-size").find("li").hasClass("pro-size-on") ){
//							console.log( $("#pro-size").find("li.pro-size-on").html())//尺码
//							console.log( $("#pronum").val() )//数量
							var src = $("#procolor").find("li.pro-color-on").find("img").attr("src").split("/")[2];
//							console.log(src);
							var count = 0;
							if( getCookie("pid") ){
								var pid = Number(getCookie("pid"));
								pid++;
								setCookie("pid",pid);
							}else{
								var pid = count;
								setCookie("pid",pid)
							}
							var js = {
										"id" : $(this).data("pid"),
										"name":$(this).data("pname"),
										"pid":pid,
										"src": src ,
										"price":$(this).data("price"),
										"color":$("#procolor").find("li.pro-color-on").data("color"),
										"size":$("#pro-size").find("li.pro-size-on").html(),
										"count":Number($("#pronum").val())
										}
//							console.log(js);
							var arr = [];
							if( getCookie("shoplist").length !=0 ){
//								console.log(JSON.parse(getCookie("shoplist")));
								var brr = JSON.parse(getCookie("shoplist"));
								for( var i of brr ){
									arr.push(i)
								}
							}
							arr.push(js);
//							console.log(arr)
							setCookie("shoplist",JSON.stringify(arr),2);
							if( confirm("添加成功！确定-去结算页面 取消-留在本页") ){
								location.href = "shopcar.html";
							}
							return;
						}
						alert("请选择尺码");
						return;
					}
					alert("请选择商品信息");
					return;
				})
		}
	});
})
//商品放大镜
function ZoomPro(){
		this.box = document.querySelector("#box");
		this.leftbox = document.querySelector("#left");
		this.rightbox = document.querySelector("#right");
		this.leftboxImg =  document.querySelector("#small");
		this.shade = document.querySelector("#shade");
		this.mask = document.querySelector("#mask");
		this.rightboxImg =  document.querySelector("#big");
		
		this.init = function(){
			this.Over();
			this.Out();
			this.Move();
		}
		this.Over =function(){
			this.leftbox.onmouseenter = function(){
				this.rightbox.style.display = "block";
				this.mask.style.display = "block";
			}.bind(this)
		}
		this.Move = function(){
			this.leftbox.onmousemove = function(e){
				var e = e || event;
				var l = e.pageX - this.box.offsetLeft - this.mask.offsetWidth/2;
				var t = e.pageY - this.box.offsetTop - this.mask.offsetHeight/2;
//				console.log(t,this.box.offsetTop,this.box.offsetLeft)
				var maxl = this.leftbox.offsetWidth - this.mask.offsetWidth;
				var maxt = this.leftbox.offsetHeight - this.mask.offsetHeight;
				
				l = l < 0 ? 0 :(l > maxl ? maxl : l );
				t = t < 0 ? 0 :(t > maxt ? maxt : t );
				
				this.mask.style.left = l + "px";
				this.mask.style.top =  t + "px";
				
				var rightboxl = l*(this.rightboxImg.offsetWidth-this.rightbox.offsetWidth)/(this.leftbox.offsetWidth - this.mask.offsetWidth);
				var rightboxt = t*(this.rightboxImg.offsetHeight-this.rightbox.offsetHeight)/(this.leftbox.offsetHeight - this.mask.offsetHeight);
				
				this.rightboxImg.style.left = -rightboxl + "px";
				this.rightboxImg.style.top = -rightboxt + "px";
				
				//this.mask.style.backgroundPosition = `-${this.mask.offsetLeft}px -${this.mask.offsetTop}px`;
			}.bind(this)
		}
		this.Out = function(){
			this.leftbox.onmouseleave = function(){
				this.rightbox.style.display = "none";
				this.mask.style.display = "none";
			}.bind(this)
		}
	}

