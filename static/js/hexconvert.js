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
	value1 = document.getElementById('result1').value;
	value2 = document.getElementById('result2').value;


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
				hexConvert();
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
	var is_value1 = this_ele.classList.contains('result1');
	var initial_value = is_value1 ? value1 : value2;
	var hex = this_ele.classList.contains('hex-before-convert') ? hexBeforeConvert : hexAfterConvert;
	var hexToReg = {
		2:value.replace(/[^0-1\.]/g,''),
		4:value.replace(/[^0-3\.]/g,''),
		8:value.replace(/[^0-7\.]/g,''),
		10:value.replace(/[^0-9\.]/g,''),
		16:value.replace(/[^a-fA-F0-9\.]/g,''),
		32:value.replace(/[^a-hA-Hj-nJ-Np-rP-Rt-yT-Y0-9\.]/g,''),
	}
	var value = hexToReg[hex];
	//去除放在首位的小数点
	value = value.replace(/^\.+/g, '');
	//去除末尾多余的小数点
	var reg1 = /^[0-9a-zA-Z]+\.$/;
	var reg2 = /^[0-9a-zA-Z]+\.+$/;
	var reg3 = /^[0-9a-zA-Z]+\.[0-9a-zA-Z]+$/;
	var reg4 = /^[0-9a-zA-Z]+\.[0-9a-zA-Z]+\.+$/;
	if (!reg1.test(value) && reg2.test(value)){
		value = value.replace(/\.+$/g, '.');
	}
	if (!reg3.test(value) && reg4.test(value)){
		value = value.replace(/\.+$/g, '');
	}
	//若输入有变动则开始实时转换
	if (initial_value != value) {
		let result = hexConvert();
		if (is_value1) {
			document.getElementById('result2').value = result;
		}
		else{
			document.getElementById('result1').value = result;
		}
	}
	return value;
}

function hexConvert(){
	value1 = document.getElementById('result1').value;
	value2 = document.getElementById('result2').value;
	up_down = document.getElementsByClassName('convert-button')[0].classList.contains('convert-button-active');
	valueBeforeConvert = up_down ? value1 : value2;
	console.log(valueBeforeConvert,hexBeforeConvert,hexAfterConvert);
	var hexToFun = {
		// '2,2':hex2_2(),
		// '2,4':hex2_4(),
		// '2,8':hex2_8(),
		'2,10':hex2_10(),
		// '2,16':hex2_16(),
		// '2,32':hex2_32(),
		// '4,2':hex4_2(),
		// '4,4':hex4_4(),
		// '4,8':hex4_8(),
		// '4,10':hex4_10(),
		// '4,16':hex4_16(),
		// '4,32':hex4_32(),
		// '8,2':hex8_2(),
		// '8,4':hex8_4(),
		// '8,8':hex8_8(),
		// '8,10':hex8_10(),
		// '8,16':hex8_16(),
		// '8,32':hex8_32(),
		// '10,2':hex10_2(),
		// '10,4':hex10_4(),
		// '10,8':hex10_8(),
		// '10,10':hex10_10(),
		// '10,16':hex10_16(),
		// '10,32':hex10_32(),
		// '16,2':hex16_2(),
		// '16,4':hex16_4(),
		// '16,8':hex16_8(),
		// '16,10':hex16_10(),
		// '16,16':hex16_16(),
		// '16,32':hex16_32(),
		// '32,2':hex32_2(),
		// '32,4':hex32_4(),
		// '32,8':hex32_8(),
		// '32,10':hex32_10(),
		// '32,16':hex32_16(),
		// '32,32':hex32_32()
	}
	hex_array = [hexBeforeConvert,hexAfterConvert];
	return hexToFun[String(hex_array)];
}

function hex2_10(){
	return valueBeforeConvert;
}