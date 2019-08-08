function matterClick(){
    if (URLHASH == undefined){
        return 0;
    }
    $(URLHASH).addClass('active');
    $('#'+nowMatter).css('display','block');
    if (LINUM == 3){
        initializePersonalcenterNav();
    }
    else if (LINUM != 3){
        divFadeIn();
    }
}

function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}

function rememberScrollTop() {
    //FF：document.documentElement.scrollTop
    //IE：document.body.scrollTop
    document.documentElement.scrollTop = document.body.scrollTop = matterScrollTop[nowMatter] || 0;
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
    if (nowMatter == 'matter0' || nowMatter == 'matter1') {
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
        if (isMobileScreen() == true){
            $('#'+nowMatter+' .mobile_beian:last').delay(140*i).fadeIn(10);
        }
    }
    else if(nowMatter == 'matter2'){
        var liLength = $('#'+nowMatter+' .app').length;
        for (var i = 0; i < liLength; i++) {
            const div_ele = $('#'+nowMatter+' .app:eq(' + i +')');
            div_ele.children('.appFadeIn').delay(160*i).fadeIn(400);
        }
    }
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
    if (isMobileScreen()) {
        var floatLeftListIcon = document.getElementsByClassName('list-icon-2');
        if (scrollTop > 80) {
            floatLeftListIcon[0].style.display = 'inline';
            floatLeftListIcon[1].style.display = 'inline';
        }
        else {
            floatLeftListIcon[0].style.display = 'none';
            floatLeftListIcon[1].style.display = 'none';
        }
        
    }
}
window.onscroll = scrollBottom;

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
    var window_img = document.getElementById('mainContent').getElementsByClassName('windowImg')[0];
    var fill_window = document.getElementById('fill_window');
    if (isNull(window_img.innerHTML.replace(/[\r\n]/g,""))){//如果不含有图片
        var ajaxHtml = document.getElementById('ajax_window_html');
        var mainContent = document.getElementById('mainContent');
        var ajaxHtmlHeight = ajaxHtml.offsetHeight + 14;
        var mainContentHeight = mainContent.offsetHeight;
        var fillWindowHeight = mainContentHeight-ajaxHtmlHeight-20;//再减20是为了防止计算误差导致的滚动条出现
        if (fillWindowHeight <= 0){
          fillWindowHeight = 0;
        }
        if (!isMobileScreen()) {
            fillWindowHeight = fillWindowHeight - 30;
        }
    }
    else{
        fillWindowHeight = 10;
    }
    fill_window.style.setProperty('--padding-top',fillWindowHeight+'px');
}

function openLeftList(){
    var middleObj = document.getElementById('middle');
    var leftListObj = document.getElementById('left');
    var bodyObj = document.body;

    var setMaxLeftWidth = 300;
    var setLeftWidthRatio = 0.55;
    var setLeftWidth = clientWidth * setLeftWidthRatio;
    if (setLeftWidth >= setMaxLeftWidth) {
        setLeftWidth = setMaxLeftWidth;
    }
    //打开侧边栏
    if (!middleObj.classList.contains('moved')) {
        try {
            middleMarginLeftBeforeOpen = middleMarginLeftBeforeOpen;
        } catch (err){
            middleMarginLeftBeforeOpen = middleObj.offsetLeft;
        }
        //解决上移bug
        if (!middleObj.classList.contains('initialized') && getElemDis(document.getElementsByClassName('left-avatar')[0])['top'] == '148') {
            $('#left .Wrapper').css('padding-top','0');
            middleObj.classList.add('initialized');
        }
        //end
        middleObj.classList.add('moved');
        leftListObj.style.display = 'inline-block';
        leftListObj.style.left = '0';
        // setTimeout(function(){leftListObj.style.left = '0';},0);
        bodyObj.style.overflowY = "hidden";
        middleObj.style.marginLeft = setLeftWidth + middleMarginLeftBeforeOpen + 'px';
        middleMarginLeftAfterOpen = setLeftWidth + middleMarginLeftBeforeOpen;
    }
    //关闭侧边栏
    else{
        middleMarginLeft = middleObj.offsetLeft;
        middleObj.classList.remove('moved');
        leftListObj.style.left = - setLeftWidth + 'px';
        bodyObj.style.overflowY = "scroll";
        middleObj.style.marginLeft = middleMarginLeftBeforeOpen + 'px';
    }
}

function replyButton() {

    var comment = document.getElementById('windowContent').getElementsByClassName('comment');
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

if (isMobileScreen()) {
    function replyButton() {}
}

function clickReplyButton(obj) {
    document.getElementById("windowComment").scrollIntoView();
    var nickname = obj.parentNode.parentNode.children[0].innerText;
    $('.cancelReply_').parent().html('<a href="javascript:void(0)" onclick="clickReplyButton(this)">回复</a>');
    obj.parentNode.innerHTML = '<a href="javascript:void(0)" class="cancelReply_" onclick="cancelReply()">取消回复</a>';
    $('.window-comment-hint').html('回复：'+ nickname);
    reply = 'true';
    reply_nickname = nickname;
}

function cancelReply(){
    $('.window-comment-hint').html('');
    $('.cancelReply_').parent().html('<a href="javascript:void(0)" onclick="clickReplyButton(this)">回复</a>');
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
    if (str.search(/&lt;a&gt;.*?&lt;\/a&gt;/g) != -1) {
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


function cut_line(ele, reason_lines=2){
    var now_lines = get_ele_lines(ele);
    var look_more = '<span class="look-more">[查看更多]</span>';
    const inner_text = ele.innerText;
    var text = inner_text.substr(0, inner_text.length - 6);
    
    if (now_lines > reason_lines) {
        ele.innerHTML = text.substr(0, text.length - 1) + look_more;
        cut_line(ele, reason_lines);
    }
}

//返回键监听
if (window.history && window.history.pushState) {
    $(window).on('popstate', function() {

        let urlHref = window.location.href;
        let urlHash = urlHref.split('?')[0].split('/')[3];
        let urlSearch = urlHref.split('?')[1];
        if (urlHash == '' || urlHash == '#'){
            urlHash = '#codeDiary';
        }
        try{
            var liNum = $(urlHash).parent().attr('id').split('-')[1];
        }
        catch(err){
            var liNum = 0;
        }
        if (LINUM != liNum) {//返回或前进
            $(urlHash).click();
        }
        if (liNum == 0 || liNum == 1) {
            if (document.getElementById('window').style.display == 'block' && (urlSearch == '' || urlSearch == undefined)) {//此时按返回键则关闭窗口
                $('.windowCloseButton').click();
            }
            if (document.getElementById('window').style.display == 'none' && (urlSearch != '' && urlSearch != undefined)) {//此时按返回键则打开窗口
                var text_id = urlSearch.split('=')[1];
                $(urlHash + text_id.toString()).click();
            }
        }
    });
}

function initializeTimeProgressBar(){
    var myDate = new Date();
    days = 0;
    $('.now-year').html(myDate.getFullYear());
    var bg_width = $('.my-progress-bar-bg').width();
    var mouth2days = {'1':31,'2':28,'3':31,'4':30,'5':31,'6':30,'7':31,'8':31,'9':30,'10':31,'11':30,'12':31};
    var now_mouth = myDate.getMonth();
    for (var i = 0; i < now_mouth; i++) {
        days += mouth2days[i+1];
    }
    days += myDate.getDate();
    $('.my-progress-bar-txt').html((days/3.65).toPrecision(3) + '%');
    $('.my-progress-bar-cover').width(bg_width*days/365);
}
initializeTimeProgressBar();