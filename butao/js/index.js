$(function(){
	
	for(var i=0;i<3;i++){
	var a=$('.main-hot .goods-list .goods-message').clone();
	
		$(a).appendTo('.main-hot .goods-list');
	}
	
	var  urlusernameStr=decodeURI(window.location.search);
	urlusernameStr=urlusernameStr.replace(/\?/gi,'');
	var urlusernameArray=urlusernameStr.split('=');
	console.log(urlusernameArray[1]);
	$('.head-div1 .ul-1 .li-2 a').text(urlusernameArray[1]);
	if($('.head-div1 .ul-1 .li-2 a').text()=='请登录'){
		$('.head-div1 .ul-1 .li-3 .a-1').text('登录').prop('href','html/login.html');
	}else{
		$('.head-div1 .ul-1 .li-3 .a-1').text('注销').prop('href','html/login.html');
		
	}
	
	
	$('#menu .ul-1').click(function(evt){
		if($(evt.target).is('#menu .ul-1 li a')&&!$(evt.target).is('#menu .ul-1 .li-1 a')){
			if(urlusernameArray[1]){
				var pas='username='+urlusernameArray[1];
				window.location.href='html/listPages.html?'+encodeURI(pas);
			}else{
				window.location.href='html/listPages.html';
			}
			
		}
	});
	
	
	$('.search-Input .sub').click(function(){
		if(urlusernameArray[1]){
				var pas='username='+urlusernameArray[1]+'&';
				pas+='keyword='+$('.search-Input .txt').val();
				window.location.href='html/listPages.html?'+encodeURI(pas);
			}else if($('.search-Input .txt').val()){
				var pass='keyword='+$('.search-Input .txt').val();
				window.location.href='html/listPages.html?'+encodeURI(pass);
			}
	});
	
	
	
    //轮播图
	$('.flexslider').flexslider({
		directionNav: true,
		pauseOnAction: false
	});
	
});
