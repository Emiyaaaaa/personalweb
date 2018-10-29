$(document).ready(function() {

	function mainPage() {
		$.ajax({
		        url:"/",
		        type:"GET",
		        async: false,
		        data:{"matter":URLHASH},
		        success:function(data){
		        	fillHtml(data,URLHASH)
		        }
		    })
	}
	mainPage()
	matterClick()

	$('.left-menu a').click(function () {
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
		var num = hashToMatterNum(urlHash)
		if ($('#matter'+num+' ul li').css('display') == 'none'){
			divFadeIn(urlHash)
		}
	})

	function fillHtml(data,urlHash){
        	if (data.statusCode == '200'){
        		if (urlHash == '#codeDiary'){
        			var htm = ''
	        		$.each(data.codeDiary_info,function(i,data){

	        			if (data.is_display == 1){
	        				var id = data.text_id
	        				htm += '<li>\
                        				<div class="aCopy" id="codeDiaryCopyone'+ id +'">\
                        					<a href="javascript:void(0)" id="codeDiaryClose'+ id +'" class="windowCloseButton">\
                        						<img src="/media/close.png"/>\
                        					</a>\
                        				</div>\
                            			<a class="content" id="codeDiary'+ id +'" href="#codeDiary?text_id='+ id +'">\
                                			<p>'+ data.content +'</p>\
                            			</a>\
                        			</li>'
	        			}
	        		})
	        		$('.codeDiary ul').html(htm)
        		}
        		else if (urlHash == '#diary'){
	        		var htm = ''
	        		$.each(data.diary_info,function(i,data){
	        			if (data.is_display == 1){
	        				var id = data.text_id
	        				htm += '<li>\
                    					<div class="aCopy" id="diaryCopyone'+ id +'">\
                    						<a href="javascript:void(0)" id="diaryClose'+ id +'" class="windowCloseButton">\
                    							<img src="/media/close.png"/>\
                        					</a>\
                    					</div>\
                        				<a class="content" id="diary'+ id +'" href="#diary?text_id='+ id +'">\
                            				<h4>'+ data.date_weather +'</h4>\
                            				<p class="p">'+ data.content +'</p>\
                        				</a>\
                    				</li>'
	        			}
	        		})
	        		$('.diary ul').html(htm)
        		}
        		else if (urlHash == '#application'){
        		}
        		else if (urlHash == '#personalCenter'){
        		}
        		else {
        		window.location.href = url + '404'
        		}
        	}
        	else if (data.statusCode == '404') {
        		window.location.href = url + '404'
        	}
        	else {
        		window.location.href = url + '404'
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

function submitMessage(){
	var message = $('#message').val()
	if (isNull(message)){
		alert('留言不能为空')
		return 0
	}
	var contact = $('#contact').val()
	$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"message":message,"contact":contact},
	        success:function(data){
	        	if (data.statusCode == '1'){
	        		alert('提交成功！感谢您的建议ღ( ´･ᴗ･` )比心')
	        	}
	        	else {
	        		alert('提交失败！请再试一次')
	        	}
	        }
		})
}

function isNull(str){
	if (str == null){
		return true
	}
	else {
		if (str == ""){
			return true
		}
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	}
	
}