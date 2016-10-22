
window.onload = function() {
	var puzzle_row = 4;
	var piece_num = Math.pow(puzzle_row, 2);
	var container = document.getElementById("puzzle-container");	/*拼图板*/
	var level_down = document.getElementById("level-down");	/*切换按键*/
	var level_up = document.getElementById("level-up");
	var status = document.getElementById("status");	/*提示板*/
	var position = [];	/*用于保存每张拼图当前位置*/
	var emptyPos, thisPos;	/*分别用于保存空的块和当前点击的块的位置*/
	var puzzle = document.getElementsByClassName("puzzle");	/*每块拼图组成的数组*/
	var classWithoutIndex = "puzzle this-puzzle position";


	createPuzzle(piece_num);
	resetPosition();

	/*生成拼图*/
	function createPuzzle(num) {
		for (var i = 0; i < num; i++) {
			var newPiece = document.createElement("div");
			newPiece.setAttribute("class", classWithoutIndex + i);
			newPiece.setAttribute("id", "puzzle" + i);
			container.appendChild(newPiece);
		}
	}

	/*删除拼图块*/
	function destroyPuzzle() {
		for (var i = piece_num - 1; i >= 0; i--) {
			container.removeChild(puzzle[i]);
		}
	}

	/*重设位置*/
	function resetPosition() {
		for (var i = 0; i < piece_num; i++) {
			position[i] = i;
		}	
	}

	/*获取位置*/
	function getPosition(obj) {
		return obj.className.substr(27);
	}

	/*判断拼图是否可移动*/
	function moveAvailable(thisPiece) {
		thisPos = getPosition(thisPiece);
		emptyPos = getPosition(puzzle[piece_num - 1]);
		if (Math.abs(thisPos - emptyPos) == puzzle_row || (Math.abs(thisPos - emptyPos) == 1 && Math.max(thisPos, emptyPos) % puzzle_row)) {
			return true;
		}
		return false;
	}

	/*交换位置*/
	function exchangePosition(a, b) {
		var tmp = position[a];
		position[a] = position[b];
		position[b] = tmp;
	}

	/*同步位置*/
	function synchronizePosition() {
		for (var i = 0; i < piece_num; i++) {
			position[i] = getPosition(puzzle[i]);
		}
	}

	/*同步提示板内容*/
	function synchronizeStatus() {
		var restore_count = 0;
		for (var i = 0; i < piece_num - 1; i++) {
			if (position[i] == i) {
				restore_count++;
			}
		}
		status.innerHTML = "你已还原" + restore_count + "块拼图";
	}

	/*移动拼图*/
	function move(thisPiece) {
		var emptyPiece = document.getElementById("puzzle" + (piece_num - 1));
		emptyPiece.setAttribute("class", classWithoutIndex + thisPos);
		thisPiece.setAttribute("class", classWithoutIndex + emptyPos);
		synchronizePosition();
		synchronizeStatus();
		if (win()) {
			status.innerHTML = "你完成了本张拼图";
		}
	}

	/*判断游戏是否胜利*/
	function win() {
		for (var i = 0; i < piece_num; i++) {
			if (position[i] != i) {
				return false;
			}
		}
		return true;
	}

	/*打乱拼图*/
	function disorganizePuzzle() {
		for (var i = 0; i < piece_num; i++) {
			var index = Math.floor(Math.random() * piece_num);
			if (index != i) {
				exchangePosition(index, i);
			}
		}
		for (var i = 0; i < piece_num; i++) {
			puzzle[i].setAttribute("class", classWithoutIndex + position[i]);
		}
	}
	
	/*还原拼图*/
	function restorePuzzle() {
		for (var i = 0; i < piece_num - 1; i++) {
			puzzle[i].onclick = function() {
				if (moveAvailable(this)) {
					move(this);
				}
			}
		}
	}

	/*调整行列数*/
	function levelDown() {
		if (puzzle_row == 4) {
			puzzle_row = 3;
		} else if (puzzle_row == 5) {
			puzzle_row = 4;
		} else if (puzzle_row == 3) {
			puzzle_row = 5;
		}
	}

	function levelUp() {
		if (puzzle_row == 4) {
			puzzle_row = 5;
		} else if (puzzle_row == 5) {
			puzzle_row = 3;
		} else if (puzzle_row == 3) {
			puzzle_row = 4;
		}
	}

	/*同步按键的文字*/
	function synchronizeLevelButton() {
		if (puzzle_row == 3) {
			level_down.innerHTML = "5×5拼图";
			level_up.innerHTML = "4×4拼图";
		}
		if (puzzle_row == 4) {
			level_down.innerHTML = "3×3拼图";
			level_up.innerHTML = "5×5拼图";
		}
		if (puzzle_row == 5) {
			level_down.innerHTML = "4×4拼图";
			level_up.innerHTML = "3×3拼图";
		}
	}

	/*调整难度*/
	function liftDifficulty(up) {
		status.innerHTML = "游戏还未开始";
		if (up) {
			levelUp();
		} else {
			levelDown();
		}
		level_down.innerHTML = puzzle_row + "×" + puzzle_row + "拼图";
		document.getElementsByTagName("link")[1].setAttribute("href", "style/Puzzle" + puzzle_row + "×" + puzzle_row + ".css");
		piece_num = Math.pow(puzzle_row, 2);
		synchronizeLevelButton();
	}

	/*点击开始游戏*/
	document.getElementById("restart").onclick = function() {
		disorganizePuzzle();
		status.innerHTML = "游戏开始";
		restorePuzzle();
	}

	/*点击切换拼图*/
	level_down.onclick = function() {
		destroyPuzzle();
		liftDifficulty(false);
		createPuzzle(piece_num);
		resetPosition();
	}

	level_up.onclick = function() {
		destroyPuzzle();
		liftDifficulty(true);
		createPuzzle(piece_num);
		resetPosition();
	}
}