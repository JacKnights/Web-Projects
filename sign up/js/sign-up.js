var legal;

$(document).ready(function() {
	$("#submit").click(function() {
		event.preventDefault();
		$("#status").css("color", "red");
		judgeInput();
		if (legal) {
			$.post("/", {"username": $("#username").val(), "studentID": $("#studentID").val(),
				"phone": $("#phone").val(), "email": $("#email").val()}, function(data, status) {
					$("#status").html(data);
					if (data == "注册成功") {
						$("#status").css("color", "green");
					}
					window.location.href = "?username=" + $("#username").val();
			}, "text");
		}	
	});
	$("#reset").click(function() {
		$("#status").html("");
	});
});

function judgeInput() {
    var usernameRegExp = /^[a-zA-Z][\da-zA-Z_]{5,17}$/;
    var studentIDRegExp = /^[1-9]\d{7}$/;
    var phoneRegExp =  /^[1-9]\d{10}$/;
	var emailRegExp = /^[\da-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;

	if ($("#username").val().match(usernameRegExp) == null) {
		$("#status").html("用户名有误，请输入6~18位英文字母、数字或下划线，必须以英文字母开头");
		legal = false;
	} else if ($("#studentID").val().match(studentIDRegExp) == null) {
		$("#status").html("学号有误，请输入8位数字，不能以0开头");
		legal = false;
	} else if ($("#phone").val().match(phoneRegExp) == null) {
		$("#status").html("电话有误，请输入11位数字，不能以0开头");
		legal = false;
	} else if ($("#email").val().match(emailRegExp) == null) {
		$("#status").html("邮箱有误，请输入有效邮箱地址");
		legal = false;
	} else {
		legal = true;
	}
}