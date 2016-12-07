$(function(){
	var correct1=false;
	var correct2=false;
	var correct3=false;
	var correct4=false; 
	var formValidation=function(){
		$('.login-box form input').eq(0).blur(function(){
			var val=$(this).val();
			val=val.replace(/ /g,"");
			var pattern=/([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
			if(val==""){
				correct1=false;
				$(this).siblings('.span-2').eq(0).text('请输入邮箱');
				$(this).siblings('.em-2').children('i').eq(0).addClass('fa fa-remove');
			}else if(pattern.test(val)){
				correct1=true;
				$(this).siblings('.em-2').children('i').eq(0).removeClass('fa fa-remove');
				$(this).siblings('.em-2').children('i').eq(0).addClass('fa fa-check');
			}else{ 
				correct1=false;
				$(this).siblings('.span-2').eq(0).text('您输入的邮箱有误');
				$(this).siblings('.em-2').children('i').eq(0).addClass('fa fa-remove');
			}
	    });
	    $('.login-box form input').eq(1).blur(function(){
	    	var val=$(this).val();
			val=val.replace(/ /g,"");
			var pattern=/^\w{4,16}$/;
			if(val==""){
				correct2=false;
				$(this).siblings('.span-2').eq(1).text('请输入用户名');
				$(this).siblings('.em-2').children('i').eq(1).addClass('fa fa-remove');
			}else if(pattern.test(val)){
				correct2=true;
				$(this).siblings('.span-2').eq(1).text('');
				$(this).siblings('.em-2').children('i').eq(1).removeClass('fa fa-remove');
				$(this).siblings('.em-2').children('i').eq(1).addClass('fa fa-check');
			}else{ 
				correct2=false;
				$(this).siblings('.span-2').eq(1).text('您输入的用户名有误');
				$(this).siblings('.em-2').children('i').eq(1).addClass('fa fa-remove');
			}
	    });
	    $('.login-box form input').eq(2).blur(function(){
	    	var val=$(this).val();
			val=val.replace(/ /g,"");
			var pattern=/^\w{6,}$/;
			if(val==""){
				correct3=false;
				$(this).siblings('.span-2').eq(2).text('请输入密码');
				$(this).siblings('.em-2').children('i').eq(2).addClass('fa fa-remove');
			}else if(pattern.test(val)){
				correct3=true;
				$(this).siblings('.span-2').eq(2).text('');
				$(this).siblings('.em-2').children('i').eq(2).removeClass('fa fa-remove');
				$(this).siblings('.em-2').children('i').eq(2).addClass('fa fa-check');
			}else{ 
				correct3=false;
				$(this).siblings('.span-2').eq(2).text('');
				$(this).siblings('.em-2').children('i').eq(2).addClass('fa fa-remove');
			}
	    });
	     $('.login-box form input').eq(3).blur(function(){
	     	var val1=$('.login-box form input').eq(2).val();
	     	var val2=$(this).val();
	     	if(val2==""){
	     		correct4=false;
	     		$(this).siblings('.em-2').children('i').eq(3).addClass('fa fa-remove');
	     	}else if(val1==val2){
	     		correct4=true;
	     		$(this).siblings('.span-2').eq(3).text('');
	     		$(this).siblings('.em-2').children('i').eq(3).removeClass('fa fa-remove');
				$(this).siblings('.em-2').children('i').eq(3).addClass('fa fa-check');
	     	}else{
	     		correct4=false;
	     		$(this).siblings('.span-2').eq(3).text('两次密码输入不一致');
				$(this).siblings('.em-2').children('i').eq(3).addClass('fa fa-remove');
	     	}
	     });
	}
	
	
	var validation=function(){
		if(correct1&&correct2&&correct3&&correct4){
			console.log('sdsd');
			var mail='mail';//cookie记录mail数组的key
			var username='username';
			var password='password';
            //先从读取下cookie，看看之前是否有存过数据，存过则读取出来
			//在之前的基础之上追加
			var mailStr = getCookie(mail);//注意读取出来的数据类型为字符串
			var usernameStr = getCookie(username);
			var passwordStr = getCookie(password);

			var mailArray = [];//存储从cookie读取的，转化为数组
			var usernameArray = [];//存储从cookie读取的，转化为数组
			var passwordArray = [];//存储从cookie读取的，转化为数组
			if(usernameStr){
				//因为对去出来的数据为字符串，不便于我们操作，所以讲字符串转化为数组
				//这里注意我们一定要统一分割字符串的字符,这里用 &
				mailArray = mailStr.split("&");
				usernameArray  = usernameStr.split("&");
				passwordArray = passwordStr.split("&");			
		    }
			mailArray.push($('.login-box form input').eq(0).val());
			usernameArray.push($('.login-box form input').eq(1).val());
			passwordArray.push($('.login-box form input').eq(2).val());
			
			//因为cookie中只能存字符串类型的数据，所以我们要操作的时候必须
			//把数据类型转化为str
			var mailStr1 = mailArray.join("&");//字符串和数组之间的相互转化的字符串要一致
			var usernameStr1 = usernameArray.join("&");
			var passwordStr1 = passwordArray.join("&");
			
			//cookie的数据准备好了，接下来就是更新cookie里的数据
			removeCookie(mail);
			removeCookie(username);
			removeCookie(password);
			
			var d = new Date();
			d.setDate(d.getDate()+10000);//100000000天后的日期
			setCookie(mail,mailStr1,d);
			setCookie(username,usernameStr1,d);
			setCookie(password,passwordStr1,d);
			console.log(getCookie(mail));
			if ($('.mask')[0]) {
                $('.mask').show();
             } else {
                $('<div class="mask"><i class="fa fa-spinner fa-spin"></i></div>').appendTo('body').show();
             }
			alert("注册成功!");
			$('.mask').hide();
			window.history.go(0);
			
		}else{
			alert('信息填写不完整，无法注册!');
		}
	}
	
	
	formValidation();
	$('.login-box form button').click(function(evt){
		validation();
		
	});
});
