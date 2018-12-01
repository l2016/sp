$(".nav_dl").mouseenter(function(){
	$(this).css("color","#fff");
}).mouseleave(function(){
	$(this).css("color","");
})
$(".nav_a").mouseenter(function(){//一级菜单
	$(this).children("a").css("color","#e5004b");
	$(this).children().children().children("img").attr("src","img/daohang2.gif");//一级菜单 图片
	$(this).css("background","#fff");	
}).mouseleave(function(){
	$(this).children("a").css("color","");
	$(this).children().children().children("img").attr("src","img/daohang1.gif");
	$(this).css("background","");	
})
$(".nav_Li").mouseenter(function(){//二级菜单
	$(this).children("ul").css("display","block");
}).mouseleave(function(){
	$(this).children("ul").css("display","none");
})
//benner 左右尖角
$("#banner").mouseenter(function(){
	$(".ban_LR").animate({"opacity":0.5},500);
}).mouseleave(function(){
	$(".ban_LR").animate({"opacity":0},500);
})
$(".ban_LR").mouseenter(function(){
	$(this).animate({"opacity":1},500);
}).mouseleave(function(){
	$(this).animate({"opacity":0.5},500);
})
//banner
$(function(){
	var timer=null,
		index=0,
		$uList=$("#banner ul li"),
		$banLeft=$(".ban_left"),
		$banRight=$(".ban_right"),
		$oList=$("#banner ol li");
	timer=setInterval( autoPlay , 2000 );
	function autoPlay(){
		index++;
		if( index==$uList.size() ){
			index=0;
		}
		$uList.eq(index).fadeIn(1000).siblings().fadeOut(1000);
		$oList.eq(index).addClass("ban_1").siblings().removeClass("ban_1");
	}
	
	$oList.mouseenter(function(){
		clearInterval(timer);
		index=$(this).index()-1;
		autoPlay();
	}).mouseleave(function(){
		timer=setInterval( autoPlay , 2000 );
	})
	//角点击
	$banLeft.click(function(){
		clearInterval(timer);
		index--;
		if(index<0){
			index=$uList.length-1;
		}
		$uList.eq(index).fadeIn(1000).siblings().fadeOut(1000);
		$oList.eq(index).addClass("ban_1").siblings().removeClass("ban_1");
		setInterval((timer=setInterval( autoPlay , 2000 )),2000);
	})
	$banRight.click(function(){
		clearInterval(timer);
		index++;
		if(index>$uList.length-1){
			index=0;
		}
		$uList.eq(index).fadeIn(1000).siblings().fadeOut(1000);
		$oList.eq(index).addClass("ban_1").siblings().removeClass("ban_1");
		setInterval((timer=setInterval( autoPlay , 2000 )),2000);
	})
})
/*活动倒计时*/
$(function(){
	var start = new Date();//起始时间
	var end = new Date("2018-12-1 20:00");
	var t=diff(start,end);//时间差s
	function fntime(){
		if(t<0){
			sect_djs_p1.innerHTML="活动结束";
			return;
		}
		var h = parseInt(t/3600);//离结束时间小时
		var m = parseInt((t-h*3600)/60);//结束的分钟
		var s = parseInt(t-h*3600-m*60);
		sect_djs_p1.innerHTML="距本场结束："+h +"时"+m+"分"+s+"秒";
	}
	var timer = setInterval( function(){
		t--;
		if( t < 0 ){
			clearInterval( timer );
		}else{
			fntime();
		}
	},1000 );
	fntime();
})
/*活动*/
$.ajax({
		type:"get",
		url:"data.json",
		async:true,
		success:function(arr){
			shData(arr);
			/*限时抢购*/
			$(".sect_hd1_1 li").mouseenter(function(){
				console.log($(this).index());
				$(".sect_hd1_2").eq($(this).index()).css("opacity",0.5);
				$(".sect_hd1_3").eq($(this).index()).css("display","block").animate({left:116},100);
			}).mouseleave(function(){
				$(".sect_hd1_2").eq($(this).index()).css("opacity",0);
				$(".sect_hd1_3").eq($(this).index()).css("display","none").animate({left:-55},100);
			})
		}
	});
function shData(arr){
	var conStr = "";
	for(var i=0 ; i<5 ; i++){
		var pro=arr[i];
		conStr+=`<li>
					<a href="">
						<img src="img/${pro.src}" alt="" />
						<p>${pro.name}</p>
						<p>${pro.money}</p>
						<p><s>${pro.price}</s></p>
					</a>
					<div class="sect_hd1_2"></div>
					<a class="sect_hd1_3" href="">限时抢购</a>
				</li>`;
	}
	$(".sect_hd1_1").html(conStr);
}
	


	
