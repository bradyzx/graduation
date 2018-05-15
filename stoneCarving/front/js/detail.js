//大图片查看
(function ($) {
	function Detail () {
		this.smallpic=$('.smallpic');
		this.xf=$('.xf');
		this.bigpic=$('.bigpic');
		this.df=$('.big');
		this.slide=$('.slide');
	}
	Detail.prototype.init=function () {
		var that = this;
		//显示---隐藏  小放大镜 和 大放大镜
		this.smallpic.hover(function () {
			that.xf.show();
			that.df.show();
			that.sfsize();
			$(this).on('mousemove',function (ev) {
				var ev=ev||window.event;
				that.move(ev);
			});
		},function () {
			that.xf.hide();
			that.df.hide();
		});
	};
	//小放大镜随着鼠标移动
	Detail.prototype.move=function (ev) {
		var l=ev.pageX-this.slide.offset().left-this.xf.width()/2;
		var t=ev.pageY-this.slide.offset().top-this.xf.height()/2;
		if(l<0){
			l=0;
		}else if(l>=this.smallpic.width()-this.xf.width()){
			l=this.smallpic.width()-this.xf.width();
		}
		if(t<0){
			t=0;
		}else if(t>=this.smallpic.height()-this.xf.height()){
			t=this.smallpic.height()-this.xf.height();
		}
		this.xf.css('left',l);
		this.xf.css('top',t);
		//大图赋值
		this.bigpic.css('left',-l*this.size);
		this.bigpic.css('top',-t*this.size);
	};
	//求出比例
	Detail.prototype.sfsize=function () {
		this.size = this.df.width()/this.xf.width();
	};
	
	window.Detail=Detail;
})(jQuery);



(function ($) {
	$('.btn01').hover(function () {
		$(this).css('background-position','-185px 0');
	},function () {
		$(this).css('background-position','0 0');
	});
	$('.btn02').hover(function () {
		$(this).css('background-position','-181px -45px');
	},function () {
		$(this).css('background-position','0 -45px');
	});
})(jQuery);
