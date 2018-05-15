;(function ($) {
	/*//全部订单显示出来
	$.ajax({
		type:"post",
		url:"http://localhost:3000/orderlist/list",
		async:true
	}).then(function (res) {
		var html='';
		var sum = 0;
		var pinglun = '';
		var orderstate = '';
		var p = '';
		for (var i = 0; i < res.rows.length; i++) {
//			${res.rows[i].orderstate}
				if(res.rows[i].orderstate=='订单完成'){
					pinglun ='评论';
					orderstate='已收货';
					p=`<p class="comment">${pinglun}</p>`;
				}else{
					pinglun ='确认收货'
				}
				if(res.rows[i].orderstate=='未审核' || res.rows[i].orderstate=='可发货'){
					orderstate='待发货';
				}else if(res.rows[i].orderstate=='已发货'){
					orderstate='已发货';
					p=`<p class="comment">${pinglun}</p>`;
				}
				sum = res.rows[i].proprice*res.rows[i].pronum;
				html+=`
					<div class="productorder">
					<table border="0" cellspacing="" cellpadding="">
						<tbody class="ddtop" style="border: 0;">
							<tr height="40px">
								<td>
									<span>
										<span style="margin-left: 20px;">订单号</span>
										<span>:</span>
										<span>${res.rows[i]._id}</span>
									</span>
								</td>
								<td colspan="5" align="right">
									<a href="javascript:;">
										<i class="deletepic" style="margin-right: 20px;"></i>
									</a>
								</td>
							</tr>
						</tbody>
						<tbody class="dingdanlist">
							<tr height="70px">
								<td class="clear" align="center">
									<div class="left propic">
										<img src="${res.rows[i].prourl}" alt="" width="80px" height="80px"/>
									</div>
									<div class="left proinfo">
										<p>${res.rows[i].proname}</p>
										<p>${res.rows[i].procaizhi}</p>
									</div>
								</td>
								<td align="center">
									<div>
										<p>
											<span>￥</span>
											<span>${res.rows[i].proprice}</span>
										</p>
									</div>
								</td>
								<td align="center">
									<div>
										<p>
											<span>${res.rows[i].pronum}</span>
										</p>
									</div>
								</td>
								<td align="center">
									<div>
										<p>
											<strong>
												<span>￥</span>
												<span>${sum}</span>
											</strong>
										</p>
									</div>
								</td>
								<td align="center">
									<div>
										<p>${orderstate}</p>
									</div>
								</td>
								<td align="center">
									<div>
										${p}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				`;
				sum=0;
		}
		$('.ddcontent').append(html);
		shouhuo ();
	});*/
	
if($.cookie('username') && $.cookie('username')!='null'){
		
	//点击待收货
	$('.daishou').on('click',function () {
		var that = $(this);
		$(this).css("background","#fff").siblings('.yishou').css("background","#f1f1f1");
		$('.productorder').remove();
		$.ajax({
			type:"post",
			url:"http://localhost:3000/orderlist/list",
			async:true,
			data:{
				ordervisible:"yes",
				username:$.cookie('username')
			}
		}).then(function (res) {
			var html='';
			var sum = 0;
			var pinglun = '';
			var orderstate = '';
			var p = '';
			for(var i=0;i<res.rows.length;i++){
				if(res.rows[i].orderstate=='未审核' || res.rows[i].orderstate=="可发货" || res.rows[i].orderstate=="已发货"){
						if(res.rows[i].orderstate=='订单完成'){
							pinglun ='评论';
							orderstate='已收货';
							p=`<p class="comment">${pinglun}</p>`;
						}else{
							pinglun ='确认收货'
						}
						if(res.rows[i].orderstate=='未审核' || res.rows[i].orderstate=='可发货'){
							orderstate='待发货';
							p='';
						}else if(res.rows[i].orderstate=='已发货'){
							orderstate='已发货';
							p=`<p class="comment">${pinglun}</p>`;
						}
						sum = res.rows[i].proprice*res.rows[i].pronum;
						html+=`
							<div class="productorder">
							<table border="0" cellspacing="" cellpadding="">
								<tbody class="ddtop" style="border: 0;">
									<tr height="40px">
										<td>
											<span>
												<span style="margin-left: 20px;">订单号</span>
												<span>:</span>
												<span>${res.rows[i]._id}</span>
											</span>
										</td>
										<td colspan="5" align="right">
											<a href="javascript:;">
												<i class="deletepic" style="margin-right: 20px;"></i>
											</a>
										</td>
									</tr>
								</tbody>
								<tbody class="dingdanlist">
									<tr height="70px">
										<td class="clear" align="center">
											<div class="left propic">
												<img src="${res.rows[i].prourl}" alt="" width="80px" height="80px"/>
											</div>
											<div class="left proinfo">
												<p>${res.rows[i].proname}</p>
												<p>${res.rows[i].procaizhi}</p>
											</div>
										</td>
										<td align="center">
											<div>
												<p>
													<span>￥</span>
													<span>${res.rows[i].proprice}</span>
												</p>
											</div>
										</td>
										<td align="center">
											<div>
												<p>
													<span>${res.rows[i].pronum}</span>
												</p>
											</div>
										</td>
										<td align="center">
											<div>
												<p>
													<strong>
														<span>￥</span>
														<span>${sum}</span>
													</strong>
												</p>
											</div>
										</td>
										<td align="center">
											<div>
												<p>${orderstate}</p>
											</div>
										</td>
										<td align="center">
											<div>
												${p}
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						`;
						sum=0;
				}
			}
			$('.ddcontent').append(html);
			shouhuo (that);
		});
	});

	//点击已收货在
	$('.yishou').on('click',function () {
		//console.log($(this).html());
		var that = $(this)
		$(this).css("background","#fff").siblings('.daishou').css("background","#f1f1f1");
		$('.productorder').remove();
		$.ajax({
			type:"post",
			url:"http://localhost:3000/orderlist/list",
			async:true,
			data:{
				ordervisible:"yes",
				username:$.cookie('username')
			}
		}).then(function (res) {
			var html='';
			var sum = 0;
			var pinglun = '';
			var orderstate = '';
			var p = '';
			for(var i=0;i<res.rows.length;i++){
				if(res.rows[i].orderstate=='订单完成'){
						if(res.rows[i].orderstate=='订单完成'){
							pinglun ='评论';
							orderstate='已收货';
							p=`<p class="comment pl">${pinglun}</p>`;
						}else{
							pinglun ='确认收货'
						}
						if(res.rows[i].orderstate=='未审核' || res.rows[i].orderstate=='可发货'){
							orderstate='待发货';
							p=`<p class="comment">${pinglun}</p>`;
						}else if(res.rows[i].orderstate=='已发货'){
							orderstate='已发货';
							p=`<p class="comment">${pinglun}</p>`;
						}
						sum = res.rows[i].proprice*res.rows[i].pronum;
						html+=`
						<div class="productorder">
							<table border="0" cellspacing="" cellpadding="">
								<tbody class="ddtop" style="border: 0;">
									<tr height="40px">
										<td>
											<span>
												<span style="margin-left: 20px;">订单号</span>
												<span>:</span>
												<span>${res.rows[i]._id}</span>
											</span>
										</td>
										<td colspan="5" align="right">
											<a href="javascript:;">
												<i class="deletepic" style="margin-right: 20px;"></i>
											</a>
										</td>
									</tr>
								</tbody>
								<tbody class="dingdanlist">
									<tr height="70px">
										<td class="clear" align="center">
											<div class="left propic">
												<img src="${res.rows[i].prourl}" alt="" width="80px" height="80px"/>
											</div>
											<div class="left proinfo">
												<p>${res.rows[i].proname}</p>
												<p>${res.rows[i].procaizhi}</p>
											</div>
										</td>
										<td align="center">
											<div>
												<p>
													<span>￥</span>
													<span>${res.rows[i].proprice}</span>
												</p>
											</div>
										</td>
										<td align="center">
											<div>
												<p>
													<span>${res.rows[i].pronum}</span>
												</p>
											</div>
										</td>
										<td align="center">
											<div>
												<p>
													<strong>
														<span>￥</span>
														<span>${sum}</span>
													</strong>
												</p>
											</div>
										</td>
										<td align="center">
											<div>
												<p>${orderstate}</p>
											</div>
										</td>
										<td align="center">
											<div>
												${p}
											</div>
										</td>
									</tr>
								</tbody>
							</table>
							<div style="display:none" class="textarea" >
								<textarea style="width:980px;height:100px;resize:none"></textarea>
								<button style="float:right;margin-bottom:10px;border:1px solid #dcdcdc;padding:5px 10px;background:#fff;border-radius:3px;cursor:pointer">发表</button>
							</div>
						</div>
						`;
						sum=0;
				}
			}
			$('.ddcontent').append(html);
			shouhuo (that);
			deleteorder ();
			//------------------发表  按钮-----------------
			$('.textarea button').on('click',function(){
				var mcon = $(this).parent('.textarea').find('textarea').val();
				var mdate = new Date();
				var proId = $(this).parents('.productorder').find('table .ddtop tr td').find('span').find('span').eq(2).html();
				var proname=$(this).parents('.productorder').find('table .dingdanlist tr').find('td').eq(0).find('.proinfo').find('p').eq(0).html();
				var procaizhi=$(this).parents('.productorder').find('table .dingdanlist tr').find('td').eq(0).find('.proinfo').find('p').eq(1).html();
				//console.log($(this).parents('.productorder').find('table .dingdanlist tr').find('td').eq(0).find('.proinfo').find('p').eq(1).html());
				if(mcon==''){
					alert('评论为空不能发表');
				}else{
					//发表评论
					$.ajax({
						type:"post",
						url:"http://localhost:3000/message/data",
						async:true,
						data:{
							proname:proname,
							procaizhi:procaizhi,
							username:$.cookie('username'),
							mtime:mdate.toLocaleString(),
							mcon:mcon,
							reply:'null',
							proId:proId
						}
					}).then(function (res) {
						alert('评价完成');//发表评论成功
						$('.yishou').click();
					});
				}
			});
			//显示评论的信息
			$('.pl').on('mouseover',function () {
				//console.log();
				var $t = $(this);
				$.ajax({
					type:"post",
					url:"http://localhost:3000/message/list",
					async:true,
					data:{
						username:$.cookie('username'),
						proId:$(this).parents('.productorder').find('table .ddtop tr td').eq(0).find('span').find('span').eq(2).html()
					}
				}).then(function (res) {
					if(res.rows.length>0){
						$t.parents('.productorder').find('.textarea').html('评论内容为：'+res.rows[0].mcon);
						$t.parents('tr').find('td').eq(4).find('div p').html('已评论');
						if(res.rows[0].reply!='null'){
							$t.parents('.productorder').find('.textarea').html('评论内容为：'+res.rows[0].mcon+'<br>商家回复：'+res.rows[0].reply);
						}
					}
				});
			});
			$('.pl').mouseover();
		});
	});
	
	
	//点击确认收货的function
	function shouhuo (that) {
		$('.comment').on('click',function () {
			//console.log($(this).parents('tr').find('td').eq(0).find('.proinfo').find('p').html());
			var th = $(this);
			$.ajax({
				type:"post",
				url:"http://localhost:3000/orderlist/list",
				async:true,
				data:{
					proname:$(this).parents('tr').find('td').eq(0).find('.proinfo').find('p').html()
				}
			}).then(function(res){
				$.ajax({
					type:"put",
					url:"http://localhost:3000/orderlist/data/"+res.rows[0]._id,
					async:true,
					data:{
						orderstate:"订单完成"
					}
				}).then(function () {
					if(that.html()=='待收货'){
						location.reload();
					}else{
						th.parents('.productorder').find('.textarea').toggle();//评论按钮
//						console.log(th.parents('.productorder').find('table .ddtop tr td').eq(0).find('span').find('span').eq(2).html());
					}
				});
			});
		});
	}
	
	//点击删除图标
	function deleteorder () {
		$('.deletepic').on('click',function () {
			//console.log($(this).parents('tr').find('td').eq(0).find('span').find('span').eq(2).html());
				$.ajax({
					type:"put",
					url:"http://localhost:3000/orderlist/data/"+$(this).parents('tr').find('td').eq(0).find('span').find('span').eq(2).html(),
					async:true,
					data:{
						ordervisible:"no"
					}
				}).then(function () {
					$('.yishou').click();
				});
		});
	}
	
}else{
	alert('请先登录！');
}
	
	
	
	
})(jQuery);
