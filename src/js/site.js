/* ------------------------------------------------------------------------------
 This is jquery module for main app
 ------------------------------------------------------------------------------ */
//var $ = jQuery.noConflict(); //Relinquish jQuery's control of the $ variable.

/* Global constants */

/*global jQuery */
/**
        Main application module
    */
var App = function() {};

App.prototype.init = function() {
  this.bindEvents();
};
App.prototype.bindEvents = function() {
  $(document).ready(function() {
    app.docReady();
  });
};

App.prototype.docReady = function() {
  /*-------------------------------------------------*/
  /* =  header height fix
		/*-------------------------------------------------*/
  var content = $("#content");
  content
    .imagesLoaded(function() {
      var bodyHeight = $(window).outerHeight(),
        containerHeight = $(".inner-content").outerHeight(),
        headerHeight = $("header");
      console.log(headerHeight);
      if (bodyHeight > containerHeight) {
        headerHeight.css("height", bodyHeight);
      } else {
        headerHeight.css("height", containerHeight);
      }
    })
    .on("progress", onProgress)
    .on("always", onAlways);
};

//Initializing the app
var app = new App();
app.init();

var loadedImageCount, imageCount;

// -----  ----- //

function resetProgress() {
  statusElem.style.opacity = 1;
  loadedImageCount = 0;
  if (supportsProgress) {
    progressElem.setAttribute("max", imageCount);
  }
}

function updateProgress(value) {
  if (supportsProgress) {
    progressElem.setAttribute("value", value);
  } else {
    // if you don't support progress elem
    setText(statusElem, value + " / " + imageCount);
  }
}

// triggered after each item is loaded
function onProgress(imgLoad, image) {
  // change class if the image is loaded or broken
  image.img.parentNode.className = image.isLoaded ? "" : "is-broken";
  // update progress element
  loadedImageCount++;
  updateProgress(loadedImageCount);
}

// hide status when done
function onAlways() {
  statusElem.style.opacity = 0;
}
