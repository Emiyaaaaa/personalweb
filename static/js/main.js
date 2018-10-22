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
	getClientSize()

	// matter1打开窗口效果
	$(document).on("click",'.content',function openWindow(){
		
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
		
		var setPripertyDict1 = {
			'top':top+'px',
			'left':left+'px',
			'width':width+'px',
			'height':height+'px',
			'marginTop':marginTop+'px',
			'marginLeft':marginLeft+'px'
		}
	 	setProperty("window",setPripertyDict1)
	 	windowObj.css('display','block')
	 	var setPripertyDict2 = {
	 		'changeLeft':windowLeft+'px',
			'changeTop':windowTop+'px',
			'changeWidth':windowWidth+'px',
			'changeHeight':windowHeight+'px'
	 	}
	 	setProperty("window",setPripertyDict2)
	 	setTimeout(function(){windowObj.toggleClass('afterOpenWindow');},5)
		

	});

	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId)
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key])
		}
	}

	// matter1关闭窗口效果
	$(document).on('click','.windowCloseButton',function closeWindow(){

	});
});