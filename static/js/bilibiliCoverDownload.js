$(document).ready(function() {
	document.onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) {
            $("#search_button").click();
        }
    };
	document.getElementById('search_button').addEventListener('click', function(){
		var url = document.getElementById('search_url').value;
		if (url.slice(0,15).indexOf('live') != -1 || url.slice(0,15).indexOf('zb') != -1) {
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
	        	if (data.imgUrl != '') {
	        		downloadIamge(data.imgUrl,'哔哩哔哩封面' + Math.floor(Math.random()*1000) + Math.floor(Math.random()*1000))
	        	}
	        	else{
	        		alert('未找到视频')
	        	}
	        }
		})
	})
});