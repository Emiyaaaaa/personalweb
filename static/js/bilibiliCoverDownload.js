$(document).ready(function() {
	document.onkeydown = function (event) {
        var e = event || window.event;
        if (e && e.keyCode == 13) {
            $("#search_button").click();
        }
    };

    function formattingDate(date){
    	date = String(date);
    	return date.length == 1 ? '0'+date : date;
    }

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
	        	if (data.imgUrl != '') {
	        		let myDate = new Date();
	        		let year = String(myDate.getFullYear());
	        		let month = formattingDate(myDate.getMonth());
	        		let day = formattingDate(myDate.getDay());
	        		let hours = formattingDate(myDate.getDay());
	        		let minutes = formattingDate(myDate.getMinutes());
	        		let seconds = formattingDate(myDate.getSeconds());
	        		downloadIamge(data.imgUrl,'bili_bv_cover_' + year + month + day + hours + minutes + seconds);
	        	}
	        	else{
	        		document.getElementById('notFoundVideo').classList.add('not-found-video-active');
	        		setTimeout(function(){document.getElementById('notFoundVideo').classList.remove('not-found-video-active');},2500);
	        	}
	        }
		})
	})
});