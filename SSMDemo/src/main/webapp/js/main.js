var index = 0;
var pageNum = 10;
var pageSum;
var nowPage = 1;
//待修改标识
var b = false;
//待修改用户名
var userId;
$(function () {
    $.ajax({
        url: "/main.do",
        type: "POST",
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $.ajax({
                url: "/FindInformation.do",
                type: "POST",
                data: {
                    page: index,
                    pageNum: pageNum
                },
                dataType: 'json',
                success: function (data) {
                    pageSum = data.pageSum;
                }
            })
        }
    });

})
// 获取下拉框
$("#limit").change(function () {
    // 获取下拉框中被选中的值
    pageNum = parseInt($("#limit").val());
    nowPage = 1;
    index = (nowPage - 1) * pageNum;
    searchAll();
})

//开始查找
function searchAll() {
    $.ajax({
        url: "/FindInformation.do",
        type: "POST",
        data: {
            page: index,
            pageNum: pageNum
        },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            pageSum = data.pageSum;
            var str = "<tr>";
            for (var i = 0; i < data.userInformational.length; i++) {
                str += "<td>"
                str += data.userInformational[i].uid;
                str += "</td>";
                str += "<td>"
                str += data.userInformational[i].username;
                str += "</td>";
                str += "<td>"
                str += data.userInformational[i].password;
                str += "</td>";
                str += "<div>"
                str += data.userInformational[i].name;
                str += "</td>";
                str += "<td>"
                str += data.userInformational[i].sex;
                str += "</td>";
                str += "<td>"
                str += data.userInformational[i].age;
                str += "</td>";
                str += "<td>"
                str += data.userInformational[i].phone;
                str += "</td>";
                str += "<td><button class='btn btn-danger' onclick='deleteUser(";
                str += data.userInformational[i].uid;
                str += ")'>删除</button>";
                str += "<button class='btn btn-info' onclick='updateUser(";
                str += data.userInformational[i].uid;
                str += ")'>修改</button></td>";
                str += "</tr>"
            }
            $("tbody").html(str);
            $("#currentPage").html(nowPage);
            $("#pageTotal").html(data.pageSum)
            $("#page").val(nowPage);
            // operability = false;
        }
    })

}

//前往指定页面
function gotoPage() {
    var pagei = $("#page").val()
    if (pagei > pageSum) {
        nowPage = pageSum;
    } else if (pagei < 1) {
        nowPage = 1;
    } else {
        nowPage = pagei;
    }
    index = (nowPage - 1) * pageNum;
    searchAll();
}

//更新信息
function updateUser(i) {
    b = false;
    userId = i;
    $("#username").val("")
    $("#redText").html("");
    $("#password").val("")
    $("#redText1").html("");
    $("#password1").val("");
    $("#redText2").html("");
    $("#name").val("")
    $("#sex").val("")
    $("#age").val("")
    $("#updateDiv").show();
    $('html,body').animate({scrollTop:0},200);
}

function closeUpdateDiv() {
    $("#updateDiv").hide();
}

function refer() {
    if (b == true) {
        var username = $("#username").val()
        var password = $("#password").val()
        var name = $("#name").val()
        var sex = $("#sex").val()
        var age;
        if ($("#age").val() == "" || $("#age").val() == null) {
            age = 0;
        } else {
            age = $("#age").val()
        }

        var phone = $("#phone").val()
        console.log(username)
        console.log(password)
        console.log(name)
        console.log(sex)
        console.log(age)
        console.log(phone)
        $.ajax({
            url: "/Update.do",
            type: "POST",
            data: {
                uid: userId,
                username: username,
                password: password,
                name: name,
                sex: sex,
                age: age,
                phone: phone
            },
            success: function (data) {
                console.log(data);
                firstPage();
                $("#updateDiv").hide();
                b = false;
            }
        })
    }

}

function getData() {
    if ($("#username").val().trim() == null || $("#username").val().trim() == "") {
        $("#redText").html('用户名不可为空！');
        return;
    }
    $.ajax({
        // <!-- url  :请求地址 -->
        url: '/land.do',
        //<!--type ：请求类型:post/get -->
        type: 'post',
        //<!--data ：发送给服务器的数据 -->
        data: {
            // <!-- 使用自己声明的对象 -->  　　
            username: $("#username").val()
            // <! -- 直接获取页面的对象 --> 　
            // 　　　　　　　　password : $("#password").val()　　　
        },
        //<!--dataType:服务器返回的数据类型 text/xml/script/html/json/jsonp -->
        dataType: 'json',
        //<!--回调函数 -->
        success: function (data) {
            console.log(data);
            //<! -- 浏览器控制台显示返回内容（建议使用） -->
            if (data != null && data != "") {
                console.log(data);
                $("#redText").html('用户已存在！');
                b = false;
            } else {
                $("#redText").html('用户名可修改！');
                b = true;
            }
        }
    });
}

function nullPs() {
    if ($("#password").val().trim() == null || $("#password").val().trim() == "") {
        $("#redText1").html("密码不能为空！");
        b = false;
    } else {
        $("#redText1").html("密码已确认！");
        b = true;
    }

}

function confirmPs() {
    if ($("#password").val() != $("#password1").val() || $("#password1").val() == null || $("#password1").val() == "") {
        $("#redText2").html("确认密码不同！");
        b = false;
    } else {
        $("#redText2").html("密码已确认！");
        b = true;
    }
}

function deleteUser(i) {
    // alert(i);
    $.ajax({
        url: "/Delete.do",
        type: "POST",
        data: {
            userid: i
        },
        success: function (data) {
            console.log(data);
            index = (nowPage - 1) * pageNum;
            // operability = true;
            searchAll();
        }
    })

}

function firstPage() {
    nowPage = 1;
    index = (nowPage - 1) * pageNum;
    // operability = true;
    searchAll();
}

function previousPage() {
    if (nowPage > 1) {
        nowPage--;
        index = (nowPage - 1) * pageNum;
        // operability = true;
        searchAll();
    } else {
        firstPage();
    }
}

function nextPage() {
    if (nowPage < pageSum) {
        nowPage++;
        index = (nowPage - 1) * pageNum;
        // operability = true;
        searchAll();
    } else {
        lastPage();
    }
}

function lastPage() {
    nowPage = pageSum;
    index = (nowPage - 1) * pageNum;
    // operability = true;
    searchAll();
}