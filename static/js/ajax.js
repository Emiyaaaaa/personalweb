$(document).ready(function() {

	function main() {
		$.ajax({
        url:"/",
        type:"GET",
        data:{"li":window.location.hash},
        success:function(data1){
        console.log(data1)
    	}
    })
	}
	main()
	$('.left-menu a').click(function () {
	    $.ajax({
        url:"/123",
        type:"GET",
        data:{"k1":"v1","k2":"v2"},
        success:function(data1){ 
        console.log(data1)
    	}
    })
	    })
})