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
		var scale_X = 1.08
		var scale_Y = 1.15
		var width = obj.width()
		var height = obj.height()
		var marginLeft = obj.outerWidth(true) - obj.outerWidth()
		var marginTop = obj.outerHeight(true) - obj.outerHeight()
		var paddingLeft = (obj.outerWidth()-width)/2
		var paddingTop = (obj.outerHeight()-height)/2
		var windowHeight = clientHeight/2
		var windowWidth = clientWidth*4/6
		var windowTop = clientHeight/7
		var windowLeft = clientWidth/6 - marginLeft/2
		var id = obj.attr('id')
		var left = getDivPosition(id)[0]
		var top = getDivPosition(id)[1]
		console.log(top)
		var scaleX = (windowWidth-(obj.outerWidth(true)-width)+paddingLeft*2)/((width+paddingLeft*2))
		var scaleY = (windowHeight+paddingTop*2)/((height+paddingTop*2))
		var unknowParameterY = 21.15
		var unknowParameterX = 2.087
		closeWindowHtml = '<a href="javascript:void(0)" class="windowCloseButton"></a>'
		
		var setPripertyDict = {
			'top':windowTop+'px',
			'left':windowLeft+'px',
			'width':windowWidth-(obj.outerWidth(true)-width)+'px',
			'height':windowHeight+'px',
			'marginTop':marginTop+'px',
			'marginLeft':marginLeft+'px',
			'scaleX':1/scaleX,
			'scaleY':1/scaleY,
			'translateX':-(clientWidth/unknowParameterX-(width+34)/2-left)+'px',
			'translateY':-(clientHeight*2.75/7-(height+paddingTop*2)/2-top+unknowParameterY)+'px'
		}
	 	setProperty("window",setPripertyDict)
		$('html').css('overflow','hidden')
		// windowObj.addClass('openWindow')
		obj.css('display','none')
		$('#windowBackground').css({'display':'block','width':clientWidth+28,'height':clientHeight+10})
		aCopyObj.css('display','block')
		var aHtml = obj.html()
		aCopyObj.html(aHtml)
		//在这里加打开窗口后增加的html
		windowObj.css('display','block')
		windowObj.html('<div id="windowContent">'+closeWindowHtml+aHtml+'</div>')
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