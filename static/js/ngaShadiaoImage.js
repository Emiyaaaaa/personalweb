function control(this_ele){
	$.ajax({
		url:"/ngaShadiaoImage",
        type:"GET",
        data:{"type":this_ele.innerText},
        success:function(data){
        	
        }
	})
}