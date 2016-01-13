// When the user hits return, send the "text-entered"
// message to main.js.
// The message payload is the contents of the edit box.
var textArea = [document.getElementById("InputQuantity"), document.getElementById("InputCostCenter")];


textArea[1].addEventListener('keyup', function onkeyup(event) {
  emitText(event);
}, false);


textArea[0].addEventListener('keyup', function onkeyup(event) {
	emitText(event);
}, false);


function emitText(event){
	if (event.keyCode == 13) {
	    // Remove the newline.
	    text = {InputQuantity: textArea[0].value.replace(/(\r\n|\n|\r)/gm,""),
	    		InputCostCenter: textArea[1].value.replace(/(\r\n|\n|\r)/gm,"")};
	    self.port.emit("text-entered", text);
	    textArea.value = '';
	}
}

// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing.
self.port.on("show", function onShow() {
  textArea[0].focus();
});