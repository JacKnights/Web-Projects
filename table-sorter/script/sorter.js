var array;/*辅助排序的数组*/
var parent_table;/*记录是哪个表格正在被排序*/
var index;/*按此下标将表格内容排序*/
var ascend;/*用于判断排序是否为升序*/
var row, column;/*表格的行列数*/

/*给表头增加排序箭头*/
function appendArrow() {
	var arrow = $("<img>");
	$(this).append(arrow);
}

$(window).load(function() {
	$("table").each(function() {
		for (var i = 0; i < $(this).find("tbody").find("tr").length; i++) {
			if (i % 2 == 1) {
				$(this).find("tbody").find("tr").eq(i).addClass("even-row");
			}
		}
		$(this).find("th").each(appendArrow);
		$(this).find("th").bind("click", mapOnArray);
	});

	$("#create").bind("click", createNewTable);
});

var newTable = $("<table></table>");
var inputRow = $("<input>");
var btnRow = $("<button>Row</button>");
var inputCol = $("<input>");
var btnCol = $("<button>Column</button>");
var btnModify = $("<button>Confirm modification</button>");

/*创建新表格*/
function createNewTable() {
	newTable.attr("id", $("#input-title").val());
	var newHeader = $("<h2>" + $("#input-title").val() + "</h2>");
	$("#input-title").val("");
	$("body").append(newHeader);
	$("body").append(newTable);
	$("body").append(inputCol);
	$("body").append(btnCol);
	newTable.append($("<thead></thead>"));
	newTable.find("thead").append($("<tr></tr>"));
	newTable.append($("<tbody></tbody>"));
	btnCol.click(createNewTH);
	btnRow.click(createNewTD);
	btnModify.click(modifyNewTable);
}

/*创建新表格的表头*/

function createNewTH() {
	column = parseInt(inputCol.val());
	inputCol.val("");
	for (var i = 0; i < column; i++) {
		var newTh = $("<th><input value='new'></th>");
		newTable.find("thead").find("tr").append(newTh);
	}
	inputCol.remove();
	btnCol.remove();
	$("body").append(inputRow);
	$("body").append(btnRow);
}

/*创建新表格的内容*/

function createNewTD() {
	row = parseInt(inputRow.val());
	inputRow.val("");
	for (var i = 0; i < row; i++) {
		var newTr = $("<tr></tr>");
		newTable.find("tbody").append(newTr);
		for (var j = 0; j < column; j++) {
			var newTd = $("<td><input value='new'></td>");
			newTable.find("tbody").find("tr").eq(i).append(newTd);
		}
	}
	inputRow.remove();
	btnRow.remove();
	$("body").append(btnModify);
	$("body").append($("<span>(Need confirm to sort)</span>"));
	newTable.find("th").each(appendArrow);
	newTable.find("th").bind("click", mapOnArray);
}

/*点击保存更改*/

function modifyNewTable() {
	newTable.find("tbody").find("td").each(function() {
		$(this).find("input").attr("value", $(this).find("input").val());
	});
}

function evenRowBackground() {
	$("table").each(function() {
		$(this).find("tbody").find("tr").each(function() {alert($(this).find("tbody").find("tr").index($(this)));
			if ($(this).find("tbody").find("tr").index($(this)) % 2 == 0) {
				$(this).addClass("even-row");
			}
		});
		//$(this).find("th").bind("click", mapOnArray);
	});
}

/*将jquery对象逐个映射到用于排序的数组*/

function mapOnArray() {
	array = new Array();
	var that = $(this).parent().parent().parent().find("tbody").find("tr");
	row = that.length;
	column = that.find("td").length;
	for (var i = 0; i < row; i++) {
		array[i] = new Array();
		for (var j = 0; j < column; j++) {
			array[i][j] = that.eq(i).find("td").eq(j).html();
		}
	}
	$(this).each(showArrow);
	sortTable(array);
}

/*新增jquery方法*/

jQuery.prototype.findParentTable = function() {
	var tables = $("body").find("table");
	for (var i = 0; i < tables.length; i++) {
		if (tables.eq(i).index($(this).parent().parent().parent()) != -1) {
			parent_table = tables.eq(i);
			break;
		}
	}
}

jQuery.prototype.setBackgroundColor = function() {
	$(this).siblings().each(function() {
		$(this).removeClass("clicked-th");
	});
	$(this).addClass("clicked-th");
};

jQuery.prototype.ascendOrDescend = function() {
	if ($(this).find("img").attr("src") == "image/ascend.png") {
		$(this).find("img").attr("src", "image/descend.png");
		ascend = false;
	} else {
		$(this).find("img").attr("src", "image/ascend.png");
		ascend = true;
	}
};

/*显示更改排序方式后的箭头*/

function showArrow() {
	$(this).findParentTable();
	index = parent_table.find("th").index($(this));
	$(this).setBackgroundColor();
	$(this).addClass("clicked-th");
	$(this).ascendOrDescend();
}

/*排序*/

function sortTable(array) {
	if (ascend) {
		ascendSorting(array, index);
	} else {
		descendSorting(array, index);
	}
	sync();
}

function ascendSorting(array, index) {
	for (var i = 0; i < array.length; i++) {
		for (var j = i + 1; j < array.length; j++) {
			if (array[i][index] > array[j][index]) {
				var tmp = array[i];
				array[i] = array[j];
				array[j] = tmp;
			}
		}
	}
}

function descendSorting(array, index) {
	for (var i = 0; i < array.length; i++) {
		for (var j = i + 1; j < array.length; j++) {
			if (array[i][index] < array[j][index]) {
				var tmp = array[i];
				array[i] = array[j];
				array[j] = tmp;
			}
		}
	}
}

/*将jquery对象与排序后的数组同步内容*/

function sync() {
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < column; j++) {
			parent_table.find("tbody").find("tr").eq(i).find("td").eq(j).html(array[i][j]);
		}
	}
}