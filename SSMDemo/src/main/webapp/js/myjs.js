function toLoad() {
	alert($("#userName").val())
	alert($("#password").val())
	$.ajax({
		// <!-- url  :请求地址 -->
		url : '/toLand.do',
		//<!--type ：请求类型:post/get -->
		type : 'post',
		//<!--data ：发送给服务器的数据 -->
		data : {
			// <!-- 使用自己声明的对象 -->  　　
			username : $("#userName").val(),
			// <! -- 直接获取页面的对象 --> 　
			password : $("#password").val()　　　
		},
		//<!--dataType:服务器返回的数据类型 text/xml/script/html/json/jsonp -->
		// dataType : 'json',
		//<!--回调函数 -->
		success: function(data){
			console.log(data);
			//<! -- 浏览器控制台显示返回内容（建议使用） -->
			if(data != null && data != ""){
				// alert(data);
				window.location.href = "main.html";
			}
		}
	});
}