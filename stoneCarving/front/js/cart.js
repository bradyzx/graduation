//判断是否存在用户
if($.cookie('username') && $.cookie('username')!='null'){
	$('.showuser').show();
	$('.nouser').hide();
	$('.user').html($.cookie('username'));
	
	//顶部购物车的数量
function cartNum () {
	$.ajax({
		type:"post",
		url:"http://localhost:3001/cart/list",
		async:true,
		data:{
			username:$.cookie('username')
		}
	}).then(function (res) {
		var cartnum = 0;
		for (var i=0;i<res.docs.length;i++) {
			cartnum += res.docs[i].num;
		}
		$('strong').html(cartnum);
	});
}
cartNum();
	
	var products = [];var pros = [];
	var ids = [];
//存在cookie显示购物车，否则不显示
	$('#JS_pre_check_form').show();
	$('.nogoods').hide();
	createcart();
	//创建商品列表
	function createcart() {
	    $.ajax({
	        type:"post",
	        url: 'http://localhost:3001/cart/list',
			async:true,
			data:{
				username:$.cookie('username'),
				state:"待付款"
			}
	    }).then(function(res) {
	    	if(res.docs.length>0){
		    	var data = res.docs;
		    	var $htmltext='';
		    	var arrnum = [];
		        for (var i = 0; i < data.length; i++) {
		            	//拼接出来的表格
		            	$htmltext+='<tbody class="JS_cart_body_1">'+
		            	'<tr id="JS_cart_tr_30476660" class="goods_item JS_cart_act_0" data-act_id="0" data-rec_id="30476660" data-goods_id="338220" data-goods_num="1" data-gift_kind="0">'+
			            	'<td>'+
			            		'<input type="checkbox" data-key="1" data-type="0" data-shop="1" checked="checked" id="JS_delete_checkbox_30476660" value="30476660" class="goods_select goods_select_0" name="rec_id[]">'+
			            	'</td>'+
			            	'<td colspan="2">'+
				            	'<a href="detail.html?sid='+data[i].sid+'" target="_blank">'+
				            		'<img class="img" src="'+data[i].url+'" sid="'+data[i].sid+'" width="90" height="58" title="查看商品">'+
				            	'</a>'+
			            	'</td>'+
			            	'<td class="l goods_gift_30476660" style="line-height:1.5;padding-left: 10px;">'+
			            		'<a href="detail.html?sid='+data[i].sid+'" target="_blank">'+data[i].title+'</a>'+
			            	'</td>'+
			            	'<td class="yen pri">¥'+data[i].price+'</td>'+
			            	'<td class="m_goods_num" data-num="1">'+
				            	'<div class="clearfix number">'+
				            		'<a href="javascript:;" class="left sub" title="减少数量"></a>'+
					            	'<input id="JS_goods_number_30476660" class="left num JS_cart_num_0" value="'+data[i].num+'"  >'+
					            	'<a class="left add" href="javascript:;"  title="增加数量"></a>'+
					            	'<span class="left unit">件</span>'+
				            	'</div>'+
			            	'</td>'+
			            	'<td class="yen">'+
			            		'<span name="goods_discount[30476660]" id="JS_goods_discount_30476660">¥'+
			            			'<span class="JS_goods_discount">0</span>'+
		            			'</span></td>'+
			            	'<td class="yen">'+
			            		'<div class="goods_subtotal">¥'+
			            		'<span id="JS_goods_subtotal_30476660" class="JS_goods_subtotal"></span>'+
			            		'</div>'+
		            		'</td>'+
			            	'<td>'+data[i].caizhi+'</td>'+
			            	'<td><a class="color6" href="javascript:void(0);">删除</a></td>'+
		            	'</tr>'+
		            	'</tbody>';
		                arrnum.push(data[i].num);
		                products.push(data[i].title+":"+data[i].num);
		                pros.push(
			                	{
			                		url:data[i].url,
			                		proname:data[i].title,
			                		caizhi:data[i].caizhi,
			                		num:data[i].num,
			                		price:data[i].price
				                }
		                	);
		                ids.push(data[i]._id);
		            }
		            $('.pt_box').eq(0).after($htmltext);//追加
		            var $dj1 = '';
		            for (var i=0;i<arrnum.length;i++) {
		            	$dj1 = parseInt($('.pri').eq(i).html().substring(1))
		            	$('.JS_goods_subtotal').eq(i).html((($dj1 * arrnum[i]).toFixed(2)));
		            }
		            totalprice();
		
		        add();
		        sub();
		        updateNumber();
		        del();
		        //提交订单
		        orderData(arrnum.length);
//		        console.log($('.JS_cart_body_1').find('tr').eq(0).find('td').eq(1).find('a img').attr("src"));
	//	        console.log("-------------------->>>>>"+products);
	    	}else{
	    		$('#JS_pre_check_form').hide();
				$('.nogoods').show();
	    	}
	    });
	}
	/*//商品列表不存在显示购物车为空
	kong()
	function kong() {
	    if (getCookie('cartsid')) {
	    	$('#JS_pre_check_form').show();
	        $('.nogoods').hide();
	    } else {
	    	$('#JS_pre_check_form').hide();
	    	$('.nogoods').show();
	    }
	}*/
	
	//计算总价
	totalprice();
	function totalprice() {//计算总价
		var total = 0;
		var countnum = 0;
	    $('.JS_cart_body_1').each(function() {//进行遍历
	        if ($(this).find('tr').find('td:nth-of-type(1)').find('input').is(':checked')) {//复选框是选中的
	            total += parseFloat($(this).find('tr').find('td').eq(6).find('div').find('span').html());//商品的总价
	            countnum += parseInt($(this).find('tr').find('td').eq(4).find('div').find('input').val());//商品的数量
	        }
	    });
	    $('#JS_after').html(total.toFixed(2));
	    $('#JS_selected_goods_number').html(countnum);
	}
	
	
	/*var sidarr=[];//存放sid的值
	var numarr=[];//存放数量的值。
	function getcookievlaue(){
		if(getCookie('cartsid')){
			sidarr=getCookie('cartsid').split(',');
		}
		
		if(getCookie('cartsid')){
			numarr=getCookie('cartnum').split(',');
		}
	}*/
	
	//全选
	$('.JS_checkall_cb').on('change', function() {
		 $('.JS_cart_body_1:visible').find('tr').find('td:nth-of-type(1)').find('input').prop('checked', $(this).prop('checked'));
		 $('.pt_box').find('tr').find('td').find('input').prop('checked', $(this).prop('checked'));
		 $('.JS_checkall_cb').prop('checked', $(this).prop('checked'));
	    totalprice();//计算总价
	});
	
	var $inputchecked = $('.JS_cart_body_1').find('tr').find('td:nth-of-type(1)').find('input');//获取委托元素
	$('.cart_table').on('change', $inputchecked,function() {
	    var $inputs = $('.JS_cart_body_1:visible').find('tr').find('td:nth-of-type(1)').find('input'); //放内部
	    if ($('.JS_cart_body_1').find('tr').find('td:nth-of-type(1)').find('input:checked').length == $inputs.size()) {
	        $('.JS_checkall_cb').prop('checked', true);
	    } else {
	        $('.JS_checkall_cb').prop('checked', false);
	    }
	    totalprice();
	});
	
	//修改数量的操作
	//改变商品数量++
	function add () {
		$('.add').on('click', function() {
		    var $count = $(this).parent('.number').find('input').val();//获取当前的数量
		    var that = $(this);
		    $count++;
		    if ($count >= 99) {
		        $count = 99;
		    }
		    $(this).parent('.number').find('input').val($count);//赋值回去
		    $(this).parents('tr').find('td').eq(6).find('div').find('span').html(singlegoodsprice($(this)));//改变后的价格
		    totalprice();
		    setNum($(this).parent('.number').find('input').val(),that);
		});
	}
		//改变商品数量--
	function sub () {
		$('.sub').on('click', function() {
		    var $count = $(this).parent('.number').find('input').val();//获取当前的数量
		    var that = $(this);
		    $count--;
		    if ($count <= 1) {
		        $count = 1;
		    }
		   	$(this).parent('.number').find('input').val($count);//赋值回去
		    $(this).parents('tr').find('td').eq(6).find('div').find('span').html(singlegoodsprice($(this)));//改变后的价格
		    totalprice();
		    setNum($(this).parent('.number').find('input').val(),that);
		});
	}
	//直接输入改变数量
	function updateNumber () {
		$('.num').on('input', function() {
		    var $reg = /^\d+$/g; //只能输入数字
		    var $value = parseInt($(this).val());
		    //this指向
		    var that = $(this);
		    if ($reg.test($value)) {
		        if ($value >= 99) {//限定范围
		            $(this).val(99);
		        } else if ($value <= 0) {
		            $(this).val(1);
		        } else {
		            $(this).val($value);
		        }
		    } else {
		        $(this).val(1);
		    }
		    $(this).parents('tr').find('td').eq(6).find('div').find('span').html(singlegoodsprice($(this)));//改变后的价格
		    totalprice();
		    setNum($(this).val(),that);
		});
	}
	//计算单个商品的价格
	function singlegoodsprice(row) { //row:当前元素
	    var $dj = parseFloat((row.parent().parent().prev().html()).substring(1));
	    var $cnum = parseInt(row.parent('.number').find('input').val());
	    return ($dj * $cnum).toFixed(2);
	}
	//将改变后的数量的值存放到数据库
	function setNum(pronum,that) { 
		var sid=that.parents('tr').find('td').eq(1).find('a img').attr('sid');
	    var caizhi = that.parents('tr').find('td').eq(7).html();
	   //先查找到id
	   $.ajax({
		   	type:"post",
		   	url:"http://localhost:3001/cart/list",
		   	async:true,
		   	data:{
	    		sid:sid,
	    		caizhi:caizhi,
	    		username:$.cookie('username')
	    	}
	   }).then(function (res) {
	   		//修改数量
	   		$.ajax({
	   			type:"put",
	   			url:"http://localhost:3001/cart/data/"+res.docs[0]._id,
	   			async:true,
	   			data:{
	   				num:pronum
	   			}
	   		}).then(function (res) {
	   			//数量修改成功后控制台显示
	   			console.log('数量修改成功');
	   			cartNum();
	   		});
	   });
	}
	
	
	//删除单个商品
	function del(){
		$('.color6').on('click', function() {
			if(window.confirm('你确定要删除吗?')){
			    $(this).parents('.JS_cart_body_1').remove();
			    totalprice();
			    var sid=$(this).parents('.JS_cart_body_1').find('td').eq(1).find('a img').attr('sid');
			    var caizhi = $(this).parents('.JS_cart_body_1').find('td').eq(7).html();
			    var id='';
			    //查找id
			    $.ajax({
			    	type:"post",
			    	url:"http://localhost:3001/cart/list",
			    	async:true,
			    	data:{
			    		sid:sid,
			    		caizhi:caizhi,
			    		username:$.cookie('username')
			    	}
			    }).then(function (res) {
			    	id = res.docs[0]._id;
			    	//按照id去删除购物车商品
			    	$.ajax({
			    		type:"delete",
			    		url:"http://localhost:3001/cart/data/"+id,
			    		async:true
			    	}).then(function (res) {
			    		alert('商品已从购物车中移除');
			    		location.reload();
			    	});
			    });
			   
			}
		});
	}
	//删除选中的商品
	$('.delete_cart_goods').on('click', function() {
		if(window.confirm('你确定要删除吗?')){
//			var arrid=[];
		    $('.JS_cart_body_1').each(function() {
		        if ($(this).find('tr').find('td:nth-of-type(1)').find('input').is(':checked')) {//前面的复选框是选中
		            $(this).remove();
					var removesid=$(this).find('tr').find('td:nth-of-type(2)').find('a').find('img').attr('sid');
				    var removecaizhi = $(this).find('tr').find('td:nth-of-type(8)').html();
				    $.ajax({
				    	type:"post",
				    	url:"http://localhost:3001/cart/list",
				    	async:true,
				    	data:{
				    		sid:removesid,
				    		caizhi:removecaizhi,
				    		username:$.cookie('username')
				    	}
				    }).then(function (res) {
				    	$.ajax({
				    		type:"delete",
				    		url:"http://localhost:3001/cart/data/"+res.docs[0]._id,
				    		async:true
				    	}).then(function (res) {
				    		location.reload();
				    	});
				    });
		   		}
		    });
		}
	   
	    totalprice();
	});

function orderData(length) {
		var mydate = new Date();
	//提交订单并支付
		var orderdata = {};
		$('#pay').on('click',function () {
			//订单信息不能为空
			if($('.sjname').val()=='' || $('.sjphone').val()=="" || $('.sjaddress').val()=='' || $('.sjcode').val()=="" || $('.beizhu').val()==''){
				alert('请将收货信息填写完整');
			}else{
				for (var i=0;i<length;i++) {
	//				console.log($('.JS_cart_body_1').find('tr').eq(i).find('td').eq(7).html());
					orderdata={
						sjname:$('.sjname').val(),
						sjphone:$('.sjphone').val(),
						address:$('.sjaddress').val(),
						sjcode:$('.sjcode').val(),
						beizhu:$('.beizhu').val(),
						username:$.cookie('username'),
						/*products:products.toString(),
						pros:JSON.stringify(pros),*/
						prourl:$('.JS_cart_body_1').find('tr').eq(i).find('td').eq(1).find('a img').attr("src"),
						proname:$('.JS_cart_body_1').find('tr').eq(i).find('td').eq(2).find('a').html(),
						proprice:$('.JS_cart_body_1').find('tr').eq(i).find('td').eq(3).html().substr(1),
						pronum:$('.JS_cart_num_0').eq(i).val(),
						procaizhi:$('.JS_cart_body_1').find('tr').eq(i).find('td').eq(7).html(),
						ordertime:mydate.toLocaleString(),
						orderyear:mydate.getFullYear(),
						ordermonth:mydate.getMonth()+1,
						orderstate:"未审核",
						ordermoney:$('.jiesuan_money').html(),
						ordervisible:"yes"
					}
					console.log(orderdata);
					//存到订单数据库中
					$.ajax({
						type:"post",
						url:"http://localhost:3000/orderlist/data",
						async:true,
						data:orderdata
					}).then(function (res) {
						console.log('订单已提交！等待商家发货');
						$('#jiesuan').hide();
						$('.address input').val('');
						$('.sjaddress').val('');
						$('.beizhu').val('');
						//订单提交成功后 清空购物车
						$.ajax({
							type:"post",
							url:"http://localhost:3001/cart/data/removes",
							async:true,
							data:{
								ids:ids.toString()
							}
						}).then(function (res) {
							console.log('订单提交成功');
							location.reload();
						});
						/*//修改库存
						$.ajax({
							type:"post",
							url:"http://localhost:3001/cart/data/"+,
							async:true
						});*/
					});
				}
			}
		});
}
	
}else{
	$('.showuser').hide();
	$('.nouser').show();
	$('#JS_pre_check_form').hide();
	$('.nogoods').show();
}
//退出登录
$('.loginout').on('click',function () {
	$.cookie('username', null);
	location.reload();
});




