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

function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}

function rememberScrollTop() {
	//FF：document.documentElement.scrollTop
	//IE：document.body.scrollTop
	console.log(matterScrollTop[nowMatter])
	document.documentElement.scrollTop = document.body.scrollTop = matterScrollTop[nowMatter] || 0;
}

function isPC() {
   var userAgentInfo = navigator.userAgent;
   var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod"];
   var flag = true;
   for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
         flag = false;
         break;
      }
   }
   return flag;
}
// console.log(isPC())

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
		const li_ele = $('#'+nowMatter+' ul li:eq(' + i +')');
		if (i<=6){
			li_ele.delay(140*i).fadeIn();
			setTimeout(function(){check_lines_length(li_ele)},140*i+5);
		}
		else{
			li_ele.delay(140*6).fadeIn();
			setTimeout(function(){check_lines_length(li_ele)},140*6+5);
		}
	}
  	$('#'+nowMatter+' .loadStatus:last').delay(140*i).fadeIn(10);
	setTimeout(function(){scrollBottom();},140*i);

}

function scrollBottom(){
	var clients = window.innerHeight;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var wholeHeight = document.body.scrollHeight;
	if(clients + scrollTop >= wholeHeight-1){
		var reason = getMoreContent();
		if (reason == true){
			window.onscroll = function(){};
		}
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
	var fillWindowHeight = mainContentHeight-ajaxHtmlHeight-12;//再减12是为了防止计算误差导致的滚动条出现
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

// 转换窗口中的a标签
function str2aTag(str){

	if (str.search(/&lt;a&gt;.*?&lt;\/a&gt;/g) != -1)
	{
		var qa = str.search(/&lt;a&gt;http:\/\//g);
		var qas = str.search(/&lt;a&gt;https:\/\//g);
		var ha = str.search(/&lt;\/a&gt;/g);
		if (qa != -1){
			var url = str.substring(qa+16,ha);
			http = 'http://';
		}
		else{
			var url = str.substring(qas+17,ha);
			http = 'https://';
		}
		var html = '<a href="'+http+url+'" target="_blank" class="window_aTag">'+url+'</a>';
		str = str.replace(/&lt;a&gt;.*?&lt;\/a&gt;/g,html);
		str2aTag(str);
	}
	return str;

}

function rtrim(s){
    return s.replace(/(\s*$)/g, "");
}

function get_ele_lines(ele){
	var styles = window.getComputedStyle(ele, null);
 	var lh = parseInt(styles.lineHeight, 10);
 	var h = ele.clientHeight;
 	var lc = Math.round(h/lh);
 	return lc;
}

function check_lines_length(chooseEle = 0){
	const look_more = '<span class="look-more">[查看更多]</span>';
	var chooseEle = chooseEle[0];//jquary对象转为js对象
	var text_ele = chooseEle.getElementsByClassName('brief-content-text')['0'];
	var title_ele = chooseEle.getElementsByClassName('title')['0'];
	if (typeof(title_ele) != "undefined"){
		var title_lines = get_ele_lines(title_ele);
		if(title_lines == 1){
			cut_line(text_ele,1);
		}
		else if(title_lines >= 2){
			title_ele.innerHTML += look_more;
			text_ele.innerHTML = '';
			cut_line(title_ele,2);
		}
 	}
	else{
		cut_line(text_ele,2)
	}
	chooseEle.classList.remove("unchecked");
	chooseEle.classList.add("checked");
}


function cut_line(ele,reason_lines=2){

	var now_lines = get_ele_lines(ele);
	const innerText = ele.innerHTML;
	var text = innerText.trim();//去除首尾空格
	var look_more = '<span class="look-more">[查看更多]</span>';
	if (now_lines > reason_lines) {
		ele.innerHTML = text.substr(0,text.length - look_more.length - 1) + look_more;
		cut_line(ele,reason_lines);
	}
}