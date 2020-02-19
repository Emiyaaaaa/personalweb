// 运算时间:132.31ms -> 14.06ms(按下Ctrl+V输入-1.1，将33进制转换为35进制)
// 2020.2.17 00:16


// 初始化
(function(){
	inputBox = document.getElementsByClassName('hex-input');// 全局变量
	var hex1 = 10,
		hex2 = 2,
		input0 = inputBox[0],
		input1 = inputBox[1];
	// 初始化hc属性
	input0.hc = new Object();
	input1.hc = new Object();
	// 性能优化
	var hc0 = input0.hc,
		hc1 = input1.hc;
	// 初始化转换顺序（是否为转换前的数字，可编辑即为转换前的数字）
	hc0.editable = true;
	hc1.editable = false;
	// 初始化进制
	input0.dataset.hex = hc0.hex = hex1;
	input1.dataset.hex = hc1.hex = hex2;
})();

// 绑定输入框验证事件，输入值后触发一个延时为0的验证函数，验证后替换掉输入框中的值
for (let i = 0,len = inputBox.length; i < len; i++) {
	EventUtil.addHandler(inputBox[i],'input',editableValidation);// 可编辑性验证，确保不可编辑的框里不会输入字符
	EventUtil.addHandler(inputBox[i],'input',inputValidation);
}

// 绑定中间按钮点击事件
var turnButton = document.getElementsByClassName('convert-button');
for (let i = 0, len = turnButton.length; i < len; i++) {
	EventUtil.addHandler(turnButton[i],'click',turnButtonClickEvent);
}

// 绑定32进制按钮额外的点击事件
var hex32Button = document.getElementsByClassName('other-hex-select-box');
for (let i = 0, len = hex32Button.length; i < len; i++) {
	EventUtil.addHandler(hex32Button[i],'click',openHexMenu);// 此事件要在进制按钮点击事件之前绑定
}

// 绑定进制按钮点击事件（包括32进制的点击事件）
var hexButton = document.getElementsByClassName('hex');
for (let i = 0, len = hexButton.length; i < len; i++) {
	EventUtil.addHandler(hexButton[i],'click',hexButtonClickEvent);
	EventUtil.addHandler(hexButton[i],'click',inputValidation);// 输入框验证事件
}

// 绑定进制选择框下拉列表中的进制点击事件
var hexOption = document.getElementsByTagName('li');
for (let i = 0, len = hexOption.length; i < len; i++) {
	EventUtil.addHandler(hexOption[i],'click',hexOptionClickEvent);
}

// 绑定全局点击关闭下拉列表事件
EventUtil.addHandler(document,'click',closeHexMenu);

// 绑定使用说明按钮
EventUtil.addHandler(document.getElementById('instructionsButton'),'click',showInstructions);

for (let i = 0,len = inputBox.length; i < len; i++) {
	ObserveUtil.addAttributesHander(inputBox[i],['data-hex','data-value'],convert);
}

// 打开下拉列表
function openHexMenu(){
	var event = EventUtil.getEvent(event);
	if (this.classList.contains('active')&&!this.classList.contains('opened')) {// 这里要加一个opened判断，因为32进制按钮不光有打开列表功能，这里只有列表为关闭状态的情况下要取消冒泡
		EventUtil.stopPropagation(event);// 取消冒泡，冒泡至document会触发关闭下拉列表事件
		setElementActive(this,'other-hex-select-box','opened',document);
	}
}

// 关闭下拉列表
function closeHexMenu(){
	removeElementActive('other-hex-select-box','opened',document);
}

// 进制按钮点击事件
function hexButtonClickEvent(){
	if (!this.classList.contains('active')) {
		// 设置data-hex以及hc属性
		var inputEle = getInputElementByHexBox(this),
			hex = getElementHexText(this);
		inputEle.dataset.hex = hex;
		inputEle.hc.hex = hex;
		setElementActive(this,'hex','active');
	}
}

// 获取标签内的进制数字
function getElementHexText(ele){
	if (ele.classList.contains('other-hex-select-box')) {
		ele = ele.getElementsByClassName('selected-hex')[0];
	}
	var hex = ele.innerText.slice(0,ele.innerText.length-2);
	if (!/\d+/g.test(hex)) {
		hex = ele.dataset.num;
	}
	return hex;
}

// 进制选择框下拉列表点击事件
function hexOptionClickEvent(){
	var hexText = this.innerText,
		hex = getElementHexText(this),
		allSelectBox = document.getElementsByClassName('other-hex-select-box'),
		selectBox = !!(this.compareDocumentPosition(allSelectBox[0]) & Node.DOCUMENT_POSITION_CONTAINS) ? allSelectBox[0] : allSelectBox[1],//《js高程》P300
	// 设置对应输入框的data-hex，然后自动触发属性变动观测器(MutationObserver)
		inputEle = getInputElementByHexBox(selectBox);
	inputEle.dataset.hex = inputEle.hc.hex = hex;
	// 填到方块里
	selectBox.getElementsByClassName('selected-hex')[0].innerText = hexText;
}

// 取消掉兄弟节点的active，设置ele为active
function setElementActive(ele,className,activeSign,ancestorNode){
	if (typeof parentNode === 'undefined') {
		ancestorNode = ele.parentNode;
	}
	var brotherNode = ancestorNode.getElementsByClassName(className);
	for (let i = 0, len = brotherNode.length; i < len; i++) {
		brotherNode[i].classList.remove(activeSign);
	}
	ele.classList.add(activeSign);
}

// 取消所有className的activeSign
function removeElementActive(className,activeSign,ancestorNode){
	var query = className + ' ' + activeSign,
		activeElements = ancestorNode.getElementsByClassName(query);
	for (let i = 0, len = activeElements.length; i < len; i++) {
		activeElements[i].classList.remove(activeSign);
	}
}

// 中间的转换按钮点击事件
function turnButtonClickEvent(){
	var bgSquare = document.getElementById('bc_square');
	if (!this.classList.contains('active')) {
		// 转换editable值
		inputBox[0].hc.editable = !inputBox[0].hc.editable;
		inputBox[1].hc.editable = !inputBox[1].hc.editable;
		// 转换背景方块位置
		setElementActive(this,'convert-button','active');
		bgSquare.classList.toggle('bc-square-active');
	}
}

// 在不可编辑的输入框输入时才会触发此函数
function editableValidation(){
	if (!this.hc.editable) {
		var oldValue = this.dataset.value;
		this.value = !oldValue ? '' : oldValue;
	}
}


// 输入框验证，实际验证在setValidatedValue()中
function inputValidation(){
	var inputEle = this;
	if (this.tagName.toLowerCase() != 'input') {// 点击的是进制按钮时，作用域要转换为相应的input对象
		inputEle = getInputElementByHexBox(this);
	}
	// if (!inputEle.hc.editable) {
	// 	return false;
	// }
	setTimeout(setValidatedValue.call(inputEle),0);
}

// 输入框验证并替换，此处的参数value0默认情况是不需要传入的
function setValidatedValue(value0){
	var hc = this.hc,
		dataset = this.dataset,
		oldValue = dataset.value,
		value = (typeof value0 === 'undefined') ? this.value : value0,// 可接受一个参数value0作为要验证的数字
		hex = dataset.hex,
		isNegative = /^-/.test(value);// 判断是否为负数

	// 验证
	// 替换掉非法字符
	var patternString = hex<=10 ? "[^0-"+String(hex-1).slice(0,1)+"\.]" : "[^0-9a-"+String.fromCharCode(Number(hex)+86).slice(0,1)+"\.]",
		pattern = new RegExp(patternString,'gi'),
		value = value.replace(pattern,'');
	// 去除多余的小数点（末尾和开始是可以有小数点的）
	if (/\./.test(value)) {
		var	a = value.split('.'),
			b = a.shift(),// shift()移除数组第一项并返回该项
			c = a.join(''),
		value = b + '.' + c;
	}
	// 验证end

	// 向inputObj中添加各种属性
	var isFloat = /\./.test(value),
		negativeSign = isNegative ? '-' : '',
		valueSplit = value.split('.'),
		integer = Boolean(valueSplit[0]) == false ? '0' : valueSplit[0],
		decimal = isFloat ? (valueSplit[1] == 0 ? '0' : valueSplit[1]) : '0',
		haveNotNumber = !/\d/.test(value);

	hc.value = negativeSign + value;// 有符号值
	hc.negativeSign = negativeSign;// 符号
	hc.unsignedValue = value;// 无符号值
	hc.isFloat = isFloat;// 是否为小数
	hc.integer = hc.integerResult = integer;
	hc.decimal = hc.decimalResult = decimal;
	hc.haveNotNumber = haveNotNumber;// 是否可以转换（只有符号则不需要转换）

	// 替换掉原有数值
	value = negativeSign + value;
	if (oldValue != value) {// 验证前后数值相同的话就不必更改data-value了，要不然会触发变动观察者（即使更改前后数值相同）。但输入框是必须更改的，因为没通过验证的字符还是会通过默认事件显示上去
		dataset.value = value;
	}
	this.value = value;
}

function alertError(){
	
}

// 根据进制按钮确定对应的输入框对象
function getInputElementByHexBox(ele){
	return ele.parentNode.classList.contains('hex-bar1') ? inputBox[0] : inputBox[1];
}

function getEditableInputBox(){
	return inputBox[0].hc.editable ? inputBox[0] : inputBox[1];
}

function convert(mutationList, observer){
	try{
		var mutation = mutationList[0];
		// 若是由不可编辑的输入框的data-value改变而触发的观察者，则不需要进制转换
		if (mutation.attributeName === 'data-value' && !mutation.target.hc.editable){
			return false;
		}
		// 可编辑框中没有值时不需要转换。此时有个特殊情况，就是当删除输入框数值时，最后一个字符被删除完时，另一个结果框中依然有数值，所以要清空所有输入框
		if (!getEditableInputBox().value) {
			inputBox[0].hc.value = inputBox[1].hc.value = inputBox[0].value = inputBox[1].value = '';
			return false;
		}
	}
	catch (err){
		console.log('convert函数资格判断出错');
		console.log(err)
	}
	
	console.log('转换开始：' + Date.now())
	var input0Editable = inputBox[0].hc.editable,
		inputBoxBeforeConvert = input0Editable ? inputBox[0] : inputBox[1],
		inputBoxAfterConvert = input0Editable ? inputBox[1] : inputBox[0],
		hc = inputBoxBeforeConvert.hc,
		hexBeforeConvert = hc.hex,
		hexAfterConvert = inputBoxAfterConvert.hc.hex,
		resultObj = new Object(),
		oldValue = hc.value,
		result;

	// 根据不同的前后进制执行不同转换函数
	switch(true){
		case String(hexBeforeConvert) === String(hexAfterConvert):
			resultObj.integerResult = hc.integer;
			resultObj.decimalResult = hc.decimal;
		break;
		case String(getBaseLog(2,hexBeforeConvert)).indexOf('.') == -1 && String(getBaseLog(2,hexAfterConvert)).indexOf('.') == -1:// 转换前后进制均在2,4,8,16,32中
			resultObj = hex_2ToAll(hex_allTo2(hc,hexBeforeConvert),hexAfterConvert);
		break;
		default:
			resultObj = hex_10ToAll(hex_allTo10(hc,hexBeforeConvert),hexAfterConvert);
	}

	var integerResult = resultObj.integerResult,
		decimalResult = resultObj.decimalResult;
	integerResult = integerResult || integerResult == 0 ? integerResult.replace(/^0+/g,'') : '0';// 整数没有内容或者有多个0，则填0；否则去掉开头所有的0
	result = decimalResult && decimalResult != 0 ? integerResult+'.'+decimalResult : integerResult;
	result = hc.negativeSign + result;


	setValidatedValue.call(inputBoxAfterConvert,result);
	console.log('进制'+hexBeforeConvert+'->进制'+hexAfterConvert+':  '+oldValue+'->'+result)
	console.log(inputBox[0].hc,inputBox[1].hc)
}


function hex_allTo10(valueObj,hex){
	if (hex == 10) {
		return valueObj;
	}

	var integer = valueObj.integer,
		decimal = valueObj.decimal,
		integerResult = 0,
		decimalResult = 0,
		power;

	// 整数部分
	integerResult = parseInt(integer,hex);
	// 小数部分
	for (var i = 0; i < decimal.length; i++) {
		power = -(i + 1);
		decimalResult += Number(charToNum(decimal[i])) * Math.pow(hex,power);
	}

	valueObj.integerResult = String(integerResult);
	valueObj.decimalResult = String(decimalResult).slice(2);// 去除'0.' 下同
	return valueObj;
}

function hex_10ToAll(valueObj,hex){
	if (hex == 10) {
		return valueObj;
	}

	var integer = valueObj.integerResult,// 这里要注意是integerResult而不是integer，下方hex_2ToAll同理
		decimal = valueObj.decimalResult,
		integerResult = '',
		decimalResult = '',
		power,
		integer_quotient = Number(integer),
		decimalAfterPoint = '',
		i = 0,
		decimal = Number('0.'+decimal);

	// 整数部分
	integerResult = Number(integer).toString(hex);
	// 小数部分
	do{
		if (decimal == 0) {break;}
		decimal = decimal * hex;
		decimalResult += numToChar(String(decimal).split('.')[0]);
		decimalAfterPoint = String(decimal).split('.')[1];
		decimal = Number('0.'+decimalAfterPoint);
		if (decimalAfterPoint == undefined) {break;}
		i++;
		if (i > 50) {break;}
	}while(decimalAfterPoint != '0');
	valueObj.integerResult = integerResult;
	valueObj.decimalResult = decimalResult;
	return valueObj;
}

function hex_allTo2(valueObj,hex){
	if (hex == 2) {
		return valueObj;
	}

	var integer = valueObj.integer,
		decimal = valueObj.decimal,
		integerResult = '',
		decimalResult = '',
		zero = '',
		result = '',
		digitsGroupNum = getBaseLog(2,hex);

	for (var i = 0; i < integer.length; i++) {
		let integerGroup = hex_10To2(charToNum(integer[i]));
		for (var j = 0; j < digitsGroupNum - integerGroup.length; j++) {
			zero += '0';
		}
		integerGroup = zero + integerGroup;//整数部分前面补0
		zero = '';
		integerResult += integerGroup;
	}
	for (var i = 0; i < decimal.length; i++) {
		let decimalGroup = hex_10To2(charToNum(decimal[i]));
		for (var j = 0; j < digitsGroupNum - decimalGroup.length; j++) {
			zero += '0';
		}
		decimalGroup = zero + decimalGroup;//小数部分前面补0
		zero = '';
		decimalResult += decimalGroup;
	}
	valueObj.integerResult = integerResult;
	valueObj.decimalResult = decimalResult;
	return valueObj;
}

function hex_2ToAll(valueObj,hex){
	if (hex == 2) {
		return valueObj;
	}

	var integer = valueObj.integerResult,
		decimal = valueObj.decimalResult,
		integerResult = '',
		decimalResult = '',
		digitsGroupNum = getBaseLog(2,hex);

	// 整数部分
	integer = getZero(digitsGroupNum - integer.length % digitsGroupNum) + integer;//整数部分前面补0
	for (var i = digitsGroupNum - 1; i < integer.length; i = i + digitsGroupNum) {
		let integerGroup = ''
		for (var j = digitsGroupNum - 1; j >= 0; j--) {
			integerGroup += integer[i - j];
		}
		integerResult += numToChar(hex_2To10(integerGroup));
	}

	// 小数部分
	decimal = decimal + getZero(digitsGroupNum - decimal.length % digitsGroupNum);//小数部分后面补0
	for (var i = digitsGroupNum - 1; i < decimal.length; i = i + digitsGroupNum) {
		let decimalGroup = ''
		for (var j = digitsGroupNum - 1; j >= 0; j--) {
			decimalGroup += decimal[i - j];
		}
		decimalResult += numToChar(hex_2To10(decimalGroup));
	}

	valueObj.integerResult = integerResult;
	valueObj.decimalResult = decimalResult;
	return valueObj;
}

function getZero(len){
	for (var i = 0; i < len; i++) {
		zero += '0';
	}
	return zero;
}

function hex_2To10(value){
	return parseInt(value,'2');
}

function hex_10To2(value){
	return Number(value).toString(2);
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
	var num = Number(num);
	if (num <= 9) {
		return String(num);
	}
	else{
		return String.fromCharCode(num + 87);
	}
}

function getBaseLog(x, y) {
	return Math.log(y) / Math.log(x);
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