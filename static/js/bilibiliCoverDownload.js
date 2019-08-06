$(document).ready(function() {
	document.onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) {
            $("#search_button").click();
        }
    };
	document.getElementById('search_button').addEventListener('click', function(){
		var url = document.getElementById('search_url').value;
		if (url.slice(0,15).indexOf('vc.') != -1) {
			var type = 'vc';
		}
		else if (url.slice(0,15).indexOf('live') != -1 || url.slice(0,15).indexOf('zb') != -1) {
			var type = 'live';
		}
		else{
			var type = 'video';
		}
		$.ajax({
			url:"/bilibiliCoverDownload",
			type:"GET",
	        data:{"type":type,"url":url},
	        success:function(data){
	        	alert(document.documentElement.clientWidth,document.documentElement.clientHeight)
	        	if (data.imgUrl != '') {
	        		downloadIamge(data.imgUrl,'哔哩哔哩封面' + Math.floor(Math.random()*1000) + Math.floor(Math.random()*1000))
	        	}
	        	else{
	        		document.getElementById('notFoundVideo').classList.add('not-found-video-active');
	        		setTimeout(function(){document.getElementById('notFoundVideo').classList.remove('not-found-video-active');},2500);
	        	}
	        }
		})
	})
});