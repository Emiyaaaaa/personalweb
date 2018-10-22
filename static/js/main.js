$(document).ready(function() {

	// 透明度变化
	function divFadeIn(urlHush) {
		var num = $(urlHush).parent().attr('id').split('-')[1]
		var liNum = $('#matter'+num+' ul li').length;
		for (var i = 0; i < liNum; i++) {
			$('#matter'+num+' ul li:eq(' + i +')').delay(140*i).fadeIn();
			if (i > 10){
				$('#matter'+num+' ul li:eq(' + i +')').fadeIn();
			}
		}
	}
	window.divFadeIn = divFadeIn

    function getDivPosition(id){
		var left = document.getElementById(id).getBoundingClientRect().left
		var top = document.getElementById(id).getBoundingClientRect().top
		return [left,top]
	}

	function getClientSize(){
		clientWidth = document.documentElement.clientWidth
		clientHeight = document.documentElement.clientHeight
	}
	

	// matter1打开窗口效果
	$(document).on("click",'.content',function openWindow(){
		getClientSize()
		var obj = $(this)
		var windowObj = $('#window')
		var idNum = obj.attr('id').match(/\d+/)
		var aCopyObj = $('#diaryCopyone'+idNum)
		var scaleX = 1.085
		var scaleY = 1.195
		var width = obj.width()
		var height = obj.height()
		var windowHeight = clientHeight/2
		var windowWidth = clientWidth*4/6
		var windowTop = clientHeight/7
		var windowLeft = clientWidth/6
		var marginLeft = obj.outerWidth(true) - obj.outerWidth()
		var marginTop = obj.outerHeight(true) - obj.outerHeight()
		var id = obj.attr('id')
		var left = getDivPosition(id)[0]
		var top = getDivPosition(id)[1]
		var top = top - (marginTop - (height * scaleY - height)/2)
		var left = left - (marginLeft - (width * scaleX - width)/2)
		
		var setPripertyDict = {
			'top':top,
			'left':left,
			'width':width,
			'height':height,
			'marginTop':marginTop,
			'marginLeft':marginLeft,
			'changeLeft':windowLeft,
			'changeTop':windowTop,
			'changeWidth':windowWidth-(obj.outerWidth(true)-width),
			'changeHeight':windowHeight
		}
	 	setProperty("window",setPripertyDict)

		$('#matter1').removeClass('backgroundUnblur')
		$('#left').removeClass('backgroundUnblurFixed')
		$('#matter1').addClass('backgroundBlur')
		$('#left').addClass('backgroundBlurFixed')
		$('html').css('overflow','hidden')
		windowObj.addClass('beforeOpenWindow')
		obj.css('display','none')
		$('#windowBackground').css({'display':'block','height':windowWidth})
		aCopyObj.css('display','block')
		var aHtml = obj.html()
		var windowHtml = aCopyObj.html()
		aCopyObj.html(aHtml)
		windowObj.html(windowHtml + aHtml)
		windowObj.css('display','block')
	 	setTimeout(function(){windowObj.toggleClass('afterOpenWindow');},8)//不设置延时会有bug,延时>=8mm(可能与浏览器性能有关)

	});

	// matter1关闭窗口效果
	$(document).on('click','.windowCloseButton',function closeWindow(){
		getClientSize()
		var obj = $(this)
		var windowObj = $('#window')
		var idNum = obj.attr('id').match(/\d+/)
		var aObj = $('#diary'+idNum)
		var aCopyObj = $('#diaryCopyone'+idNum)

		windowObj.toggleClass('afterOpenWindow')
		windowObj.toggleClass('beforeOpenWindow')
		aCopyObj.css('display','none')
		$('#windowBackground').css('display','none')
		$('#diary'+idNum).css('display','block')
		setTimeout(function(){windowObj.css('display','none').empty()},340)
		aCopyObj.empty().html('<a href=\'javascript:void(0)\' id=\'close'+idNum+'\' class=\'windowCloseButton\'></a>')

		// 背景效果
		$('#matter1').addClass('backgroundUnblur')
		$('#left').addClass('backgroundUnblurFixed')
		$('#matter1').removeClass('backgroundBlur')
		$('#left').removeClass('backgroundBlurFixed')
		$('html').css({'overflow-y':'scroll','overflow-x':'hidden'})
	});
	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId)
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key]+'px')
		}
	}
});