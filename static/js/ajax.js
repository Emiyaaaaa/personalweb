$(document).ready(function() {

	function main() {
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
	main()
	$('.left-menu a').click(function () {
		console.log($(this).attr('href'))
	    $.ajax({
        url:"/",
        type:"GET",
        data:{"matter":$(this).attr('href')},
        success:function(data1){ 
        console.log(data1)
    	}
    	})
})
})