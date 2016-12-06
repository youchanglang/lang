$(function(){
	var  urlusernameStr=decodeURI(window.location.search);
	urlusernameStr=urlusernameStr.replace(/\?/gi,'');
	var urlusernameArray=urlusernameStr.split('=');
	console.log(urlusernameArray[1]);
	//用户名
	if(!(urlusernameArray[1]=='undefined')){
	   $('.head-div1 .ul-1 .li-2 a').text(urlusernameArray[1]);
	}
	if($('.head-div1 .ul-1 .li-2 a').text()=='请登录'){
		$('.head-div1 .ul-1 .li-3 .a-1').text('登录').prop('href','../html/login.html');
	}else{
		$('.head-div1 .ul-1 .li-3 .a-1').text('注销').prop('href','../html/login.html');
		
	}
	
	
	
	
	var src='src';//cookie记录src数组的key
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
	//console.log(quantityArray);
	for(var i=0;i<srcArray.length;i++){
		console.log(quantityArray[i]);
		var nettStr3=nettArray[i].replace(/\￥/gi,'');
		nettStr3=nettStr3.substring()
		var priceStr3=priceArray[i].replace(/\￥/gi,'');
		var nettStr4=(parseFloat(nettStr3)-parseFloat(priceStr3))*quantityArray[i];
		var priceStr4=parseFloat(priceStr3)*quantityArray[i];
		var tbodyStr='<tr><td><img src="'+srcArray[i]+'"/><p>'+titleArray[i]+'</p></td>';
		tbodyStr+='<td><div><span class="span-1">-</span><input type="text" value="'+quantityArray[i]+'"/><span class="span-2">+</span></div></td>';
		tbodyStr+='<td class="price">'+priceArray[i]+'</td>';
		tbodyStr+='<td class="privilege">￥'+nettStr4.toFixed(2)+'</td>';
		tbodyStr+='<td class="total">￥'+priceStr4.toFixed(2)+'</td>';
		tbodyStr+='<td class="delete"><a href="javascript:" class="delete-a">删除</a></td></tr>';
		$(tbodyStr).appendTo('#cart-center table tbody');
	
	}
	
	//商品数量
	var a=0;
	for(var j=0;j<quantityArray.length;j++){
		a+=parseInt(quantityArray[j]);
	}
	$('#cart-center table tfoot tr td .number em').text(a);
	
	////商品总价
	var priceStr3=0;
	for(var i=0;i<srcArray.length;i++){
		priceStr3+=parseFloat(priceArray[i].replace(/\￥/gi,'')*quantityArray[i]);
	}
	$('#cart-center table tfoot tr td .total-price em').text(priceStr3.toFixed(2));
	
	
	//减号
	$('#cart-center table tbody tr td div .span-1').click(function(){
		console.log($(this).parents('tr').index());
		if($(this).next().val()!=1){
			//数量
			var k=$(this).next().val();
			k=parseInt(k)-1;
			$(this).next().val(k);
			
			//商品数量
			var quantityTotal=$('#cart-center table tfoot tr td .number em').text();
		    quantityTotal=parseInt(quantityTotal)-1;
		    $('#cart-center table tfoot tr td .number em').text(quantityTotal);
		    
		    
		    //商品总价
		    var price=$(this).parents('tr').find('.price').text();
		    price=price.replace(/\￥/gi,'');
		    var totalAmount=$('#cart-center table tfoot tr td .total-price em').text();
		    totalAmount=parseFloat(totalAmount)-parseFloat(price);
		    $('#cart-center table tfoot tr td .total-price em').text(totalAmount.toFixed(2))
            
            //小计
		    var amount=$(this).next().val();
		    var total=parseInt(amount)*parseFloat(price);
		    $(this).parents('tr').find('.total').text('￥'+total.toFixed(2));
		    
		    //优惠
		    var privilege=$(this).parents('tr').find('.privilege').text();
		    privilege=privilege.replace(/\￥/gi,'');
	    	privilege=parseInt($(this).next().val())*(parseFloat(privilege)/(parseInt($(this).next().val())+1));
		    $(this).parents('tr').find('.privilege').text('￥'+privilege.toFixed(2));
		    console.log($(this).next().val());
	        
	        
	        //更新cookie里的数据
	       quantityArray[$(this).parents('tr').index()]=parseInt($(this).next().val());
	       removeCookie(quantity);
	       var quantityStr1=quantityArray.join("&");
	       var d = new Date();
		   d.setDate(d.getDate()+7);
	       setCookie(quantity,quantityStr1,d);
	       
		   
		}
//		var price=$(this).parents('tr').find('.price').text();
//		price=price.replace(/\￥/gi,'')
		
		
		
		
		
	});
	
	//加号
	$('#cart-center table tbody tr td div .span-2').click(function(){
		
		//数量
		var k=$(this).siblings('input').val();
		k=parseInt(k)+1;
		$(this).siblings('input').val(k);
		
		// //小计
		var price=$(this).parents('tr').find('.price').text();
		price=price.replace(/\￥/gi,'')
		var amount=$(this).siblings('input').val();
		var total=parseInt(amount)*parseFloat(price);
		$(this).parents('tr').find('.total').text('￥'+total.toFixed(2));
		
		////商品数量
		var quantityTotal=$('#cart-center table tfoot tr td .number em').text();
	    quantityTotal=parseInt(quantityTotal)+1;
	    $('#cart-center table tfoot tr td .number em').text(quantityTotal);
	    
	    // //商品总价
	    var totalAmount=$('#cart-center table tfoot tr td .total-price em').text();
	    totalAmount=parseFloat(totalAmount)+parseFloat(price);
	    $('#cart-center table tfoot tr td .total-price em').text(totalAmount.toFixed(2));
	    
	    //优惠
	     var privilege=$(this).parents('tr').find('.privilege').text();
		 privilege=privilege.replace(/\￥/gi,'');
		 privilege=parseInt($(this).siblings('input').val())*(parseFloat(privilege)/(parseInt($(this).siblings('input').val())-1));
	     $(this).parents('tr').find('.privilege').text('￥'+privilege.toFixed(2));
	     console.log($(this).siblings('input').val());
	     
	     //更新cookie里的数据
	       quantityArray[$(this).parents('tr').index()]=parseInt($(this).siblings('input').val());
	       removeCookie(quantity);
	       var quantityStr1=quantityArray.join("&");
	       var d = new Date();
		   d.setDate(d.getDate()+7);
	       setCookie(quantity,quantityStr1,d);
		   
		
	});
	
	//input失去焦点
	$('#cart-center table tbody tr td div input').blur(function(){
		
	});
	
	
	//delete--删除
//	$('#cart-center table tbody tr .delete a').click(function(){
//		var src=$(this).parents('tr').find('img').prop('src');
//		}
     var aA=document.getElementsByClassName('delete-a');
     console.log(aA);
     for(var i=0;i<aA.length;i++){
     	aA[i].index=i;
     	aA[i].onclick=function(){
     		alert('确定删除?');
     		this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
     		//console.log(this.parentNode.parentNode.parentNode);
     		
     		srcArray.splice(this.index,1); 
			titleArray.splice(this.index,1);  
			priceArray.splice(this.index,1); 
			nettArray.splice(this.index,1);
			quantityArray.splice(this.index,1);
			
			//因为cookie中只能存字符串类型的数据，所以我们要操作的时候必须
			//把数据类型转化为str
			var srcStr1 = srcArray.join("&");//字符串和数组之间的相互转化的字符串要一致
			var titleStr1 = titleArray.join("&");
			var priceStr1 = priceArray.join("&");
			var nettStr1 = nettArray.join("&");
			var quantityStr1 = quantityArray.join("&");
			
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
			window.history.go(0);
     	}
     }
		

	
});
