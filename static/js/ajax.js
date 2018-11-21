$(document).ready(function() {

	//主页面
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
	

	//其他页面
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

	//获取全文	
	function getMattersContent(href){
		$.ajax({
			url:'/',
	        type:"GET",
	        async: true,
	        data:{'matter':href.split('?')[0],'text_id':href.split('?')[1].split('=')[1]},
	        success:function(data){
	        	$('#ajax_window_html').html(data)
	        	try{
	        		$('.markdown-body').html(marked($('.markdown-body').html()))
	        	}
	        	catch(err){}
	        	fillWindow()
	        	replyButton()
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

// matter3_3建议
function matter33SendMessage(){

	var comment_to = ''
	var password = ''
	var disabled_name = new Array('Emiya','emiya')
	var nickname = $('#suggestion_nike_name').val()
	var email = $('#suggestion_user_email').val()
	var content = $('#suggestion_content').val()

	if (isInArray(disabled_name,nickname) == true){
		password = prompt("使用此昵称需要输入密码","")
    	$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"type":"validatePassword",'password':password},
	        success:function(data){
	        	if (data.password == 'right'){
	        		alert('密码正确！')
	        		$('#suggestion_nike_name').parent().removeClass("error")
	        	}
	        	else{
	        		alert('密码错误！')
	        		$('#suggestion_nike_name').val('')
	        		$('#suggestion_nike_name').parent().addClass("error")
	        		$('#suggestion_nike_name').focus()
	        	}
			}
		})
	}
	if (isNull(content)){
		$('.suggestion-comment-hint').html('提示：建议内容不能为空哦~')
		$('#suggestion_content').parent().addClass("error")
        $('#suggestion_content').focus()
	}
	else{
		$('#suggestion_content').parent().removeClass("error")
		$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"type":"matter33SendMessage","nickname":nickname,"email":email,"content":content},
	        success:function(data){
	        	if (data.statusCode == '1'){
	        		$('.suggestion-comment-hint').html('提示：评论成功！ ღ( ´･ᴗ･` )比心')
	        		$('#suggestion_nike_name').val('')
					$('#suggestion_user_email').val('')
					$('#suggestion_content').val('')
	        	}
	        	else {
	        		$('.suggestion-comment-hint').html('提示：提交失败，请再试一次~')
	        	}
	        }
		})
	}
}

//评论
function windowSendComment(){

	var comment_to = ''
	var password = ''
	var disabled_name = new Array('Emiya','emiya')
	if (reply == 'true'){
		var comment_to = reply_nickname
	}
	var hash = window.location.hash
	var nickname = $('#comment_nike_name').val()
	var email = $('#comment_user_email').val()
	var comment = $('#comment_comment').val()
	var matter = hash.split('?')[0]
	var text_id = hash.split('?')[1].split('=')[1]
	if (isInArray(disabled_name,nickname) == true){
		password = prompt("使用此昵称需要输入密码","")
    	$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"type":"validatePassword",'password':password},
	        success:function(data){
	        	if (data.password == 'right'){
	        		alert('密码正确！')
	        		$('#comment_nike_name').parent().removeClass("error")
	        	}
	        	else{
	        		alert('密码错误！')
	        		$('#comment_nike_name').val('')
	        		$('#comment_nike_name').parent().addClass("error")
	        		$('#comment_nike_name').focus()
	        	}
			}
		})
	}
	if (isNull(comment)){
		$('.window-comment-hint').html('提示：评论不能为空哦~')
		$('#comment_comment').parent().addClass("error")
        $('#comment_comment').focus()
	}
	else{
		$('#comment_comment').parent().removeClass("error")
		$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"type":"windowSendComment","nickname":nickname,"email":email,"comment":comment,"matter":matter,"text_id":text_id,'comment_to':comment_to},
	        success:function(data){
	        	if (data.statusCode == '1'){
	        		$('.window-comment-hint').html('提示：评论成功！ ღ( ´･ᴗ･` )比心')
	        		$('#comment_nike_name').val('')
					$('#comment_user_email').val('')
					$('#comment_comment').val('')
	        	}
	        	else {
	        		$('.window-comment-hint').html('提示：提交失败，请再试一次~')
	        	}
	        }
		})
	}
	reply = 'false'	
}