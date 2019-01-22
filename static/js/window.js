$(document).ready(function() {

	setWindowHeight = 0.70
	setWindowWidth = 0.60
	closeWindowHtml = '<a href="javascript:void(0)" class="windowCloseButton"></a>'

	$(document).on("click",'.content',function openWindow(){

		hash = window.location.hash.split('?')[0]
		if (hash == '#codeDiary'){
			setWindowHeight = 0.80
		}
		else if (hash == '#diary'){
			setWindowHeight = 0.50
		}

		getClientSize()
		var obj = $(this)
		var id = obj.attr('id')
		windowObj = $('#window')
		matterObj = $(hash)
		idNum = id.match(/\d+/)[0]
		objName = id.split(/\d/)[0]
		aCopyObj = $('#'+objName+'Copyone'+idNum)
		var scale_X = 1.08
		var scale_Y = 1.15
		var width = obj.width()
		var height = obj.height()
		var marginLeft = obj.outerWidth(true) - obj.outerWidth()
		var marginTop = obj.outerHeight(true) - obj.outerHeight()
		var paddingLeft = (obj.outerWidth()-width)/2
		var paddingTop = (obj.outerHeight()-height)/2
		var windowMarginTop = marginTop
		var windowMarginLeft = marginLeft
		var windowPaddingTop = windowObj.outerHeight()/2
		var windowPaddingLeft = windowObj.outerWidth()/2
		var windowHeight = clientHeight*setWindowHeight
		var windowWidth = clientWidth*setWindowWidth
		var setPripertyDict = {
			'width':windowWidth+'px',
			'height':windowHeight+'px',
			'marginTop':marginTop+'px',
			'marginLeft':marginLeft+'px',
			'contentHeight':windowHeight-33+'px'
		}
	 	setProperty("window",setPripertyDict)
		if (windowObj.outerWidth(true) - windowObj.outerWidth() != 0){
			var windowPaddingLeft = (windowObj.outerWidth()-windowWidth)/2
			var windowPaddingTop = (windowObj.outerHeight()-windowHeight)/2
			var windowMarginLeft = windowObj.outerWidth(true) - windowObj.outerWidth()
			var windowMarginTop = windowObj.outerHeight(true) - windowObj.outerHeight()
		}
		var windowTop = (clientHeight-windowHeight-windowPaddingTop*2)/2-windowMarginTop
		var windowLeft =(clientWidth-windowWidth-windowPaddingLeft*2)/2-windowMarginLeft
		var left = getDivPosition(id)[0]
		var top = getDivPosition(id)[1]
		var scaleX = (windowWidth+windowPaddingLeft*2)/((width+paddingLeft*2))
		var scaleY = (windowHeight+windowPaddingTop*2)/((height+paddingTop*2))
		var parameterY = (height+paddingTop*2)*(scale_Y-1)/2
		var parameterX = 10.5
		var translateY = -((clientHeight-height)/2-marginTop-(top+parameterY))
		var translateX = -((clientWidth-width)/2-marginLeft-(left+parameterX))
		
		var setPripertyDict = {
			'top':windowTop+'px',
			'left':windowLeft+'px',
			'scaleX':1/scaleX,
			'scaleY':1/scaleY,
			'translateX':translateX+'px',
			'translateY':translateY+'px'
		}
	 	setProperty("window",setPripertyDict)
	 	
	 	reply = 'false'
		$('html').css('overflow','hidden')
		obj.css('display','none')
		$('#windowBackground').css({'display':'block','width':clientWidth+28,'height':clientHeight+10})
		aCopyObj.css('display','block')
		aCopyObj.html(obj.html())
		windowObj.css('display','block')
		windowObj.html(
			'<div id="windowContent">\
				<div id="mainContent"><div id="ajax_window_html"></div></div>'+
				closeWindowHtml+
			'</div>')
		getMattersContent($(this).attr('href'))
	 	setTimeout(function(){windowObj.toggleClass('openWindow');$('#windowBackground').toggleClass('windowOpacity');},8)//不设置延时会有bug,延时>=8mm(可能与浏览器性能有关)
	 	setTimeout(function(){$('#windowContent').fadeIn(140);},20)
	 	
	});

	// matter0，1关闭窗口效果
	$(document).on('click','.windowCloseButton',function closeWindow(){
		var obj = $(this)
		var aObj = $('#'+objName+idNum)
		var windowBackground = $('#windowBackground')

		$('#windowContent').fadeOut(100)
		windowObj.toggleClass('openWindow')
		windowBackground.toggleClass('windowOpacity')
		setTimeout(function(){windowBackground.css('display','none')},280)
		aCopyObj.css('display','none')
		aObj.css('display','block')
		document.getElementById('fill_window').style.setProperty('--padding-top','0')//解决手机版bug
		setTimeout(function(){windowObj.css('display','none').empty()},280)
		$('body').css({'overflow-y':'scroll','overflow-x':'auto'})
		$('html').css('overflow','')
		reply = 'false'
	});
	
	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId)
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key])
		}
	}
});