$(function(){
	
	var  urlusernameStr=decodeURI(window.location.search);
	urlusernameStr=urlusernameStr.replace(/\?/gi,'');
	var urlArray=urlusernameStr.split('&');
	var urlArray1=urlArray[0].split('=');
	if(urlArray[1]){
		var urlArray2=urlArray[1].split('=');
		if(urlArray1[0]=='keyword'){
			
			$('.search-Input .txt').val(urlArray1[1]);
		}else if(urlArray2[0]=='keyword'){
			$('.search-Input .txt').val(urlArray2[1]);
		}
		if(urlArray1[0]=='username'){
		$('.head-div1 .ul-1 .li-2 a').text(urlArray1[1]);
	 }else if(urlArray2[0]=='username'){
		$('.head-div1 .ul-1 .li-2 a').text(urlArray2[1]);
	}
	}
	
	
	
	//关键字
	    //console.log();
		if(urlArray1[0]=='keyword'){
			
			$('.search-Input .txt').val(urlArray1[1]);
		}
	
	//用户名
	if(urlArray1[0]=='username'){
		$('.head-div1 .ul-1 .li-2 a').text(urlArray1[1]);
	}
	if($('.head-div1 .ul-1 .li-2 a').text()=='请登录'){
		$('.head-div1 .ul-1 .li-3 .a-1').text('登录').prop('href','../html/login.html');
	}else{
		$('.head-div1 .ul-1 .li-3 .a-1').text('注销').prop('href','../html/login.html');
		
	}
	
	function page(_pageindex, _isgenerate){
		$.get('../index.txt',{'_': Math.random(),page: _pageindex},function(_response){
			var _data = typeof _response == 'string' ? JSON.parse(_response) : _response;
			
			var pagep=Math.ceil(_data.totalCount/_data.pageSize);
			//创建翻页按钮
			if(_isgenerate){
				for(var j=1;j<=pagep;j++){
				var Ospan='<span class="ospan">'+j+'</span>';
				$(Ospan).appendTo('.main-hot .paging');
			}
			}
			//商品列表
			$('#main .goods-list').html('');
			for(var i=_pageindex==1?0:(_pageindex-1)*_data.pageSize;i<_data.pageSize*_pageindex;i++){
				if(i>=_data.totalCount){
				
				}else{
					var pageFlag='<div class="goods-message">';
					pageFlag+='<a href="javascript:"><img src="'+_data.result[i].src+'" class="goods-message-top" />';
					pageFlag+='<p class="goods-message-center"><a href="javascript:">'+_data.result[i].title+'</a></p>';
					pageFlag+='<div class="goods-message-bottom">';
					pageFlag+='<h4>'+_data.result[i].price+'</h4>';
					pageFlag+='<h5><span>'+_data.result[i].nett+'</span><em>新品上市</em></h5>';
					pageFlag+='<h3><a href="javascript:">立即购买</a></h3>';
					pageFlag+='</div>';
					pageFlag+='</div>';
					$(pageFlag).appendTo('#main .goods-list');
				}
				
			}
			
			//转数据信息给详情页
			$('.goods-list .goods-message').on('click',function(evt){
					
					if($(evt.target).is('.goods-message-top')||$(evt.target).is('.goods-message-center a')||$(evt.target).is('h3 a')){
						var goodsMessage=$(evt.target).parents('.goods-message');
						//if(urlArray1[0])
						var pas='username='+urlArray1[1]+'&';
						pas+='goodsMessageTop='+goodsMessage.find('.goods-message-top').prop('src')+'&';
						pas+='goodsMessageCenter='+goodsMessage.find('.goods-message-center a').text()+'&';
						pas+='goodsMessageBottomH4='+goodsMessage.find('.goods-message-bottom h4').text()+'&';
						pas+='goodsMessageBottomH5='+goodsMessage.find('.goods-message-bottom h5 span').text();
						//console.log(pas);
						window.location.href='detailPages.html?'+encodeURI(pas);

					}
			});
			
	    });
	}
	page(1,true);
	$('#main .paging').on('click', function(evt){
		if($(evt.target).is('span')){
			console.log($(evt.target));
			page($(evt.target).text());
		}
		
	});
	
	$('#menu .ul-1').click(function(evt){
		if($(evt.target).is('#menu .ul-1 li a')&&!$(evt.target).is('#menu .ul-1 .li-1 a')){
			if(urlusernameArray[1]){
				var pas='username='+urlusernameArray[1];
				window.location.href='listPages.html?'+encodeURI(pas);
			}else{
				window.location.href='listPages.html';
			}
			
		}
	});
	
});
