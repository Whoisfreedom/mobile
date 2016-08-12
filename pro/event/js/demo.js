// function setRem(){
// document.documentElement.style.fontSize = window.innerWidth / 20 + "px";
// }
// window.onresize = function(){
// 	setRem();
// }
// setRem();
// var testTouch = document.querySelector(".testTouch"),
// 	span = testTouch.querySelector("span");
// var startTime;
// testTouch.addEventListener("touchstart",function(e){
// 	console.log(e.touches[0].clientX);
// 	console.log("touchstart");
// },0);
// testTouch.addEventListener("touchmove",function(e){
// 	console.log("touchmove");
// 	var touchY = e.touches[0].clientY;
// 	if(touchY <= testTouch.offsetHeight-span.offsetHeight && touchY>0){
// 	span.style.left = e.touches[0].clientX + "px";
// 	span.style.top = e.touches[0].clientY + "px";
// 	}
// },0);
// testTouch.addEventListener("touchend",function(e){
// 	console.log("touchend");
// 	console.log(e.changedTouches[0].clientX);
// 	span.classList.add("rotate");
// },0);
// span.addEventListener("animationstart",function(e){
// 	span.innerHTML = this.innerHTML + "33";
// },0);
// span.addEventListener("animationend",function(e){
// 	span.classList.remove("rotate");
// 	span.classList.add("scale");
// },0);
// span.addEventListener("transitionend",function(e){
// 	span.classList.remove("scale");
// 	this.innerHTML = this.innerHTML.substring(0,this.innerHTML.length - 1);
// },0);
// function XMLHttpRequest(){

// }
// XMLHttpRequest.prototype.open = function(type ,url,isAsync){

// };
// XMLHttpRequest.prototype.setRequestHeader = function(name,value){

// };
// XMLHttpRequest.prototype.onreadystatechange = null;

// XMLHttpRequest.prototype.responseText = null;
function ajax(option){
	function queryString(object){
		var result = [];
		for(var i in object){
			result.push(i + "=" + object[i] + "&");
		}
		return result.join("").replace(/&$/,"");
	};
	// if(XMLHttpRequest){
	var xhr = new XMLHttpRequest();
	// }else{
	// var xhr = new ActiveXObject(),	
	// };
	// var _this = this;
	var type = option.type,
		data = queryString(option.data);
	//打开连接
	xhr.open(type || "get", option.url+(data && type === "get" ? "?" +data : ""), option.asnyc || 1);
	option.data && type === "post" && xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			var responseText = option.dataType && option.dataType === "text" ? xhr.responseText : JSON.parse(xhr.responseText);
			if(xhr.status === 200){
				typeof option.success === "function" && option.success(responseText);
			}else{
				typeof option.error === "function" && option.error(responseText);
			}
		}
	};
	xhr.send(data || null);
}
ajax({
	type : "post",
	url : "http://www.ikindness.cn/api/test/post",
	dataType : "text",
	data : {
		a :2333,
		b : "123",
	},
	success : function(data){
		console.log(data);
	},
	error : function(err){
		console.log(err);
	}
});