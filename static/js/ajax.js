$(document).ready(function() {
	//主页面
	function mainPage() {
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
		    window.onscroll=scrollBottom;
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
	})


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
						$('.'+nowMatter+' .loadStatus:last').css('display','none');
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

	//获取全文	
	function getMattersContent(href){
		$.ajax({
			url:'/',
	        type:"GET",
	        data:{"type":"matterPage",'matter':nowMatter,'text_id':href.split('?')[1].split('=')[1]},
	        success:function(data){
	        	$('#ajax_window_html').html(data);
	        	try{
	        		$('.markdown-body').html(marked($('.markdown-body').html()));
	        	}
	        	catch(err){}
	        	try{
	        		$('#matter1_content').html(str2aTag($('#matter1_content').html()))
	        	}
	        	catch(err){}
	        	var markdown_a = $('.markdown-body a');
	        	for (var i = 0; i < markdown_a.length; i++){
	        		markdown_a[i].target="_blank";
	        	}
	        	fillWindow();
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

	document.getElementById("left_list_button").addEventListener("click", function openLeftList(){
		//动画
		var middleObj = document.getElementById('middle');
		var leftListObj = document.getElementById('left');
		if (!middleObj.classList.contains('moved')) {
			middleObj.classList.add('moved');
			leftListObj.style.display = 'inline-block';
	 		setTimeout(function(){leftListObj.style.left = '0%';},0);
			middleObj.style.marginLeft = '60%';
		}
		else{
			middleObj.classList.remove('moved');
			leftListObj.style.left = '-55%';
	 		setTimeout(function(){leftListObj.style.display = 'none';},250);
			middleObj.style.marginLeft = '5%';
		}
	})
});

// matter3_3建议
function matter33SendMessage(){

	var comment_to = '';
	var password = '';
	var disabled_name = new Array('Emiya','emiya');
	var nickname = $('#suggestion_nike_name').val();
	var email = $('#suggestion_user_email').val();
	var content = $('#suggestion_content').val();

	if (isInArray(disabled_name,nickname) == true){
		password = prompt("使用此昵称需要输入密码","");
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
	        		$('.window-comment-hint').html('提示：评论成功！ ღ( ´･ᴗ･` )比心');
	        		$('#comment_nike_name').val('');
					$('#comment_user_email').val('');
					$('#comment_comment').val('');
	        	}
	        	else {
	        		$('.window-comment-hint').html('提示：提交失败，请再试一次~');
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
	    	$('.update_version').html('(版本: 1.0 更新数: '+liLength+')');
	    }
	})
}