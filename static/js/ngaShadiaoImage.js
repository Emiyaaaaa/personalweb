$(document).ready(function() {
	listFadeIn();
});

function control(this_ele){
	$.ajax({
		url:"/ngaShadiaoImage",
        type:"POST",
        data:{"type":this_ele.innerText},
        success:function(data){
        	console.log(data)
        }
	})
}

function sort(this_ele){
	let mainListEle = document.getElementsByClassName('main-list');
	// 排序
	
	// 先清除
	document.getElementById('main_ul').classList.add('main-list-opacity-trasition');
	for (var i = 0; i < mainListEle.length; i++) {
		mainListEle[i].style.opacity = '0';
	}
	// 后淡入
	fadeIn('main-list')
}

function listFadeIn(){
	// 淡入
	classLength = fadeIn('main-list');
	// 去除opacity的动画效果（opacity变为0的动画效果）
	setTimeout(function(){
		document.getElementById('main_ul').classList.remove('main-list-opacity-trasition');
	}, (classLength)*100);

}

function fadeIn(className){
	let classEle = document.getElementsByClassName(className);
	for (let i = 0; i < classEle.length; i++) {
		setTimeout(function(){
			classEle[i].style.opacity = '1';
		}, i*100);
	}
	return classEle.length;
}