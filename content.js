// content.js
let catImage = document.createElement('img');
catImage.src = chrome.runtime.getURL('cat.gif');
catImage.id = "test"
catImage.style.position = 'fixed';
catImage.style.top = '10%';
catImage.style.left = '90%';
catImage.style.transform = 'translate(-50%, -50%)';
catImage.style.maxWidth = '30%'; // Ensure the image doesn't exceed the viewport width
catImage.style.maxHeight = '30%'; // Ensure the image doesn't exceed the viewport height
catImage.style.zIndex = '9999';

document.body.append(catImage);

//from https://javascript.info/mouse-drag-and-drop
catImage.onmousedown = function(event) {

	//offset between mouse pointer and left/top of a rectangle encompassing cat object

	catImage.style.position = 'absolute';
	catImage.style.zIndex = 1000;
	document.body.append(catImage);
  
	moveAt(event.pageX, event.pageY);
  
	function moveAt(pageX, pageY) {
		catImage.style.left = pageX + 'px';
		catImage.style.top = pageY + 'px';
	}
  
	function onMouseMove(event) {
	  moveAt(event.pageX, event.pageY);
	}
  
	document.addEventListener('mousemove', onMouseMove);
  
	catImage.onmouseup = function() {
	  document.removeEventListener('mousemove', onMouseMove);
	  catImage.onmouseup = null;
	};

  
  };

catImage.ondragstart = function() {
	return false;
}

// recieve a message:
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello") {
        if (catImage.style.display == "none"){
            catImage.style.display = "block";
        }
        else {
            catImage.style.display = "none";
        }
        sendResponse({farewell: "goodbye"});
      }
    }
  );