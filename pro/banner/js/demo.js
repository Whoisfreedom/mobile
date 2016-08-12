function Banner(option){
	var position = option.position,
		option = option.option,
		arrAd,
		arrButton,
		currentindex = 0,
		previousIndex;
		controls();
	function controls(){
		createBanner();
		autoChange();
		creatIndicator();
	}
	function createBanner(){
		var fragment = document.createDocumentFragment();
		arrAd = option.map(function(list,index){
			var ad = document.createElement("a");
			ad.title = list.name;
			ad.href = list.anchorHref;
			ad.style.backgroundImage = "url(" + list.imageUrl + ")";
			// console.log(ad);
			fragment.appendChild(ad);
			return ad;
		});
		// arrAd[0].classList.add("current");
		position.appendChild(fragment);
	}
	function creatIndicator(){
		var indicator = document.createElement("div");
		indicator.className = "indicator";
		arrButton = option.map(function(list,index){
			var button = document.createElement("em");
			button.appendChild(document.createTextNode(index + 1));
			indicator.appendChild(button);
			button.addEventListener("touchend",function(){
				setIndex(index);
				this.classList.add("current");
			},0);
			return button;
		});
		arrButton[0].classList.add("current");
		position.appendChild(indicator);
	}
	function setIndex(index){
		previousIndex = currentindex;
		currentindex = index;
		setView();
	}
	function setView(){
		arrAd[previousIndex].classList.add("previous");
		arrAd[previousIndex].classList.remove("current");
		arrAd[currentindex].classList.remove("previous");
		arrAd[currentindex].classList.add("current");
		arrButton[previousIndex].classList.remove("current");
		arrButton[currentindex].classList.add("current");
	}
	function autoChange(){
		var adLen = option.length;
		previousIndex = adLen -1;
		setInterval(function(){
			currentindex = currentindex < adLen - 1 ? currentindex + 1 : 0;
			previousIndex = currentindex > 0 ? currentindex - 1 : adLen - 1;
			setView();
		},2000)
	}

}
var banner = document.querySelector(".banner");
ajax({
	url : "http://www.ikindness.cn/api/test/get",
	success : function(data){
		new Banner({
			position : banner,
			option : data.data
		});
	}
	});