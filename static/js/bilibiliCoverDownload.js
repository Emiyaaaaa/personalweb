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
	        	if (data.imgUrl != '') {
	        		let myDate = new Date();
	        		let year = String(myDate.getFullYear());
	        		let month = String(myDate.getMonth()).length == 1 ? ('0' + String(myDate.getMonth())) : String(myDate.getMonth());
	        		let day = String(myDate.getDay()).length == 1 ? ('0' + String(myDate.getDay())) : String(myDate.getDay());
	        		let hours = String(myDate.getHours()).length == 1 ? ('0' + String(myDate.getHours())) : String(myDate.getHours());
	        		let minutes = String(myDate.getMinutes()).length == 1 ? ('0' + String(myDate.getMinutes())) : String(myDate.getMinutes());
	        		let seconds = String(myDate.getSeconds()).length == 1 ? ('0' + String(myDate.getSeconds())) : String(myDate.getSeconds());
	        		downloadIamge(data.imgUrl,'bili_av' + data.av + '_' + year + month + day + hours + minutes + seconds);
	        	}
	        	else{
	        		document.getElementById('notFoundVideo').classList.add('not-found-video-active');
	        		setTimeout(function(){document.getElementById('notFoundVideo').classList.remove('not-found-video-active');},2500);
	        	}
	        }
		})
	})
});