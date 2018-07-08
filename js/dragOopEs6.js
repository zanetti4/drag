// JavaScript Document
;(function(){
	//父类
	class Parent {
		constructor(){
			this.book = {};
		};

		//绑定事件
		on(custom, fn){
			if(!this.book.hasOwnProperty(custom)){
				//this.book 没有自己的属性 custom
				this.book[custom] = [];
			}

			this.book[custom].push(fn);
		};

		//触发
		trigger(custom){
			var arr1 = this.book[custom];
			var arr2 = Array.prototype.slice.call(arguments, 1);

			if(arr1){
				//this.book 存在 custom 属性
				for(var i = 0; i < arr1.length; i++){
					arr1[i].apply(null, arr2);
				};
			}
		};

		//解绑事件
		off(custom, fn){
			var arr1 = this.book[custom];

			if(arr1){
				//this.book 存在 custom 属性
				for(var i = 0; i < arr1.length; i++){
					if(arr1[i] === fn){
						//是要解绑的函数
						arr1.splice(i, 1);
						break;
					}
				};
			}
		};
	};

	//子类
	class Drag extends Parent {
		constructor(id){
			super();
			this.dragEl = document.querySelector(id);
			this.init();
		};

		//初始化
		init(){
			this.dragEl.addEventListener('mousedown', this.downFn.bind(this));
		};

		//鼠标按下
		downFn(e){
			this.disX = e.clientX-this.dragEl.offsetLeft;
			this.disY = e.clientY-this.dragEl.offsetTop;
			this.moveFn2 = this.moveFn.bind(this);
			this.upFn2 = this.upFn.bind(this);
			this.trigger('down');

			document.addEventListener('mousemove', this.moveFn2);
			document.addEventListener('mouseup', this.upFn2);
			e.preventDefault();
		};

		//鼠标移动
		moveFn(e){
			this.trigger('move');
			this.dragEl.style.left = e.clientX-this.disX+'px';
			this.dragEl.style.top = e.clientY-this.disY+'px';
		};

		//鼠标抬起
		upFn(){
			this.trigger('up');
			document.removeEventListener('mousemove', this.moveFn2);
			document.removeEventListener('mouseup', this.upFn2);
		};
	};

	var box = new Drag('#drag');

	//鼠标按下时
	box.on('down', function(){
		console.log(11111);
	});

	//鼠标移动时
	box.on('move', function(){
		console.log(22222);
	});

	//鼠标抬起时
	function up3(){
		console.log(33333);
	};

	box.on('up', up3);

	box.on('up', function(){
		console.log(44444);
	});

	var btn = document.querySelector('button');

	//解绑抬起事件3
	btn.onclick = function(){
		box.off('up', up3);
	};
})();