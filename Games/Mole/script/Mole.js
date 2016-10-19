/*动态增加鼠洞*/
function addHole(num) {
	var mole = document.getElementById('mole');
	for (var i = 0; i < num; i++) {
		var hole = document.createElement('div');
		hole.setAttribute('class', 'hole');
		hole.setAttribute('id', 'hole' + i);
		mole.appendChild(hole);
	}
}


window.onload = function() {
	addHole(60);
	var status = document.getElementById('status');
	var holes = document.getElementsByClassName('hole');
	var score = 0;
	var pos = -1;
	var gameTime;
	var timer;
	var hit;
	var currentTime;

	/*地鼠出现*/
	function moleShowUp() {
		pos = Math.floor(Math.random() * 60);
		holes[pos].setAttribute('class', 'hole chosen');
	}

	/*地鼠消失*/
	function moleHide(t) {
		t.setAttribute('class', 'hole');
	}

	/*击打地鼠*/
	function hitMole() {
		for (var i = 0; i < holes.length; i++) {
			holes[i].onclick = function() {
				hit = 1;
				if (this.id.substr(4, 2) == pos) {
					document.getElementById('score').innerHTML = ++score;
					moleHide(this);
				} else {
					document.getElementById('score').innerHTML = --score;
					moleHide(holes[pos]);
				}
				moleShowUp();
			}
		}
	}

	/*开始游戏*/
	function gameStart() {
		status.innerHTML = 'Playing';
		document.getElementById('time').innerHTML = gameTime;
		hitMole();
		timer = window.setInterval(timeRun, 1000);
	}

	/*暂停游戏*/
	function pause() {
		window.clearInterval(timer);
		currentTime = gameTime;
		status.innerHTML = 'Pausing';
		document.getElementById('time').innerHTML = gameTime;
	}

	/*游戏结束*/
	function gameOver() {
		window.clearInterval(timer);
		status.innerHTML = 'Game Over';
		moleHide(holes[pos]);
		document.getElementById('time').innerHTML = 0;
		document.getElementById('score').innerHTML = 0;
		alert("Game Over.\nYour score is: " + score);
		score = 0;
	}

	/*倒计时，每秒刷新一次地鼠*/
	function timeRun() {
		if (!hit) {
			moleHide(holes[pos]);
			moleShowUp();
		}
		document.getElementById('time').innerHTML = --gameTime;
		if (gameTime <= 0) {
			gameOver();
		}
		hit = 0;
	}

	/*点击开始按钮，开始游戏；再次点击，结束游戏*/
	document.getElementById('game-switch').onclick = function() {
		if (status.innerHTML == 'Game Over') {
			gameTime = 30;
			moleShowUp();
			gameStart();
		} else if (status.innerHTML == 'Playing') {
			pause();
		} else if (status.innerHTML == 'Pausing') {
			gameStart();
		}
	}
}