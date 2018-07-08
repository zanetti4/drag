// JavaScript Document
$('.box').mousedown(function(ev){
	//储存拖拽元素
	var thisJq = $(this);
	var disX = ev.clientX-thisJq.position().left;
	var disY = ev.clientY-thisJq.position().top;

	$(document).mousemove(function(ev){
		var moveX = ev.clientX-disX;
		//限制最大 left
		var maxX = $('.parent').width()-thisJq.width();

		if(moveX < 0){
			moveX = 0;
		}else if(moveX > maxX){
			moveX = maxX;
		}

		var moveY = ev.clientY-disY;
		//限制最大 top
		var maxY = $('.parent').height()-thisJq.height();

		if(moveY < 0){
			moveY = 0;
		}else if(moveY > maxY){
			moveY = maxY;
		}

		thisJq.css({
			left: moveX,
			top: moveY
		});
	});

	$(document).mouseup(function(){
		$(document).off('mousemove mouseup');
	});

	ev.preventDefault();
});