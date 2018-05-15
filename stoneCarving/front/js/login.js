//tab切换
(function ($) {
	//添加红下划线
	$('.switch_type li').not('.last').on('click',function () {
		$(this).addClass('red_bottom').siblings('li').removeClass('red_bottom');
	});
	//切换登录模式
	//微信登录
	$('.switch_weixin').stop(false,true).on('click',function () {
		$('.login_type').animate({
			left:0
		},100);
	});
	//手机快捷登录
	$('.switch_mobile').on('click',function () {
		$('.login_type').stop(false,true).animate({
			left:-612
		},100);
	});
		//手机快捷登录下的按钮
		$('.button-mobile').on('click',function () {
			location.href='register.html';//跳转到注册页面
		})
	//账号登录
	$('.i-account').on('click',function () {
		$('.login_type').stop(false,true).animate({
			left:-306
		},100);
		$(this).css('display','none').siblings('a').css('display','block');
		$('.switch_type').css('border-bottom','0');
		$('.switch_type').stop(false,true).animate({
			left:-308
		},100);
	});
	//返回快捷登录
	$('.back a').on('click',function () {
		$('.login_type').stop(false,true).animate({
			left:-612
		},100);
		$('.i-account').css('display','block');
		$('.switch_type').css('border-bottom','1px solid rgb(187, 187, 187)');
		$('.switch_type').stop(false,true).animate({
			left:0
		},100);
	});
	//扫码登录
	$('.i-app').on('click',function () {
		$('.login_type').stop(false,true).animate({
			left:-918
		},100);
		$(this).css('display','none').siblings('a').css('display','block');
		$('.switch_type').css('border-bottom','0');
		$('.switch_type').stop(false,true).animate({
			left:-616
		},100);
	});
})(jQuery);

//登录ajax
(function ($) {
	var $username=$('#username');
	var $password=$('#password');
	var $oBtn=$('.button');
	/*$oBtn.on('click',function () {
		console.log($username.val());
		$.post('php/login.php',{name:$username.val(),pwd:$password.val()},function (data) {
			if(data){
				console.log('ok');
				addCookie('UserName',$username,1);
				location.href='index.html';//跳转到首页
//				$(location).attr('href','index.html');//跳转到主页，但主页轮播图不正常
			}else{
				alert('用户名或密码错误!');
				$(location).attr('href','login.html');
				$username.focus();
			}
		});
	});*/
	$oBtn.on('click',function () {
		console.log($username.val());
		$.ajax({
			type:"post",
			url:"http://localhost:3000/users/list",
			async:true,
			data:{
				username:$username.val(),
				userpassword:$password.val()
			}
		}).then(function (res) {
			if(res.rows.length>0){
				console.log(res.rows);
				$(location).attr('href', 'index.html');
				//存 cookie
				$.cookie('username', $('#username').val());
			}else{
				alert('用户名或密码错误!');
				$username.focus();
			}
		});
	});
	
	
	//显示input表单-----用户名
	$('.input_name').on('click',function () {
		$(this).find('input').css('display','block').next('p').css('display','none');
		$(this).find('input').focus();
	});
	$('.input_name').find('input').on('blur',function () {
		if($(this).val()==''){
			$(this).css('display','none').next('p').css('display','block');
		}
	});
	//显示input表单-----密码
	$('.input_password').on('click',function () {
		$(this).find('input').css('display','block').next('p').css('display','none');
		$(this).find('input').focus();
	});
	$('.input_password').find('input').on('blur',function () {
		if($(this).val()==''){
			$(this).css('display','none').next('p').css('display','block');
		}
	});
})(jQuery);
