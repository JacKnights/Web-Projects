window.onload = function() {

	var clear = false;

	var operators = "+-*/"

	//判断是否是运算符
	function isOperator(c) {
		for (var i = 0; i < operators.length; i++) {
			if (c == operators[i]) {
				return true;
			}
		}
		return false;
	}

	//用于判断表达式是否合法的函数
	function isValid(str) {
		for (var i = 0; i < str.length; i++) {
			if (isOperator(str[i]) && isOperator(str[i + 1])) {
				return false;
			}
			if (str[i] == '/' && str.substr(i + 1) == 0) {
				return false;
			}
		}
		return true;
	}

	var calc = '';

	//用于计算表达式的函数
	var calculate = document.getElementsByClassName('button');
	for (var i = 0; i < calculate.length; i++) {
		calculate[i].onclick = function() {
			var t = this.value;
			if (clear) {
				document.getElementById('input').value = '';
				clear = false;
			}
			if (parseInt(t, 10) == t || t === '.' || t === '(' || t === ')' || isOperator(t)) {
				document.getElementById('input').value += t;
			} else if (t === 'CE') {
					document.getElementById('input').value = '';
			} else if (t === '←') {
				document.getElementById('input').value = document.getElementById('input').value.slice(0, -1);
			} else if (t === '=') {
				try {
					if (!isValid(document.getElementById('input').value)) {
						throw syntaxError;
					}
					document.getElementById('input').value = eval(document.getElementById('input').value);
				} catch (syntaxError) {
					document.getElementById('input').value = 'ERROR';
				}
				clear = true;
			}
		}
	}
}