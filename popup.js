
const button = document.getElementById("mybutton");
// // const cat = document.getElementById("cat")

//turning the cat on and off
// button.onclick = function() {
// 	//send a message:
// 	(async () => {
// 		const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
// 		const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
// 		// do something with response here, not outside the function
// 		console.log(response);
// 	})();
// }


// chrome.storage.local.get(["key"]).then((result) => {
// 	console.log("Value is " + result.key);
// });

// document.addEventListener("visibilitychange", function () {
	
// 	console.log(Date.now());
// 	//set and get storage
// 	chrome.storage.local.set({ "start_time": "string" }).then(() => {
// 		console.log("Value is set");
// 	});
// 	chrome.storage.local.get(["start_time"]).then((result) => {
// 	console.log("Value is " + result.key);
// 	});
// 	console.log(Date.now());
// });

// document.addEventListener("visibilitychange", function () {

// 	(async () => {
// 		console.log(Date.now());
// 		const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
// 		// console.log(tab.id);
// 		// console.log(tab.url);
// 		// urlObj = new URL(url);
// 		console.log(Date.now());
// 		const response = await chrome.tabs.sendMessage(tab.id, {greeting: "tab"});
// 		console.log(response);
// 	});
// });

// async function test() {
// 	console.log(Date.now());
// 	const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
// 	// console.log(tab.id);
// 	// console.log(tab.url);
// 	// urlObj = new URL(url);
// 	console.log(Date.now());
// 	const response = await chrome.tabs.sendMessage(tab.id, {greeting: "tab"});
// 	console.log(response);
// }

// test();

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  console.log(sender.tab ?
		      "from a content script:" + sender.tab.url :
		      "from the extension");
	  if (request.greeting === "hello")
	    sendResponse({farewell: "gooooodbye"});
	}
);

// document.addEventListener("visibilitychange", function () {
// 	console.log("EVENT LISTENER");
// });