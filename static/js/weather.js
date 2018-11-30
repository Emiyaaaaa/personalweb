(function (){
	function nowJson2str(data){
		var aq = ''
		var aqi = ''
		var tem = ''
		var wdp = ''
		var weather = ''
		var degreesCelsius = '°<span class="condensed">C</span>'
		if (data.aq != null){
			aq = data.aq
		}
		if (data.aqi != null){
			aqi = ':'+data.aqi
		}
		if (data.tem != null){
			tem = data.tem + degreesCelsius
		}
		if (data.wdp != null){
			wdp = data.wdp
		}
		if (data.weather != null){
			weather = data.weather
		}
		return {'aq':aq,'aqi':aqi,'tem':tem,'wdp':wdp,'weather':weather}
	}
	function dayJson2str(data){
		var date = data.date_chi
		if (date == ''){
			date = data.date
		}
		// tem
		if (data.tem_day == null && data.tem_night == null){
			var tem = ''
		}
		else if (data.tem_day == null){
			var tem = data.tem_night + '°C'
		}
		else if (data.tem_night == null){
			var tem = data.tem_day + '°C'
		}
		else if (parseInt(data.tem_day) > parseInt(data.tem_night)){
			var tem = data.tem_night + '~' + data.tem_day + '°C'
		}
		else if (parseInt(data.tem_day) < parseInt(data.tem_night)){
			var tem = data.tem_day + '~' + data.tem_night + '°C'
		}
		else if (parseInt(data.tem_day) == parseInt(data.tem_night)){
			var tem = data.tem_day + '°C'
		}
		else{
			var tem = ''
		}
		// weather
		if (data.weather_day == null && data.weather_night == null){
			var weather = ''
		}
		else if (data.weather_day == null){
			var weather = data.weather_night
		}
		else if (data.weather_night == null){
			var weather = data.weather_day
		}
		else if (data.weather_day == data.weather_night){
			var weather = data.weather_day
		}
		else{
			var weather = data.weather_day + '转' + data.weather_night
		}
		// wdp
		if (data.wdp_day == null && data.wdp_night == null){
			var wdp = ''
		}
		else if (data.wdp_day == null){
			var wdp = data.wdp_night
		}
		else if (data.wdp_night == null){
			var wdp = data.wdp_day
		}
		else{
			var wdp = data.wdp_day
		}

		return {'weather':weather,'tem':tem,'date':date,'wdp':wdp}
	}
	$.ajax({
		type: 'POST',
		url: 'http://api.shujuzhihui.cn/api/weather/ip',
		data: {'appKey':'9057ff088d24450b93d896cf317835f4','ip':returnCitySN["cip"],'n7':1},
		success:function(data){
			errorJson = ''
			if (data.ERRORCODE == '0'){
				var city = data.RESULT.area_maybe[0]
				if (city = []){
					var area = data.RESULT.areaInfo
					city = area.city
				}
				var d1 = data.RESULT.weatherInfo.n7.d1
				var d2 = data.RESULT.weatherInfo.n7.d2
				var d3 = data.RESULT.weatherInfo.n7.d3
				var nowJson = data.RESULT.weatherInfo.real
				var day1 = dayJson2str(d1)
				var day2 = dayJson2str(d2)
				var day3 = dayJson2str(d3)
				var nowWeather = nowJson2str(nowJson)

				document.getElementsByClassName('now-city')[0].innerHTML = city
				document.getElementsByClassName('now-tem')[0].innerHTML = nowWeather.tem
				document.getElementsByClassName('now-wdp')[0].innerHTML = nowWeather.wdp
				document.getElementsByClassName('now-aq')[0].innerHTML = nowWeather.aq + nowWeather.aqi

				var weatherDic = {
					'':'sunny',
					'晴':'sunny',
					'多云':'cloudy',
					'阴':'cloudy',
					'雨':'rainy',
					'雪':'snowy',
					'雷':'stormy'
				}
				var backgroundDic = {
					'':'sunny-background',
					'晴':'sunny-background',
					'多云':'cloudy-background',
					'阴':'overcast-background',
					'雨':'rainy-background',
					'雪':'snowy-background',
					'雷':'stormy-background'
				}

				var weather = nowWeather.weather
				if (weather.search("雷") != -1 ){
					weather = '雷'
				}
				else if (weather.search("雨") != -1 ){
					weather = '雨'
				}
				else if (weather.search("雪") != -1 ){
					weather = '雪'
				}
				
				try {
					var nowDate = new Date();
					var nowHour = nowDate.getHours()
					console.log(nowHour >= 19 || nowHour <= 5)

					if ((nowHour >= 19 || nowHour <= 5) && (weather == '晴' || weather == '' || weather == '多云')){
						document.querySelectorAll(".now-weather .weather-icon")[0].innerHTML = '<div class="starry"></div>'
						document.querySelectorAll(".now-weather .weather-background")[0].innerHTML = '<div class="starry-background"></div>'
					}
					else{
						if (weather == ''){
						document.querySelectorAll(".now-weather .weather-icon")[0].innerHTML = '<div class="sunny"></div>'
						document.querySelectorAll(".now-weather .weather-background")[0].innerHTML = '<div class="sunny-background"></div>'
						}
						else{
							document.querySelectorAll(".now-weather .weather-icon")[0].innerHTML = '<div class="' + weatherDic[weather] + '"></div>'
							document.querySelectorAll(".now-weather .weather-background")[0].innerHTML = '<div class="' + backgroundDic[weather] + '"></div>'
						}
					}
				}
				catch(err){
					document.querySelectorAll(".now-weather .weather-icon")[0].innerHTML = '<div class="cloudy"></div>'
					document.querySelectorAll(".now-weather .weather-background")[0].innerHTML = '<div class="sunny-background"></div>'
					errorJson = data
				}
			}
			else{
				document.querySelectorAll(".right .weather")[0].style.display = 'none'
				console.log('error:'+data.ERRORCODE+' result:'+data.RESULT)
			}
			$.ajax({
				url:'/',
	       		type:"POST",
	       		data:{'type':'weatherUser','ip':returnCitySN["cip"],'city':returnCitySN["cname"],'errorCode':data.ERRORCODE,'errorJson':errorJson},
	       		success:function(data){}
	       	})
    	}
	})
})()