$(document).ready(function() {
		
		// 透明度变化
		function divFadeIn() {
			liNum = $(".matter1 ul li").length;
			for (var i = 0; i < liNum; i++) {
				$(".matter1 ul li:eq(" + i +")").delay(140*i).fadeIn();
				if (i > 10){
					$(".matter1 ul li:eq(" + i +")").fadeIn();
				}
			}
		}
		divFadeIn();
		

		// 导航栏交互
		function navInteraction() {
			liNum = $(".left-menu ul li").length;
			for(var i = 0; i < liNum; i++) {
					$("#li-" + i).bind("click", {
						index: i
					}, openMatter);
				}
		    function openMatter(obj) {
		    	// alert($("#matter0 > ul").outerHeight(true));
		    	// alert($(document).height())
		    	// alert($(window).height())
		        for (var i = 0; i < liNum; i++) {
		            if (i == obj.data.index) {
		                document.getElementById("matter" + i).style.display = "block";
		            } else {
		                document.getElementById("matter" + i).style.display = "none";
		            }
		        }
		    }
		}
		navInteraction();


	    // 导航栏选中状态实现
	    $(".left-menu a").click(function () {
	    	$(".left-menu a").removeClass("active");
			$(this).addClass("active");
	    });



	    function getDivPosition(id){
			var left = document.getElementById(id).getBoundingClientRect().left
			var top = document.getElementById(id).getBoundingClientRect().top
			return [left,top]
		
		}

		// matter1打开窗口效果
		$(".content").click(function openWindows() {
			var obj = $(this)
			var idNum = obj.attr("id").match(/\d+/)
			var copyone = $("#copyone"+idNum)
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
				"position":"fixed",
				"display":"block",
				"top":top,
				"left":left,
				"width":width,
				"height":height,
				"margin-left":marginLeft,
				"margin-top":marginTop,
			}

			var openWindowAnimate = {
			   top: windowHeight/7,
			   height: windowHeight/2,
			   left: windowWidth/6,
			   width: windowWidth*4/6-(obj.outerWidth(true)-width),
			}

			$("#matter1").addClass("backgroundBlur")
			$("#left").addClass("backgroundBlurFixed")
			$("html").css("overflow","hidden")
			$("#window").css(windowcss)
			obj.css("display","none")
			$("#windowBackground").css({"display":"block","height":windowWidth})
			
			copyone.css("display","block")

			var aHtml = obj.html()
			var windowHtml = copyone.html()

			copyone.html(aHtml)
			$("#window").html(windowHtml + aHtml)
			$("#window").animate(openWindowAnimate,350)
		});

		// matter1关闭窗口效果
		$('#window').on('click','.windowCloseButton',function(){
			var idNum = $(this).attr("id").match(/\d+/)
			var aObj = $("#diary"+idNum)
			var aCopyObj = $("#copyone"+idNum)
			var windowObj = $("#window")
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

			windowObj.removeClass("beforeOpenWindow")
			windowObj.animate(closeWindowAnimate,350)
			aCopyObj.css("display","none")
			$("#windowBackground").css("display","none")
			$("#diary"+idNum).css("display","block")
			$("#window").css("display","block")
			$("#matter1").addClass("backgroundUnblur")
			$("#left").addClass("backgroundUnblurFixed")
			$("html").css("overflow","auto")
		});
	});