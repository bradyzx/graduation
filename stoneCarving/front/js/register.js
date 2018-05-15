(function ($) {
	var $username = $('.username');
	var $password = $('.password');
	var $repassword = $('.repassword');
	var $phone = $('.phone');
	var $email = $('.email');
	var $u=false,$pw=false,$repw=false,$ph=false,$em=false;
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
	//用户名验证
	$username.on('blur',function () {
		var str=$username.val();
		//验证数据库是否存在相同用户名
		/*$.ajax({
			type:"post",
			url:"http://localhost:3000/users/list",
			async:true,
			data:{
				name:$username.val()
			}
		}).then(function (res) {
			console.log(res);
		});*/
		$.post('http://localhost:3000/users/list',{username:$username.val()},function (data) {
			if(data.rows.length>0){
				$username.parent().find('.error').css('display','block');
				$username.parent().find('.error').html('用户名已经存在');
				$username.siblings('.success').css('display','none');
				$username.parent().find('.error').css({
					'background':'#fff3f3',
					'color':'#d10000'
				});
				$username.css({
					'border-color':'#d10000',
					'background':'#fff3f3'
				});
			}
		});
		
		//验证格式
		if(!isNumber(str) && $(this).val()!='' && isLength(str)){
			$(this).css({
				'border-color':'#d5d5d5',
				'background':'#fff'
			});
			$(this).parent().find('.error').css('display','none');
			$(this).siblings('.success').css('display','inline-block');
			$u=true;
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
			$u=false;
		}
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
	
	//按钮
	$('.btn_reg').on('click',function () {
		if($u==true && $pw==true && $repw==true && $ph==true && $em==true){
			console.log($('.username').val());
			$.ajax({
				type:"post",
				url:"http://localhost:3000/users/data",
				async:true,
				data:{
					username:$('.username').val(),
					userpassword:$('.password').val(),
					useremail:$('.email').val(),
					userphone:$('.phone').val()
				}
			}).then(function (res) {
				alert('注册成功！');
				$(location).attr('href', 'login.html');
			});
		}else{
			alert('请填写正确的格式');
		}
	});
})(jQuery);
