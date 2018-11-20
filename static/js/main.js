function matterClick(){
	if (URLHASH == undefined){
		return 0
	}
	$(URLHASH).addClass('active');
	$('#matter'+LINUM).css('display','block')
	nowMatter = 'matter'+LINUM
	divFadeIn(URLHASH)
}

function openMatter3() {
  var liNum = $(".personalCenter-menu ul li").length
  for (var i = 0; i < liNum; i++) {
    if ('hli-'+i == hli_id) {
      document.getElementById("matter3_" + i).style.display = "block"
    } 
    else {
      document.getElementById("matter3_" + i).style.display = "none"
    }
  }
}

function divFadeIn(urlHash) {
	var num = hashToMatterNum(urlHash)
	var liLength = $('#matter'+num+' ul li').length;
	for (var i = 0; i < liLength; i++) {
		$('#matter'+num+' ul li:eq(' + i +')').delay(140*i).fadeIn();
		if (i > 10){
			$('#matter'+num+' ul li:eq(' + i +')').fadeIn();
		}
	}
}

function getDivPosition(id){
	var left = document.getElementById(id).getBoundingClientRect().left
	var top = document.getElementById(id).getBoundingClientRect().top
	return [left,top]
}

function getClientSize(){
	clientWidth = document.documentElement.clientWidth
	clientHeight = document.documentElement.clientHeight
}


function hashToMatterNum(urlHash){
	return $(urlHash).parent().attr('id').split('-')[1]
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

//personalcenter nav
(function () {

  var target = document.querySelector(".target");
  var links = document.querySelectorAll(".personalCenter-menu a");
  var colors = ["#75f966", "#f88c5b", "#5bf8d4", "#4b88dc", "#d2e633", "#97adfb", "#f970fa"];

  function mouseenterFunc() {
    if (!this.parentNode.classList.contains("active")) {
      for (var i = 0; i < links.length; i++) {
        if (links[i].parentNode.classList.contains("active")) {
          links[i].parentNode.classList.remove("active");
        }
        links[i].style.opacity = "0.25";
      }

      this.parentNode.classList.add("active");
      this.style.opacity = "1";

      var width = this.getBoundingClientRect().width;
      var height = this.getBoundingClientRect().height;
      var left = this.getBoundingClientRect().left + window.pageXOffset;
      var top = this.getBoundingClientRect().top + window.pageYOffset;
      var color = colors[Math.floor(Math.random() * colors.length)];
      hli_id = this.parentNode.id;

      target.style.width = width + "px";
      target.style.height = height + "px";
      target.style.left = left + "px";
      target.style.top = top + "px";
      target.style.borderColor = color;
      target.style.transform = "none";
    }
  }
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseenter", mouseenterFunc)
  }

  function resizeFunc() {
    var active = document.querySelector(".personalCenter-menu li.active");

    if (active) {
      var left = active.getBoundingClientRect().left + window.pageXOffset;
      var top = active.getBoundingClientRect().top + window.pageYOffset;

      target.style.left = left + "px";
      target.style.top = top + "px";
    }
  }

  window.addEventListener("resize", resizeFunc);
  document.getElementsByClassName('target')[0].addEventListener('click',openMatter3);
})();

function fillWindow(){
  
  var ajaxHtml = document.getElementById('ajax_window_html')
  var mainContent = document.getElementById('mainContent')
  var fill_window = document.getElementById('fill_window')
  var ajaxHtmlHeight = ajaxHtml.offsetHeight + 14
  var mainContentHeight = mainContent.offsetHeight-17-17//17为padding
  var fillWindowHeight = mainContentHeight-ajaxHtmlHeight-10//再减10是为了防止计算误差导致的滚动条出现
  if (fillWindowHeight <= 0){
    fillWindowHeight = 0
  }
  // console.log(ajaxHtmlHeight,mainContentHeight)
  fill_window.style.setProperty('--padding-top',fillWindowHeight+'px')

}

function replyButton() {

  var comment = document.getElementsByClassName('comment')
  var replyButton = document.getElementsByClassName('windowReplyButton')
  for (var i = 0; i < comment.length; i++) {
    !function(i){

      comment[i].onmouseover = function (){
        replyButton[i].style.display = 'inline'
      }

      comment[i].onmouseout = function (){
        replyButton[i].style.display = 'none'
      }

    }(i)
  }
}

function clickReplyButton(obj) {

  document.getElementById("windowComment").scrollIntoView()
  var nickname = obj.parentNode.parentNode.children[0].innerText
  $('.window-comment-hint').html('回复：'+ nickname + '<span class="cancelReply"><a href="javascript:void(0)" onclick="cancelReply()">取消回复</a></span>')
  reply = 'true'
  reply_nickname = nickname

}

function cancelReply(){

  $('.window-comment-hint').html('')
  reply = 'false'

}

function isInArray(arr,value){
    var index = $.inArray(value,arr);
    if(index >= 0){
        return true;
    }
    return false;
}