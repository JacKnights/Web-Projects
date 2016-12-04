$(document).ready(function() {
	resetClicked();
	$(".button").click(clickOnButton);
	$("#button").mouseleave(resetButton);
});

var clicked = [];

var count = [];

var buttonNum = 5;

jQuery.prototype.getClicked = function() {
	return clicked[$(this).parent().find(".button").index($(this))];
}

function resetClicked() {
	for (var i = 0; i < buttonNum; i++) {
		clicked[i] = false;
	}
}

function resetButton() {
	$("#info-bar>.info").html("");
	$(".count").remove();
	$(".button").css("backgroundColor", "");
	resetClicked();
	$(".button").click(clickOnButton);
}

function clickOnButton() {
	if ($(this).getClicked()) {
		return;
	}
	inactivate($(this).siblings());
	$(this).append("<span class=\"count\">...</span>");
	var that = $(this);
	$.post("../server", null, function(data) {
		that.find(".count").html(data);
		clicked[that.parent().find(".button").index(that)] = true;
		count[that.parent().find(".button").index(that)] = parseInt(data);
		inactivate(that);
		activate(that.siblings());
		if (allClicked()) {
			showSum();
		}
	});
}

function allClicked() {
	for (var i = 0; i < buttonNum; i++) {
		if (clicked[i] === false) {
			return false;
		}
	}
	return true;
}

function showSum() {
	var sum = 0;
	for (var i = 0; i < buttonNum; i++) {
		sum += count[i];
	}
	$("#info-bar").css("backgroundColor", "rgb(50, 80, 180)");
	$("#info-bar").click(function() {
		$(this).find(".info").html(sum);
		$(this).unbind("click");
		$("#info-bar").css("backgroundColor", "");
	});
}

function activate(obj) {
	obj.each(function() {
		if (!$(this).getClicked()) {
			$(this).bind("click", clickOnButton);
			$(this).css("backgroundColor", "");
		}
	});
}

function inactivate(obj) {
	obj.unbind("click");
	obj.css("backgroundColor", "gray");
}