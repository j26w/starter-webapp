/*! YellowDog   | http://www.yellowdogagency.com | (c) 2017 YellowDog Marketing Inc. */


// add .js class to html if javascript enabled
if ( 'querySelector' in document && 'addEventListener' in window ) {document.documentElement.className += ' js';}

// add .no-touch class to html if not a touch device
if (!("ontouchstart" in document.documentElement)) {document.documentElement.className += " no-touch";}
