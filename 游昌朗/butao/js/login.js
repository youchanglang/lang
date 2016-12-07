$(function(){
    //cookie记录username数组的key
	var username='username';
	var password='password';
	//读取cookie里的数据
    //注意读取出来的数据类型为字符串
	var usernameStr = getCookie(username);
	var passwordStr = getCookie(password);
	
	var usernameArray = [];//存储从cookie读取的，转化为数组
	var passwordArray = [];//存储从cookie读取的，转化为数组
	if(usernameStr){
		//因为对去出来的数据为字符串，不便于我们操作，所以讲字符串转化为数组
		//这里注意我们一定要统一分割字符串的字符,这里用 &
		usernameArray  = usernameStr.split("&");
		passwordArray = passwordStr.split("&");			
    }
	$('.login-box form button').click(function(){
		var valUsername=$('.login-box form input').eq(0).val();
		var valPassword=$('.login-box form input').eq(1).val();
		for(var i=0;i<usernameArray.length;i++){
			if(valUsername==usernameArray[i]&&valPassword==passwordArray[i]){
				//alert('登录成功')
				var pas='username='+valUsername;
				window.location.href='../index.html?'+encodeURI(pas);
				return;
			}else{
				if(i==usernameArray.length-1){
					alert("用户名或密码错误!");
				}else if(usernameArray.length==0){
					alert("该用户名不存在!");
				}
				
			}
		}
	});
});

