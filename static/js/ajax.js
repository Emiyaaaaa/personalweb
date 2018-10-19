$(document).ready(function() {

	url = 'http://127.0.0.1:8000'

	function mainPage() {
		// window.location.href = url + '/404'
		if (window.location.hash != '') {
			$.ajax({
		        url:"/",
		        type:"GET",
		        data:{"matter":window.location.hash},
		        success:function(data1){
		        			console.log(data1)
		    				}
		    })
		}
	}
	mainPage()
	$('.left-menu a').click(function () {
	    $.ajax({
        url:"/",
        type:"GET",
        data:{"matter":$(this).attr('href'),"operation":"click"},
        success:function(data1){
        console.log(data1)
    	}
    	})
})
})