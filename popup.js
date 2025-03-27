
document.getElementById("startPick").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url.startsWith("chrome://")) {
        alert("This extension does not work on Chrome pages!");
        return;
    }

    // Inject content script to start picking colors
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
    }).catch(err => console.error("Script execution failed:", err));
});


document.getElementById("stopPick").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send a message to content.js to remove event listener
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            if (window.colorPickerActive) {
                document.removeEventListener("click", window.pickColor);
                window.colorPickerActive = false;
                alert("Color Picker Stopped");
            }
        }
    });
});
