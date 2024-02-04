let pointsAvailable = 300;
document.getElementById("score_box").innerText = `Points Available: ${pointsAvailable}`;

// buying item func
function buyItem(button) {
    const itemPrice = parseInt(button.dataset.price);
    if (pointsAvailable >= itemPrice) {
        pointsAvailable -= itemPrice;
        document.getElementById("score_box").innerText = `Points Available: ${pointsAvailable}`;
        button.innerText = "Equip";
        button.classList.remove("price-button");
        button.classList.add("equipped");
        
        button.removeEventListener("click", buyFunction);
    } else {
        alert("Insufficient points to buy this item.");
    }
}

// equip item func
function equipItem(button) {

    // equipped item's image source
    const equippedImageSrc = button.dataset.equippedImageSrc;
    
    // id of equipped item
    const itemId = button.dataset.item;
	console.log(itemId);
    
    // should update img source in id0 category
    const itemImage = document.querySelector(`#id0 #${itemId}`);
    if (itemImage && equippedImageSrc) {
        itemImage.src = equippedImageSrc;
    }

	//apply png for accessory maybe
    applyPNG();
	
}

// buy item
function buyFunction() {
    buyItem(this);
}

// equip item
function equipFunction() {
    equipItem(this);
}

// on buy buttons to actually buy
const buyButtons = document.querySelectorAll(".price-button");
buyButtons.forEach(button => {
    button.addEventListener("click", buyFunction);

});

// on equip buttons to equip (not working)
const equipButtons = document.querySelectorAll(".equipped");
equipButtons.forEach(button => {
    button.addEventListener("click", equipFunction());
	
});

function applyPNG() {
    // apply accessory png to the HTML. Could not implement in time
}

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


//change the home screens
let w = document.getElementById("homepage");
let x = document.getElementById("milestone");
let y = document.getElementById("settings");
let z = document.getElementById("store");

let a = document.getElementById("id0");
let b = document.getElementById("1");
let c = document.getElementById("2");
let d = document.getElementById("3");


a.style.display = "none"
b.style.display = "none"
c.style.display = "none"
d.style.display = "none"


w.onclick = function() {
	document.getElementById("cat").style.visibility = "hidden";
	document.getElementById("cat2").style.display = "block";
	a.style.display = "block"
	b.style.display = "none"
	c.style.display = "none"
	d.style.display = "none"
}

x.onclick = function() {
	document.getElementById("cat").style.visibility = "visible";
	a.style.display = "none"
	b.style.display = "block"
	c.style.display = "none"
	d.style.display = "none"
}

y.onclick = function() {
	document.getElementById("cat").style.visibility = "visible";
	a.style.display = "none"
	b.style.display = "none"
	c.style.display = "block"
	d.style.display = "none"
}

z.onclick = function() {
	document.getElementById("cat").style.visibility = "visible";
	a.style.display = "none"
	b.style.display = "none"
	c.style.display = "none"
	d.style.display = "block"
}

document.addEventListener("DOMContentLoaded", function () {
    const postButton1 = document.getElementById("postButton1");
    const postButton2 = document.getElementById("postButton2");
    const textbox1 = document.getElementById("textbox1");
    const textbox2 = document.getElementById("textbox2");
    const postList1 = document.getElementById("postList1");
    const postList2 = document.getElementById("postList2");

    function addPost(text, parent) {
        const postElement = document.createElement("div");
        postElement.textContent = text;
        postElement.classList.add("post");
        parent.appendChild(postElement);
    }

    function postHandler(textbox, postList) {
        const button = textbox.nextElementSibling;
		const posts = postList.querySelectorAll(".post");
		if (posts.length >= 3) {
			button.disabled = true;
		} else {
			button.addEventListener("click", function () {
				const text = textbox.value.trim();
				if (text !== "") {
					addPost(text, postList);
					textbox.value = "";
				}
				if (postList.querySelectorAll(".post").length >= 3) {
                    button.disabled = true;
                }
			});
		}
        

        textbox.addEventListener("keypress", function (event) {
			
            if (event.key === "Enter") {
                const text = textbox.value.trim();
                if (text !== "" && (postList.querySelectorAll(".post").length < 3)) {
                    addPost(text, postList);
                    textbox.value = "";
                }
            }
			if (postList.querySelectorAll(".post").length >= 3) {
				button.disabled = true;
			}
			
        });
    }

    postHandler(textbox1, postList1);
    postHandler(textbox2, postList2);
});











