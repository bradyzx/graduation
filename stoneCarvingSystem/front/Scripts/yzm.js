	var right=document.getElementById("right");
	var str;
	function yzm() {//生成验证码的函数
		var arr=[];
		for (var i=48;i<=57;i++) {//将数字添加进数组中
			var num=String.fromCharCode(i);
			arr.push(num);
		}
		for (var i=97;i<=122;i++) {//将字母添加进数组
			var letter=String.fromCharCode(i);
			arr.push(letter);
		}
		str='';
		for(var i=0;i<4;i++){//生成4位的验证码
			var index=parseInt(Math.random()*arr.length);
			if(index>=10){//如果是英文
				var bool=Math.random()>0.5?true:false;
				if(bool){
					str+=arr[index].toUpperCase();
				}else{
					str+=arr[index];
				}
			}else{
				str+=arr[index];
			}
		}
		right.innerHTML=str;
		return str;
	}
	yzm();//刷新页面时显示验证码
	right.onclick=function(){//点击时刷新验证码
		yzm();
	}
//	function compare (shu) {//输入的验证码进行比对
//		if(shu.length<=0){
//			alert('请输入验证码！')
//		}else if(shu.toUpperCase()!=str.toUpperCase()){
//			alert('输入的验证码不正确！');
//			yzm();
//		}else{
//			alert('验证码正确！');
//		}
//	}
//	document.onkeydown=function(ev){
//		if(ev.keyCode==13){
//			var inp=document.getElementById("inp").value;
//			compare(inp);
//		}
//	}