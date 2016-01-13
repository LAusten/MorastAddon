var buttons = require('sdk/ui/button/action');
var pageWorkers = require("sdk/page-worker");
var tabs = require("sdk/tabs");
var winUtils = require('sdk/deprecated/window-utils');
var urls = require("sdk/url")

// Initialize Addon UI

var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("sdk/panel").Panel({
  contentURL: data.url("html/text-entry.html"),
  contentScriptFile: data.url("js/get-text.js")
});

var sucessAlert = require("sdk/panel").Panel({
  contentURL: data.url("html/successAlert.html")/*,
  contentScriptFile: data.url("js/get-text.js")*/
});

var errorAlert = require("sdk/panel").Panel({
  contentURL: data.url("html/errorAlert.html")/*,
  contentScriptFile: data.url("js/get-text.js")*/
});


var button = buttons.ActionButton(
{
	id: "MorastLink",
	label: "In den Morast",
	icon:
	{
		"16": "data/images/icon16.png",
		"32": "data/images/icon32.png",
		"64": "data/images/icon64.png"
	},
	onClick: CopyToMorast
});

// Main Function
function CopyToMorast(state)
{
  // Check if valid Site!
  if(((tabs.activeTab.url).indexOf("mouser.ch/ProductDetail")) > -1)
    text_entry.show();     // Open popup to get quantity and costcenter
  else
    errorAlert.show();
}

// Supporting functions

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});



// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
text_entry.port.on("text-entered", function (text) {
	//console.log(text);
  text_entry.hide();
  var pageWorker = require("sdk/page-worker").Page({
  contentScriptFile: data.url("js/MorastContentScript.js"),
  contentURL: tabs.activeTab.url
	});
  pageWorker.port.emit("post", text);

  pageWorker.port.on("sucess", function() {
  	//console.log("sucess");
  	sucessAlert.show();
	});
});