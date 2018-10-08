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
	    function abc(){
				alert($("#matter0 > ul").outerHeight(true));
			}
		//matter1点击变大效果函数
		$(".matter1 li").click(function () {
			var date = $(this).children("a:eq(0)").children("h4:eq(0)").text()
			var content = $(this).children("a:eq(0)").children("p:eq(0)").text()
			var a = $(this).children("a:eq(0)")
			var top = a.offset().top
			var left = a.offset().left
			var width = a.width()
			var height = a.height()
    		var marginLeft = a.outerWidth(true) - a.outerWidth()
			var marginTop = a.outerHeight(true) - a.outerHeight()

			var windowcss ={"position":"fixed",
							"display":"block",
							"top":top,
							"left":left,
							"width":width,
							"height":height,
							"margin-left":marginLeft,
							"margin-top":marginTop
							}
			$(this).children("div:eq(0)").css(windowcss)
			// alert(event.x)
			// $(this).children("a:eq(0)").css("display","none")
			$(this).children("div:eq(0)").html("<h4>"+date+"</h4><p>"+content+"</p></div>")
			// alert(css)
		});
	});