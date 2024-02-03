
const button = document.getElementById("mybutton");
// // const cat = document.getElementById("cat")

button.onclick = function() {
	//send a message:
	(async () => {
		const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
		const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
		// do something with response here, not outside the function
		console.log(response);
	})();
}