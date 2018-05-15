
//大轮播图
;(function($) {
		var $pic=$('.pic');
		var $circle=$('.circle li');
		var $num=0;
		var timer=null;
		
		/*.then(function (d) {
			var arr = JSON.parse(d);
			var html='<ul>';
			for(var i=0;i<arr.length;i++){
				html+=`<li>
						 <a href="#">
						 	<img src="${arr[i].url}" />
						 </a>
					   </li>`;
			}
			html+='</ul>';
			$pic.html(html);
		});*/
		$pic.find('ul').find('li').eq(0).css('opacity','1').siblings('li').css('opacity','0').css('left','-10px');
		$circle.eq(0).addClass('active').siblings('li').removeClass('active');
		//鼠标经过
		$circle.on('mouseover',function () {
			$num=$(this).index();
			tabwitch();
		});
		$('.banner_pic').hover(function () {
			clearInterval(timer);
		},function () {
			timer=setInterval(function () {
				$num++;
				if($num>$circle.length-1){
					$num=0;
				}
				tabwitch();
			},5000);
		});
		//自动轮播
		timer=setInterval(function () {
			$num++;
			if($num>$circle.length-1){
				$num=0;
			}
			tabwitch();
		},5000);
		//图片切换
		function tabwitch () {
			$circle.eq($num).addClass('active').siblings('li').removeClass('active');
			
			$pic.find('ul').find('li').eq($num).stop(true).animate({
				opacity:1,
			},1000).siblings('li').stop(true).animate({
				opacity:0,
			},1000);
		}
	}
)(jQuery);
//二级导航
(function ($) {
	var $fenlei = $('.fenlei>li');
	$fenlei.hover(function () {
		$(this).find('.sort_nav').css('display','block').siblings('li').css('display','none');
		$(this).addClass('bg').siblings('li').removeClass('bg');
		$(this).find('i').addClass('bpx');
		$(this).find('a').css('color','#333');
		$(this).stop(true,true).animate({
			'padding-left':'5px'
		},200);
	},function () {
		$(this).find('.sort_nav').css('display','none');
		$(this).removeClass('bg');
		$(this).find('i').removeClass('bpx');
		if($(this).index()===0){
			$(this).find('a').css('color','#fff');
		}else{
			$(this).find('a').css('color','#C8C8C8');
		}
		$(this).stop(true,true).animate({
			'padding-left':'0px'
		},50);
	});
	$('.fenlei>li a').hover(function () {
		$(this).addClass('red').siblings('.fenlei>li a').removeClass('red');
	},function () {
		$(this).removeClass('red');
	});
	//商品分类隐藏
//	$(".nav_sort").hover(function () {
//		$(".nav_sort .fenlei").show();
//	},function () {
//		$(".nav_sort .fenlei").hide();
//	})
})(jQuery);

//tab切换,图片左移一点
(function ($) {
	$('.floor-nav').find('li').on('mouseover',function () {
		$(this).addClass('hover').siblings('li').removeClass('hover');
		$('.floor-right').eq($(this).index()).css('display','block').siblings('.floor-right').css('display','none');
	});
	
	$('.advert-img a').hover(function () {
		$(this).find('img').stop(true).animate({
			right:'3px',
		},100);
	},function () {
		$(this).find('img').stop(true).animate({
			right:0
		},100);
	});
	
	$('.img-item').hover(function () {
		$(this).find('.word ').show();
	},function () {
		$(this).find('.word ').hide();
	});
})(jQuery);
//1F楼层轮播图
(function ($) {
	/*var $f_pic=$('.fr').find('.f_pic');
	var $f_pic2=$('.fr2').find('.f_pic');*/
	var $f_pic=$('.floor-right').eq(0).find('.f_pic');
	var $f_pic2=$('.floor-right').eq(1).find('.f_pic');
	var $f_circle=$('.f_circle li');
	var $num=0;
	var timer=null;
	/*//获取数据
	$.ajax({
		type:"get",
		url:"php/f1getdata1.php",
		async:true,
		success:function (d) {
			//console.log(typeof d);
			var arr = JSON.parse(d);
			var html='<div>';
			for(var i=0;i<arr.length-1;i++){
				html+=`<a href="#"><img src="${arr[i].url}" alt="" width="505" height="365"/>
						</a>`;
			}
			var html2=`<div><a href="#"><img src="${arr[arr.length-1].url}" alt="" width="505" height="365"/>
						</a></div>`;
			html+='</div>';
			$f_pic.html(html);
			$f_pic2.html(html2);
			$f_pic.find('div').find('a').eq(0).css('opacity','1').siblings('a').css('opacity','0');
			$f_circle.eq(0).addClass('op').siblings('li').removeClass('op');
		}
	});*/
	//鼠标经过
	$f_circle.on('mouseover',function () {
		$num=$(this).index();
		tabwitch();
	});
	$f_pic.hover(function () {
		clearInterval(timer);
	},function () {
		timer=setInterval(function () {
			$num++;
			if($num>2){
				$num=0;
			}
			tabwitch();
		},4000);
	});
	//自动轮播
	timer=setInterval(function () {
		$num++;
		if($num>2){
			$num=0;
		}
		tabwitch();
	},4000);
	function tabwitch () {
		$f_circle.eq($num).addClass('op').siblings('li').removeClass('op');
		$f_pic.find('div').find('a').eq($num).css('opacity','1').siblings('a').css('opacity','0');
	}
})(jQuery);
