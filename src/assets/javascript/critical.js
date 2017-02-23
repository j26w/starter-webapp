/*
defer loading images
*/
function init() {
var imgDefer = document.getElementsByTagName('img');
for (var i=0; i<imgDefer.length; i++) {
if(imgDefer[i].getAttribute('data-src')) {
imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'));
} } }
window.onload = init;
/*
Asynchronously load scripts.js
*/
function downloadJSAtOnload() {
var element = document.createElement("script");
element.src = "/assets/js/scripts.js";
document.body.appendChild(element);
}
if (window.addEventListener)
window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent)
window.attachEvent("onload", downloadJSAtOnload);
else window.onload = downloadJSAtOnload;

/*
Fonts are loaded through @font-face rules in the CSS whenever an element references them.
FontFaceObserver creates a referencing element to trigger the font request, and lsisten for font load events.
When all 3 fonts are loaded, we enable them by adding a class to the html element
*/
(function( w ){
	// if the class is already set, we're good.
	if( w.document.documentElement.className.indexOf( "fonts-loaded" ) > -1 ){
		return;
	}
	var fontA = new w.FontFaceObserver( "Source Sans Pro", {
		weight: 300
	});

	var fontB = new w.FontFaceObserver( "Source Sans Pro", {
		weight: 600
	});

	var fontC = new w.FontFaceObserver( "Source Sans Pro", {
		weight: 300,
		style: "italic"
	});

	w.Promise
		.all([fontA.check(), fontB.check(), fontC.check()])
		.then(function(){
			// apply the fonts-loaded class to the html element
			w.document.documentElement.className += " fonts-loaded";
			// set a cookie so web fonts can be applied immediately on subsequent visits
			cookie( "fonts-loaded", true, 7 );
		});
}( this ));