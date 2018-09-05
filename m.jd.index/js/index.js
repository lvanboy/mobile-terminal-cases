window.onload = function(){
	var searchStyle = function (){
		var banner = document.querySelector(".banner");

		var search = document.querySelector('aside .top-wrapper');

		var Bheight = banner.offsetHeight;

		var Sheight = 0;

		document.onscroll = function(){


			Sheight = document.body.scrollTop || document.documentElement.scrollTop;


			if(Sheight > Bheight) {

				search.style.background = "rgba(201,21,35,"+0.85+")";
			}else{
				 
				search.style.background = "rgba(201,21,35,"+(Sheight / Bheight * 0.85)+")";
			}
		};	
	};

	var countdown = function (clock){
		
		var times = document.querySelectorAll('.time span');

		var hours = clock/3600;

		var mins = clock / 60 % 60 ;

		var secs = clock % 60; 
		
		times[0].innerText = Math.floor(hours/10);

		times[1].innerText =  Math.floor(hours%10);
		
		times[3].innerText = Math.floor(mins/10);

		times[4].innerText =  Math.floor(mins%10);

		times[6].innerText = Math.floor(secs/10);

		times[7].innerText =  Math.floor(secs%10);
	};


	var time = function(){
		var timeid = setInterval(function(){
			if(clock>0){
				countdown(--clock);
			}else{
				clearInterval(timeid);
			}
			
		},1000)
	};


	var bannerTouch = function(){
		var banner = document.querySelector('.banner ul');
		var Bwidth = banner.offsetWidth / 10;
		var bannerPoint = document.querySelectorAll('.banner .point li');
		var start = 0;
		var end = 0;
		var index = 1;
		var timeid ;
		var flag = true;
	
		timeid = setInterval(function(){
			index++;
			banner.style.transition = "transform 0.3s";	
			banner.style.transform = "translateX("+(-index) * Bwidth+"px)";
		},2500);
		

		banner.ontouchstart = function(e){
			banner.style.transition = "transform 0.3s";		
			start = e.touches[0].clientX;
			clearInterval(timeid);
		}

		banner.ontouchmove = function(e){
			end = e.touches[0].clientX;

			var distance = end - start;
			
			var offsetX = (-index) * Bwidth + distance;

			banner.style.transform = "translateX("+offsetX+"px)";
		}

		banner.ontouchend = function(e){
			var distance = end - start;
			if(distance > 0&&Math.abs(distance)/Bwidth>1/3){
				
					index -=1;
				
			}else if(distance < 0&&Math.abs(distance)/Bwidth>1/3){

					index +=1;
			}
			banner.style.transform = "translateX("+(-index) * Bwidth+"px)";
			timeid = setInterval(function(){
				index++;
				banner.style.transition = "transform 0.3s";	
				banner.style.transform = "translateX("+(-index) * Bwidth+"px)";
			},2500);
			
		}
		banner.addEventListener("transitionend",function(){
				
				if(index >= 9){
					banner.style.transition = "none";
					index = 1;
					banner.style.transform = "translateX("+(-index) * Bwidth+"px)";
				}else if(index <= 0){
					banner.style.transition = "none";
					index = 8;
					banner.style.transform = "translateX("+(-index) * Bwidth+"px)";
				}
				for(var i = 0;i<bannerPoint.length;i++){
					bannerPoint[i].classList.remove('now');
				}

				bannerPoint[index-1].classList.add('now');

			});
				
	};


	//定义倒计时时间
	var clock = 2*60*60 + 3 * 60 + 59;
	searchStyle();
	time();
	bannerTouch();
};