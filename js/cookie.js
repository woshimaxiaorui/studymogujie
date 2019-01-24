//设置cookie
function setCookie(key,value,day){
//	if(day){//如果生存周期存在
//		var now = new Date();
//		now.setDate(now.getDate() + day );
//		document.cookie = `${key}=${value};expries=${now}`;
//	}else{
//		document.cookie = `${key}=${value}`;
//	}
	var d = new Date();
	d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = key + "=" + value + "; " + expires;
//	document.cookie=key+"="+value + ";expires="+now;
}

//获取cookie
function getCookie(key){
	var str = document.cookie;//获得cookie字符串
	if(str){//若cookie存在
		var sta = str.replace( /\s+/g , "");//将cookie中的空格替换成空字符串
		var arr = sta.split(";");
		for( var i = 0 ; i < arr.length ; i++ ){//遍历数组 根据键找到对应的值 
			var stem = arr[i].split("=")
			if( stem[0] == key ){
				return stem[1]; //找到了key对应的值
			}
		}
		return "";//循环结束后 如果没有找到key 就返回一个""
	}
	return "";//如果没有cookie  返回一个""
}
//删除cookie
function removeCookie(key){
	setCookie(key,"",-1);
}
