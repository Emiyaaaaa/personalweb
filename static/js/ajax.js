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
		//导航栏交互
		$('.left-menu a').removeClass('active');
		$(this).addClass('active');
		var liNum = $(this).parent().attr('id').split('-')[1]
		$('#middle > div').css('display','none')
		$('#matter'+liNum).css('display','block')
		//END
		var urlHash = $(this).attr('href')

		//判断是否需要ajax
		if (needAjax(urlHash) == 'true'){
			$.ajax({
		        url:"/",
		        type:"GET",
		        async: false,
		        data:{"matter":urlHash},
		        success:function(data){fillHtml(data,urlHash)}
    		})
    		divFadeIn(urlHash)
		}
	})

	function fillHtml(data,urlHash){
        	if (data.statusCode == '200'){
        		if (urlHash == '#diary'){
	        		var htm = ''
	        		$.each(data.diary_info,function(i,data){
	        			if (data.is_display == 0){
	        				htm += '<li>\
                    					<div class="aCopy" id="diaryCopyone'+ data.text_id +'">\
                    						<a href="javascript:void(0)" id="diaryClose'+ data.text_id +'" class="windowCloseButton"></a>\
                    					</div>\
                        				<a class="content" id="diary'+ data.text_id +'" href="#diary?text_id='+ data.text_id +'">\
                            				<h4>'+ data.date_weather +'</h4>\
                            				<p>'+ data.content +'</p>\
                        				</a>\
                    				</li>'
	        			}
	        			
	        		})
	        		$('.diary ul').html(htm)
        		}

        		else if (urlHash == '#codeDiary'){
	        		;
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

	function needAjax(urlHash){
		var num = $(urlHash).parent().attr('id').split('-')[1]
		var content = $('#matter'+num).html().replace(/\s/g, "")
		if (content == '<ul></ul>'){
			return 'true'
		}
	}
})