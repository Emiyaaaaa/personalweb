function Timer(){
}
Timer.prototype = {
	constructor: Timer,
	start: function(){
		if (typeof this.start === 'undefind') {}
		this.start = Date.now();
		console.log(this.start);
	},
	stop: function(){
		this.stop = Date.now();
		console.log(this.stop);
	},
	runtime: function(){
		console.log(this.stop - this.start);
		return this.stop - this.start;
	}
}