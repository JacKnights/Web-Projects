var score = 0;
var pos = -1;
var gameTime;
var timer;
var hit;
var currentTime;
var hole_num = 60;


/*动态增加鼠洞*/
function addHole(num) {
	for (var i = 0; i < num; i++) {
		var newHole = $("<div></div>");
		newHole.attr('class', 'hole');
		newHole.attr('id', 'hole' + i);
		$("#mole").append(newHole);
	}
}

	/*地鼠出现*/
function moleShowUp() {
	pos = Math.floor(Math.random() * hole_num);
	$("#hole" + pos).attr('class', 'hole chosen');
}

function beHit() {
	hit = 1;
	if (this.id.substr(4) == pos) {
		$('#score').html(++score);
		moleHide($("#hole" + pos));
	} else {
		$('#score').html(--score);
		moleHide($("#hole" + pos));
	}
	moleShowUp();
}

	/*击打地鼠*/
function hitMole() {
	for (var i = 0; i < hole_num; i++) {
		$("#hole" + i).bind("click", beHit);
	}
}

	/*取消击打地鼠*/
function stopHitting() {
	for (var i = 0; i < hole_num; i++) {
		$("#hole" + i).unbind("click", beHit);
	}
}

	/*地鼠消失*/
function moleHide(t) {
	t.attr('class', 'hole');
}

	/*开始游戏*/
function gameStart() {
	$('#status').html("Playing");
	$('#time').html(gameTime);
	hitMole();
	timer = setInterval(timeRun, 1000);
}

	/*暂停游戏*/
function pause() {
	clearInterval(timer);
	currentTime = gameTime;
	$("#status").html('Pausing');
	$('#time').html(gameTime);
	stopHitting();
}

	/*游戏结束*/
function gameOver() {
	clearInterval(timer);
	$("#status").html("Game Over. Your score is: " + score);
	moleHide($("#hole" + pos));
	$('#time').html(0);
	$('#score').html(0);
	score = 0;
	stopHitting();
}

	/*倒计时，每秒刷新一次地鼠*/
function timeRun() {
	if (!hit) {
		moleHide($("#hole" + pos));
		moleShowUp();
	}
	$('#time').html(--gameTime);
	if (gameTime <= 0) {
		gameOver();
	}
	hit = 0;
}

	/*点击开始按钮，开始游戏；再次点击，结束游戏*/
function clickToStart() {
	if ($("#status").html() == 'Pausing') {
		gameStart();
	} else if ($("#status").html() == 'Playing') {
		pause();
	} else {
		gameTime = 30;
		moleShowUp();
		gameStart();
	}
}

$(window).load(function() {
	addHole(hole_num);
	$("#game-switch").bind("click", clickToStart);
});