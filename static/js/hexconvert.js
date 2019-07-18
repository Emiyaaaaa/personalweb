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
	};
	value1 = document.getElementById('result1').value;
	value2 = document.getElementById('result2').value;

	// 点击显示下拉菜单
	var hex_select_box = document.getElementsByClassName('other-hex-select-box');
	console.log(hex_select_box[0])
	for (var i = 0; i < hex_select_box.length; i++) {
		hex_select_box[i].onclick = function(){
			let hex_menu = this.getElementsByClassName('other-hex-menu')[0];
			hex_menu.style.height = '272px';
			hex_menu.style.display = 'inline';
		}
	}
	
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
				if (!up_down^is_value1) {//异或推断过程 E://jzzh.txt
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
				hexConvert();
			}
		}
	}
});

function inputValidation(this_ele,value){
	var up_down = document.getElementsByClassName('convert-button')[0].classList.contains('active');
	var initial_value = up_down ? value1 : value2;
	var hex = !(this_ele.classList.contains('result1')^up_down) ? hexBeforeConvert : hexAfterConvert;
	var hexToReg = {
		2:value.replace(/[^\-0-1\.]/g,''),
		4:value.replace(/[^\-0-3\.]/g,''),
		8:value.replace(/[^\-0-7\.]/g,''),
		10:value.replace(/[^\-0-9\.]/g,''),
		16:value.replace(/[^\-a-fA-F0-9\.]/g,''),
		32:value.replace(/[^\-a-uA-U0-9\.]/g,''),
	}
	var value = hexToReg[hex];
	//去除放在首位的小数点
	value = value.replace(/^\.+/g, '');
	//去除末尾多余的小数点
	var reg1 = /^[\-0-9a-zA-Z]+\.$/;
	var reg2 = /^[\-0-9a-zA-Z]+\.+$/;
	var reg3 = /^[\-0-9a-zA-Z]+\.[0-9a-zA-Z]+$/;
	var reg4 = /^[\-0-9a-zA-Z]+\.[0-9a-zA-Z]+\.+$/;
	if (!reg1.test(value) && reg2.test(value)){
		value = value.replace(/\.+$/g, '.');
	}
	if (!reg3.test(value) && reg4.test(value)){
		value = value.replace(/\.+$/g, '');
	}
	//去除多余负号
	if (value.indexOf('-') != -1) {
		if (/^-/.test(value)) {
			value = '-' + value.replace(/\-+/g,'');
		}
		else{
			value = value.replace(/\-+/g,'');
		}
	}
	//若输入有变动则开始实时转换
	if (initial_value != value) {
		hexConvert();
	}
	return value;
}

function charToNum(char){
	if (char.charCodeAt() <= 57) {
		return Number(char);
	}
	else{
		return char.charCodeAt()-87;
	}
}

function numToChar(num){
	if (Number(num) <= 9) {
		return num;
	}
	else{
		return String.fromCharCode(Number(num) + 87);
	}
}

function hexConvert(){
	value1 = document.getElementById('result1').value;
	value2 = document.getElementById('result2').value;
	var up_down = document.getElementsByClassName('convert-button')[0].classList.contains('active');
	valueBeforeConvert = up_down ? value1 : value2;
	// console.log(valueBeforeConvert,hexBeforeConvert,hexAfterConvert);
	//处理负号
	if (valueBeforeConvert.indexOf('-') != -1) {
		var unsignedValueBeforeConvert = String(valueBeforeConvert.slice(1));
		var isNegative = true;
	}
	else{
		var unsignedValueBeforeConvert = String(valueBeforeConvert);
		var isNegative = false
	}
	let negativeSigned = isNegative ? '-' : ''
	// if (hexAfterConvert ) {}
	if (hexBeforeConvert == hexAfterConvert) {
		result = unsignedValueBeforeConvert;
	}
	// else if (String(getBaseLog(2,hexBeforeConvert)).indexOf('.') == -1 && String(getBaseLog(2,hexAfterConvert)).indexOf('.') == -1){//hexBeforeConvert in [2,4,8,16,32] && hexAfterConvert in [2,4,8,16,32]

	// }
	else{
		let hex_allTo10_result = hex_allTo10(unsignedValueBeforeConvert);
		var result = hex_10ToAll(hex_allTo10_result);
	}

	result = negativeSigned + result;//添加负号
	result = result.replace(/\.$/g, '');//去除末尾小数点
	if (result.replace(/^\-{0,1}0+/g, '') != '') {//去除开始的多余0
		result = /^\-/.test(result) ? result.replace(/^\-{0,1}0+/g, '-') : result.replace(/^\-{0,1}0+/g, '');
		if (result.indexOf('.') != -1) {//去除小数末尾多余0
			result = result.replace(/0+$/g, '').replace(/\.$/g, '');
		}
	}
	if (result == 0) {
		if (/^-/.test(result)) {
			result = '-0';
		}
		else result = '0';
	}
	if (up_down) {
		if (document.getElementById('result1').value != '') {document.getElementById('result2').value = result;}
	}
	else{
		if (document.getElementById('result2').value != '') {document.getElementById('result1').value = result;}
	}
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

function hex_allTo10(value){
	let value_array = value.split('.');
	value_array[value_array.length] = '';
	value_array[value_array.length] = '';
	let integer = value_array[0];
	let decimal = value_array[1];
	let hb = hexBeforeConvert;
	let integer_result = 0;
	let decimal_result = 0;
	if (hb == 10) {
		return value;
	}
	// 整数部分
	for (let i = integer.length-1; i >= 0; i--) {
		let power = integer.length - i - 1;
		integer_result += Number(charToNum(integer[i])) * Math.pow(hb,power);
		console.log(integer[i],charToNum[integer[i]],charToNumFun(integer[i]))

	}
	// 小数部分
	for (var i = 0; i < decimal.length; i++) {
		let power = - (i + 1);
		decimal_result += Number(charToNum(decimal[i])) * Math.pow(hb,power);
		console.log(decimal[i],charToNum[decimal[i]],charToNumFun(decimal[i]))


	}
	let result = String(integer_result + decimal_result);
	return result;
}

function hex_10ToAll(value){
	let value_array = value.split('.');
	value_array[value_array.length] = '';
	value_array[value_array.length] = '';
	let integer = value_array[0];
	let decimal = value_array[1];
	let ha = hexAfterConvert;
	let integer_result = '';
	let decimal_result = '';
	if (ha == 10) {
		return value;
	}
	// 整数部分
	let integer_quotient = Number(integer);
	do{
		integer_result = numToChar(String(integer_quotient % ha)) + integer_result;

		integer_quotient = Math.floor(integer_quotient / ha);
	}while(integer_quotient != 0);
	// 小数部分
	let decimalAfterPoint = '';
	let i = 0;
	decimal = Number('0.'+decimal);
	do{
		if (decimal == 0) {break;}
		decimal = decimal * ha;
		decimal_result += numToChar(String(decimal).split('.')[0]);
		decimalAfterPoint = String(decimal).split('.')[1];
		decimal = Number('0.'+decimalAfterPoint);
		if (decimalAfterPoint == undefined) {break;}
		i++;
		if (i > 30) {break;}
	}while(decimalAfterPoint != '0');
	let result = integer_result + '.' + decimal_result;
	return result;
}

function hex_2ToAll(){
	let value_array = value.split('.');
	value_array[value_array.length] = '';
	value_array[value_array.length] = '';
	let integer = value_array[0];
	let decimal = value_array[1];
	let ha = hexAfterConvert;

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