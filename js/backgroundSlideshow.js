
// background images
IMAGES = [
	'cherryblossoms.jpg',
	'soundonsound.jpg',
	'ryugatake.jpg',
	'firetower.jpg',
	'sunset.jpg',
	'nezperce.jpg'
]

/*
	constructor for a BackgroundSlideshow instance

	displayTime (Integer) time in seconds between images
	transitionTime (Integer) time in seconds to transition to new image
	initialLoadDelay (Integer) time in seconds to wait before starting slideshow
	idPrefix (String) string to prefix each image element with
	isPlaying (Boolean) whether slideshow is playing or not (to pause if window is out of focus)
*/
function BackgroundSlideshow(initialLoadDelay, displayTime, transitionTime) {
	this.displayTime = displayTime;
	this.transitionTime = transitionTime;
	this.initialLoadDelay = initialLoadDelay;
	this.idPrefix = "bg";
	this.isPlaying = true;

	this.initialize();
}   

/*
	creates the space for the background slideshow
	creates the background image divs
	sets up the transitions
*/
BackgroundSlideshow.prototype.initialize = function() {

	// build a div for each background image in IMAGES
	$.each(IMAGES, $.proxy(function(i, imgFile) {
		var divId = this.getBackgroundId(i);
		createImgDiv(divId, imgFile);
	}, this));

	// load in first image after a small delay
	var currImgId = this.getBackgroundId(0);
	setTimeout(this.switchImage, this.initialLoadDelay, null, currImgId);

	// begin looping images after first image has been displayed for length of displayTime
	this.startSlideshow(currImgId);

	this.attachListeners();
};

/*
	attaches event listeners
*/
BackgroundSlideshow.prototype.attachListeners = function() {

	// stop slideshow if page is out of focus
	$(window).blur($.proxy(function() {
		this.isPlaying = false;
	}, this));

	// restart slideshow when page comes back into focus
	$(window).focus($.proxy(function() {
		this.isPlaying = true;
		var currImg = $('.displayed')[0];
		this.startSlideshow(currImg.getAttribute("id"));
	}, this));
};

/*
	kicks off slideshow timers
*/
BackgroundSlideshow.prototype.startSlideshow = function(currImgId) {
	var timerId = setTimeout($.proxy(function() {
		this.changeBackground(currImgId, timerId);
	}, this), this.displayTime);
};

BackgroundSlideshow.prototype.changeBackground = function(currImgId, timerId) {
	if (timerId) {
		// not sure if this is doing anything really but it's not breaking anything so
		clearTimeout(timerId);
	}
	if (this.isPlaying) {
		var nextImgId = this.getNextImgId(currImgId);
		this.switchImage(currImgId, nextImgId);
		timerId = setTimeout($.proxy(function() {
			this.changeBackground(nextImgId, timerId);
		}, this), parseInt(this.displayTime) + parseInt(this.transitionTime));
	}
};

BackgroundSlideshow.prototype.switchImage = function(currImg, nextImg) {
    $("#" + currImg).fadeTo(this.transitionTime, 0, "linear").removeClass("displayed");
    $("#" + nextImg).fadeTo(this.transitionTime, 0.6, "linear").addClass("displayed");
};

BackgroundSlideshow.prototype.getBackgroundId = function(idx) {
   return this.idPrefix + idx.toString();
};

BackgroundSlideshow.prototype.getNextImgId = function(currImgId) {
	var idx = currImgId.substring(this.idPrefix.length);
	if (idx >= IMAGES.length - 1) {
	   idx = 0;
	} else {
	   idx++;
	}
	return this.getBackgroundId(idx);
};

/*
	builds a div element for an image file and prepends it to the page body
*/
function createImgDiv(divId, imgFile) {
	var div = document.createElement("div");
	div.setAttribute("id", divId);
	div.setAttribute("class", "background");
	div.setAttribute("style", "background-image:url('/img/bg/" + imgFile + "')");
	$("body").prepend(div);
}
