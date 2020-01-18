(function (){
	function setWeatherIcon(weather,date){
		var weather = weather.split('转')[0];
		if (weather.search("雷") != -1 ){
			weather = '雷';
		}
		else if (weather.search("雨") != -1 ){
			weather = '雨';
		}
		else if (weather.search("雪") != -1 ){
			weather = '雪';
		}

		var weatherDic = {
			'':'sunny',
			'晴':'sunny',
			'多云':'cloudy',
			'阴':'cloudy',
			'雾':'cloudy',
			'雨':'rainy',
			'雪':'snowy',
			'雷':'stormy'
		};
		var backgroundDic = {
			'':'sunny-background',
			'晴':'sunny-background',
			'多云':'cloudy-background',
			'阴':'overcast-background',
			'雾':'cloudy-background',
			'雨':'rainy-background',
			'雪':'snowy-background',
			'雷':'stormy-background'
		};
		
		try {

			var nowDate = new Date();
			var nowHour = nowDate.getHours();
			var weather_icon = document.querySelectorAll("."+date+"-weather .weather-icon")[0];
			var weather_background = document.querySelectorAll("."+date+"-weather .weather-background")[0];

			if ((nowHour >= 19 || nowHour <= 5) && (weather == '晴' || weather == '' || weather == '多云') && (date == 'now')){
				weather_icon.innerHTML = '<div class="starry"></div>';
				weather_background.innerHTML = '<div class="starry-background"></div>';
			}
			else{
				if (weather == ''){
					weather_icon.innerHTML = '<div class="sunny"></div>';
					weather_background.innerHTML = '<div class="sunny-background"></div>';
				}
				else{
					weather_icon.innerHTML = '<div class="' + weatherDic[weather] + '"></div>';
					weather_background.innerHTML = '<div class="' + backgroundDic[weather] + '"></div>';
				}
			}
		}
		catch(err){
			weather_icon.innerHTML = '<div class="sunny"></div>';
			weather_background.innerHTML = '<div class="sunny-background"></div>';
		}
	}


	if(true){
		// areaIframe = document.createElement('div');
		// areaIframe.innerHTML = '<iframe src="http://www.ip138.com/iplookup.asp?ip='+returnCitySN["cip"]+'" id="areaIframe"></iframe>'

		// areaIframe.style.display = 'none';
		// areaIframe.setAttribute('id', 'areaIframe');
		// areaIframe.setAttribute('src', 'http://www.ip138.com/iplookup.asp?ip='+returnCitySN["cip"]);
		// document.getElementById('weather').appendChild(areaIframe)
		// var ul = document.getElementById('areaIframe')
		// console.log(ul)
		// $.ajax({
		// 	type: 'GET',
		// 	url: 'http://www.ip138.com/iplookup.asp',
		// 	async: true,
		// 	data: {'ip':returnCitySN["cip"]},
 	// 		crossDomain: true,
		// 	dataType: 'jsonp',

		// 	success:function(data){
		// 		console.log(data)
		// 	}
		// })
		$.ajax({
			type: 'GET',
			url: '/api/getWeatherJson',
			async: true,
			data: {'ip':returnCitySN["cip"]},
			success:function(data){
				console.log(data);
				if (data['error'] == 0) {
					// 初始化
					document.querySelectorAll(".right .loading-weather")[0].style.display = 'none';
					document.querySelectorAll(".right .weather")[0].style.display = 'inline';
					addWeatherNevListen();
					// 设置实时数据页
					var data = data.results;
					var nowWeather = data[0];
					var city = nowWeather.city;
					document.getElementsByClassName('now-city')[0].innerHTML = city;
					document.getElementsByClassName('now-tem')[0].innerHTML = nowWeather.nowTem;
					document.getElementsByClassName('now-wdp')[0].innerHTML = nowWeather.wind;
					document.getElementsByClassName('now-aq')[0].innerHTML = 'PM2.5:'+nowWeather.pm25;
					setWeatherIcon(nowWeather.weather,"now");
					nowWeather = data[0]
					for (var i = 1; i < (data.length>=4?4:data.length); i++) {
						document.getElementsByClassName('day'+i+'-tem')[0].innerHTML = data[i].temperature;
						document.getElementsByClassName('day'+i+'-city')[0].innerHTML = city;
						document.getElementsByClassName('day'+i+'-wea')[0].innerHTML = data[i].weather;
						document.getElementsByClassName('day'+i+'-wdp')[0].innerHTML = data[i].wind;
						setWeatherIcon(data[i].weather, 'day'+i);
					}
				}
				else{
					document.querySelectorAll(".right .loading-weather .loading")[0].innerHTML = '加载失败！';
					console.log('error:'+data.error);
				}
				$.ajax({
					url:'/',
			   		type:"POST",
			   		data:{'type':'weatherUser','ip':returnCitySN["cip"],'city':returnCitySN["cname"],'error':data.error},
			   		success:function(data){}
			   	})
	    	}
		})
	}
})()