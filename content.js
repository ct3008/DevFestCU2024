// content.js
let catImage = document.createElement('img');
catImage.src = chrome.runtime.getURL('cat.gif');
catImage.style.position = 'fixed';
catImage.style.top = '10%';
catImage.style.left = '90%';
catImage.style.transform = 'translate(-50%, -50%)';
catImage.style.maxWidth = '30%'; // Ensure the image doesn't exceed the viewport width
catImage.style.maxHeight = '30%'; // Ensure the image doesn't exceed the viewport height
catImage.style.zIndex = '9999';

document.body.append(catImage);

let offsetX, offsetY;
let isDragging = false;

// Event listener for mouse down event
catImage.addEventListener('mousedown', function(event) {
    isDragging = true;
    offsetX = event.clientX - parseFloat(catImage.style.left);
    offsetY = event.clientY - parseFloat(catImage.style.top);
});

// Event listener for mouse move event
document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        let x = event.clientX - offsetX;
        let y = event.clientY - offsetY;
        catImage.style.left = x + 'px';
        catImage.style.top = y + 'px';
    }
});

// Event listener for mouse up event
document.addEventListener('mouseup', function() {
    isDragging = false;
});