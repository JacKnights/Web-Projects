var timer;	/*计时器*/
var time;	/*时间*/
var step_count = 0;	/*记录步数*/
var puzzle_row = 4;
var piece_num = Math.pow(puzzle_row, 2) - 1;
var position = [];	/*用于保存每张拼图当前位置*/
var emptyPos;	/*用于保存空的块的位置*/
classWithoutIndex = "puzzle this-puzzle position";

$(window).load(function() {
	$("#restart").bind("click", restart);
	$("#restore").bind("click", restore);
	$("#level-down").bind("click", levelDown);
	$("#level-up").bind("click", levelUp);
	createPuzzle(piece_num);
	resetPosition();
});

	/*生成拼图*/
function createPuzzle(num) {
	for (var i = 0; i < num; i++) {
		var newPiece = $("<div></div>");
		newPiece.attr("class", classWithoutIndex + i);
		newPiece.attr("id", "puzzle" + i);
		$("#puzzle-container").append(newPiece);
	}
}

	/*删除拼图块*/
function destroyPuzzle() {
	for (var i = piece_num - 1; i >= 0; i--) {
		$("#puzzle" + i).remove();
	}
}

	/*重设位置*/
function resetPosition() {
	for (var i = 0; i <= piece_num; i++) {
		position[i] = i;
	}
}

	/*获取位置*/
function getPosition(obj) {
	return obj.attr("class").substr(27);
}

	/*判断拼图是否可移动*/
function moveAvailable(thisPiece) {
	var thisPos = getPosition(thisPiece);
	emptyPos = position[piece_num];
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
		position[i] = getPosition($("#puzzle" + i));
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
	$("#status").html("你已走了" + step_count + "步，还原了" + restore_count + "块拼图");
}

	/*移动拼图*/
function move(thisPiece) {
	var tmp = getPosition(thisPiece);
	thisPiece.attr("class", classWithoutIndex + emptyPos);
	position[piece_num] = tmp;
	step_count++;
	synchronizePosition();
	synchronizeStatus();
	if (win()) {
		winToStop();
	}
}

function winToStop() {
	$("#status").html("你完成本张拼图" + "用了" + step_count + "步，" + time + "秒");
	clearInterval(timer);
	canNotClickOnPuzzle();
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
		$("#puzzle" + i).attr("class", classWithoutIndex + position[i]);
	}
}
	
	/*操作拼图*/
function canClickOnPuzzle() {
	for (var i = 0; i < piece_num; i++) {
		$("#puzzle" + i).bind("click", start);
	}
}

function canNotClickOnPuzzle() {
	for (var i = 0; i < piece_num; i++) {
		$("#puzzle" + i).unbind("click", start);
	}
}

	/*调整行列数*/
function puzzleRowDown() {
	if (puzzle_row == 4) {
		puzzle_row = 3;
	} else if (puzzle_row == 5) {
		puzzle_row = 4;
	} else if (puzzle_row == 3) {
		puzzle_row = 5;
	}
}

function puzzleRowUp() {
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
		$("#level-down").html("5×5拼图");
		$("#level-up").html("4×4拼图");
	}
	if (puzzle_row == 4) {
		$("#level-down").html("3×3拼图");
		$("#level-up").html("5×5拼图");
	}
	if (puzzle_row == 5) {
		$("#level-down").html("4×4拼图");
		$("#level-up").html("3×3拼图");
	}
}

	/*调整难度*/
function liftDifficulty(up) {
	$("#status").html("游戏还未开始");
	if (up) {
		puzzleRowUp();
	} else {
		puzzleRowDown();
	}
	$("link").get(1).setAttribute("href", "style/Puzzle" + puzzle_row + "×" + puzzle_row + ".css");
	piece_num = Math.pow(puzzle_row, 2) - 1;
	synchronizeLevelButton();
}

function restorePuzzle() {
	resetPosition();
	for (var i = 0; i < piece_num; i++) {
		$("#puzzle" + i).attr("class", classWithoutIndex + i);
	}
}

	/*计时*/
function timeRun() {
	$("#time").html("已用时：" + ++time + "秒");
}

	/*重置步数及时间*/
function resetStepAndTime() {
	clearInterval(timer);
	$("#time").html("已用时：0秒");
	time = 0;
	step_count = 0;
}

	/*点击开始游戏*/
function restart() {
	disorganizePuzzle();
	$("#status").html("游戏开始");
	resetStepAndTime();
	canClickOnPuzzle();
	timer = setInterval(timeRun, 1000);
}

function start() {
	if (moveAvailable($(this))) {
		move($(this));
	}
}

	/*点击恢复原状*/
function restore() {
	restorePuzzle();
	$("#status").html("已恢复原拼图");
	resetStepAndTime();
	canNotClickOnPuzzle();
}

	/*点击切换拼图*/
function levelDown() {
	destroyPuzzle();
	liftDifficulty(false);
	createPuzzle(piece_num);
	resetPosition();
	resetStepAndTime();
}

function levelUp() {
	destroyPuzzle();
	liftDifficulty(true);
	createPuzzle(piece_num);
	resetPosition();
	resetStepAndTime();
}