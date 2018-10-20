$(document).ready(function() {

	var url = 'http://127.0.0.1:8000'

	function mainPage() {
		var urlHash = window.location.hash
		if (urlHash != '' && urlHash != '#codeDiary') {
			$.ajax({
		        url:"/",
		        type:"GET",
		        async: false,
		        data:{"matter":urlHash},
		        success:function(data){fillHtml(data,urlHash)}
		    })
		}
	}
	mainPage()

	$('.left-menu a').click(function () {
		var urlHash = $(this).attr('href')
	    $.ajax({
	        url:"/",
	        type:"GET",
	        async: false,
	        data:{"matter":urlHash,"operation":"click"},
	        success:function(data){fillHtml(data,urlHash)}
    	})
		divFadeIn(urlHash)
	})

	function fillHtml(data,urlHash){
        	if (data.statusCode == '200'){
        		if (urlHash == '#diary'){
	        		var htm = ''
	        		$.each(data.diary_info,function(i,data){
	        			htm += '<li>\
                    	<div class="aCopy" id="copyone'+ data.text_id +'">\
                    		<a href="javascript:void(0)" id="close'+ data.text_id +'" class="windowCloseButton"></a>\
                    	</div>\
                        <a class="content" id="diary'+ data.text_id +'" href="#diary?text_id='+ data.text_id +'">\
                            <h4>'+ data.date_weather +'</h4>\
                            <p>'+ data.content +'</p>\
                        </a>\
                    </li>'
	        		})
	        		$('.diary ul').html(htm)
        		}
        		else {
        		window.location.href = url + '/404'
        		}
        	}
        	else if (data.statusCode == '404') {
        		window.location.href = url + '/404'
        	}
        	else {
        		window.location.href = url + '/404'
        	}
	}
})