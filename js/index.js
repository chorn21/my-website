
var TRANSITION_TIME = 1000;
var DISPLAY_TIME = 4000;
var INITIAL_LOAD_DELAY = 1000;

/*
    IndexPage object constructor

    headerTextId {String} id on the header text element (my name)
    footerId {String} id on the footer
*/
function IndexPage() {
    this.headerTextId = "header-text";
    this.footerId = "footer"

    this.initialize();
    this.attachListeners();
}

/*
    load things
*/
IndexPage.prototype.initialize = function() {
    var backgroundSlideshow = new BackgroundSlideshow(INITIAL_LOAD_DELAY, DISPLAY_TIME, TRANSITION_TIME);
    setTimeout($.proxy(function() {
      $("#" + this.headerTextId).fadeTo(TRANSITION_TIME, 1.0, "linear", $.proxy(function() {
          $("#" + this.footerId).slideDown();
      }, this));
    }, this), INITIAL_LOAD_DELAY);
}

/*
    attach listeners
*/
IndexPage.prototype.attachListeners = function() {

    // footer menu item hover
   $('.footer-menu-item a').hover(function() {
       $(this).css({"color" : '#777'});
   }, function() {
       $(this).css({"color" : '#fff'});
   });

};

/*
    upon page load... create an IndexPage
*/
(function() {
    $(window).on('load', function() {
        var index = new IndexPage();
    });
})();
