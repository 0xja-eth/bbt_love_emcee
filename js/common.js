// Date setting
var startDate = new Date();
var endDate = new Date();
// 设置起始日期（月份要减一）
// 如 setFullYear(2018,9,15) 相当于 2018/10/15
startDate.setFullYear(2018,9,15);
endDate.setFullYear(2018,9,30);

// cookie

function setCookie(name,value){
	var Days = 60;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){
	var arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}