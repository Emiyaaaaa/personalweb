$(document).ready(function() {
	var hex = document.getElementsByClassName('hex');
	for (var i = 0; i < hex.length; i++) {
		hex[i].onclick = function(){
			bro_hex = this.parentNode.getElementsByClassName('hex');
			for (var j = 0; j < bro_hex.length; j++) {
				bro_hex[j].classList.remove('active');
			}
			this.classList.add('active');
		}
	}
});