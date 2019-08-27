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

function sort(){
	let mainListEle = document.getElementById('main_ul').getElementsByTagName('li');
	// 排序
	let sortListHtml = '';
	document.getElementById('time_sort').getElementsByClassName('sort-img')[0].classList.toggle('sort-down');
	for (let i = mainListEle.length - 1; i >= 0; i--) {
		sortListHtml += '<li>' + mainListEle[i].innerHTML.replace('opacity: 1;','opacity: 0;') + '</li>';
	}
	// 添加淡入效果
	document.getElementById('main_ul').classList.add('main-list-opacity-trasition');
	// 放入HTML
	document.getElementById('main_ul').innerHTML = sortListHtml;
	// 淡入
	fadeIn('main-list-a');
	
}

function listFadeIn(){
	// 淡入
	classLength = fadeIn('main-list-a');
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