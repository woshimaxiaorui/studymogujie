function $id(id){//根据ID查找
	return document.getElementById(id);
}
function create(m){//创建元素
	return document.createElement(m);
}
function rand(min,max){//随机数
	return Math.round( Math.random()*(max-min)+min );
}
function color(){//随机颜色
	var str = "ABCDEF0123456789";
	var stb = "";
	for( var i = 1 ; i <= 4 ; i ++){
		stb += str.charAt(rand(0,15));
	}
	return "#" + stb;
}
function yzm(){
		var str = "";//存储验证码
		//取出6位
		for( var i = 1 ; i <= 6 ; i++ ){
			var code = rand(48,122);
			if( code>=58&&code<=64||code>=91&&code<=96 ){
				//不满足就重新抽
				i--;
			}else{
				//满足 就将code转成字符
				str += String.fromCharCode(code);
			}
		}
		return str;
	}
//自定义日期时间格式
function dateToString(now,sign){
	//默认日期的间隔符为  -  如果用户传递的是/  就使用/  .  如果用户不传递任何参数 默认是-
	sign = sign || "-";
	var y = now.getFullYear();
	var m = toTwo(  now.getMonth()+ 1  ) ;
	var d = toTwo(  now.getDate() );
	var h = toTwo(  now.getHours() );
	var _m = toTwo(  now.getMinutes() );
	var s = toTwo( now.getSeconds() ) ;
	var str = y + sign + m + sign + d + " " + h + ":" + _m + ":" + s;
	return str;
}


//判断得到的结果是否小于10 如果小于10，前面拼接0
function toTwo(val){
	return val < 10 ? "0"+val : val;
}


function crash(small,big){//碰撞
			var boxsmallL = small.offsetLeft;
			var boxbigL = big.offsetLeft;
			var boxsmallT = small.offsetTop;
			var boxbigT = big.offsetTop;
			var boxsmallW = small.offsetWidth;
			var boxsmallH = small.offsetHeight;
			var boxbigW = big.offsetWidth;
			var boxbigH = big.offsetHeight;
			if( boxsmallL + boxsmallW >= boxbigL && boxbigL + boxbigW >= boxsmallL && boxsmallT + boxsmallH > boxbigT && boxbigT + boxbigH >= boxsmallT   ){
				return true;
			}else{
				return false;
			}
	}


//碰撞函数
	function pz(d1,d2){
		R1 = d1.offsetWidth+d1.offsetLeft;
		L1 = d1.offsetLeft;
		T1 = d1.offsetTop;
		B1 = d1.offsetHeight + d1.offsetTop;
		
		R2 = d2.offsetWidth+d2.offsetLeft;
		L2 = d2.offsetLeft;
		T2 = d2.offsetTop;
		B2 = d2.offsetHeight + d2.offsetTop;
		
		//如果碰不上 返回false 
		if( R1 < L2 || B1 < T2 || T1 > B2 || L1 > R2 ){
			return false;
		}else{
			return true;
		}
	}
	
	

function playmove(Odiv,Movespend,Shellspend){//div 移动发射子弹
	  	var Box = $id(Odiv);
	  	document.onkeydown = function(e){
	  		var e = e || event;
	  		var code = e.keyCode || e.which;
	  		var shell = document.createElement("div");
	  		shell.style.width = "5px";
	  		shell.style.height = "15px";
	  		shell.style.borderRadius = "50%";
	  		shell.style.position = "absolute";
	  		shell.style.background = "#f06";
	  		shell.style.transform = "rotate(0deg)";
	  		shell.style.display ="none";

		  	if( code == 83 || code == 40 ){  //下
		  		var movedown = Box.offsetTop;
		  		Box.style.top = movedown + 1*Movespend +"px" ;
		  		Box.style.transform = "rotate(180deg)";
		  		shell.style.transform = "rotate(180deg)";
		  	}else if( code == 65 || code == 37){ //左
		  		var moveleft = Box.offsetLeft;
		  		Box.style.left = moveleft - 1*Movespend +"px" ;
		  		Box.style.transform = "rotate(-90deg)";
		  		shell.style.transform = "rotate(-90deg)";
		  	}else if( code == 87 || code == 38){  //上
		  		var movetop = Box.offsetTop;
		  		Box.style.top = movetop - 1*Movespend +"px" ;
		  		Box.style.transform = "rotate(360deg)";
		  		shell.style.transform = "rotate(360deg)";
		  	}else if( code == 68 || code == 39){ //右
		  		var moveright = Box.offsetLeft;
		  		Box.style.left = moveright + 1*Movespend +"px" ;
		  		Box.style.transform = "rotate(90deg)";

		  	}else if( code == 32 ){ // 空格
		  		var shepT = Box.offsetTop;
		  		var shepX = Box.offsetLeft;
		  		var str = Box.style.transform;
		  		shell.style.display = "block";
		  		if( str ==="rotate(360deg)" ){
		  			shellT();
		  		}else if(str ==="rotate(90deg)"){
		  			shellR();
		  		}else if(str ==="rotate(-90deg)"){
		  			shellL();
		  		}else if(str ==="rotate(180deg)"){
		  			shellB();
		  		}
			
		  		function shellT(){//向上发射
		  			document.body.appendChild(shell);
		  			shell.style.left =  shepX + (Box.offsetWidth/2) - (shell.offsetWidth/2) + "px";
		  			setInterval(function(){
		  				shell.style.top = shepT - shell.offsetHeight  + "px";
		  				if(shell.style.top < "0px" ){
		  					shell.remove();
						}
		  				shepT-=Shellspend;
		  			},Shellspend)
		  		}
		  		function shellR(){//向右发射
		  			shell.style.transform = "rotate(90deg)";//向右旋转炮弹
		  			document.body.appendChild(shell);
		  			
		  			shell.style.top =  shepT + (Box.offsetHeight/2) - (shell.offsetHeight/2) + "px";
		  			setInterval(function(){
		  				shell.style.left = shepX + Box.offsetWidth + "px";
		  				if(shell.style.left == (document.documentElement.clientWidth + "px")){
		  					shell.remove();
						}
		  				shepX+=Shellspend;
		  			},Shellspend)
		  		}
		  		function shellL(){//向左发射
		  			shell.style.transform = "rotate(-90deg)";//向左旋转炮弹
		  			document.body.appendChild(shell);
		  			shell.style.top =  shepT+ (Box.offsetHeight/2) - (shell.offsetHeight/2) + "px";
		  			setInterval(function(){
		  				shell.style.left = shepX - shell.offsetHeight + "px";
		  				if(shell.style.left < "0px" ){
		  					shell.remove();
						}
		  				shepX-=Shellspend;
		  			},Shellspend)
		  		}
		  		function shellB(){//向下发射
		  			shell.style.transform = "rotate(180deg)";//向下旋转炮弹
		  			document.body.appendChild(shell);
		  			shell.style.left = shepX + (Box.offsetWidth/2) - (shell.offsetWidth/2) + "px";
		  			setInterval(function(){
		  				shell.style.top = shepT + Box.offsetHeight  + "px";
		  				if(shell.style.top > (document.documentElement.clientHeight + "px")){
		  					shell.remove();
						}
		  				shepT+=Shellspend;
		  			},Shellspend)
		  		}
		  	}
	    }
	}