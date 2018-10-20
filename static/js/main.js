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

		// matter1打开窗口效果
		$(document).on("click",'.content',function openWindows(){
			var obj = $(this)
			var idNum = obj.attr('id').match(/\d+/)
			var aCopyObj = $('#diaryCopyone'+idNum)
			var scaleX = 1.085
			var scaleY = 1.195
			var width = obj.width()
			var height = obj.height()
			var windowWidth = $(window).width()
			var windowHeight = $(window).height()
    		var marginLeft = obj.outerWidth(true) - obj.outerWidth()
			var marginTop = obj.outerHeight(true) - obj.outerHeight()
			var id = obj.attr('id')
			var left = getDivPosition(id)[0]
			var top = getDivPosition(id)[1]
			var top = top - (marginTop - (height * scaleY - height)/2)
			var left = left - (marginLeft - (width * scaleX - width)/2)
			var windowcss = {
				'position':'fixed',
				'display':'block',
				'top':top,
				'left':left,
				'width':width,
				'height':height,
				'margin-left':marginLeft,
				'margin-top':marginTop,
			}

			var openWindowAnimate = {
			   top: windowHeight/7,
			   height: windowHeight/2,
			   left: windowWidth/6,
			   width: windowWidth*4/6-(obj.outerWidth(true)-width),
			}

			// 背景效果
			$('#matter1').removeClass('backgroundUnblur')
			$('#left').removeClass('backgroundUnblurFixed')
			$('#matter1').addClass('backgroundBlur')
			$('#left').addClass('backgroundBlurFixed')
			$('html').css('overflow','hidden')

			$('#window').css(windowcss)
			$('#window').addClass('beforeOpenWindow')
			obj.css('display','none')
			$('#windowBackground').css({'display':'block','height':windowWidth})
			aCopyObj.css('display','block')

			var aHtml = obj.html()
			var windowHtml = aCopyObj.html()

			aCopyObj.html(aHtml)
			$('#window').html(windowHtml + aHtml)
			$('#window').animate(openWindowAnimate,350)
		});

		// matter1关闭窗口效果
		$('#window').on('click','.windowCloseButton',function(){
			var idNum = $(this).attr('id').match(/\d+/)
			var aObj = $('#diary'+idNum)
			var aCopyObj = $('#diaryCopyone'+idNum)
			var windowObj = $('#window')
			var aCopyWidth = aCopyObj.width()
			var aCopyHeight = aCopyObj.height()
			var id = aCopyObj.attr('id')
			var aCopyLeft = getDivPosition(id)[0]
			var aCopyTop = getDivPosition(id)[1]

			var closeWindowAnimate = {
			    top: aCopyTop,
			    height: aCopyHeight,
			    left: aCopyLeft,
			    width: aCopyWidth,
			    marginLeft: 0,
				marginTop:0
			}

			windowObj.animate(closeWindowAnimate,350)
			aCopyObj.css('display','none')
			$('#windowBackground').css('display','none')
			$('#diary'+idNum).css('display','block')
			setTimeout(function(){windowObj.toggleClass('beforeOpenWindow');},10)
			setTimeout(function(){windowObj.css('display','none').empty()},350)
			aCopyObj.empty().html('<a href=\'javascript:void(0)\' id=\'close'+idNum+'\' class=\'windowCloseButton\'></a>')

			// 背景效果
			$('#matter1').addClass('backgroundUnblur')
			$('#left').addClass('backgroundUnblurFixed')
			$('#matter1').removeClass('backgroundBlur')
			$('#left').removeClass('backgroundBlurFixed')
			$('html').css('overflow','auto')
		});

		$('')
	});