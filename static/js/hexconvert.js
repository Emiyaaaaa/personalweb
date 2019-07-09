$(document).ready(function() {
	hexBeforeConvert = 2;
	hexAfterConvert = 10;
	covertToNum = {
		'二进制':2,
		'四进制':4,
		'八进制':8,
		'十进制':10,
		'十六进制':16,
		'三十二进制':32,
	}
	// 点击进制按钮转换
	var hex = document.getElementsByClassName('hex');
	for (var i = 0; i < hex.length; i++) {
		hex[i].onclick = function(){
			if (!this.classList.contains('active')) {
				var bro_hex = this.parentNode.getElementsByClassName('hex');
				for (var j = 0; j < bro_hex.length; j++) {
					bro_hex[j].classList.remove('active');
				}
				this.classList.add('active');
				if (this.parentNode.classList.contains('hex-before-convert')) {
					hexBeforeConvert = covertToNum[this.innerText];
				}
				else if(this.parentNode.classList.contains('hex-after-convert')) {
					hexAfterConvert = covertToNum[this.innerText];
				}
				hexConvert(hexBeforeConvert,hexAfterConvert);
			}
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
				//交换进制前后顺序
				var a = hexAfterConvert;
				hexAfterConvert = hexBeforeConvert;
				hexBeforeConvert = a;
			}
		}
	}
});

function inputValidation(this_ele,value){
	var hex = this_ele.classList.contains('hex-before-convert') ? hexBeforeConvert : hexAfterConvert;
	hexToReg = {
		2:value.replace(/[^0-1\.]/g,''),
		4:value.replace(/[^0-3\.]/g,''),
		8:value.replace(/[^0-7\.]/g,''),
		10:value.replace(/[^0-9\.]/g,''),
		16:value.replace(/[^a-fA-F0-9\.]/g,''),//好像可以不用加转义符
		32:value.replace(/[^a-hA-Hj-nJ-Np-rP-Rt-yT-Y0-9\.]/g,''),
	}
	var value = hexToReg[hex];
	value = value.replace(/^\.+/g, '')//去除放在首位的小数点

	console.log(value)
	return value
}

function hexConvert(hexBeforeConvert,hexAfterConvert){
	var b
}