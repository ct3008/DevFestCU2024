// content.js
let catImage = document.createElement('img');
catImage.src = chrome.runtime.getURL('cat.gif');
catImage.id = "test"
catImage.style.position = 'fixed';
catImage.style.top = '10%';
catImage.style.left = '90%';
catImage.style.transform = 'translate(-50%, -50%)';
catImage.style.maxWidth = '100px'; // Ensure the image doesn't exceed the viewport width
catImage.style.maxHeight = '100px'; // Ensure the image doesn't exceed the viewport height
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
        console.log("MOUSE EVENT");
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

// async function test() {
//     try {
//         const response = await chrome.runtime.sendMessage({greeting: "hello"});
//         console.log(response);
//     }
//     catch (error){
//         console.log(error);
//     }
// }

// test();


//based off of https://medium.com/backticks-tildes/how-i-developed-apples-screen-time-chrome-extension-988e0c451894

let tab = null;
let current_host = "";
let current_total = 0;
let current_start = 0;

//update total time in local storage
async function end() {

    //calculate new total time to include finished session
    let total_time = Date.now() - current_start + current_total
    console.log("total time:");
    console.log(total_time);
    try {
        await chrome.storage.local.set({current_host: total_time});
    } catch(error) {
        console.log(error);
    }  
}

//switch current tab info
async function setActive() {
    console.log("set active. current host:");
    console.log(current_host);
    
    //if tabs have changed,
    if (current_host != tab) {
        console.log("tabs have changed");

        //end old host
        end();

        //set new host, start, and total
        current_host = tab;
        current_start = Date.now();
        try {
            current_total = await chrome.storage.local.get([current_host]);
            console.log("current total from get:")
            console.log(result);
        } catch(error) {
            current_total = 0;
            console.log(error);
        }
    }  
}

window.addEventListener("visibilitychange", function() {
    console.log("VISIBILITY");
    tab = window.location.href;
    console.log(tab);
    setActive();
});

//when tabs are changed
// document.addEventListener("visibilitychange", function () {
//     // setActive();
// });



// recieve a message:
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting === "hello") {
//         console.log("Hello greeting");
//         if (catImage.style.display == "none"){
//             catImage.style.display = "block";
//         }
//         else {
//             catImage.style.display = "none";
//         }
//         sendResponse({farewell: "goodbye"});
//       }
//       if (request.greeting === "tab") {
//         console.log("TAB");
//         tab = request;
//         //setActive();
//         sendResponse({farewell: "tab recieved"});
//       }
//     }
//   );

