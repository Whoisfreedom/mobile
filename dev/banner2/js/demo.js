function Banner(option){
	var position = option.position,
		option = option.option,
		arrAd,
		arrButton,
		previousIndex = option.length - 1,
		nextIndex = 1,
		currentIndex = 0;
		creatBanner();
	var bannerWidth = arrAd[0].offsetWidth;
		creatIndicator();
		change();
	var aLen = option.length;
	function creatBanner(){
		var fragment = document.createDocumentFragment();
		arrAd = option.map(function(list,index){
			var ad = document.createElement("a");
			ad.title = list.name;
			ad.href = list.anchorHref;
			ad.style.backgroundImage = "url(" + list.imageUrl + ")";
			fragment.appendChild(ad);
			var startX,
				endX,
				distance,
				direction;
			ad.addEventListener("touchstart",function(e){
				clearInterval(time);
				console.log(nextIndex,currentIndex,previousIndex);
				startX = e.touches[0].clientX;
			},0);
			ad.addEventListener("touchmove",function(e){
				distance = e.touches[0].clientX-startX;
				direction = distance>0;
				this.style.left = distance + "px";
				if(direction){
					arrAd[previousIndex].style.left = distance - bannerWidth + "px";
				}else{
					arrAd[nextIndex].style.left = distance + bannerWidth + "px";
				}
			},0);
			ad.addEventListener("touchend",function(e){
				endX = e.changedTouches[0].clientX;
				if(Math.abs(distance) > bannerWidth / 2){
					this.classList.add(direction?"ltr":"rtl");
					if(direction){
						arrAd[previousIndex].classList.add("init");
						nextIndex = index;
						currentIndex = currentIndex>0? currentIndex-1:aLen-1;
						previousIndex = currentIndex>0?  currentIndex-1:aLen-1;
						arrButton[nextIndex].classList.remove("current");
						arrButton[currentIndex].classList.add("current");
					}else{
						arrAd[nextIndex].classList.add("init");
						previousIndex = index;
						currentIndex = currentIndex>=aLen-1? 0:currentIndex+1;
						nextIndex = currentIndex>=aLen-1? 0 : currentIndex+1;
						arrButton[previousIndex].classList.remove("current");
						arrButton[currentIndex].classList.add("current");
					}
				}else{
					this.classList.add("init");
					if(direction){
						arrAd[previousIndex].classList.add("rtl");
					}else{
						arrAd[nextIndex].classList.add("ltr");
					}
				};
				 time = setInterval(function(){
						currentIndex = currentIndex>=aLen-1? 0:currentIndex+1;
						nextIndex = currentIndex>=aLen-1? 0 : currentIndex+1;
						previousIndex = currentIndex>0?currentIndex-1:aLen-1;
						autoChange();
					},2000)
				this.classList.add("init");

			},0);
			ad.addEventListener("animationend",function(e){
				if(Math.abs(distance) > bannerWidth / 2 || distance == "undefined"){
				if(e.animationName === "ltr" ){
					this.style.left = bannerWidth + "px";
					this.classList.remove("ltr" );
					this.classList.remove("init" );
					console.log(1);
				}else if(e.animationName === "rtl"){
					this.style.left = bannerWidth + "px";
					this.classList.remove("rtl" );
					this.classList.remove("init" );
					console.log(2);
				}else if(e.animationName === "init"){
					this.style.left = 0;
					this.classList.remove("init" );
					console.log(3);
				}
			}else{
				if(e.animationName === "ltr" ){
					this.style.left = bannerWidth + "px";
					this.classList.remove("ltr" );
				}else if(e.animationName === "rtl"){
					this.style.left = -bannerWidth + "px";
					this.classList.remove("rtl" );
				}else if(e.animationName === "init"){
					this.style.left = 0;
					this.classList.remove("init" );
				}
			}
			if(e.animationName === "current" ){
				this.style.left = 0;
				this.classList.remove("current");
				arrAd[previousIndex].style.left = -bannerWidth + "px";
				arrAd[previousIndex].classList.remove("previous");
			}
			},0)
			return ad;
		});
		position.appendChild(fragment);
	}
	function creatIndicator(){
		var indicator = document.createElement("div");
		indicator.classList.add("indicator");
		arrButton = option.map(function(list,index){
			var button = document.createElement("em");
			button.appendChild(document.createTextNode(index+1));
			indicator.appendChild(button);
			button.addEventListener("touchend",function(){
				clearInterval(time);
				previousIndex = currentIndex;
				currentIndex = index;
				autoChange();
				time = setInterval(function(){
					currentIndex = currentIndex>=aLen-1? 0:currentIndex+1;
					nextIndex = currentIndex>=aLen-1? 0 : currentIndex+1;
					previousIndex = currentIndex>0?currentIndex-1:aLen-1;
					autoChange();
				},2000)
			})
			return button;
		})
		arrButton[0].classList.add("current");
		position.appendChild(indicator);
	}
	function autoChange(){
		arrAd[previousIndex].classList.remove("current");
		arrAd[previousIndex].classList.add("previous");
		arrAd[currentIndex].classList.remove("previous");
		arrAd[currentIndex].classList.add("current");
		arrButton[previousIndex].classList.remove("current");
		arrButton[currentIndex].classList.add("current");
	}
	function change(){
		var aLen = option.length;
		 time = setInterval(function(){
			currentIndex = currentIndex>=aLen-1? 0:currentIndex+1;
			nextIndex = currentIndex>=aLen-1? 0 : currentIndex+1;
			previousIndex = currentIndex>0?currentIndex-1:aLen-1;
			console.log(nextIndex,currentIndex,previousIndex);
			autoChange();
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
		})
	}
})