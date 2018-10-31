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