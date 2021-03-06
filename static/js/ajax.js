$(document).ready(function() {
	//主页面
	function mainPage() {
		if (window.location.href.split('?')[1] != undefined) {
    		var text_id = window.location.href.split('?')[1].split('=')[1];
    	}
    	else{
    		text_id = 'none';
    	}
		$.ajax({
	        url:"/",
	        type:"GET",
	        data:{"type":"matterPage","matter":nowMatter,"text_max_length":TEXTMAXLENGTH},
	        success:function(data){
	        	fillHtml(data);
	        	matterClick();
	        	if (LINUM == 3){
	        		get_update_log();
	        	}
	        }
	    })
	}
	mainPage();

	//其他页面
	$('.left-menu a').click(function () {
		if (isMobileScreen()) {
			$('#left .Wrapper').css('padding-top','74px');//解决上移bug
			if (document.getElementById('middle').classList.contains('moved')) {
				document.getElementById("left_list_button").click();//点击后收回列表
			}
		}
		
		//导航栏交互
		$('.left-menu a').removeClass('active');
		$(this).addClass('active');
		matterScrollTop[nowMatter] = document.documentElement.scrollTop || document.body.scrollTop;
		LINUM = $(this).parent().attr('id').split('-')[1];
		$('#middle > div').css('display','none');
		$('#matter'+LINUM).css('display','block');
		nowMatter = 'matter'+LINUM;
		rememberScrollTop();
		
		if (LINUM == 0 || LINUM == 1){
			//判断是否需要ajax
			if (leftClickNeedAjax() == true){
				$.ajax({
			        url:"/",
			        type:"GET",
			        data:{"type":"matterPage","matter":nowMatter,"text_max_length":TEXTMAXLENGTH},
			        success:function(data){
			        	fillHtml(data);
			        	divFadeIn();
			        }
	    		})
			}
		}
		else if(LINUM == 2){
			if (leftClickNeedAjax() == true){
				$.ajax({
			        url:"/",
			        type:"GET",
			        data:{"type":"matterPage","matter":nowMatter},
			        success:function(data){
			        	fillHtml(data);
			        	divFadeIn();
			        }
	    		})
			}
		}
		else if(LINUM == 3){
			initializePersonalcenterNav();
			get_update_log();
		}
	});


	function fillHtml(data){
		if (nowMatter == 'matter0'){
    		$('.codeDiary ul').html(data);
		}
		else if (nowMatter == 'matter1'){
    		$('.diary ul').html(data);
		}
		else if (nowMatter == 'matter2'){
			$('.application').html(data);
		}
		else if (nowMatter == 'matter3'){
		}
		else {
		window.location.href = MAINURL + '404';
		}
	}

	function getMoreContent(){
		if ((nowMatter == 'matter0' || nowMatter == 'matter1') && (leftClickNeedAjax() == false)){
			var finally_id = $('.'+nowMatter+' li:last>a:eq(0)').attr('id').match(/\d+/)[0];
			var liLength = $('.'+nowMatter+' li').length;
			$.ajax({
		        url:"/",
		        type:"GET",
		        data:{"type":"getMoreContent","matter":nowMatter,"finally_id":finally_id,"text_max_length":TEXTMAXLENGTH},
		        success:function(data){
		        	if (data.status != 'ended'){
						var last_loadstatus = $('.'+nowMatter+' .loadStatus:last');//上一个loadstatus
						last_loadstatus.css('display','none');
						setTimeout(function(){last_loadstatus.css('display','none');},200);//解决divFadeIn()函数造成的关闭上一个loadstatus后又打开的情况
		        		$('.'+nowMatter+' ul:eq(0)').append(data);
			        	//fadeIn显示
						var Length = $('.'+nowMatter+' li:gt('+(liLength-1)+')').length;
						for (var i = liLength; i < liLength+Length; i++) {
							const li_ele = $('.'+nowMatter+' li:eq(' + i +')');
							li_ele.fadeIn();
							check_lines_length(li_ele);
						}
						//end
						$('.'+nowMatter+' .loadStatus:last').css('display','block');
						if (isMobileScreen() == true){
							$('.'+nowMatter+' .mobile_beian:last').css('display','block');
						}
					}
					window.onscroll = scrollBottom;
		        },
		        error:function (XMLHttpRequest, textStatus, errorThrown) {
		        	window.onscroll = scrollBottom;
	            }
			})
			return true;
		}
		else{
			return false;
		}
	}

	window.getMoreContent = getMoreContent;

	function myMarked(Ele){
		var text = Ele.innerHTML.replace(/&gt;/g,'>'); //将全文的&gt;转换成>使其支持markdown的引用符
		var markedHTMLObj = document.createElement('div')
		var markedHTMLText = marked(text)// 初步markdown转换
		//使markdown支持引用中的分段
		markedHTMLObj.innerHTML = markedHTMLText.replace(/<\/blockquote>\s{0,1}<blockquote>/g,'');//将可合并的blockquote合并，并添加<br/>，注意</blockquote>和<blockquote>之间会有一到两个\n
		//将code标签中的&lt;转换为<，&amp;转换为&
		var codeEle = markedHTMLObj.getElementsByTagName('code');
		for (var i = 0; i < codeEle.length; i++) {
			codeEle[i].innerText = codeEle[i].innerText.replace(/&lt;/g,'<').replace(/&amp;/g,'&');
		}
		return markedHTMLObj.innerHTML;
	}

	//获取全文	
	function getMattersContent(href){
		if (isMobileScreen()) {
			if (document.getElementById('middle').classList.contains('moved')) {
				document.getElementById("left_list_button").click();//点击后收回列表
			}
		}
		$.ajax({
			url:'/',
	        type:"GET",
	        data:{"type":"matterPage",'matter':nowMatter,'text_id':href.split('?')[1].split('=')[1]},
	        success:function(data){
	        	ajax_window_html = document.getElementById('ajax_window_html');
	        	// 修改matter0内容
	        	if (LINUM == 0){
	        		var virtual_ajax_window_html = document.createElement('div');
	        		virtual_ajax_window_html.innerHTML = data;
	        		var mardownBodyObj = virtual_ajax_window_html.getElementsByClassName('markdown-body')[0];
	        		mardownBodyObj.innerHTML = mardownBodyObj.innerHTML.replace(/\$s\$/g,' ').replace(/\$n\$/g,'\n').replace(/\$t\$/g,'\t')
	        		mardownBodyObj.innerHTML = myMarked(mardownBodyObj);
	        		ajax_window_html.innerHTML = virtual_ajax_window_html.innerHTML;
	        	}

	        	// 修改matter1内容
	        	if (LINUM == 1){
	        		ajax_window_html.innerHTML = data;
	        		var matter1_content = $('#matter1_content').html().trim().split('\n').join('</br>')
	        		$('#matter1_content').html(str2aTag(matter1_content));
	        		//将a标签统一改为在新标签页中打开
		        	var markdown_a = document.getElementById('markdownBody').getElementsByTagName('a');
		        	for (var i = 0; i < markdown_a.length; i++){
		        		markdown_a[i].target="_blank";
		        	}
	        	}

	        	replyButton();
	    }
		})
	}
	window.getMattersContent = getMattersContent;

	function leftClickNeedAjax(){
		var content = $('#'+nowMatter).html().replace(/\s/g, "");
		if (content == '<ul></ul>' || content == ''){
			return true;
		}
		else{
			return false;
		}
	}
	document.getElementById("left_list_button").addEventListener("click", openLeftList);
	document.getElementById("floatLeftListIcon").addEventListener("click", openLeftList);
	
});

function getElemDis(el) {
    var tp = document.documentElement.clientTop,
        lt = document.documentElement.clientLeft,
        rect = el.getBoundingClientRect();
    return {
        top: rect.top - tp,
        right: rect.right - lt,
        bottom: rect.bottom - tp,
        left: rect.left - lt
    }
}

// matter3_3建议
function matter33SendMessage(){

	var comment_to = '';
	var password = '';
	var disabled_name = new Array('emiya','李浩正','李浩正的爸爸','李浩正爸爸');
	var nickname = $('#suggestion_nike_name').val();
	var email = $('#suggestion_user_email').val();
	var content = $('#suggestion_content').val();

	if (isInArray(disabled_name,nickname.toLowerCase()) == true){
		password = prompt("请输入神秘代码","");
    	$.ajax({
	        url:"/",
	        type:"POST",
	        data:{"type":"validatePassword",'password':password},
	        success:function(data){
	        	if (data.password == 'right'){
	        		alert('密码正确！');
	        		$('#suggestion_nike_name').parent().removeClass("error");
	        	}
	        	else{
	        		alert('密码错误！');
	        		$('#suggestion_nike_name').val('');
	        		$('#suggestion_nike_name').parent().addClass("error");
	        		$('#suggestion_nike_name').focus();
	        	}
			}
		})
	}
	if (isNull(content)){
		$('.suggestion-comment-hint').html('提示：建议内容不能为空哦~');
		$('#suggestion_content').parent().addClass("error");
        $('#suggestion_content').focus();
	}
	else{
		$('#suggestion_content').parent().removeClass("error");
		$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"type":"matter33SendMessage","nickname":nickname,"email":email,"content":content},
	        success:function(data){
	        	if (data.statusCode == '1'){
	        		$('.suggestion-comment-hint').html('提示：评论成功！ ღ( ´･ᴗ･` )比心');
	        		$('#suggestion_nike_name').val('');
					$('#suggestion_user_email').val('');
					$('#suggestion_content').val('');
	        	}
	        	else {
	        		$('.suggestion-comment-hint').html('提示：提交失败，请再试一次~');
	        	}
	        }
		})
	}
}

//评论
function windowSendComment(){

	var comment_to = '';
	var password = '';
	var disabled_name = new Array('Emiya','emiya');
	if (reply == 'true'){
		var comment_to = reply_nickname;
	}
	var hash = window.location.hash;
	var nickname = $('#comment_nike_name').val();
	var email = $('#comment_user_email').val();
	var comment = $('#comment_comment').val();
	var matter = nowMatter;
	var text_id = hash.split('?')[1].split('=')[1];
	if (isInArray(disabled_name,nickname) == true){
		password = prompt("使用此昵称需要输入密码","");
    	$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"type":"validatePassword",'password':password},
	        success:function(data){
	        	if (data.password == 'right'){
	        		alert('密码正确！');
	        		$('#comment_nike_name').parent().removeClass("error");
	        	}
	        	else{
	        		alert('密码错误！');
	        		$('#comment_nike_name').val('');
	        		$('#comment_nike_name').parent().addClass("error");
	        		$('#comment_nike_name').focus();
	        	}
			}
		})
	}
	if (isNull(comment)){
		$('.window-comment-hint').html('提示：评论不能为空哦~');
		$('#comment_comment').parent().addClass("error");
        $('#comment_comment').focus();
	}
	else{
		$('#comment_comment').parent().removeClass("error");
		$.ajax({
	        url:"/",
	        type:"POST",
	        async: false,
	        data:{"type":"windowSendComment","nickname":nickname,"email":email,"comment":comment,"matter":matter,"text_id":text_id,'comment_to':comment_to},
	        success:function(data){
	        	if (data.statusCode == '1'){
	        		$('.window-comment-hint').html('提示：评论成功！');
	        		$('#comment_nike_name').val('');
					$('#comment_user_email').val('');
					$('#comment_comment').val('');
	        	}
	        	else {
	        		$('.window-comment-hint').html('提示：发送失败');
	        	}
	        }
		})
	}
	reply = 'false';
}

function get_update_log(){
	$.ajax({
	    url:"/",
	    type:"GET",
	    data:{"type":"getUpdateLog",'matter':nowMatter},
	    success:function(data){
	    	$('.update_log ul').html(data);
	    	var liLength = $('.update_log ul li').length;
	    	$('.update_num').html(liLength);
	    }
	})
}