//banner轮播图
$("#box-main-banner").css({"background":"rgb(255,116,67)"})
bannerlunbo()
function bannerlunbo(){
	var color = [ "rgb(255,116,67)","rgb(208,70,47)" ]
	var ulist = $(".lunbo-list");
	var olist = $(".lunbo-button");
	$(olist[0]).css("background-position","-127px -18px")
	var index = 0
	$(ulist[index]).animate({"display":"block","z-index":2,},0,function(){
		$(this).animate({"z-index":1,"opacity":1},500).siblings().animate({"display":"none","z-index":0,"opacity":0.5})
	});
	var timer = setInterval(autoplay,3000);
	function autoplay(){
		index++
		if( index == 2 ){
			index = 0
		}
		$(olist[index]).css("background-position","-127px -18px").siblings().css("background-position","-97px -18px")
		$("#box-main-banner").css({"background":""+color[index]})
		$(ulist[index]).stop().animate({"display":"block","z-index":2,},0,function(){
			$(this).stop().animate({"z-index":1,"opacity":1},500).siblings().stop().animate({"display":"none","z-index":0,"opacity":0.5})
		});
	}
	$(ulist).mouseenter(function(){
		clearInterval(timer);
	})
	$(olist).mouseenter(function(){
		index = $(this).index()-1;
		autoplay()
	})
	$(ulist).mouseleave(function(){
		timer = setInterval(autoplay,3000);
	})
}
//tab选项卡切换
tab();
function tab(){
	$.ajax({
		type:"get",
		url:"js/tab.json?"+new Date().getTime(),
		async:true,
		success:function(json){
//			console.log(json)
		
			var olist = $(".tab-mnue-row");
			$(olist).hover(function(){
				$("#tab-mnue-content").css("display","block");
					var index = $(this).index();
//					console.log(index)
//					console.log(json[index])
					var tab = json[index].tab
					var atr = "";
					var str = "";
					for( var i = 0 ; i < tab.length ; i++ ){
						str = `<a href="#" class="wrap-title-left">${tab[i].title}</a>`;
						var con = tab[i].con;
						var btr = "";
						for( var j = 0 ; j < con.length ; j++ ){
							btr += `<a href="#" class="wrap-cont-a">${con[j]}</a>`
						};
					var ctr = "";
					ctr =		 `<dd class="tab-mnue-wrap-cont">
										${btr}
									</dd>`;
					atr += `<dl class="tab-mnue-content-wrap">
									<dt class="tab-mnue-wrap-title">
										${str}
										<a href="#" class="wrap-title-right">更多></a>
									</dt>
									${ctr}
								</dl>`
					}
					$("#tab-mnue-content-left").html(atr);
					var cnxh = json[index].cnxh;
					var cnxhstr = "";
					for( var i = 0 ; i < cnxh.length ; i++ ){
						cnxhstr+= `<a href="#" class="tab-mnue-content-right-cainixihuan">
									<div class="tab-mnue-content-right-img">
										<img src="img/tab/${cnxh[i].src}"/>
									</div>
									<div class="tab-mnue-content-right-items">
										${cnxh[i].text}
									</div>
								</a>`
					}
					var cnxhbtr = ""
					cnxhbtr = `<h2 class="tab-mnue-content-right-title">/ 猜你喜欢 /</h2>`
					cnxhstr = cnxhbtr + cnxhstr;
//					console.log(cnxhstr)
					$("#tab-mnue-content-right").html(cnxhstr)
					return false;
			},function(){
				$("#tab-mnue-content").css("display","none")
			})
		}
	});
	$(".tab-mnue-content").hover(function(){
		$(".tab-mnue-content").css("display","block")
	},function(){
		$(".tab-mnue-content").css("display","none")
	})
}
miaoshalunbo();
function miaoshalunbo(){
	var ulist = $("#miaosha-lunbo-ul");
	var index = 0;
	var timer = null;
	timer = setInterval(autoplay,2000);
	function autoplay(){
		index++;
		if( index == 3 ){
			ulist.css("left",0)
			index = 0
		}
		ulist.animate({"left":-960*(index==0?1:index)},200)
	}
}
createbox();
function createbox(){
	$.ajax({
		type:"get",
		url:"js/createbox.json?"+new Date().getTime(),
		async:true,
		success:function(json){
//			console.log(json)
			var ulist = $(".main-b");
//			console.log(ulist)
			for( var i = 0 ; i < json.length ; i++ ){
				var pro = json[i];
//				console.log(pro)
				var arr = pro.nav;
				var str = "";//导航
				for( var j = 0 ; j < arr.length ; j++ ){
					str+=`<a href="#" class="create-top-nav-list">${arr[j]}</a>|`
				};
				var brr=pro.lunbo;
				var btr="";//轮播区域div
				for( var t = 0 ; t < brr.length ; t++ ){
					var fix = brr[t];
					if( t==brr.length-1 ){
						btr+=`<div class="create-box-lunbo-f1-div create-box-lunbo-f1-div-last">
									<a href="#" class="create-box-lunbo-f1-div-a">
										<div id="create-box-lunbo-f1-div-a-img">
											<img src="img/createbox/${fix.src}"/ class="create-box-lunbo-f1-div-a-img-i">
										</div>
										<p class="create-box-lunbo-f1-div-a-title">${fix.text}</p>
										<p class="create-box-lunbo-f1-div-a-text">
											<span>￥</span>${fix.price}
										</p>
									</a>
								</div>`
					}else{
						btr+=`<div class="create-box-lunbo-f1-div">
										<a href="#" class="create-box-lunbo-f1-div-a">
											<div id="create-box-lunbo-f1-div-a-img">
												<img src="img/createbox/${fix.src}"/ class="create-box-lunbo-f1-div-a-img-i">
											</div>
											<p class="create-box-lunbo-f1-div-a-title">${fix.text}</p>
											<p class="create-box-lunbo-f1-div-a-text">
												<span>￥</span>${fix.price}
											</p>
										</a>
									</div>`
					}
				}
				var crr = pro.showimg;
				var ctr = "";//showimg
				for( var x = 0 ; x < crr.length ; x++ ){
					ctr+=`<a href="#" class="create-box-showimg${x+1}">
								<img src="img/createbox/${crr[x]}"/>
							</a>`
				}
				var drr = pro.bottom;
				var dtr = ""//bottom;
				for( var y = 0 ; y < drr.length ; y++ ){
					var vse = drr[y];
					if( y == drr.length-1 ){
						dtr+=`<a href="#" class="create-box-double-img create-box-double-last">
								<div class="create-box-double-img-left">
									<div class="create-box-double-img-left-title" style="background-image: linear-gradient(139deg,#FF5757, #FFB746);">
										${vse.title}
									</div>
									<div class="create-box-double-img-left-text">
										${vse.text}
									</div>
								</div>
								<div class="create-box-double-img-right">
									<img src="img/createbox/${vse.src}" class="create-box-double-img-right-img"/>
								</div>
							</a>`
					}else{
						dtr+=`<a href="#" class="create-box-double-img">
									<div class="create-box-double-img-left">
										<div class="create-box-double-img-left-title" style="background-image: linear-gradient(139deg,#4674ea, #D831FD);">
											${vse.title}
										</div>
										<div class="create-box-double-img-left-text">
											${vse.text}
										</div>
									</div>
									<div class="create-box-double-img-right">
										<img src="img/createbox/${vse.src}" class="create-box-double-img-right-img"/>
									</div>
								</a>`
					}
				}
				var etr = ""
				etr=`<div class="main-box-create-top">
					<div class="box-create-top-icon"></div>
					<div class="create-top-title-name">
						${pro.title}
					</div>
					<div class="create-top-nav">
						${str}
					</div>
				</div>
				<div class="main-box-create-bottom">
					<div class="main-box-create-bottom-left">
						<a href="#" class="main-box-create-bottom-left-img">
							<img src="img/createbox/${pro.leftlogo}"/>
						</a>
					</div>
					<div class="main-box-create-bottom-right">
						<div class="create-box-lunbo">
							<div class="create-box-lunbo-f1">
								${btr}
							</div>
						</div>
						<div class="create-box-showimg">
							${ctr}
						</div>
						<div class="create-box-double">
							${dtr}
						</div>
					</div>`
				$(ulist[i]).html(etr);
			}
		}
	});
}
//右侧导航
rightnav();
function rightnav(){
	$("#kf").hover(function(){
		$("#kfhover").css("display","block")
	},function(){
		$("#kfhover").css("display","none")
	})
	$("#kfhover").mouseenter(function(){
		$("#kfhover").css("display","block")
	})
	$("#shangjia").hover(function(){
		$("#shangjiahover").css("display","block")
	},function(){
		$("#shangjiahover").css("display","none")
	})
	$("#shangjiahover").mouseenter(function(){
		$("#shangjiahover").css("display","block")
	})
	$(window).scroll(function(){
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
		if( sTop > 0 ){
			$("#to-top").css("display","block");
			$("#to-top").click(function(){
				document.documentElement.scrollTop = document.body.scrollTop = 0;
			})
		}else{
			$("#to-top").css("display","none");
		}
	})
}
