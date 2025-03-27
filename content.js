document.addEventListener("click", function(event) {
    let color = getComputedStyle(event.target).backgroundColor;

    // Convert RGB to HEX
    function rgbToHex(rgb) {
        let result = rgb.match(/\d+/g).map(Number);
        return "#" + result.map(x => x.toString(16).padStart(2, '0')).join('');
    }

    let hexColor = rgbToHex(color);

    // Copy color to clipboard
    navigator.clipboard.writeText(hexColor).then(() => {
        alert("Color copied: " + hexColor);
    });

    // Send color back to popup
    chrome.storage.local.set({ selectedColor: hexColor });
});
