$(document).ready(function() {
	$('.window').flashy({
 
	    // image, inline, ajax, iframe, video
	    type: 'inline',
	   
	    // show title
	    title: true,
	   
	    // can be any CSS valid unit - px, %, and etc
	    width: null,
	    height: null,
	   
	    // enable/disable gallery mode
	    gallery: true, 
	   
	    // enable/disable infinite loop
	    galleryLoop: true, 
	   
	    // show item counter
	    galleryCounter: true, 
	   
	    // show prev and next navigation controls
	    galleryPrevNext: true, 
	   
	    // message used in the item counter. If empty, no counter will be displayed
	    galleryCounterMessage: '[index] / [total]', 
	   
	    // enable/disable swipe on desktop
	    gallerySwipeDesktop: true, 
	   
	    // enable/disable swipe on mobile devices
	    gallerySwipeMobile: true, 
	   
	    // set swipe threshold in px
	    gallerySwipeThreshold: 100, 
	   
	    // enable/disable keyboard navigation with arrows and close with ESC
	    keyboard: true, 
	   
	    // close lightbox via the close button or overlay click
	    overlayClose: false, 
	   
	    // additional css classes for customization
	    themeClass: null, 
	     
	    // enable/Disable video autoplay
	    videoAutoPlay: false, 
	   
	    // error message displayed when a content fails to load
	    loadError: 'Sorry, an error occured while loading the content...'
 
	});
});