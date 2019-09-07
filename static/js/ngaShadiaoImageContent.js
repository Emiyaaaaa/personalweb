(function () {
	window.onscroll = lazyLoad;
})();

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

function loadImage(imageList){
            console.log(imageList);
    for (var i = 0; i < imageList.length; i++) {

        if (imageList[i] != undefined) {
            let data_src = imageList[i].getAttribute('data-src');
            if (data_src != null){
                imageList[i].setAttribute('src', data_src);
                imageList[i].removeAttribute('data-src');
            }
        }
    }
}


function lazyLoad(){
    let clients = window.innerHeight;
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let wholeHeight = document.body.scrollHeight;
    let floorEle = document.getElementsByClassName('floor');
    imgEleList = []
    for (var i = 0; i < floorEle.length; i++) {
        if(floorEle[i].offsetTop < clients + scrollTop && floorEle[i].offsetTop + floorEle[i].offsetHeight > clients + scrollTop){
            document.getElementById('floor_num').innerText = (i+1) + 'L';
            loadThisFloor(i, scrollTop, clients);
            if (floorEle[i].offsetTop > scrollTop) {
                loadLastFloor(i-1);
            }
            if (floorEle[i].offsetTop + floorEle[i].offsetHeight - clients + scrollTop < 100){
                loadNextFloor(i+1);
            }
            break;
        }
    }
    loadImage(imgEleList);
}

function loadLastFloor(floorNum){
    let floorEle = document.getElementsByClassName('floor')[floorNum];
    if (floorEle != undefined) {
        let imageEle = floorEle.getElementsByTagName('img');
        for (let i = imageEle.length - 1; i > imageEle.length - 3; i--) {
            imgEleList.push(imageEle[i]);
        }
    }
}

function loadNextFloor(floorNum){
    let floorEle = document.getElementsByClassName('floor')[floorNum];
    if (floorEle != undefined) {
        let imageEle = floorEle.getElementsByTagName('img');
        for (let i = 0; i < 2; i++) {
            imgEleList.push(imageEle[i]);
        }
    }
}

function loadThisFloor(floorNum, scrollTop, clients){
    let floorEle = document.getElementsByClassName('floor')[floorNum];
    if (floorEle != undefined) {
        let imageEle = floorEle.getElementsByTagName('img');
        for (var i = 0; i < imageEle.length; i++) {
            if (Math.abs(imageEle[i].offsetTop - (scrollTop + clients/2)) < clients/2 + 500) {// imageEle[i].offsetTop + floorEle.offsetHeight - (scrollTop + clients/2)) < clients/2 + 500
                imgEleList.push(imageEle[i]);
            }
        }
    }
}