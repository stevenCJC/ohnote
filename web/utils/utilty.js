export default {
		calcRem:()=>{
			//基于1366屏幕计算每rem所占像素
			// 1366/10 = 136.6 px/rem   /1.366 = 100 px/rem
			_calc();
			//没有高度控制样式的高度默认以body的font-size为基础
			document.getElementsByTagName('body')[0].style.fontSize='12px'
			window.addEventListener('resize',_calc);
			function _calc(){
				let width=document.body.offsetWidth;
				let size=width/10/1.92;
				console.log(width,size);
				if(size<100) size = 100;
				document.getElementsByTagName('html')[0].style.fontSize=size+'px'
			}
		},
		lighten:(rgba)=>{

		},
	};

