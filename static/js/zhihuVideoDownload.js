$(document).ready(function() {

	$('#search_button').click(function () {
		var search_box = document.getElementById('search_box');
		var search_button = document.getElementById('search_button');
		var search_reason = document.getElementById('search_reason');
		if(!search_button.classList.contains("moved")){
			var bo_top = search_box.offsetTop;
			var bu_top = search_button.offsetTop;
			var re_top = search_reason.offsetTop;
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
			setProperty('search_reason',re_dict);
		}
		liFadeln();
	})

	function liFadeln(){
		var search_reason = document.getElementById('search_reason');
	}

	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId);
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key]);
		}
	}
});