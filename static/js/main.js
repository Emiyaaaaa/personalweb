$(document).ready(function() {
		
		// 透明度变化
		function divFadeIn() {
			liNum = $(".matter0 ul li").length;
			for (var i = 0; i < liNum; i++) {
				$(".matter0 ul li:eq(" + i +")").delay(70*i).fadeIn();
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
	});