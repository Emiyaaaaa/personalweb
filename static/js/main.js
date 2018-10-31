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

	$(document).on("click",'.content',function openWindow(){
		getClientSize()
		var obj = $(this)
		windowObj = $('#window')
		matterObj = $('#'+nowMatter)
		idNum = obj.attr('id').match(/\d+/)
		objName = obj.attr('id').split(/\d/)[0]
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
		closeWindowHtml = '<a href="javascript:void(0)" class="windowCloseButton"></a>'
		
		var setPripertyDict = {
			'top':top+'px',
			'left':left+'px',
			'width':width+'px',
			'height':height+'px',
			'marginTop':marginTop+'px',
			'marginLeft':marginLeft+'px',
			'changeLeft':windowLeft+'px',
			'changeTop':windowTop+'px',
			'changeWidth':windowWidth-(obj.outerWidth(true)-width)+'px',
			'changeHeight':windowHeight+'px',
			'webkit-scrollbar-track-piece-backgroung-color':'#333333'
		}
	 	setProperty("window",setPripertyDict)
		$('html').css('overflow','hidden')
		windowObj.addClass('beforeOpenWindow')
		obj.css('display','none')
		$('#windowBackground').css({'display':'block','width':clientWidth+28,'height':clientHeight+10})
		aCopyObj.css('display','block')
		var aHtml = obj.html()
		aCopyObj.html(aHtml)
		//在这里加打开窗口后增加的html
		windowObj.html(closeWindowHtml + aHtml)
		windowObj.css('display','block')
	 	setTimeout(function(){windowObj.toggleClass('afterOpenWindow');$('#windowBackground').toggleClass('windowOpacity');},8)//不设置延时会有bug,延时>=8mm(可能与浏览器性能有关)

	});

	// matter0，1关闭窗口效果
	$(document).on('click','.windowCloseButton',function closeWindow(){
		var obj = $(this)
		var aObj = $('#'+objName+idNum)

		windowObj.toggleClass('afterOpenWindow')
		windowObj.toggleClass('beforeOpenWindow')
		$('#windowBackground').toggleClass('windowOpacity')
		setTimeout(function(){$('#windowBackground').css('display','none')},348)
		aCopyObj.css('display','none')
		
		aObj.css('display','block')
		setTimeout(function(){windowObj.css('display','none').empty()},340)
		$('html').css({'overflow-y':'scroll','overflow-x':'hidden'})
		
	});
	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId)
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key])
		}
	}
});