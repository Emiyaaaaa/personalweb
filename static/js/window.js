$(document).ready(function() {
	setWindowHeight = 0.70
	setWindowWidth = 0.60
	$(document).on("click",'.content',function openWindow(){
		getClientSize()
		var obj = $(this)
		windowObj = $('#window')
		matterObj = $('#'+nowMatter)
		idNum = obj.attr('id').match(/\d+/)
		objName = obj.attr('id').split(/\d/)[0]
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
		if (windowObj.outerWidth(true) - windowObj.outerWidth() != 0){
			var windowPaddingLeft = (windowObj.outerWidth()-windowWidth)/2
			var windowPaddingTop = (windowObj.outerHeight()-windowHeight)/2
			var windowMarginLeft = windowObj.outerWidth(true) - windowObj.outerWidth()
			var windowMarginTop = windowObj.outerHeight(true) - windowObj.outerHeight()
		}
		var windowTop = (clientHeight-windowHeight-windowPaddingTop*2)/2-windowMarginTop
		var windowLeft =(clientWidth-windowWidth-windowPaddingLeft*2)/2-windowMarginLeft
		
		
		var id = obj.attr('id')
		var left = getDivPosition(id)[0]
		var top = getDivPosition(id)[1]
		var scaleX = (windowWidth+windowPaddingLeft*2)/((width+paddingLeft*2))
		var scaleY = (windowHeight+windowPaddingTop*2)/((height+paddingTop*2))
		var parameterY = (height+paddingTop*2)*(scale_Y-1)/2
		var parameterX = 10.5
		translateY = -((clientHeight-height)/2-marginTop-(top+parameterY))
		translateX = -((clientWidth-width)/2-marginLeft-(left+parameterX))
		console.log(parameterX,(width+paddingLeft*2),(width+paddingLeft*2)*(scale_X-1),left,width)
		closeWindowHtml = '<a href="javascript:void(0)" class="windowCloseButton"></a>'
		commentHtml =   '<div class="windowComment">\
							<input type="text" id="contact" placeholder="发表您的想法" />\
            				<button class="windowSendCommentButton" tpye = "submit" onclick="windowSendComment()">发送</button>\
						</div>'
		
		var setPripertyDict = {
			'top':windowTop+'px',
			'left':windowLeft+'px',
			'width':windowWidth+'px',
			'height':windowHeight+'px',
			'marginTop':marginTop+'px',
			'marginLeft':marginLeft+'px',
			'scaleX':1/scaleX,
			'scaleY':1/scaleY,
			'translateX':translateX+'px',
			'translateY':translateY+'px',
			'contentHeight':windowHeight-34+'px'
		}
	 	setProperty("window",setPripertyDict)
		$('html').css('overflow','hidden')
		obj.css('display','none')
		$('#windowBackground').css({'display':'block','width':clientWidth+28,'height':clientHeight+10})
		aCopyObj.css('display','block')
		aCopyObj.html(obj.html())
		windowObj.css('display','block')
		windowObj.html(
			'<div id="windowContent">\
				<div id="mainContent">\
					<div id="ajax_window_html">\
					</div>\
				</div>'+
				closeWindowHtml+
				// commentHtml+
			'</div>')
		getMattersContent($(this).attr('href'))
	 	setTimeout(function(){windowObj.toggleClass('openWindow');$('#windowBackground').toggleClass('windowOpacity');},8)//不设置延时会有bug,延时>=8mm(可能与浏览器性能有关)
	 	setTimeout(function(){$('#windowContent').delay(80).fadeIn(140);},100)
	});

	// matter0，1关闭窗口效果
	$(document).on('click','.windowCloseButton',function closeWindow(){
		var obj = $(this)
		var aObj = $('#'+objName+idNum)
		var windowBackground = $('#windowBackground')

		$('#windowContent').css('display','none');
		windowObj.toggleClass('openWindow')
		windowObj.fadeOut(280)
		windowBackground.toggleClass('windowOpacity')
		setTimeout(function(){windowBackground.css('display','none')},280)
		aCopyObj.css('display','none')
		aObj.css('display','block')
		setTimeout(function(){windowObj.css('display','none').empty()},280)
		$('html').css({'overflow-y':'scroll','overflow-x':'hidden'})
		
	});
	
	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId)
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key])
		}
	}
});