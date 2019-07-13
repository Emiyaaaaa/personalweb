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
				let is_value1 = this.parentNode.classList.contains('hex-bar1');
				let up_down = document.getElementsByClassName('convert-button')[0].classList.contains('active');
				var bro_hex = this.parentNode.getElementsByClassName('hex');
				for (var j = 0; j < bro_hex.length; j++) {
					bro_hex[j].classList.remove('active');
				}
				this.classList.add('active');
				if (!up_down^is_value1) {//异或推断 E://jzzh.txt
					hexBeforeConvert = covertToNum[this.innerText];
				}
				else{
					hexAfterConvert = covertToNum[this.innerText];
				}
				//进制有变动则开始转换
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
				console.log(hexBeforeConvert,hexAfterConvert);

			}
		}
	}
});

function inputValidation(this_ele,value){
	let up_down = document.getElementsByClassName('convert-button')[0].classList.contains('active');
	var initial_value = up_down ? value1 : value2;
	var hex = this_ele.classList.contains('result1') ? hexBeforeConvert : hexAfterConvert;
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
		hexConvert();
	}
	return value;
}

function hexConvert(){
	value1 = document.getElementById('result1').value;
	value2 = document.getElementById('result2').value;
	let up_down = document.getElementsByClassName('convert-button')[0].classList.contains('active');
	valueBeforeConvert = up_down ? value1 : value2;
	console.log(valueBeforeConvert,hexBeforeConvert,hexAfterConvert);
	var hexToFun = {
		'2,2':hex2_2(),
		'2,4':hex2_4(),
		'2,8':hex2_8(),
		'2,10':hex2_10(),
		'2,16':hex2_16(),
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
	let result = hexToFun[String(hex_array)];
	result = result.replace(/\.$/g, '');//去除末尾小数点
	if (result.replace(/^0+/g, '') != '') {//去除开始的多余0
		result = result.replace(/^0+/g, '');
		if (result.indexOf('.') != -1) {//去除小数末尾多余0
			result = result.replace(/0+$/g, '');
		}
	}
	if (result == 0) {
		result = 0;
	}
	if (up_down) {
		if (document.getElementById('result1').value != '') {document.getElementById('result2').value = result;}
	}
	else{
		if (document.getElementById('result2').value != '') {document.getElementById('result1').value = result;}
	}
}

function hex2_2(){
	return valueBeforeConvert;
}

function hex2_4(){
	let value = String(valueBeforeConvert);
	let result = '';
	let num2_4 = {
		'00':'0',
		'01':'1',
		'10':'2',
		'11':'3'
	}
	let value_array = value.split('.');
	value_array[value_array.length] = '';
	let integer = value_array[0];
	let decimal = value_array[1];
	if (integer.length%2 == 1){
		integer = '0' + integer;
	}
	for (var i = 1; i < integer.length; i = i + 2) {
		result += num2_4[integer[i-1] + integer[i]];
	}
	result += '.';
	if (decimal.length%2 == 1 && decimal.length != 0){
		decimal = decimal + '0';
	}
	for (var i = 1; i < decimal.length; i = i + 2) {
		result += num2_4[decimal[i-1] + decimal[i]];
	}
	return result;
}

function hex2_8(){
	let value = String(valueBeforeConvert);
	let result = '';
	let zero = '';
	let num2_8 = {
		'000':'0',
		'001':'1',
		'010':'2',
		'011':'3',
		'100':'4',
		'101':'5',
		'110':'6',
		'111':'7'
	}
	let value_array = value.split('.');
	value_array[value_array.length] = '';
	let integer = value_array[0];
	let decimal = value_array[1];
	for (var i = 0; i < 3 - integer.length%3; i++) {
		zero += '0';
	}
	integer = zero + integer;//整数部分前面补0
	for (var i = 2; i < integer.length; i = i + 3) {
		result += num2_8[integer[i-2] + integer[i-1] + integer[i]];
	}
	result += '.';
	for (var i = 0; i < 3 - decimal.length%3; i++) {
		zero += '0';
	}
	decimal = decimal + zero;//小数部分后面补0
	for (var i = 2; i < decimal.length; i = i + 3) {
		result += num2_8[decimal[i-2] + decimal[i-1] + decimal[i]];
	}
	return result;
}

function hex2_16(){
	let value = String(valueBeforeConvert);
	let result = '';
	let zero = '';
	let num2_16 = {
		'0000':'0',
		'0001':'1',
		'0010':'2',
		'0011':'3',
		'0100':'4',
		'0101':'5',
		'0110':'6',
		'0111':'7',
		'1000':'8',
		'1001':'9',
		'1010':'a',
		'1011':'b',
		'1100':'c',
		'1101':'d',
		'1110':'e',
		'1111':'f',
	}
	let value_array = value.split('.');
	value_array[value_array.length] = '';
	let integer = value_array[0];
	let decimal = value_array[1];
	for (var i = 0; i < 4 - integer.length%4; i++) {
		zero += '0';
	}
	integer = zero + integer;//整数部分前面补0
	for (var i = 3; i < integer.length; i = i + 4) {
		result += num2_16[integer[i-3] + integer[i-2] + integer[i-1] + integer[i]];
	}
	result += '.';
	for (var i = 0; i < 4 - decimal.length%4; i++) {
		zero += '0';
	}
	decimal = decimal + zero;//小数部分后面补0
	for (var i = 3; i < decimal.length; i = i + 4) {
		result += num2_16[decimal[i-3] + decimal[i-2] + decimal[i-1] + decimal[i]];
	}
	return result;
}

function hex2_32(){
	let value = String(valueBeforeConvert);
	let result = '';
	let zero = '';
	let num2_16 = {
		'0000':'0',
		'0001':'1',
		'0010':'2',
		'0011':'3',
		'0100':'4',
		'0101':'5',
		'0110':'6',
		'0111':'7',
		'1000':'8',
		'1001':'9',
		'1010':'a',
		'1011':'b',
		'1100':'c',
		'1101':'d',
		'1110':'e',
		'1111':'f',
	}
	let value_array = value.split('.');
	value_array[value_array.length] = '';
	let integer = value_array[0];
	let decimal = value_array[1];
	for (var i = 0; i < 5 - integer.length%5; i++) {
		zero += '0';
	}
	integer = zero + integer;//整数部分前面补0
	for (var i = 4; i < integer.length; i = i + 5) {
		result += num2_16[integer[i-4] + integer[i-3] + integer[i-2] + integer[i-1] + integer[i]];
	}
	result += '.';
	for (var i = 0; i < 5 - decimal.length%5; i++) {
		zero += '0';
	}
	decimal = decimal + zero;//小数部分后面补0
	for (var i = 4; i < decimal.length; i = i + 5) {
		result += num2_16[decimal[i-4] + decimal[i-3] + decimal[i-2] + decimal[i-1] + decimal[i]];
	}
	return result;
}

function hex2_10(){
	return valueBeforeConvert;
}