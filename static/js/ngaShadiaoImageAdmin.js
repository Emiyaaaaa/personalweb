function control(this_ele){
	$.ajax({
		url:"/ngaShadiaoImage",
        type:"POST",
        data:{"type":this_ele.innerText},
        success:function(data){
        	console.log(data)
        }
	})
}