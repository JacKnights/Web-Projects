$(document).ready(function() {
	$(".apb").click(clickFromAToE);
	$("#button").mouseleave(resetButton);
});

var buttonNum = 5;/*全局常量，代表按钮数*/

function aHandler(sum, clicked) {
	var aMessage = "这是个天大的秘密";
	$("#info-bar>.info").html(aMessage);
	if (clicked[0]) {
		return;
	}
	inactivate($("#A").siblings());
	$("#A").append("<span class=\"count\">...</span>");
	var that = $("#A");
	$.get("../server", null, function(data) {
		that.find(".count").html(data);
		clicked[0] = true;
		sum += parseInt(data);
		inactivate(that);
		activate(that.siblings(), clicked);
		var rand = Math.floor((Math.random() * buttonNum));
		while (clicked[rand] && !allClicked(clicked)) {
			rand = Math.floor((Math.random() * buttonNum));
		}
		switch (rand) {
			case 0: {errorHandler("这不是个天大的秘密", sum);break;}
			case 1: {bHandler(sum, clicked);break;}
			case 2: {cHandler(sum, clicked);break;}
			case 3: {dHandler(sum, clicked);break;}
			case 4: {eHandler(sum, clicked);break;}
		}
		if (allClicked(clicked)) {
			bubbleHandler(sum);
			$(".apb").click(clickFromAToE);
		}
	});
}

function bHandler(sum, clicked) {
	var bMessage = "我不知道";
	$("#info-bar>.info").html(bMessage);
	if (clicked[1]) {
		return;
	}
	inactivate($("#B").siblings());
	$("#B").append("<span class=\"count\">...</span>");
	var that = $("#B");
	$.get("../server", null, function(data) {
		that.find(".count").html(data);
		clicked[1] = true;
		sum += parseInt(data);
		inactivate(that);
		activate(that.siblings(), clicked);
		var rand = Math.floor((Math.random() * buttonNum));
		while (clicked[rand] && !allClicked(clicked)) {
			rand = Math.floor((Math.random() * buttonNum));
		}
		switch (rand) {
			case 0: {aHandler(sum, clicked);break;}
			case 1: {errorHandler("我知道", sum);break;}
			case 2: {cHandler(sum, clicked);break;}
			case 3: {dHandler(sum, clicked);break;}
			case 4: {eHandler(sum, clicked);break;}
		}
		if (allClicked(clicked)) {
			bubbleHandler(sum);
			$(".apb").click(clickFromAToE);
		}
	});
}

function cHandler(sum, clicked) {
	var cMessage = "你不知道";
	$("#info-bar>.info").html(cMessage);
	if (clicked[2]) {
		return;
	}
	inactivate($("#C").siblings());
	$("#C").append("<span class=\"count\">...</span>");
	var that = $("#C");
	$.get("../server", null, function(data) {
		that.find(".count").html(data);
		clicked[2] = true;
		sum += parseInt(data);
		inactivate(that);
		activate(that.siblings(), clicked);
		var rand = Math.floor((Math.random() * buttonNum));
		while (clicked[rand] && !allClicked(clicked)) {
			rand = Math.floor((Math.random() * buttonNum));
		}
		switch (rand) {
			case 0: {aHandler(sum, clicked);break;}
			case 1: {bHandler(sum, clicked);break;}
			case 2: {errorHandler("你知道", sum);break;}
			case 3: {dHandler(sum, clicked);break;}
			case 4: {eHandler(sum, clicked);break;}
		}
		if (allClicked(clicked)) {
			bubbleHandler(sum);
			$(".apb").click(clickFromAToE);
		}
	});
}

function dHandler(sum, clicked) {
	var dMessage = "他不知道";
	$("#info-bar>.info").html(dMessage);
	if (clicked[3]) {
		return;
	}
	inactivate($("#D").siblings());
	$("#D").append("<span class=\"count\">...</span>");
	var that = $("#D");
	$.get("../server", null, function(data) {
		that.find(".count").html(data);
		clicked[3] = true;
		sum += parseInt(data);
		inactivate(that);
		activate(that.siblings(), clicked);
		var rand = Math.floor((Math.random() * buttonNum));
		while (clicked[rand] && !allClicked(clicked)) {
			rand = Math.floor((Math.random() * buttonNum));
		}
		switch (rand) {
			case 0: {aHandler(sum, clicked);break;}
			case 1: {bHandler(sum, clicked);break;}
			case 2: {cHandler(sum, clicked);break;}
			case 3: {errorHandler("他知道", sum);break;}
			case 4: {eHandler(sum, clicked);break;}
		}
		if (allClicked(clicked)) {
			bubbleHandler(sum);
			$(".apb").click(clickFromAToE);
		}
	});
}

function eHandler(sum, clicked) {
	var eMessage = "才怪";
	$("#info-bar>.info").html(eMessage);
	if (clicked[4]) {
		return;
	}
	inactivate($("#E").siblings());
	$("#E").append("<span class=\"count\">...</span>");
	var that = $("#E");
	$.get("../server", null, function(data) {
		that.find(".count").html(data);
		clicked[4] = true;
		sum += parseInt(data);
		inactivate(that);
		activate(that.siblings(), clicked);
		var rand = Math.floor((Math.random() * buttonNum));
		while (clicked[rand] && !allClicked(clicked)) {
			rand = Math.floor((Math.random() * buttonNum));
		}
		switch (rand) {
			case 0: {aHandler(sum, clicked);break;}
			case 1: {bHandler(sum, clicked);break;}
			case 2: {cHandler(sum, clicked);break;}
			case 3: {dHandler(sum, clicked);break;}
			case 4: {errorHandler("才不怪", sum);break;}
		}
		if (allClicked(clicked)) {
			bubbleHandler(sum);
			$(".apb").click(clickFromAToE);
		}
	});
}

function errorHandler(message, sum) {alert(11);
	$("#info-bar>.info").html(message + sum);
}

function bubbleHandler(sum) {
	var bubbleMessage = "楼主异步调用战斗力感人，目测不超过";
	$("#info-bar>.info").html(bubbleMessage + sum);
}

function clickFromAToE() {
	var clicked = [];
	for (var i = 0; i < buttonNum; i++) {
		clicked[i] = false;
	}
	var rand = Math.floor((Math.random() * buttonNum));
	switch (rand) {
		case 0: {aHandler(0, clicked);break;}
		case 1: {bHandler(0, clicked);break;}
		case 2: {cHandler(0, clicked);break;}
		case 3: {dHandler(0, clicked);break;}
		case 4: {eHandler(0, clicked);break;}
	}
	$(this).unbind("click");
}

function resetButton() {
	$("#info-bar>.info").html("");
	$(".count").remove();
	$(".button").css("backgroundColor", "");
}

function allClicked(clicked) {
	for (var i = 0; i < buttonNum; i++) {
		if (clicked[i] === false) {
			return false;
		}
	}
	return true;
}

function activate(obj, clicked) {
	obj.each(function() {
		if (!clicked[$(".button").parent().find(".button").index($(this))]) {
			$(this).css("backgroundColor", "");
		}
	});
}

function inactivate(obj) {
	obj.css("backgroundColor", "gray");
}