$(document).ready(function() {

	$('#search_button').click(search);
	$('#mzsm').click(mzsm);
	//点击任意地区都会收回未收回的下拉菜单
	document.body.addEventListener("click",function remove_clicked(e){
		var clicked_car = document.getElementsByClassName('clicked')[0];
		if (clicked_car != undefined && !e['path'][3].classList.contains('video-cars')) {
			clicked_car.style.height = clicked_car.getElementsByClassName('definition-li')[0].style.height;
			clicked_car.classList.remove('clicked');
		}
	})
});

function search() {
	var search_box = document.getElementById('search_box');
	var search_button = document.getElementById('search_button');
	var search_result = document.getElementById('search_result');
	var bubo_spacing = 2;
	var url = $('#search_url').val();

	if(!search_button.classList.contains("moved") && !isNull(url)){
		var bo_top = search_box.offsetTop;
		var bu_top = search_button.offsetTop;
		var re_top = search_result.offsetTop;
		var bo_width = search_box.clientWidth;
		var bu_width = search_button.clientWidth;
		var bo_height = search_box.clientHeight;
		var screen_width = document.body.clientWidth;
		var bo_left = search_box.offsetLeft;
		var bu_left = search_button.offsetLeft;
		var a = (screen_width - bo_width - bu_width - bubo_spacing)/2;
		var set_bo_left = a - bo_left;
		var set_bu_left = screen_width - a - bu_width - bu_left;
		var set_bo_top = -(bo_top-70);
		var set_bu_top = -(bu_top-70);
		var set_re_top = -(re_top-70-bo_height);

		var bo_dict = {
			'top':set_bo_top+'px',
			'left':set_bo_left+'px'
		};
		var bu_dict = {
			'top':set_bu_top+'px',
			'left':set_bu_left+'px'
		};
		var re_dict = {
			'top':set_re_top+'px'
		};

		search_button.classList.add('moved');
		setProperty('search_button',bu_dict);
		setProperty('search_box',bo_dict);
		setProperty('search_result',re_dict);
	   	document.getElementById('tips').style.display = 'inline';

	}
	if (!isNull(url)){
		var href = window.location.href;
		var num = href.length - href.replace(/\//g,'').length;
		if (num == 4 && href.indexOf('zhihu-video-download') + 'zhihu-video-download/'.length == href.length){
			window.location.href = "#/?turn=1&url="+url;
		}
		else{
			var index = href.indexOf('zhihu-video-download');
			if (encodeURI(url) != href.slice(index+'zhihu-video-download/'.length)){
				window.location.href = href.slice(0,index) + 'zhihu-video-download/' + url;
			}
		}
		$.ajax({
	        url:"/",
	        type:"GET",
	        data:{"type":"ZhuhuVideoDownload",'url':url},
	        success:function(data){
	        	document.getElementById('tips').style.display = 'none';
	        	$('#search_result ul').html(data);
				liFadeln();
				var button_width = document.getElementById('search_button').clientWidth;
				var search_width = document.getElementById('search_box').clientWidth;
				var img_box = document.getElementsByClassName('img-box');
	        	var video_li = document.getElementsByClassName('video-li');
	        	var else_box = document.getElementsByClassName('else-box');
	        	var video_title = document.getElementsByClassName('video-title');
        		var video_cars = document.getElementsByClassName("video-cars");
        		var video_cars_ul = document.querySelectorAll(".video-cars ul");
	        	//css调整
	        	for (var i = 0; i < video_li.length; i++) {
	        		var set_li_width = button_width + search_width - 10;
	        		var set_img_width = Math.ceil((video_li[i].clientHeight*16)/9);

	        		video_li[i].style.width = set_li_width + 'px';
	        		img_box[i].style.width = set_img_width + 'px';
	        		else_box[i].style.width = (set_li_width - set_img_width) + 'px';
	        		video_title[i].style.height = video_li[i].clientHeight - 50 + 'px';
	        		video_li[i].style.zIndex = 1000 - i + '';
	        		//判断li数量是否需要显示下拉箭头
	        		var li_length = video_cars_ul[i].getElementsByClassName('definition-li').length;
	        		if (li_length == 1){
	        			video_cars[i].getElementsByClassName('select-img')[0].style.display = 'none';
	        		}

	        		//下拉菜单函数
	        		video_cars[i].addEventListener("click",function(e){
				        e.preventDefault();
				        var li = e['path'][1];
				        var ul = e['path'][2];
				        var video_cars_ = e['path'][3];
				        if (!video_cars_.classList.contains('clicked')) {
				        	//收回其他菜单
				        	var clicked_cars = document.getElementsByClassName("clicked");
				        	for (var i = 0; i < clicked_cars.length; i++) {
				        		clicked_cars[i].style.height = li.clientHeight + 'px';
				        		clicked_cars[i].classList.remove('clicked');
				        	}
				        	//点开本菜单
				        	video_cars_.classList.add('clicked');
				        	video_cars_.style.height = ul.clientHeight + 'px';
				        }
				        else{
	        				var first_li = '';
				        	for (var i = 0; i < ul.childNodes.length; i++) {
			        			if (ul.childNodes[i].nodeName != '#text'){
			        				first_li = ul.childNodes[i];
			        				break;
			        			}
			        		}
				        	video_cars_.style.height = first_li.clientHeight + 'px';
				        	video_cars_.classList.remove('clicked');
				        }
				    });
	        	}
	        	$(document).on("click",'.definition-li',function() {
	        		var first_li = '';
	        		//找到当前显示的选项
	        		for (var i = 0; i < this.parentNode.childNodes.length; i++) {
	        			if (this.parentNode.childNodes[i].nodeName != '#text'){
	        				first_li = this.parentNode.childNodes[i];
	        				break;
	        			}
	        		}
	        		if (this != first_li) {
	        			var this_html = this.outerHTML;
	        			var ul_ele = this.parentNode;
	        			this.parentNode.removeChild(this);
	        			var ul_html = ul_ele.innerHTML;
	        			ul_ele.innerHTML = this_html + ul_html;
	        			//修改href
	        			var parent_li = ul_ele;
	        			for (var i = 0; i < 4; i++) {
	        				parent_li = parent_li.parentNode;
	        			}
	        			parent_li.href = this.querySelectorAll('a')[0].href;
	        		}
		        	
		        })
	        },
	       	error:function(XMLHttpRequest, textStatus, errorThrown){
                $('#tips').html('未找到视频');
            }
		})
	}
}

function liFadeln(){
	var search_result = document.getElementById('search_result');
	var result_li = search_result.getElementsByClassName('video-li');
	for (var i = 0; i < result_li.length; i++) {
		$(result_li[i]).fadeIn(500*i);
	}
}

function isNull(str){
	if (str == null){
		return true;
	}
	else {
		if (str == ""){
			return true;
		}
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	}
}

function setProperty(documentObjId,dictObj){
	var obj = document.getElementById(documentObjId);
	for(var key in dictObj) {
			obj.style.setProperty('--'+key,dictObj[key]);
	}
}

function mzsm(){
	var href = window.location.href;
	var index = href.indexOf('zhihu-video-download');
	window.location.href = href.slice(0,index) + 'zhihu-video-download/mzsm';
}