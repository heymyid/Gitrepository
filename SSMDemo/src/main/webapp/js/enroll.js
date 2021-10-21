var b = true;

function getData() {
    if($("#username").val().trim() == null ||$("#username").val().trim() == ""){
        $("#redText").html('用户名不可为空！');
        return;
    }
    $.ajax({
        // <!-- url  :请求地址 -->
        url : '/land.do',
        //<!--type ：请求类型:post/get -->
        type : 'post',
        //<!--data ：发送给服务器的数据 -->
        data : {
            // <!-- 使用自己声明的对象 -->  　　
            username : $("#username").val()
            // <! -- 直接获取页面的对象 --> 　
            // 　　　　　　　　password : $("#password").val()　　　
        },
        //<!--dataType:服务器返回的数据类型 text/xml/script/html/json/jsonp -->
        dataType : 'json',
        //<!--回调函数 -->
        success: function(data){
            console.log(data);
            //<! -- 浏览器控制台显示返回内容（建议使用） -->
            if(data != null && data != ""){
                console.log(data);
                $("#redText").html('用户已存在！');
                b = false;
            }
            else{
                $("#redText").html('用户名可注册！');
                b = true;
            }
        }
    });
}
function nullPs(){
    if($("#password").val().trim() == null || $("#password").val().trim() == ""){
        $("#redText1").html("密码不能为空！");
        b = false;
    }
    else{
        $("#redText1").html("密码已确认！");
        b = true;
    }

}
function confirmPs(){
    if($("#password").val() != $("#password1").val() || $("#password1").val() == null || $("#password1").val() == ""){
        $("#redText2").html("确认密码不同！");
        b = false;
    }
    else{
        $("#redText2").html("密码已确认！");
        b = true;
    }
}
function enrollNew(){
    if(b == true){
        $.ajax({
            // <!-- url  :请求地址 -->
            url : '/enrollNew.do',
            //<!--type ：请求类型:post/get -->
            type : 'post',
            //<!--data ：发送给服务器的数据 -->
            data : {
                // <!-- 使用自己声明的对象 -->  　　
                username : $("#username").val(),
                // <! -- 直接获取页面的对象 --> 　
                password : $("#password").val(),
                name:$("#name").val(),
                sex:$("#sex").val(),
                age:$("#age").val(),
                phone:$("#phone").val()　
            },
            //<!--dataType:服务器返回的数据类型 text/xml/script/html/json/jsonp -->
            // dataType : 'json',
            //<!--回调函数 -->
            success: function(data){
                console.log(data);
                if(data == "success"){
                    window.location.href = "main.html";
                }
            }
        })
    }
}