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


		//matter1点击变大效果函数
		$(".conten").click(function openWindows() {
			var aHtml = $(this).html()
			var windowHtml = $(this).parent().children("div:eq(0)").html()
			var a = $(this)

			var scaleX = 1.085
			var scaleY = 1.195
			var width = a.width()
			var height = a.height()
			var windowWidth = $(window).width()
			var windowHeight = $(window).height()
    		var marginLeft = a.outerWidth(true) - a.outerWidth()
			var marginTop = a.outerHeight(true) - a.outerHeight()
			var top = a.offset().top
			var left = a.offset().left

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

			var windowAnimate = {
			   top: windowHeight/7,
			   height: windowHeight/2,
			   left: windowWidth/6,
			   width: windowWidth*4/6-(a.outerWidth(true)-width)
			}

			$("#allDiv").addClass("backgroundBlir")
			$("#window").css(windowcss)
			$(this).css("display","none")
			$("#windowBackground").css({"display":"block","height":windowWidth})
			$("#window").html(windowHtml + aHtml)
			$(this).parent().children("div:eq(0)").css("display","block")
			$(this).parent().children("div:eq(0)").children("a:eq(0)").addClass("windowClose")
			$(this).parent().children("div:eq(0)").html(aHtml)
			$("#window").animate(windowAnimate,350)
		});

				//matter1点击变大效果函数
		function openWindow(text) {
			var aHtml = text.innerHTML
			alert(aHtml)
			// var windowHtml = $(this).parent().children("div:eq(0)").html()
			// var a = $(this)

			// var scaleX = 1.085
			// var scaleY = 1.195
			// var width = a.width()
			// var height = a.height()
			// var windowWidth = $(window).width()
			// var windowHeight = $(window).height()
   //  		var marginLeft = a.outerWidth(true) - a.outerWidth()
			// var marginTop = a.outerHeight(true) - a.outerHeight()
			// var top = a.offset().top
			// var left = a.offset().left

			// var windowcss = {
			// 	"position":"fixed",
			// 	"display":"block",
			// 	"top":top,
			// 	"left":left,
			// 	"width":width,
			// 	"height":height,
			// 	"margin-left":marginLeft,
			// 	"margin-top":marginTop,
			// }

			// var windowAnimate = {
			//    top: windowHeight/7,
			//    height: windowHeight/2,
			//    left: windowWidth/6,
			//    width: windowWidth*4/6-(a.outerWidth(true)-width)
			// }

			// $("#allDiv").addClass("backgroundBlir")
			// $("#window").css(windowcss)
			// $(this).css("display","none")
			// $("#windowBackground").css({"display":"block","height":windowWidth})
			// $("#window").html(windowHtml + aHtml)
			// $(this).parent().children("div:eq(0)").css("display","block")
			// $(this).parent().children("div:eq(0)").children("a:eq(0)").addClass("windowClose")
			// $(this).parent().children("div:eq(0)").html(aHtml)
			// $("#window").animate(windowAnimate,350)
		};

		$(".windowClose").click(function () {
			$("#windowBackground").css("display","none")
			$("#allDiv").removeClass("backgroundBlir")
		});
	});
function openWindow(text) {
			var aHtml = text.innerHTML
			alert(aHtml)
			// var windowHtml = $(this).parent().children("div:eq(0)").html()
			// var a = $(this)

			// var scaleX = 1.085
			// var scaleY = 1.195
			// var width = a.width()
			// var height = a.height()
			// var windowWidth = $(window).width()
			// var windowHeight = $(window).height()
   //  		var marginLeft = a.outerWidth(true) - a.outerWidth()
			// var marginTop = a.outerHeight(true) - a.outerHeight()
			// var top = a.offset().top
			// var left = a.offset().left

			// var windowcss = {
			// 	"position":"fixed",
			// 	"display":"block",
			// 	"top":top,
			// 	"left":left,
			// 	"width":width,
			// 	"height":height,
			// 	"margin-left":marginLeft,
			// 	"margin-top":marginTop,
			// }

			// var windowAnimate = {
			//    top: windowHeight/7,
			//    height: windowHeight/2,
			//    left: windowWidth/6,
			//    width: windowWidth*4/6-(a.outerWidth(true)-width)
			// }

			// $("#allDiv").addClass("backgroundBlir")
			// $("#window").css(windowcss)
			// $(this).css("display","none")
			// $("#windowBackground").css({"display":"block","height":windowWidth})
			// $("#window").html(windowHtml + aHtml)
			// $(this).parent().children("div:eq(0)").css("display","block")
			// $(this).parent().children("div:eq(0)").children("a:eq(0)").addClass("windowClose")
			// $(this).parent().children("div:eq(0)").html(aHtml)
			// $("#window").animate(windowAnimate,350)
		};
