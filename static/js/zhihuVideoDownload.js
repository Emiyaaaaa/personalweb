$(document).ready(function() {

	$('#search_button').click(function () {
		var search_box = document.getElementById('search_box');
		var search_button = document.getElementById('search_button');
		var search_result = document.getElementById('search_result');
		var url = $('#search_url').val();
		if(!search_button.classList.contains("moved") && !isNull(url)){
			var bo_top = search_box.offsetTop;
			var bu_top = search_button.offsetTop;
			var re_top = search_result.offsetTop;
			var bo_width = search_box.clientWidth;
			var bu_width = search_button.clientWidth;
			var bo_height = search_box.clientHeight;
			var screen_width = document.body.clientWidth;
			var bo_left = search_box.offsetLeft;
			var bu_left = search_button.offsetLeft;
			var bubo_spacing = 2;
			var a = (screen_width - bo_width - bu_width - bubo_spacing)/2;
			var set_bo_left = a - bo_left;
			var set_bu_left = screen_width - a - bu_width - bu_left;
			var set_bo_top = -(bo_top-70);
			var set_bu_top = -(bu_top-70);
			var set_re_top = -(re_top-70-bo_height);

			var bo_dict = {
				'top':set_bo_top+'px',
				'left':set_bo_left+'px'
			};
			var bu_dict = {
				'top':set_bu_top+'px',
				'left':set_bu_left+'px'
			};
			var re_dict = {
				'top':set_re_top+'px'
			};

			search_button.classList.add('moved');
			setProperty('search_button',bu_dict);
			setProperty('search_box',bo_dict);
			setProperty('search_result',re_dict);
		}
		if (!isNull(url)){
			var href = window.location.href;
			var num = href.length - href.replace(/\//g,'').length;
			console.log(num)
			if (num == 4){
				window.location.href = "#/?turn=1&url="+url;
			}
			$.ajax({
		        url:"/",
		        type:"GET",
		        data:{"type":"ZhuhuVideoDownload",'url':url},
		        success:function(data){
		        	$('#search_result ul').html(data);
					liFadeln();
		        }
			})
		}
	})

	function liFadeln(){
		var search_result = document.getElementById('search_result');
	}

	function isNull(str){
		if (str == null){
			return true;
		}
		else {
			if (str == ""){
				return true;
			}
			var regu = "^[ ]+$";
			var re = new RegExp(regu);
			return re.test(str);
		}
	}

	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId);
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key]);
		}
	}
});