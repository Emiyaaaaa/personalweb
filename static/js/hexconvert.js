$(document).ready(function() {
	hexBeforeConvert = 2;
	hexAfterConvert = 10;
	covertToNum = {
		'二进制':2,
		'四进制':4,
		'八进制':8,
		'十进制':10,
		'十六进制':16,
		'32进制':32
	};
	value1 = document.getElementById('result1').value;
	value2 = document.getElementById('result2').value;

	var hex = document.getElementsByClassName('hex');
	for (var i = 0; i < hex.length; i++) {
		hex[i].onclick = function(){
			// 选中的情况下再点击点击显示下拉菜单
			if (this.classList.contains('active') && this.classList.contains('other-hex-select-box') && !this.classList.contains('hex-select-active')) {
				// 收回另一个菜单
				let other_hex_menu = document.getElementsByClassName('other-hex-menu');
				for (var i = 0; i < other_hex_menu.length; i++) {
					if (other_hex_menu[i].style.display == 'inline'){
						other_hex_menu[i].style.display = 'none';
						other_hex_menu[i].classList.remove('other-hex-menu-clicked');
						hex_select_menu.classList.remove('hex-select-active');
					}
				}
				// 打开本菜单
				let hex_menu = this.getElementsByClassName('other-hex-menu')[0];
				hex_menu.style.display = 'inline';
				setTimeout(function(){hex_menu.classList.add('other-hex-menu-clicked');},100);//100毫秒用于浏览器渲染hex_menu
				this.classList.add('hex-select-active');
			}

			// 收回本菜单
			else if (this.classList.contains('active') && this.classList.contains('other-hex-select-box') && this.classList.contains('hex-select-active')) {
				let hex_menu = this.getElementsByClassName('other-hex-menu')[0];
				hex_menu.style.display = 'none';
				hex_menu.classList.remove('other-hex-menu-clicked');
				this.classList.remove('hex-select-active');
			}


			// 点击进制按钮转换
			if (!this.classList.contains('active')) {
				let is_value1 = this.parentNode.classList.contains('hex-bar1');
				let up_down = document.getElementsByClassName('convert-button')[0].classList.contains('active');
				let bro_hex = this.parentNode.getElementsByClassName('hex');
				for (var j = 0; j < bro_hex.length; j++) {
					bro_hex[j].classList.remove('active');
				}
				this.classList.add('active');
				// 设置转换前后进制
				if (!this.classList.contains('other-hex-select-box')) {
					if (!up_down^is_value1) {//异或推断过程 E://jzzh.txt
						hexBeforeConvert = covertToNum[this.innerText];
					}
					else{
						hexAfterConvert = covertToNum[this.innerText];
					}
				}
				else {
					let hexText = this.getElementsByClassName('selected-hex')[0].innerText;
					if (!up_down^is_value1) {//异或推断过程 E://jzzh.txt
						hexBeforeConvert = Number(hexText.slice(0,hexText.length-2));
					}
					else{
						hexAfterConvert = Number(hexText.slice(0,hexText.length-2));
					}
				}
				//数值验证
				let this_value_index = is_value1 ? 'result1' : 'result2';
				document.getElementById(this_value_index).value = inputValidation(document.getElementById(this_value_index));
				//进制有变动则开始转换
				hexConvert();
			}
		}
	}

	// 点击任意区域收回下拉菜单
	document.body.addEventListener("click",function (e){
		var flag = true;
		let hex_select_menu = document.getElementsByClassName('hex-select-active')[0];
		for (var i = 0; i < e['path'].length - 2; i++) {
			if (e['path'][i].classList.contains('hex-select-active')) {
				flag = false;
				break;
			}
		}
		if(hex_select_menu != undefined && flag){
			let hex_menu = hex_select_menu.getElementsByClassName('other-hex-menu')[0];
			hex_menu.style.display = 'none';
			hex_menu.classList.remove('other-hex-menu-clicked');
			hex_select_menu.classList.remove('hex-select-active');
		}
	});

	// 下拉菜单内容点击函数
	var other_hex_menu = document.getElementsByClassName('other-hex-menu');
	for (var i = 0; i < other_hex_menu.length; i++) {
		var other_hex_menu_li = other_hex_menu[i].getElementsByTagName('li');
		for (var j = 0; j < other_hex_menu_li.length; j++) {
			other_hex_menu_li[j].onclick = function(){
				let hexText = this.innerText;
				hex = Number(hexText.slice(0,hexText.length-2));
				// 判断进制前后顺序
				let is_value1 = $(this).parents('.hex-bar')[0].classList.contains('hex-bar1');
				let up_down = document.getElementsByClassName('convert-button')[0].classList.contains('active');
				if (!this.classList.contains('other-hex-select-box')) {
					if (!up_down^is_value1) {
						hexBeforeConvert = hex;
					}
					else{
						hexAfterConvert = hex;
					}
				}
				// 替换显示出的进制
				$(this).parents('.other-hex-select-box')[0].getElementsByClassName('selected-hex')[0].innerText = hexText;
				// 进制转换
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

function inputValidation(this_ele){
	let value = this_ele.value;
	var up_down = document.getElementsByClassName('convert-button')[0].classList.contains('active');
	var initial_value = up_down ? value1 : value2;
	if (this_ele != undefined) {
		var hex = !(this_ele.classList.contains('result1')^up_down) ? hexBeforeConvert : hexAfterConvert;
	}
	if (hex <= 10) {
		eval("value = value.replace(/[^\\-0-"+String(hex-1).slice(0,1)+"\\.]/ig,'')");//slice为提高eval函数的安全性而添加，下同
	}
	else{
		eval("value = value.replace(/[^\\-0-9a-"+String.fromCharCode(Number(hex)+86).slice(0,1)+"\\.]/ig,'')");
	}
	
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
	var char = String(char);
	if (char.charCodeAt() <= 57) {
		return Number(char);
	}
	else{
		return char.charCodeAt() - 87;
	}
}

function numToChar(num){
	if (Number(num) <= 9) {
		return String(num);
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
	if (valueBeforeConvert == '' || valueBeforeConvert == undefined) {
		return 0;
	}
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
	if (hexBeforeConvert == hexAfterConvert) {
		var result = unsignedValueBeforeConvert;
	}
	else if (String(getBaseLog(2,hexBeforeConvert)).indexOf('.') == -1 && String(getBaseLog(2,hexAfterConvert)).indexOf('.') == -1){//hexBeforeConvert in [2,4,8,16,32] && hexAfterConvert in [2,4,8,16,32]
		let hex_allTo2_result = hex_allTo2(unsignedValueBeforeConvert);
		var result = hex_2ToAll(hex_allTo2_result);
	}
	else{
		let hex_allTo10_result = hex_allTo10(unsignedValueBeforeConvert);
		var result = hex_10ToAll(hex_allTo10_result);
	}

	result = result.replace(/\.$/g, '');// 去除末尾小数点
	result = result.replace(/^0+\./,'0.')// 去除小数开始的多余0
	if (result.indexOf('.') != -1) {
		result = result.replace(/0+$/g, '').replace(/\.$/g, '');// 去除小数末尾多余0
	}
	if (/^0+\w+\./.test(result)) {
		result = result.replace(/^0+/,'');
	}
	if (result.replace(/^0+/, '') != '' && result.indexOf('.') == -1) {
		result = result.replace(/^0+/, '');// 去除整数部分开始的多余0
	}
	if (result == 0) {
		result = '0';
	}
	result = negativeSigned + result;//添加负号
	if (up_down) {
		if (document.getElementById('result1').value != '') {document.getElementById('result2').value = result;}
	}
	else{
		if (document.getElementById('result2').value != '') {document.getElementById('result1').value = result;}
	}
	console.log(hexBeforeConvert + '进制->' + hexAfterConvert + '进制：',valueBeforeConvert + ' -> ' + result);
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
	}
	// 小数部分
	for (var i = 0; i < decimal.length; i++) {
		let power = - (i + 1);
		decimal_result += Number(charToNum(decimal[i])) * Math.pow(hb,power);
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
		if (i > 50) {break;}
	}while(decimalAfterPoint != '0');
	let result = integer_result + '.' + decimal_result;
	return result;
}

function hex_allTo2(value){
	let value_array = value.split('.');
	value_array[value_array.length] = '';
	value_array[value_array.length] = '';
	let integer = value_array[0];
	let decimal = value_array[1];
	let hb = hexBeforeConvert;
	let integer_result = '';
	let decimal_result = '';
	let zero = ''
	let result = '';

	if (hb == 2) {
		return value;
	}
	let digitsGroupNum = getBaseLog(2,hb);
	for (var i = 0; i < integer.length; i++) {
		let integerGroup = hex_10To2(charToNum(integer[i]));
		for (var j = 0; j < digitsGroupNum - integerGroup.length; j++) {
			zero += '0';
		}
		integerGroup = zero + integerGroup;//整数部分前面补0
		zero = '';
		integer_result += integerGroup;
	}
	for (var i = 0; i < decimal.length; i++) {
		let decimalGroup = hex_10To2(charToNum(decimal[i]));
		for (var j = 0; j < digitsGroupNum - decimalGroup.length; j++) {
			zero += '0';
		}
		decimalGroup = zero + decimalGroup;//小数部分前面补0
		zero = '';
		decimal_result += decimalGroup;
	}
	result = integer_result + '.' + decimal_result;
	return result;
}

function hex_2ToAll(value){
	let value_array = value.split('.');
	value_array[value_array.length] = '';
	value_array[value_array.length] = '';
	let integer = value_array[0];
	let decimal = value_array[1];
	let ha = hexAfterConvert;
	let integer_result = '';
	let decimal_result = '';
	var zero = '';
	var result = '';

	if (ha == 2) {
		return value;
	}
	let digitsGroupNum = getBaseLog(2,ha);
	for (var i = 0; i < digitsGroupNum - integer.length % digitsGroupNum; i++) {
		zero += '0';
	}
	integer = zero + integer;//整数部分前面补0
	for (var i = digitsGroupNum - 1; i < integer.length; i = i + digitsGroupNum) {
		let integerGroup = ''
		for (var j = digitsGroupNum - 1; j >= 0; j--) {
			integerGroup += integer[i - j];
		}
		result += numToChar(hex_2To10(integerGroup));
	}
	result += '.';
	zero = '';
	for (var i = 0; i < digitsGroupNum - decimal.length % digitsGroupNum; i++) {
		zero += '0';
	}
	decimal = decimal + zero;//小数部分后面补0
	for (var i = digitsGroupNum - 1; i < decimal.length; i = i + digitsGroupNum) {
		let decimalGroup = ''
		for (var j = digitsGroupNum - 1; j >= 0; j--) {
			decimalGroup += decimal[i - j];
		}
		result += numToChar(hex_2To10(decimalGroup));
	}
	return result;
}

function hex_2To10(value){
	let integer = value;
	let integer_result = 0;
	for (let i = integer.length-1; i >= 0; i--) {
		let power = integer.length - i - 1;
		integer_result += Number(charToNum(integer[i])) * Math.pow(2,power);
	}
	return integer_result;
}

function hex_10To2(value){
	let integer = value;
	let integer_result = '';
	let integer_quotient = Number(integer);
	do{
		integer_result = numToChar(String(integer_quotient % 2)) + integer_result;
		integer_quotient = Math.floor(integer_quotient / 2);
	}while(integer_quotient != 0);
	return integer_result;
}

// 使用说明展示与收回
function showInstructions(this_ele){
	this_ele.classList.toggle('instructions-button-active');
	document.getElementById('instructionsText').classList.toggle('instructions-text-active');
}

//百度站长自动推送
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();