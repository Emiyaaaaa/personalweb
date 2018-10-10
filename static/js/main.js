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
		$(".matter1 li").click(function openWindows() {
			var date = $(this).children("a:eq(0)").children("h4:eq(0)").text()
			var content = $(this).children("a:eq(0)").children("p:eq(0)").text()
			var a = $(this).children("a:eq(0)")

			var scaleX = 1.085
			var scaleY = 1.195
			var width = a.width()
			var height = a.height()
			var windowWidth = $(window).width()
			var windowHeight = $(window).height()
    		var marginLeft = a.outerWidth(true) - a.outerWidth()
			var marginTop = a.outerHeight(true) - a.outerHeight()
			var top = a.offset().top - (marginTop - (height * scaleY - height)/2)
			var left = a.offset().left - (marginLeft - (width * scaleX - width)/2)

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
			$(this).children("a:eq(0)").css("display","none")
			$("#windowBackground").css({"display":"block","height":windowWidth})
			$("#window").html("<h4>"+date+"</h4><p>"+content+"</p></div>")
			$("#window").animate(windowAnimate,350);
			$(this).children("div:eq(0)").css("display","block")
			$(this).children("div:eq(0)").html("<h4>"+date+"</h4><p>"+content+"</p></div>")
			

		});
	});