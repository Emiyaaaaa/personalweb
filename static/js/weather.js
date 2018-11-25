(function (){
	function nowJson2str(data){
		var aq = ''
		var aqi = ''
		var tem = ''
		var wdp = ''
		var weather = ''
		if (data.aq != null){
			aq = data.aq
		}
		if (data.aqi != null){
			aqi = data.aqi
		}
		if (data.tem != null){
			tem = data.tem
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
			if (data.ERRORCODE == '0'){
				var city = data.RESULT.area_maybe
				if (city = []){
					var area = data.RESULT.areaInfo
					city = area.county + area.province + area.city
				}
				var d1 = data.RESULT.weatherInfo.n7.d1
				var d2 = data.RESULT.weatherInfo.n7.d2
				var d3 = data.RESULT.weatherInfo.n7.d3
				var day1 = dayJson2str(d1)
				var day2 = dayJson2str(d2)
				var day3 = dayJson2str(d3)
				console.log(city)
				console.log(day1.date+': '+day1.weather+' '+day1.tem+' '+day1.wdp)
				console.log(day2.date+': '+day2.weather+' '+day2.tem+' '+day2.wdp)
				console.log(day3.date+': '+day3.weather+' '+day3.tem+' '+day3.wdp)
				console.log(data)
			}
			else{
				console.log('error:'+data.ERRORCODE+' result:'+data.RESULT)
			}
    	}
	})
})()