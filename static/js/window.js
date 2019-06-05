$(document).ready(function() {
	clientHeight = document.documentElement.clientHeight;
	closeWindowHtml = '<object data="/static/images/close1.svg" type="image/svg+xml" class="windowCloseIcon"></object>\
					   <a href="javascript:void(0)" class="windowCloseButton"></a>';

	$(document).on("click",'.openContent',function openWindow(){

		getClientSize();
		var setWindowHeightRatio = 0.70;
		var setWindowWidthRatio = 0.60;
		if (nowMatter == 'matter0'){
			setWindowHeightRatio = 0.80;
		}
		else if (nowMatter == 'matter1'){
			setWindowHeightRatio = 0.70;
		}
		var maxWindowHeight = 800;
		var maxWindowWidth = 1300;
		var setWindowHeight = clientHeight*setWindowHeightRatio;
		if(clientHeight*setWindowHeightRatio > maxWindowHeight){
			setWindowHeight = 800;
		}
		var setWindowWidth = clientWidth*setWindowWidthRatio;
		if(clientWidth*setWindowWidthRatio > maxWindowWidth){
			setWindowWidth = 1300;
		}
		if(clientWidth <= 768){
			setWindowWidth = clientWidth*0.86;
		}

		var obj = $(this);
		var id = obj.attr('id');
		windowObj = $('#window');
		matterObj = $('.'+nowMatter);
		idNum = id.match(/\d+/)[0];
		objName = id.split(/\d/)[0];
		aCopyObj = $('#'+objName+'Copyone'+idNum);

		var scale_X = 1.08;
		var scale_Y = 1.15;
		if(isMobileScreen() == true){
			scale_X = 1;
			scale_Y = 1;
		}
		var width = obj.width();
		var height = obj.height();
		var marginLeft = obj.outerWidth(true) - obj.outerWidth();
		var marginTop = obj.outerHeight(true) - obj.outerHeight();
		var paddingLeft = (obj.outerWidth()-width)/2;
		var paddingTop = (obj.outerHeight()-height)/2;
		var windowMarginTop = marginTop;
		var windowMarginLeft = marginLeft;
		var windowPaddingTop = windowObj.outerHeight()/2;
		var windowPaddingLeft = windowObj.outerWidth()/2;
		var windowHeight = setWindowHeight;
		var windowWidth = setWindowWidth;
		var setPripertyDict = {
			'width':windowWidth+'px',
			'height':windowHeight+'px',
			// 'marginTop':marginTop+'px',
			'marginLeft':marginLeft+'px',
			'contentHeight':windowHeight-33+'px'
		};
		var middle_width = $('#middle').width();

	 	setProperty("window",setPripertyDict);
		if (windowObj.outerWidth(true) - windowObj.outerWidth() != 0){
			var windowPaddingLeft = (windowObj.outerWidth()-windowWidth)/2;
			var windowPaddingTop = (windowObj.outerHeight()-windowHeight)/2;
			var windowMarginLeft = windowObj.outerWidth(true) - windowObj.outerWidth();
			var windowMarginTop = windowObj.outerHeight(true) - windowObj.outerHeight();
		}
		var windowTop = (clientHeight-windowHeight-windowPaddingTop*2)/2-windowMarginTop;
		var windowLeft =(clientWidth-windowWidth-windowPaddingLeft*2)/2-windowMarginLeft;
		var left = getDivPosition(id)[0];
		var top = getDivPosition(id)[1];
		var scaleX = (windowWidth+windowPaddingLeft*2)/((width+paddingLeft*2));
		var scaleY = (windowHeight+windowPaddingTop*2)/((height+paddingTop*2));
		var parameterY = (height+paddingTop*2)*(scale_Y-1)/2;
		var parameterX = 10.5;
		var translateY = -((clientHeight-height)/2-marginTop-(top+parameterY));
		var translateX = -((clientWidth-width)/2-marginLeft-(left+parameterX));
		if (clientWidth <= 768) {
			translateX = 0;
		}
		
		var setPripertyDict = {
			'top':windowTop+'px',
			'left':windowLeft+'px',
			'scaleX':1/scaleX,
			'scaleY':1/scaleY,
			'translateX':translateX+'px',
			'translateY':translateY+'px'
		};
	 	setProperty("window",setPripertyDict);
	 	
	 	reply = 'false';
		$('html').css('overflow','hidden');
		obj.css('display','none');

		$('#windowBackground').css({'display':'block','width':clientWidth+100,'height':clientHeight+1000});
		$('#middle').css({'width':middle_width});
		aCopyObj.css('display','block');
		aCopyObj.html(obj.html());
		windowObj.css('display','block');
		windowObj.html(
			'<div id="windowContent">\
				<div id="mainContent"><div id="ajax_window_html"></div></div>'+
				closeWindowHtml+
			'</div>');
		getMattersContent($(this).attr('href'));
	 	setTimeout(function(){windowObj.toggleClass('openWindow');$('#windowBackground').toggleClass('windowOpacity');},8);//不设置延时会有bug,延时>=8mm(可能与浏览器性能有关)
	 	setTimeout(function(){$('#windowContent').fadeIn(140);},20);

	});

	//弹出输入法时上移
 	$(window).resize(function() {
 		var windowObj = document.getElementById('window');
 		var windowMarginTop = 13;
 		var windowHeight = windowObj.clientHeight;
 		var bottomHeight = (clientHeight - windowHeight) / 2 - 1;

 		if (windowObj.style.display == 'block') {
 			var nowClientHeight = document.documentElement.clientHeight;
 			if(typeof(windowTop_) == "undefined"){
 				windowTop_ = windowObj.offsetTop - windowMarginTop;
 			}
 			if (clientHeight - nowClientHeight >= bottomHeight) {
 				windowObj.style.setProperty('--top', windowTop_ - (clientHeight - nowClientHeight) + bottomHeight + 'px');
 			}
 			else{
 				windowObj.style.setProperty('--top', windowTop_ - (clientHeight - nowClientHeight) + windowMarginTop + 'px');
 			}
 		}
 	});

	// matter0，1关闭窗口效果
	$(document).on('click','.windowCloseButton',function closeWindow(){
		var obj = $(this);
		var aObj = $('#'+objName+idNum);
		var windowBackground = $('#windowBackground');
		var urlHref = window.location.href;
		let urlSearch = urlHref.split('?')[1];

		
		$('#windowContent').fadeOut(100);
		windowObj.toggleClass('openWindow');
		windowBackground.toggleClass('windowOpacity');
		setTimeout(function(){windowBackground.css('display','none')},280);
		aCopyObj.css('display','none');
		aObj.css('display','block');
		// document.getElementById('fill_window').style.setProperty('--padding-top','0');//解决手机版bug
		setTimeout(function(){	
			windowObj.css('display','none').empty();
			if (urlSearch != '' && urlSearch != undefined) {
				window.location.href = urlHref.split('?')[0];
			}
		},280);
		$('body').css({'overflow-y':'scroll','overflow-x':'hidden'});
		$('html').css('overflow','');
		reply = 'false';
	});
	
	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId);
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key]);
		}
	}
});

document.onkeydown = function (event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) {
        $(".window-bubbly-button").click();
    }
};