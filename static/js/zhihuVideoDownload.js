$(document).ready(function() {
	$('#search-button').click(function () {
		var search_box = document.getElementById('search-box');
		var search_button = document.getElementById('search-button');
		var bo_top = search_box.offsetTop;
		var bu_top = search_button.offsetTop;
		var bo_width = search_box.clientWidth;
		var bu_width = search_button.clientWidth;
		var screen_width = document.body.clientWidth;
		var bo_left = search_box.offsetLeft;
		var bu_left = search_button.offsetLeft;
		var bubo_spacing = 2;
		var a = (screen_width - bo_width - bu_width - bubo_spacing)/2;
		var set_bo_left = a - bo_left;
		var set_bu_left = screen_width - a - bu_width - bu_left;
		var bo_dict = {
			'top':(-(bo_top-70))+'px',
			'left':set_bo_left+'px'
		};
		var bu_dict = {
			'top':(-(bu_top-70))+'px',
			'left':set_bu_left+'px'
		};
		setProperty('search-button',bu_dict);
		setProperty('search-box',bo_dict);

		console.log(bo_top,bu_top,screen_width)
		


	})

	function setProperty(documentObjId,dictObj){
		var obj = document.getElementById(documentObjId);
		for(var key in dictObj) {
   			obj.style.setProperty('--'+key,dictObj[key]);
		}
	}
});