(function () {

  var cn = 0; //click_hli_id_num
  var target = document.querySelectorAll(".target")[0];
  var target_copy = document.querySelectorAll(".target")[1];
  var links = document.querySelectorAll(".personalCenter-menu a");
  var colors = ["#75f966", "#f88c5b", "#5bf8d4", "#4b88dc", "#d2e633", "#97adfb", "#f970fa"];
  hli_num = cn;

  function initializePersonalcenterNav(){
	for (var i = 0; i < links.length; i++) {
		links[i].style.opacity = "0.25";
	}
	links[cn].parentNode.classList.add("active");
	links[cn].style.opacity = "1";
	var width = links[cn].getBoundingClientRect().width;
	var height = links[cn].getBoundingClientRect().height;
	var left = links[cn].getBoundingClientRect().left + window.pageXOffset;
	var top = links[cn].getBoundingClientRect().top + window.pageYOffset;
	var color = colors[Math.floor(Math.random() * colors.length)];

	target_copy.style.width = width + "px";
	target_copy.style.height = height + "px";
	target_copy.style.left = left + "px";
	target_copy.style.top = top + "px";
	target_copy.style.borderColor = color;
	target_copy.style.transform = "none";
   }
  window.initializePersonalcenterNav = initializePersonalcenterNav;

  function mouseenterFunc() {
	if (!this.parentNode.classList.contains("active")) {
	  for (var i = 0; i < links.length; i++) {
		if (links[i].parentNode.classList.contains("active")) {
		  links[i].parentNode.classList.remove("active");
		}
		if (i != cn){
		  links[i].style.opacity = "0.25";
		}
	  }

	  this.parentNode.classList.add("active");
	  this.style.opacity = "1";

	  var width = this.getBoundingClientRect().width;
	  var height = this.getBoundingClientRect().height;
	  var left = this.getBoundingClientRect().left + window.pageXOffset;
	  var top = this.getBoundingClientRect().top + window.pageYOffset;
	  var color = colors[Math.floor(Math.random() * colors.length)];
	  hli_num = this.parentNode.id.split("-")[1];

	  target.style.width = width + "px";
	  target.style.height = height + "px";
	  target.style.left = left + "px";
	  target.style.top = top + "px";
	  target.style.borderColor = color;
	  target.style.transform = "none";
	}
  }

  function mouseleaveFunc() {
	for (var i = 0; i < links.length; i++) {
	  if ( i != cn ) {
		if (links[i].style.opacity == "1"){
		  leave_i = i;
		  links[i].style.opacity = "0.25";
		  target.style.opacity = 0;
		  target.addEventListener("mouseenter", function(){
			target.style.opacity = "1";
			links[leave_i].style.opacity = "1";
		  })
		}
	  }
	}
  }

  function openMatter3() {
	for (var i = 0; i < links.length; i++) {
	  links[i].style.opacity = "0.25";
	}
	this.style.opacity = "1";

	for (var i = 0; i < links.length; i++) {
	  if (i == hli_num) {
		document.getElementById("matter3_" + i).style.display = "block";
		cn = i;
	  } 
	  else {
		document.getElementById("matter3_" + i).style.display = "none";
	  }
	}
	target_copy.style.width = target.style.width;
	target_copy.style.height = target.style.height;
	target_copy.style.left = target.style.left;
	target_copy.style.top = target.style.top;
	target_copy.style.borderColor = target.style.borderColor;
	target_copy.style.transform = target.style.transform;

	var clickColor = target.style.borderColor;
	var clickColorBackground = rgb2rgba(clickColor);
	document.getElementsByClassName("suggestion")[0].style.setProperty('--suggestionColor',clickColor);
	document.getElementsByClassName("suggestion")[0].style.setProperty('--suggestionColorBackground',clickColorBackground);

	if (cn == 3){
	  inputField = document.getElementsByClassName("suggestion-input-field");
	  for (var i = 0; i < inputField.length; i++) {
		if (inputField[i].classList.contains("error")){
		  inputField[i].classList.remove("error");
		}
	  }
	  document.getElementsByClassName("suggestion-comment-hint")[0].innerHTML = '';
	}
  }
  for (var i = 0; i < links.length; i++) {
	links[i].addEventListener("mouseenter", mouseenterFunc);
	links[i].addEventListener("click",openMatter3);
  }

  function resizeFunc() {
	var active = document.querySelector(".personalCenter-menu li.active");

	if (active) {
	  var left = active.getBoundingClientRect().left + window.pageXOffset;
	  var top = active.getBoundingClientRect().top + window.pageYOffset;

	  target.style.left = left + "px";
	  target.style.top = top + "px";
	}
  }

  function leaveNav(){
	if (hli_num != cn){
	  links[hli_num].style.opacity = "0.25";
	}
	target.style.display = "none";
  }

  function enterNav(){
	links[hli_num].style.opacity = "1";
	target.style.display = "inline";
  }

  window.addEventListener("resize", resizeFunc);
  document.getElementsByClassName("personalCenter-menu")[0].addEventListener("mouseleave",leaveNav);
  document.getElementsByClassName("personalCenter-menu")[0].addEventListener("mouseenter",enterNav);
  
})();