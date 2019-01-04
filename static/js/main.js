function matterClick(){
	if (URLHASH == undefined){
		return 0;
	}
	$(URLHASH).addClass('active');
	$('#'+nowMatter).css('display','block');
	if (LINUM == 3){
		initializePersonalcenterNav();
	}
	else if (LINUM == 1 || LINUM == 0){
		divFadeIn(URLHASH);
	}
}

function addWeatherNevListen(){
	$(".weather-menu li").click(function () {
		$('.weather-menu li').removeClass('active');
		$(this).addClass('active');
		var liNum = $(this).attr('id').split('-')[1];
		$('.weather > div').css('display','none');
		$('.weather .weather-menu').css('display','block');
		$('#w_matter_'+liNum).css('display','block');
	})
}

function divFadeIn() {
	var liLength = $('#'+nowMatter+' ul li').length;
	for (var i = 0; i < liLength; i++) {
		$('#'+nowMatter+' ul li:eq(' + i +')').delay(140*i).fadeIn();
		if (i > 6){
			$('#'+nowMatter+' ul li:eq(' + i +')').fadeIn();
		}
	}
  	$('#'+nowMatter+' .loadStatus:last').delay(140*i).fadeIn(10);
	setTimeout(function(){scrollBottom();},140*i);

}

function scrollBottom(){
	var clients=window.innerHeight;
	var scrollTop=document.documentElement.scrollTop;
	var wholeHeight=document.body.scrollHeight;
	if(clients + scrollTop >= wholeHeight-1){
		getMoreContent();
		window.onscroll = function(){};
	}
}
window.onscroll=scrollBottom;

function getDivPosition(id){
	var left = document.getElementById(id).getBoundingClientRect().left;
	var top = document.getElementById(id).getBoundingClientRect().top;
	return [left,top];
}

function getClientSize(){
	clientWidth = document.documentElement.clientWidth;
	clientHeight = document.documentElement.clientHeight;
}


function hashToMatterNum(urlHash){
	return $(urlHash).parent().attr('id').split('-')[1];
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

function rgb2rgba(strRgb){

  rgb = strRgb.split('(')[1].split(')')[0];
  strRgba = 'rgba('+rgb+',0.8)';
  return strRgba;

}


function fillWindow(){

	var ajaxHtml = document.getElementById('ajax_window_html');
	var mainContent = document.getElementById('mainContent');
	var fill_window = document.getElementById('fill_window');
	var ajaxHtmlHeight = ajaxHtml.offsetHeight + 14;
	var mainContentHeight = mainContent.offsetHeight-17-17;//17为padding
	var fillWindowHeight = mainContentHeight-ajaxHtmlHeight-10;//再减10是为了防止计算误差导致的滚动条出现
	if (fillWindowHeight <= 0){
	  fillWindowHeight = 0;
	}
	fill_window.style.setProperty('--padding-top',fillWindowHeight+'px');

}

function replyButton() {

	var comment = document.getElementsByClassName('comment');
	var replyButton = document.getElementsByClassName('windowReplyButton');
	for (var i = 0; i < comment.length; i++) {
	  !function(i){

	    comment[i].onmouseover = function (){
	      replyButton[i].style.display = 'inline';
	    }

	    comment[i].onmouseout = function (){
	      replyButton[i].style.display = 'none';
	    }

	  }(i)
	}
}

function clickReplyButton(obj) {

	document.getElementById("windowComment").scrollIntoView();
	var nickname = obj.parentNode.parentNode.children[0].innerText;
	$('.window-comment-hint').html('回复：'+ nickname + '<span class="cancelReply"><a href="javascript:void(0)" onclick="cancelReply()">取消回复</a></span>');
	reply = 'true';
	reply_nickname = nickname;

}

function cancelReply(){

	$('.window-comment-hint').html('');
	reply = 'false';

}

function isInArray(arr,value){
	var index = $.inArray(value,arr);
	if(index >= 0){
	  return true;
	}
	return false;
}

function a_tag_transform(text){

	return text;

}