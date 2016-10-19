window.onload = function() {
	/*鼠标撞墙*/
	function crashIntoWall(t) {
		t.className += ' crash';
	}

	/*墙色恢复*/
	function resetWall(t) {
		t.className = 'wall';
	}

	/*可见*/
	function visible(t) {
		t.setAttribute('class', 'visible');
	}

	/*不可见*/
	function invisible(t) {
		t.setAttribute('class', 'invisible');
	}

	/*鼠标指向起点，开始游戏*/
	document.getElementById('start').onmouseover = function() {
		var status = document.getElementById('status');
		var play = true;
		var through = false;
		var lose = true;
		var cheat = false;
		var thisWall;
		document.getElementById('check').onmouseover = function() {
			through = true;
		}
		invisible(status);
		var walls = document.getElementsByClassName('wall');
		for (var i = 0; i < walls.length; i++) {
			/*鼠标触墙，失败*/
			resetWall(walls[i]);
			walls[i].onmouseover = function() {
				if (play && lose) {
					thisWall = this;
					visible(status);
					status.innerText = 'You lose!';
					crashIntoWall(this);
					document.getElementById('maze-container').onmouseleave = function() {
						resetWall(thisWall);
					}
				}
				play = false;
			}
		}

		/*鼠标到达终点*/
		document.getElementById('end').onmouseover = function() {
			if (play && through && !cheat) {
				visible(status);
				status.innerText = 'You win!';
			}
			if (play && !through) {
				visible(status);
				status.innerText = 'Don\'t cheat, you should start from the "S" and move to the "E" inside the maze!';
				cheat = true;
			}
			lose = 0;
		}
	}

}