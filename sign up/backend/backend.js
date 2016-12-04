var http = require("http");
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");
var messageToFront;


http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	var ext = pathname.match(/(\.[^.]+|)$/)[0];
	var data;
	if (request.method == "GET") {
		switch(ext){
			case ".css":
			case ".js": {
				data = fs.readFileSync(".." + request.url, "utf-8");
				response.writeHead(200, {
					"Content-Type": {
						".css":"text/css",
						".js":"application/javascript",
					}[ext]
				});
				response.write(data);
				response.end();
				break;
			}
			default: {
				var reqUser = querystring.parse(url.parse(request.url).query).username;
				var users = getUsers();
				if (reqUser == undefined) {
					data = fs.readFileSync("../sign-up.html", "utf-8");
					response.writeHead(200, {
						"Content-Type": "text/html"
					});
					response.write(data);
					response.end();
					break;
				}
				for (var i = 0; i < users.length; i++) {
					users[i] = JSON.parse(users[i]);
					if (users[i].username == reqUser) {
						data = fs.readFileSync("../user.html", "utf-8");
						response.writeHead(200, {
							"Content-Type": "text/html"
						});
						data = data.replace("空用户名", users[i].username).replace("空学号", 
							users[i].studentID).replace("空电话", users[i].phone).replace("空邮箱", users[i].email);
						response.write(data);
						response.end();
						break
					}
				}
				break;
			}	
		}
	}
	if (request.method == "POST") {
		var postStr = "";
		request.on("data", function(item) {
			postStr += item;
			postStr = querystring.parse(postStr);
			if (judgePost(postStr)) {
				save(postStr);
			}
		});
		request.on("end", function() {
			response.end(messageToFront);
		});
	}
}).listen(8000);

console.log("注册系统正在工作...");

function getUsers() {
	var userInfo = fs.readFileSync("../storage/userInfo.json", "utf-8");
    var users = userInfo.split("\n");
    users.pop();
    return users;
}

function judgePost(postStr) {
	var users = getUsers();
	for (var i = 0; i < users.length; i++) {
		users[i] = JSON.parse(users[i]);
		if (postStr.username == users[i].username) {
			messageToFront = "用户名已注册";
			return false;
		}
		if (postStr.studentID == users[i].studentID) {
			messageToFront = "学号已注册";
			return false;
		}
		if (postStr.phone == users[i].phone) {
			messageToFront = "电话已注册";
			return false;
		}
		if (postStr.email == users[i].email) {
			messageToFront = "邮箱已注册";
			return false;
		}
	}
	messageToFront = "注册成功";
	return true;
}

function save(postStr) {
	var fd = fs.openSync("../storage/userInfo.json", "a");
	var writeBuffer = new Buffer(JSON.stringify(postStr) + '\n');
	fs.write(fd, writeBuffer, 0, writeBuffer.length, null, function() {});
	console.log("新用户注册");
}