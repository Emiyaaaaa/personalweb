(function () {
	
})();
$(document).ready(function() {
	console.log(document.getElementById('main'))
	document.getElementById('main').onscroll = scrollBottom;
});


function scrollBottom(){
    var clients = window.innerHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var wholeHeight = document.body.scrollHeight;
    console.log(scrollTop,clients)
}