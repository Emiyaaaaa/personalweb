$(document).ready(function() {
	// 点击进制按钮转换
	var hex = document.getElementsByClassName('hex');
	for (var i = 0; i < hex.length; i++) {
		hex[i].onclick = function(){
			var bro_hex = this.parentNode.getElementsByClassName('hex');
			for (var j = 0; j < bro_hex.length; j++) {
				bro_hex[j].classList.remove('active');
			}
			this.classList.add('active');
		}
	}

	// 点击按钮背景转换效果
	var covert_button = document.getElementsByClassName('convert-button');
	var bc_square = document.getElementById('bc_square');
	for (var i = 0; i < covert_button.length; i++) {
		covert_button[i].onclick = function(){
			if (!this.classList.contains('active')) {
				bre_button = this.parentNode.getElementsByClassName('convert-button');
				for (var j = 0; j < bre_button.length; j++) {
					bre_button[j].classList.remove('active');
				}
				this.classList.add('active');
				bc_square.classList.toggle('bc-square-active');
			}

		}
	}
});