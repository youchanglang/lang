$(function(){
	
	//获取商品信息并放到相应的html标签里
	var  urlsearchStr=decodeURI(window.location.search);
	urlsearchStr=urlsearchStr.replace(/\?/gi,'');
	var urlsearchArray=urlsearchStr.split('&');
	var urlsearchArray_1=[];
	var urlsearchArray_2=[];
	for(var i=0; i<urlsearchArray.length;i++){
		urlsearchArray_1.push(urlsearchArray[i].split('=')[0]);
		urlsearchArray_2.push(urlsearchArray[i].split('=')[1]);
	}
	if(!(urlsearchArray_2[0]=='undefined')){
		//console.log(urlsearchArray_2[0]);
		$('.head-div1 .ul-1 .li-2 a').text(urlsearchArray_2[0]);
		if($('.head-div1 .ul-1 .li-2 a').text()=='请登录'){
		$('.head-div1 .ul-1 .li-3 .a-1').text('登录').prop('href','../html/login.html');
	}else{
		$('.head-div1 .ul-1 .li-3 .a-1').text('注销').prop('href','../html/login.html');
		
	}
	}
	
	for(var j=1;j<urlsearchArray_1.length;j++){
		if(urlsearchArray_1[j]=="goodsMessageTop"){
			$('.product-buttom .product-buttom-left').prop('src',urlsearchArray_2[j]);
		}
		if(urlsearchArray_1[j]=="goodsMessageCenter"){
			$('.product .product-top').text(urlsearchArray_2[j]);
		}
		if(urlsearchArray_1[j]=="goodsMessageBottomH4"){
			$('.product-buttom-right .li-1 span').text(urlsearchArray_2[j]);
		}
		if(urlsearchArray_1[j]=="goodsMessageBottomH5"){
			$('.product-buttom-right .li-1 em').text(urlsearchArray_2[j]);
		}
	}
	
	

	
	
	//获取并放置评语
	$.get('../comment.txt',function(data){
		var _data = typeof data == 'string' ? JSON.parse(data) : data;
		for(var i=0;i<_data.comment.length;i++){
			var pas='<div><h5>'+_data.comment[i].username+'</h5>';
			pas+='<p>'+_data.comment[i].reviews+'</p></div>';
			$(pas).appendTo('.deal-stuff .deal-stuff-buttom');
		}
		$('.deal-stuff .deal-stuff-p span').text(_data.comment.length);
	});
	
	
	
//	$('.product-buttom-right .li-3 .span-2').click(function(){
//		var goodsMessage=$(this).parents('.product');
//		var pas='goodsMessageTop='+goodsMessage.find('.product-buttom-left').prop('src')+'&';
//		pas+='goodsMessageCenter='+goodsMessage.find('.product-top').text()+'&';
//		pas+='goodsMessageBottomH4='+goodsMessage.find('.product-buttom-right .li-1 span').text()+'&';
//		pas+='goodsMessageBottomH5='+goodsMessage.find('.product-buttom-right .li-1 em').text();
//		console.log(pas);
//		window.location.href='cart.html?'+encodeURI(pas);
//	});
   
	var validation=function(fu){
   		var src='src';
   		var title='title';
   		var price='price';
   		var nett='nett';
   		var quantity='quantity';
   		//先从读取下cookie，看看之前是否有存过数据，存过则读取出来
		//在之前的基础之上追加
		var srcStr=getCookie(src);//注意读取出来的数据类型为字符串
		var titleStr=getCookie(title);
		var priceStr=getCookie(price);
		var nettStr=getCookie(nett); 
		var quantityStr=getCookie(quantity);
		
		var srcArray = [];//存储从cookie读取的，转化为数组
		var titleArray = [];
		var priceArray = [];
		var nettArray = [];
		var quantityArray=[];
		
		if(srcStr){
			//因为对去出来的数据为字符串，不便于我们操作，所以讲字符串转化为数组
			//这里注意我们一定要统一分割字符串的字符,这里用 &
			srcArray = srcStr.split("&");
			titleArray  = titleStr.split("&");
			priceArray = priceStr.split("&");
			nettArray = nettStr.split("&");
			quantityArray = quantityStr.split("&");
	   }
		srcArray.push($('.product .product-buttom .product-buttom-left').prop('src'));
		titleArray.push($('.product .product-top').text());
		priceArray.push($('.product-buttom-right .li-1 span').text());
		nettArray.push($('.product-buttom-right .li-1 em').text());
		quantityArray.push(1);
		
		
		//因为cookie中只能存字符串类型的数据，所以我们要操作的时候必须
		//把数据类型转化为str
		var srcStr1 = srcArray.join("&");//字符串和数组之间的相互转化的字符串要一致
		var titleStr1 = titleArray.join("&");
		var priceStr1 = priceArray.join("&");
		var nettStr1 = nettArray.join("&");
		var quantityStr1=quantityArray.join("&");
		//cookie的数据准备好了，接下来就是更新cookie里的数据
		removeCookie(src);
		removeCookie(title);
		removeCookie(price);
		removeCookie(nett);
		removeCookie(quantity);
		var d = new Date();
		d.setDate(d.getDate()+7);
		
		setCookie(src,srcStr1,d);
		setCookie(title,titleStr1,d);
		setCookie(price,priceStr1,d);
		setCookie(nett,nettStr1,d);
		setCookie(quantity,quantityStr1,d);
		fu();
		
	}
	$('.product-buttom-right .li-3 .span-2').click(function(){
		validation(fu);
 	});
 	function fu(){
 		alert('已加入购物车!');
 		var pas='username='+urlsearchArray_2[0];
 		window.location.href='cart.html?'+encodeURI(pas);
 	}
 	//放大境
 	$(".sampleimage").zoomio();
});
//<div>
//	<h5>用户名</h5>
//	<p>评价语</p>
//</div>