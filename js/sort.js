			// var arr = [];
			// arr.push(14);
			// arr.push(21);
			// arr.push(5);
			// arr.push(67);
			// arr.push(100);
			// arr.push(63);
			// arr.push(1);
			// arr.push(8);
			// arr.push(45);
			// arr.push(43);
			// arr.push(32);
			// arr.push(29);
			// arr.push(12);
			// arr.push(3);
			// arr.push(66);
			// arr.push(41);
			// arr.push(5);
			// arr.push(1);
			// arr.push(67);
			// arr.push(99);
			// console.log(arr.join(","))
			// quickSort(arr, 0, arr.length-1);
			// console.log(arr.join(","))
			// function quickSort(arr, start, end) {
			// 	if(start >= end) 
			// 		return false;
					
			// 	var i = start,
			// 		j = end;
					
			// 	var temp = arr[i];
			// 	while(i < j) {
			// 		while(i < j && arr[j] > temp) j = j - 1;
			// 		if(i < j)
			// 			arr[i++] = arr[j];
						
			// 		while(i < j && arr[i] < temp) i = i + 1;
			// 		if(i < j)
			// 			arr[j--] = arr[i];
					
			// 	}
				
			// 	arr[i] = temp;
			// 	console.log('exec quickSort   start:'+start+ ' middle:'+ i +' end:'+end);
			// 	quickSort(arr, start, i-1);
			// 	quickSort(arr, i+1, end);
			// }



var frame = {};
var divFrame = {};
$(function() {
	/*排序的div*/
	divFrame._width = "8";
	divFrame.width = "5px";
	
	/*面板*/
	frame.obj = $("#right");
	frame.width = $("#right").width();
	frame.height = $("#right").height();
	frame.divNumber = parseInt(frame.width / divFrame._width);
});
 
 
 
 
var content={};
function startInitDiv() {
	$("#buttonDiv").hide();
	var divArr = [];
	var spanArr = [];
	var num = frame.divNumber;
	initDiv(0,num,divArr,spanArr);
}

function getRandomHeight(Max,Min){
    var Range = Max - Min;
    var Rand = Math.random();
    return Min + Math.round(Rand * Range);
}

/*初始化div条条*/
function initDiv(i, num, divArr,spanArr) {
	if(i >= num) {
		$("#buttonDiv2").show();
		content.divs=divArr;
		content.spans=spanArr;
		content.length = divArr.length;
		return null;
	}
		
	var div = document.createElement("div");
	$(div).attr("class","newDiv");
	$(div).attr("id","div"+i);
	$(div).css("width",divFrame.width);
	$(div).css("height",getRandomHeight(frame.height, 1) + "px");
	$(div).css("left", i * divFrame._width + "px");
	frame.obj.append(div);
	divArr.push(div);
 
	setTimeout(function(){
		initDiv(i+1, num, divArr,spanArr);
	}, 1);
}
 
function startQuickSort() {
	quickSort(content, 0, content.length-1);
}
function quickSort(cont, start, end) {
	if(start >= end)  {
		$("#start").html("完成");
		return false;
	}
	var i = start,
		j = end;
		
	var divs = cont.divs,
		spans = cont.spans;
	var temp = divs[i];
	$(temp).css("opacity","0.5");
	$(temp).css("filter","Alpha(opacity=50)");
	$(temp).css("background-color","green");
	divs[i] = $(divs[i]).position().left+"px";
	
	A(cont, i, j, temp, start, end);
}
function rightToLeft(cont, i, j, temp, start, end) {
	/*结束*/
	var divs = cont.divs;
	if(i < j && $(divs[j]).height() > $(temp).height()) {
		setTimeout(function(){
			j = j - 1;
			rightToLeft(cont, i, j, temp, start, end);
		}, 50);
	} else {
		if(i < j) {
			var l = $(divs[j]).position().left+"px";
			$(divs[j]).css("left", divs[i]);
			divs[i] = divs[j];
			divs[j] = l;
			i = i + 1;
		}
		leftToRight(cont, i, j, temp, start, end);
	}
}
 
/*注意这里 需要整明白循环过程*/
function leftToRight(cont, i, j, temp, start, end) {
	/*结束*/
	var divs = cont.divs;
	if(i < j && $(divs[i]).height() < $(temp).height()) {
		setTimeout(function(){
			i = i + 1;
			leftToRight(cont, i, j, temp, start, end);
		}, 50);
	} else {
		if(i < j) {
			var r = $(divs[i]).position().left+"px";
			$(divs[i]).css("left", divs[j]);
			divs[j] = divs[i];
			divs[i] = r;
			j = j - 1;
		}
		A(cont, i, j, temp, start, end);
	}
}
function A (cont, i, j, temp, start, end) {
	var divs = cont.divs;
	if(i < j) {
		setTimeout(function() {
			rightToLeft(cont, i, j, temp, start, end);
		}, 50);
	} else {
		/*本段循环结束*/
		$(temp).css("opacity","1");
		$(temp).css("filter","Alpha(opacity=100)");
		$(temp).css("left", divs[i]);
		divs[i] = temp;
		$(temp).css("background-color","gainsboro");

		quickSort(cont, start, i-1);
		quickSort(cont, i+1, end);
	}
}
