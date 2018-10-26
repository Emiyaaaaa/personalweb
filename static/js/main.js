function matterClick(){
	if (URLHASH == undefined){
		return 0
	}
	$(URLHASH).addClass('active');
	$('#matter'+LINUM).css('display','block')
	nowMatter = 'matter'+LINUM
	divFadeIn(URLHASH)
}

function divFadeIn(urlHash) {
	var num = hashToMatterNum(urlHash)
	var liLength = $('#matter'+num+' ul li').length;
	console.log($('#matter0 ul li'))
	console.log($('#matter1 ul li'))
	for (var i = 0; i < liLength; i++) {
		$('#matter'+num+' ul li:eq(' + i +')').delay(140*i).fadeIn();
		if (i > 10){
			$('#matter'+num+' ul li:eq(' + i +')').fadeIn();
		}
	}
}

function getDivPosition(id){
	var left = document.getElementById(id).getBoundingClientRect().left
	var top = document.getElementById(id).getBoundingClientRect().top
	return [left,top]
}

function getClientSize(){
	clientWidth = document.documentElement.clientWidth
	clientHeight = document.documentElement.clientHeight
}


function hashToMatterNum(urlHash){
	return $(urlHash).parent().attr('id').split('-')[1]
}

$(document).ready(function() {

	$('.left-menu a').click(function () {
		//导航栏交互
		$('.left-menu a').removeClass('active')
		$(this).addClass('active')
		var liNum = $(this).parent().attr('id').split('-')[1]
		$('#middle > div').css('display','none')
		$('#matter'+liNum).css('display','block')
		nowMatter = 'matter'+liNum
	})

	$(document).on("click",'.content',function openWindow(){
		getClientSize()
		var obj = $(this)
		windowObj = $('#window')
		matterObj = $('#'+nowMatter)
		idNum = obj.attr('id').match(/\d+/)
		objName = obj.attr('id').split(/Close/)[0].split(/\d/)[0]
		aCopyObj = $('#'+objName+'Copyone'+idNum)
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

		matterObj.addClass('backgroundBlur')
		$('#left').addClass('backgroundBlurFixed')
		$('html').css('overflow','hidden')
		windowObj.addClass('beforeOpenWindow')
		obj.css('display','none')
		$('#windowBackground').css({'display':'block','height':windowWidth})
		aCopyObj.css('display','block')
		var aHtml = obj.html()
		var windowHtml = aCopyObj.html()
		aCopyObj.html(aHtml)
		//在这里加打开窗口后增加的html
		windowObj.html(windowHtml + aHtml)
		windowObj.css('display','block')
	 	setTimeout(function(){windowObj.toggleClass('afterOpenWindow');},8)//不设置延时会有bug,延时>=8mm(可能与浏览器性能有关)

	});

	// matter0，1关闭窗口效果
	$(document).on('click','.windowCloseButton',function closeWindow(){
		var obj = $(this)
		var aObj = $('#'+objName+idNum)

		windowObj.toggleClass('afterOpenWindow')
		windowObj.toggleClass('beforeOpenWindow')
		aCopyObj.css('display','none')
		$('#windowBackground').css('display','none')
		aObj.css('display','block')
		setTimeout(function(){windowObj.css('display','none').empty()},340)
		aCopyObj.empty().html('<a href=\'javascript:void(0)\' id=\'close'+idNum+'\' class=\'windowCloseButton\'></a>')

		// 背景效果
		matterObj.addClass('backgroundUnblur')
		$('#left').addClass('backgroundUnblurFixed')
		matterObj.removeClass('backgroundBlur')
		$('#left').removeClass('backgroundBlurFixed')
		$('html').css({'overflow-y':'scroll','overflow-x':'hidden'})
		setTimeout(function(){matterObj.removeClass('backgroundUnblur');$('#left').removeClass('backgroundUnblurFixed')},360)
	});
	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId)
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key]+'px')
		}
	}
});