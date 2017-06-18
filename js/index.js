$(function(){
			var container = $(".wrap");//最外层容器
			var img_list = $(".div-img");//照片集合盒子 后面就是通过设置left值来移动图片
			var buttons = $("#dian li");//圆点集合
			var lr = $('.btn');
			var next = $(".right");//下一张
			var prev = $(".left");//上一张
			var P_wid = $(".wrap").width();//图片的宽度,也就是屏幕的宽度
			var len = $('.div-img img').length-2;//图片的数量
			var timer;						//定时器
			var interval = 3000;			//定时
			var index = 1;
			var left;
			//移动函数，传入要移动的偏移量
			function animate(offset){
				left = parseInt(img_list.css('left'))+offset;
				// console.log('offset  '+offset);
				// console.log('left  '+left);
				if (offset>0) {
					offset = '+=' +offset;
				}else if(offset<=0){
					offset = '-=' + Math.abs(offset);
				}
				img_list.animate({'left':offset},500,function(){
					if (left>-1700) {
						img_list.css('left',-len*P_wid);
					}
					if (left<(-len*P_wid)) {
						img_list.css('left',-P_wid);
					}
				});
			}
			//为当前index botton添加active类
			function showButton(){
				buttons.eq(index-1).addClass('active').siblings().removeClass('active');
			}
			//定时运行next
			function play(){
				timer = setInterval(function(){
					next.trigger('click');
				},interval);
			}
			//清除定时
			function stop(){
				clearInterval(timer);
			}
			//为按钮绑定事件
			next.on('click',function(){
				if (img_list.is(':animated')) {
					return;
				}
				if (index==len) {
					index=1;
				}else{
					index++;
				}
				animate(-P_wid);
				showButton();
			});
			prev.on('click',function(){
				if (img_list.is(':animated')) {
					return;
				}
				if (index==1) {
					index=5;
				}else{
					index--;
				}
				animate(P_wid);
				showButton();
			});
			buttons.each(function(){
				$(this).on('click',function(){
					if (img_list.is(':animated')||$(this).attr('class')=='active') {
						return;
					}
					var myIndex = parseInt($(this).attr('index'));
					var offset = -1920*(myIndex-index);

					animate(offset);
					index = myIndex;
					showButton();
				});
			});
			buttons.hover(stop,play);
			lr.hover(stop,play);
			play();
});