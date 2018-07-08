// JavaScript Document
;(function(){
	//父类
	function Parent(){
		this.book = {};
	};

	Parent.prototype = {
		constructor: Parent,
		//绑定事件
		on: function(custom, fn){
			if(!this.book.hasOwnProperty(custom)){
				//this.book 没有 custom 属性
				this.book[custom] = [];
			}

			this.book[custom].push(fn);
		},
		//触发
		trigger: function(custom){
			var arr1 = this.book[custom];
			var arr2 = Array.prototype.slice.call(arguments, 1);

			if(arr1){
				//this.book 存在 custom 属性
				for(var i = 0; i < arr1.length; i++){
					arr1[i].apply(null, arr2);
				};
			}
		},
		//解绑事件
		off: function(custom, fn){
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
		}
	};

	//子类
	function Drag(id){
		Parent.call(this);
		this.dragEl = document.querySelector(id);
		this.init();
	};

	Drag.prototype = Object.create(Parent.prototype);

	var obj = {
		constructor: Drag,
		//初始化
		init: function(){
			this.dragEl.addEventListener('mousedown', this.downFn.bind(this));
		},
		//鼠标按下
		downFn: function(e){
			this.disX = e.clientX-this.dragEl.offsetLeft;
			this.disY = e.clientY-this.dragEl.offsetTop;
			this.moveFn2 = this.moveFn.bind(this);
			this.upFn2 = this.upFn.bind(this);
			this.trigger('down');

			document.addEventListener('mousemove', this.moveFn2);
			document.addEventListener('mouseup', this.upFn2);
			e.preventDefault();
		},
		//鼠标移动
		moveFn: function(e){
			this.trigger('move');
			this.dragEl.style.left = e.clientX-this.disX+'px';
			this.dragEl.style.top = e.clientY-this.disY+'px';
		},
		//鼠标抬起
		upFn: function(){
			this.trigger('up');
			document.removeEventListener('mousemove', this.moveFn2);
			document.removeEventListener('mouseup', this.upFn2);
		}
	};

	//把 obj 的属性扩展到 Drag.prototype
	for(var attr in obj){
		if(obj.hasOwnProperty(attr)){
			//obj 有自己的属性 attr
			Drag.prototype[attr] = obj[attr];
		}
	};

	var box1 = new Drag('#drag');

	//鼠标按下时
	box1.on('down', function(){
		console.log(111);
	});

	//鼠标拖动时
	box1.on('move', function(){
		console.log(222);
	});

	//鼠标抬起时
	function up3(){
		console.log(333);
	};

	box1.on('up', up3);

	box1.on('up', function(){
		console.log(444);
	});

	var btn = document.querySelector('button');
	//解绑抬起事件3
	btn.onclick = function(){
		box1.off('up', up3);
	};
})();