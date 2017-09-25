
function ResumePage() {
	this.attachListeners();
}

Resume.prototype.attachListeners = function() {
	// body...
};

/*
    upon page load... create an IndexPage
*/
(function() {
    $(window).on('load', function() {
        var resume = new ResumePage();
    });
})();
