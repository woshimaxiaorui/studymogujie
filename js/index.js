//pbl实现
var $column = $(".column");
//console.log($column)


function ajax(){
	$.ajax({
		type:"get",
		url:"js/pbl.json?"+new Date().getTime(),
		async:true,
		success:function(json){
	//		console.log(json)
			for( var i = 0 ; i < json.length ; i++ ){
				var pro = json[i];
				var str = "";//一个div内容
				var btr = "";//图片下方标签内容
				var dtr = "";//图片移入文字描述
				var etr = "";//图片移入两个图标
				if( pro.title.length != 0 ){
					for( var j = 0 ; j < pro.title.length ; j++ ){
						var bro = pro.title[j];
						btr += `<a href="#">
									<div class="ppicon">
										<img src="img/pbl/${bro.src}"/>
									</div>
									${bro.content}
								</a>`
					}
				}
				if( pro.text ){
					dtr = `<div class="selection"><a href="#">${pro.text}</a></div>`
				}
				if( pro.icon ){
//					console.log(pro.icon)
					etr =`<div class="small-icon">
									<span class="zan" style="background: url(img/zan.png); background-size: cover;"></span>
								</div>
								<div class="small-icon xing-icon">
									<span class="zan" style="background: url(img/xing.png); background-size: cover;"></span>
								</div>`
				}
				str = `
							<div class="wrap-img">
								<img src="img/pbl/${pro.src}"/>
								${etr}
								${dtr}
							</div>
							<div class="wrap-item">
								${btr}
							</div>
						`;
				var div = $("<div>");
				div.addClass("column-wrap")
				div.html(str);
				var index = getminHeight();
				$column[index].append(div.get(0));
			}
			
			//瀑布流图片鼠标移入效果
			$(".wrap-img").hover(function(){
					$(this).find(".small-icon").stop().fadeToggle(200)
					$(this).find(".selection").stop().fadeToggle(200)
			},function(){
					$(this).find(".small-icon").stop().fadeToggle(200)
					$(this).find(".selection").stop().fadeToggle(200)
			})	
			
		}
	});
	
}
ajax();
//找最小高度下标
function getminHeight(){
		var minHeight = $column[0].offsetHeight + $column[0].offsetTop;
		var index = 0;
		for( var i = 0 ; i < $column.length ; i++ ){
			if( minHeight > $column[i].offsetHeight + $column[i].offsetTop ){
				minHeight = $column[i].offsetHeight + $column[i].offsetTop;
				index = i;
			}
		}
		return index;
	}

$(window).scroll(function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var index = getminHeight();
		var minHeight = $column[index].offsetHeight + $column[index].offsetTop;
		if( window.innerHeight + scrollTop > minHeight ){
			ajax();
			//瀑布流图片鼠标移入效果
			$(".wrap-img").hover(function(){
					$(this).find(".small-icon").stop().fadeToggle(200)
					$(this).find(".selection").stop().fadeToggle(200)
			},function(){
					$(this).find(".small-icon").stop().fadeToggle(200)
					$(this).find(".selection").stop().fadeToggle(200)
			})	
		}
		
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
		var h2 = 900;
		if( sTop > h2 ){
			$("#go-top").css("display","block");
			$("#go-top").click(function(){
				document.documentElement.scrollTop = document.body.scrollTop = 0;
			})
		}else{
			$("#go-top").css("display","none")
		}
	})
