$(document).ready(function() {
	function mainPage() {
		$.ajax({
		        url:"/",
		        type:"GET",
		        async: false,
		        data:{"matter":URLHASH,"text_max_length":TEXTMAXLENGTH},
		        success:function(data){
		        	fillHtml(data,URLHASH)
		        }
		    })
	}
	mainPage()
	matterClick()
	

	$('.left-menu a').click(function () {
		//导航栏交互
		$('.left-menu a').removeClass('active')
		$(this).addClass('active')
		var liNum = $(this).parent().attr('id').split('-')[1]
		$('#middle > div').css('display','none')
		$('#matter'+liNum).css('display','block')
		nowMatter = 'matter'+liNum
		//ajax
		var urlHash = $(this).attr('href')
		//判断是否需要ajax
		if (leftClickNeedAjax(urlHash) == 'true'){
			$.ajax({
		        url:"/",
		        type:"GET",
		        async: false,
		        data:{"matter":urlHash,"text_max_length":TEXTMAXLENGTH},
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
		if (urlHash == '#codeDiary'){
    		$('.codeDiary ul').html(data)
		}
		else if (urlHash == '#diary'){
    		$('.diary ul').html(data)
		}
		else if (urlHash == '#application'){
		}
		else if (urlHash == '#personalCenter'){
		}
		else {
		window.location.href = MAINURL + '404'
		}
        	
	}

	
	function getMattersContent(href){
		$.ajax({
			url:'/',
	        type:"GET",
	        async: true,
	        data:{'matter':href.split('?')[0],'text_id':href.split('?')[1].split('=')[1]},
	        success:function(data){
	        	$('#ajax_window_html').html(data)
	    }
		})
	}
	window.getMattersContent = getMattersContent

	function leftClickNeedAjax(urlHash){
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
	}
	var contact = $('#contact').val()
	$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"type":"submitMessage","message":message,"contact":contact},
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

function windowSendComment(){

	var hash = window.location.hash
	var nickname = $('#nike_name').val()
	var email = $('#user_email').val()
	var comment = $('#comment').val()
	var contact = $('#contact').val()
	var matter = hash.split('?')[0]
	var text_id = hash.split('?')[1].split('=')[1]
	if (isNull(comment)){
		alert('留言不能为空')
	}
	$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"type":"windowSendComment","nickname":nickname,"email":email,"comment":comment,"matter":matter,"text_id":text_id,'comment_to':''},
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