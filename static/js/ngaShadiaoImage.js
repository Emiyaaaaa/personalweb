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

}

$(document).ready(function() {
	function listFadeIn(){
		let list = document.getElementsByClassName('main-list');
		for (var i = 0; i < list.length; i++) {
			setTimeout(function(){
				console.log(list[i]);
				list[i].style.opacity = '1';
			}, i*100);
		}
		// setTimeout(function(){
		// 	document.getElementById('main_ul').classList.toggle('main-list-transition');
		// }, i*100);

	}
	listFadeIn();

});