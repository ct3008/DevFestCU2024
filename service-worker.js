console.log("service worker");

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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.greeting === 'hello') {
	  setActive();
	  console.log("hello");
	  return true;
	}
});