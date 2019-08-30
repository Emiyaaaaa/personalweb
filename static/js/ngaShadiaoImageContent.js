(function () {
	window.onscroll = scrollBottom;
})();

function scrollBottom(){
    var clients = window.innerHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var wholeHeight = document.body.scrollHeight;
    console.log(scrollTop+clients,wholeHeight);
    if(clients + scrollTop >= wholeHeight-1000){
    	if (document.getElementById('scrollLoadFloor').innerText != 'locked') {
    		let floor = document.getElementsByClassName('floor').length;
    		let content_url = urlSearch('content_url');
    		document.getElementById('scrollLoadFloor').innerText = 'locked';
    		getFloor(floor, content_url);
    	}
    }
}

function getFloor(floor, content_url){
	$.ajax({
		url:"/ngaShadiaoImage/getFloor",
        type:"GET",
        data:{"floor":floor, "content_url":content_url},
        success:function(data){
        	$(document.getElementById('mian_content')).append(data);
        	document.getElementById('scrollLoadFloor').innerText = 'unlocked';
        }
	})
}

function urlSearch(key){
	let url = window.location.search.slice(1);
	let urlList = url.split('&');
	let urlDict = {}
	for (var i = 0; i < urlList.length; i++) {
		urlDict[urlList[i].split('=')[0]] = decodeURIComponent(urlList[i].split('=')[1]);
	}
	return urlDict[key];
}