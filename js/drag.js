// JavaScript Document
var box = document.querySelector('.box');

box.onmousedown = function(ev){
	//获取鼠标相对于 box 的距离
	var disX = ev.clientX-box.offsetLeft;
	var disY = ev.clientY-box.offsetTop;

	document.onmousemove = function(ev){
		//计算 box 的 left、top
		var l = ev.clientX-disX;
		var t = ev.clientY-disY;
		//控制 box 的拖动范围
		if(l < 20){
			l = 0;
		}else if(l > document.documentElement.clientWidth-box.offsetWidth){
			l = document.documentElement.clientWidth-box.offsetWidth;
		}

		if(t < 20){
			t = 0;
		}else if(t > document.documentElement.clientHeight-box.offsetHeight){
			t = document.documentElement.clientHeight-box.offsetHeight;
		}

		box.style.left = l+'px';
		box.style.top = t+'px';
	};

	document.onmouseup = function(){
		//令鼠标 move、up 事件置空
		document.onmousemove = null;
		document.onmouseup = null;
	};

	ev.preventDefault();
};