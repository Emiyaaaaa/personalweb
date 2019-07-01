$('.left-menu a').click(function () {
    //导航栏交互
    $('.left-menu a').removeClass('active');
    $(this).addClass('active');
    LINUM = $(this).parent().attr('id').split('-')[1];
    $('#middle > div').css('display','none');
    $('#matter'+LINUM).css('display','block');
    nowMatter = 'matter'+LINUM;
});

//评论
function windowSendComment(){
    var comment_to = '';
    var password = '';
    if (reply == 'true'){
        var comment_to = reply_nickname;
    }
    var hash = window.location.hash;
    var nickname = $('#comment_nike_name').val();
    var email = $('#comment_user_email').val();
    var comment = $('#comment_comment').val();
    var matter = nowMatter;
    var text_id = hash.split('?')[1].split('=')[1];
    if (isNull(comment)){
        $('.window-comment-hint').html('提示：评论不能为空哦~');
        $('#comment_comment').parent().addClass("error");
        $('#comment_comment').focus();
    }
    else{
        $('.window-comment-hint').html('提示：评论成功！');
        $('#comment_nike_name').val('');
        $('#comment_user_email').val('');
        $('#comment_comment').val('');  
    }
    reply = 'false';
}
function matterClick(){
    $('#'+nowMatter).css('display','block');
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
    if (isNull(comment)){
        $('.window-comment-hint').html('提示：评论不能为空哦~');
        $('#comment_comment').parent().addClass("error");
        $('#comment_comment').focus();
    }
    else{
        $('.window-comment-hint').html('提示：评论成功！');
        $('#comment_nike_name').val('');
        $('#comment_user_email').val('');
        $('#comment_comment').val('');  
    }
    reply = 'false';
}