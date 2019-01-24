window.onload = function(){
	$id("aboutbtn").onmouseenter = function(){
		$id("header-hidden").style.display = "block";
	}
	$id("aboutbtn").onmouseleave = function(){
		$id("header-hidden").style.display = "none";
	}
	$id("header-hidden").onmouseenter = function(){
		$id("header-hidden").style.display = "block";
	}
	$id("header-hidden").onmouseleave = function(){
		$id("header-hidden").style.display = "none";
	}
	$id("search-select").onmouseenter = function(){
		$id("search-hidden").style.display = "block";
	}
	$id("search-select").onmouseleave = function(){
		$id("search-hidden").style.display = "none";
	}
	$id("search-hidden").onmouseenter = function(){
		$id("search-hidden").style.display = "block";
	}
	$id("search-hidden").onmouseleave = function(){
		$id("search-hidden").style.display = "none";
	}
	$id("search-hidden").onclick = function(e){
		var e = e || event;
		var target = e.target || e.srcElement;
		if( target.tagName == "A" ){
			$id("search-select").innerHTML = "搜"+target.innerHTML;
			$id("search-hidden").style.display = "none";
		}
	}
	//热门话题请求数据
	$.ajax({
			type:"get",
			url:"js/data-huati.json?id=" + new Date().getTime(),
			async:true,
			success:function(json){
				var str = "";
				for( var i = 0 ; i < json.length ; i++ ){
					var pro = json[i];
					str+= `<li><a href=${pro.href}>#${pro.name}#</a></li>`
				}
				$("#huati").html(str);
			}
			
	})
	$("#navmenu").hover(function(){
		$("#mulu").css("display","block");
	},function(){
		$("#mulu").css("display","none");
	})
	$("#mulu").mouseenter(function(){
		$("#mulu").css("display","block");
	})
	
	//底部二维码
	$(".erweicode").parent().css({"position":"relative"});
	$(".erweicode").css({"width":"70px","height":"70px","display":"block","position":"absolute","top":"-14px","left":"-77px","display":"none"});
	$(".erweicode").prev().mouseenter(function(){
		$(this).parent().find("img").css({"display":"block"})
	}).mouseleave(function(){
		$(this).parent().find("img").css({"display":"none"})
	})
	//头部app下载二维码
	$(".appcode").parent().css({"position":"relative"});
	$(".appcode").css({"position":"absolute","width":200,"height":200,"background":"white","z-index":10,"left":-60,"top":50,"border-radius":5,"box-shadow":"0 0 20px 0 rgba(0,0,0,0.05)","display":"none"})
	$(".xiazaiapp").mouseenter(function(){
		$(".appcode").css("display","block")
					 
	}).mouseleave(function(){
		$(".appcode").css("display","none")			 	
	})
	
	window.onscroll = function(){
//顶部吸顶效果
//获取页面滚走的距离
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
		var h1 = 132;
		var nav = $("#fixed-nav");
		if( sTop > h1){
			nav.stop().slideDown()
		}else{
			nav.css("display","none")
		}
	}
	
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
}

