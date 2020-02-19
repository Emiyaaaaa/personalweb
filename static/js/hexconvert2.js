hexBeforeConvert = 10;
hexAfterConvert = 2;
covertToNum = {
	'二进制':2,
	'四进制':4,
	'八进制':8,
	'十进制':10,
	'十六进制':16,
	'32进制':32
};
value1 = document.getElementById('input1').value;
value2 = document.getElementById('input2').value;

var hex = document.getElementsByClassName('hex');

// 初始化
(function(){
	var hex1 = 10,
		hex2 = 2,
		inputBox = document.getElementsByClassName('hex-input');
	// 初始化进制
	inputBox[0].dataset.hex = hex1;
	inputBox[1].dataset.hex = hex2;
	// 初始化hc属性
	inputBox[0].hc = {};
	inputBox[1].hc = {};
	// 性能优化
	var hc0 = inputBox[0].hc,
		hc1 = inputBox[1].hc;
	// 初始化转换顺序（是否为转换前的数字，可编辑即为转换前的数字）
	hc0.editable = true;
	hc1.editable = false;
})();


// 绑定输入框验证事件
var inputBox = document.getElementsByClassName('hex-input');
for (let i = 0,len = inputBox.length; i < len; i++) {
	EventUtil.addHandler(inputBox[i],'textInput',inputValidation);
}

// 绑定进制按钮点击事件
var hexButton = document.getElementsByClassName('hex');
for (let i = 0, len = hexButton.length; i < len; i++) {
	EventUtil.addHandler(hexButton[i],'click',hexButtonClickEvent);
}
// 取消掉32进制的按钮点击事件，绑定其特有的点击事件
var hex32Button = document.getElementsByClassName('other-hex-select-box');
for (let i = 0, len = hex32Button.length; i < len; i++) {
	EventUtil.removeHandler(hex32Button[i],'click',hexButtonClickEvent);
	EventUtil.addHandler(hex32Button[i],'click',hexMenuButtonClickEvent);
}

// 绑定全局点击关闭下拉列表事件
EventUtil.addHandler(document,'click',closeHexMenu);

// 绑定进制选择框下拉列表中的进制点击事件
var hexOption = document.getElementsByTagName('li');
for (let i = 0, len = hexOption.length; i < len; i++) {
	EventUtil.addHandler(hexOption[i],'click',hexOptionClickEvent);
}

// 绑定使用说明按钮
EventUtil.addHandler(document.getElementById('instructionsButton'),'click',showInstructions);

// 关闭下拉列表
function closeHexMenu(){

}

// 进制按钮点击事件
function hexButtonClickEvent(){
	
}

// 进制菜单点击事件
function hexMenuButtonClickEvent(){

}

// 获取标签内的进制数字
function getElementHexText(ele){
	return ele.innerText.slice(0,ele.innerText.length-2);
}

// 进制选择框下拉列表点击事件
function hexOptionClickEvent(){
	var hexText = this.innerText,
		hex = getElementHexText(this),
		selectBox = document.getElementsByClassName('other-hex-select-box')[0];
	// 设置对应输入框的data-hex，然后自动触发属性变动观测器(MutationObserver)
	var inputEle = selectBox.parentNode.classList.contains('hex-bar1') ? document.getElementById('input1') : document.getElementById('input2');
	inputEle.dataset.hex = hex;
	// 填到方块里
	selectBox.getElementsByClassName('selected-hex')[0].innerText = hexText;
}

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
			setTimeout(function(){hex_menu.classList.add('other-hex-menu-clicked');},0);//可以使浏览器渲染hex_menu之后再执行此函数
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
			let this_value_index = is_value1 ? 'input1' : 'input2';
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


// 输入框验证事件
function inputValidation(){
	var oldValue = this.dataset.value,
		event = EventUtil.getEvent(event);
	if (typeof twoValueObj === 'undefined') {
		twoValueObj = new Array();// 设定为全局变量
	}

	// 先把默认事件取消掉
	EventUtil.preventDefault(event);
	// 通过输入法输入触发的textInput事件，虽然可以获取到输入的字符，但是并不能通过取消默认事件来阻止显示在输入框中
	//暂时的解决办法就是通过触发延时函数，来比较data-value（已通过验证的数值）和 输入框当前数值
	setTimeout(secondVerification(this),0)

 	this.hc.value = oldValue+event.data;
 	this.hc.hex = this.dataset.hex;

	// 验证input对象
	modifyInputObj(this);

	// 若值发生变化，则修改data-value以及输入框中的值
	if (oldValue != this.hc.value) {
		console.log(1)
		this.dataset.value = this.hc.value;
		this.value = this.hc.value;
	}
}


function modifyInputObj(inputObj){
	var value = inputObj.hc.value,
		hex = inputObj.hc.hex,
		isNegative = /^-/.test(value);// 判断是否为负数
	inputObj.hc.isNegative = isNegative;// 加入isNegative属性
	console.log(inputObj.hc)

	// 验证
	// 替换掉非法字符
	var patternString = hex<=10 ? "[^0-"+String(hex-1).slice(0,1)+"\\.]" : "[^0-9a-"+String.fromCharCode(Number(hex)+86).slice(0,1)+"\\.]",
		pattern = new RegExp(patternString,'gi'),
		value = value.replace(pattern,'');
	// 去除放在首位的小数点
	value = value.replace(/^\.+/g, '');
	// 去除多余的小数点（末尾是可以有小数点的）
	if (/\./.test(value)) {
		var	a = value.split('.'),
			b = a.shift(),// shift()移除数组第一项并返回该项
			c = a.join(''),
		value = b + '.' + c;
	}
	// end

	// 向inputObj中添加 数值，是否为小数，整数值，小数值
	var isFloat = /\./.test(value),
		valueSplit = value.split('.'),
		integer = valueSplit[0],
		decimal = isFloat ? (valueSplit[1] == 0 ? '0' : valueSplit[1]) : '0';
	inputObj.hc.value = value;
	inputObj.hc.isFloat = isFloat;
	inputObj.hc.integer = integer;
	inputObj.hc.decimal = decimal;
	console.log(inputObj.hc)
}

// 输入法输入的值不能取消默认事件，通过二次验证来弥补
function secondVerification(ele){
	if (ele.dataset.value !== ele.value) {
		ele.value = ele.dataset.value;
	}
}


function alertError(){
	
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
	value1 = document.getElementById('input1').value;
	value2 = document.getElementById('input2').value;
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
		if (document.getElementById('input1').value != '') {document.getElementById('input2').value = result;}
	}
	else{
		if (document.getElementById('input2').value != '') {document.getElementById('input1').value = result;}
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
function showInstructions(){
	this.classList.toggle('instructions-button-active');
	document.getElementById('instructionsText').classList.toggle('instructions-text-active');
}

// 百度站长自动推送
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