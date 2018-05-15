(function ($) {
	var $username = $('.username');
	var $password = $('.password');
	var $repassword = $('.repassword');
	var $phone = $('.phone');
	var $email = $('.email');
	var $u=false,$pw=false,$repw=false,$ph=false,$em=false,$repwd=false;
	//空内容  验证
	$('.hang').find('input').on('blur',function () {
		if($(this).val()==''){
//			console.log($(this).index('.hang input'));
			$('.hang').eq($(this).index('.hang input')).find('.error').css({
				'background':'#fff3f3',
				'color':'#d10000'
			});
			$(this).css({
				'border-color':'#d10000',
				'background':'#fff3f3'
			});
		}
	});
	$('.hang').find('input').on('focus',function () {
		if($(this).val()==''){
			$('.hang').eq($(this).index('.hang input')).find('.error').css({
				'background':'#fff',
				'color':'gray'
			});
			$(this).css({
				'border-color':'#d5d5d5',
				'background':'#fff'
			});
		}
	});
	//原密码
	$('.repwd').on('blur',function () {
		var $that = $(this);
		$.ajax({
			type:"post",
			url:"http://localhost:3000/users/list",
			async:true,
			data:{
				username:$.cookie('username')
			}
		}).then(function (res) {
			//console.log(res.rows[0].userpassword);
			if($('.repwd').val()==res.rows[0].userpassword){
				$that.css({
					'border-color':'#d5d5d5',
					'background':'#fff'
				});
				$that.parent().find('.error').css('display','none');
				$that.siblings('.success').css('display','inline-block');
				$repwd=true;
			}else{
				$that.parent().find('.error').css('display','block');
				$that.parent().find('.error').html('输入的原密码不正确');
				$that.siblings('.success').css('display','none');
				$that.parent().find('.error').css({
					'background':'#fff3f3',
					'color':'#d10000'
				});
				$that.css({
					'border-color':'#d10000',
					'background':'#fff3f3'
				});
				$repwd=false;
			}
		});
	});
	//密码验证
	$password.on('blur',function () {
		var str=$password.val();
		if(!isNumber(str) && !isWord(str) && !isFuhao(str) && $(this).val()!='' && isPassword(str)){
			$(this).css({
				'border-color':'#d5d5d5',
				'background':'#fff'
			});
			$(this).parent().find('.error').css('display','none');
			$(this).siblings('.success').css('display','inline-block');
			$pw=true;
		}else{
			$(this).parent().find('.error').css('display','block');
			$(this).siblings('.success').css('display','none');
			$(this).parent().find('.error').css({
				'background':'#fff3f3',
				'color':'#d10000'
			});
			$(this).css({
				'border-color':'#d10000',
				'background':'#fff3f3'
			});
			$pw=false;
		}
	});
	//确认密码
	$repassword.on('blur',function (){
		if($password.val()==$repassword.val() && $repassword.val()!=''){
			$(this).css({
				'border-color':'#d5d5d5',
				'background':'#fff'
			});
			$(this).parent().find('.error').css('display','none');
			$(this).siblings('.success').css('display','inline-block');
			$repw=true;
		}else{
			$(this).parent().find('.error').css('display','block');
			$(this).parent().find('.error').html('请确保两次输入的密码一致');
			$(this).siblings('.success').css('display','none');
			$(this).parent().find('.error').css({
				'background':'#fff3f3',
				'color':'#d10000'
			});
			$(this).css({
				'border-color':'#d10000',
				'background':'#fff3f3'
			});
			$repw=false;
		}
	});
	//手机号
	$phone.on('blur',function (){
		if(isPhone($phone.val())){
			$(this).css({
				'border-color':'#d5d5d5',
				'background':'#fff'
			});
			$(this).parent().find('.error').css('display','none');
			$(this).siblings('.success').css('display','inline-block');
			$ph=true;
		}else{
			$(this).parent().find('.error').css('display','block');
			$(this).parent().find('.error').html('请输入正确的手机号');
			$(this).siblings('.success').css('display','none');
			$(this).parent().find('.error').css({
				'background':'#fff3f3',
				'color':'#d10000'
			});
			$(this).css({
				'border-color':'#d10000',
				'background':'#fff3f3'
			});
			$ph=false;
		}
	});
	//邮箱
	$email.on('blur',function (){
		if(isEmail($email.val())){
			$(this).css({
				'border-color':'#d5d5d5',
				'background':'#fff'
			});
			$(this).parent().find('.error').css('display','none');
			$(this).siblings('.success').css('display','inline-block');
			$em=true;
		}else{
			$(this).parent().find('.error').css('display','block');
			$(this).parent().find('.error').html('请输入正确的邮箱');
			$(this).siblings('.success').css('display','none');
			$(this).parent().find('.error').css({
				'background':'#fff3f3',
				'color':'#d10000'
			});
			$(this).css({
				'border-color':'#d10000',
				'background':'#fff3f3'
			});
			$em=false;
		}
	});

	//纯数字验证
	function isNumber(str){
		var num = /^[0-9]+$/;  
		return num.test(str);
	}
	//纯字母
	function isWord (str) {
		var word = /^[A-Za-z]+$/;
		return word.test(str);
	}
	//纯符号
	function isFuhao (str) {
		var word = /^[`~!@.#$%^&*_+<>{}\/'[\]]+$/;
		return word.test(str);
	}
	//手机号
	function isPhone (str) {
		var phone= /^1[3,5,7,8]\d{9}$/;
		return phone.test(str);
	}
	//邮箱
	function isEmail (str) {
		var email= /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		return email.test(str);
	}
	//长度验证 4-20
	function isLength (str) {
		var length = str.length;
		if(length>=4 && length<=20){
			return true;
		}else{
			return false;
		}
	}
	//长度验证 6-20
	function isPassword (str) {
		var length = str.length;
		if(length>=6 && length<=20){
			return true;
		}else{
			return false;
		}
	}
	
	//修改密码按钮
	$('.updatepwd').on('click',function () {
		if($pw==true && $repwd==true && $repw==true){
			$.ajax({
				type:"post",
				url:"http://localhost:3000/users/list",
				async:true,
				data:{
					username:$('.username').val()
				}
			}).then(function (res) {
				console.log(res.rows[0]._id);
				$.ajax({
					type:"put",
					url:"http://localhost:3000/users/data/"+res.rows[0]._id,
					async:true,
					data:{
						userpassword:$('.password').val()
					}
				}).then(function (res) {
					if(res){
						alert('密码修改成功');
						location.reload();
					}
				});
			});
		}else{
			alert('请填写正确的格式');
		}
	});
	//修改个人信息按钮
	$('.updateInfo').on('click',function () {
		if($ph==false || $em==false){
			alert('请填写正确的格式！');
		}else{
			$.ajax({
				type:"post",
				url:"http://localhost:3000/users/list",
				async:true,
				data:{
					username:$.cookie('username')
				}
			}).then(function (res) {
				$.ajax({
					type:"put",
					url:"http://localhost:3000/users/data/"+res.rows[0]._id,
					async:true,
					data:{
						userphone:$('.phone').val(),
						useremail:$('.email').val()
					}
				}).then(function (res) {
					alert('信息修改成功');
					location.reload();
				});
			});
		}
	});
	
	//个人信息和密码切换
	$('.tab').find('span').eq(0).on('click',function () {
		$('.myinfo').show();
		$('.pwdupdate').hide();
		$(this).css('color','red').siblings().css('color','#333333');
	});
	$('.tab').find('span').eq(1).on('click',function () {
		$('.myinfo').hide();
		$('.pwdupdate').show();
		$(this).css('color','red').siblings().css('color','#333333');
	});
	
	//显示个人信息
	function showInfo () {
		$.ajax({
			type:"post",
			url:"http://localhost:3000/users/list",
			async:true,
			data:{
				username:$.cookie('username')
			}
		}).then(function (res) {
			$('.username').val(res.rows[0].username);
			$('.phone').val(res.rows[0].userphone);
			$('.email').val(res.rows[0].useremail);
		});
	}
	showInfo();
	//先比较手机号是否是数据库中的
	function compare () {
		$.ajax({
			type:"post",
			url:"http://localhost:3000/users/list",
			async:true,
			data:{
				username:$.cookie('username')
			}
		}).then(function (res) {
			if(res.rows[0].userphone==$('.phone').val()){
				$ph=true;
			}
			if(res.rows[0].useremail==$('.email').val()){
				$em=true;
			}
		});
	}
	compare();
})(jQuery);
