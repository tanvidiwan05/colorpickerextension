console.log("Color picker script loaded!");

// Global variables to track event listener state
if (!window.colorPickerActive) {
    window.colorPickerActive = true;

    window.pickColor = function(event) {
        event.preventDefault();
        event.stopPropagation();

        let element = event.target;
        let color = getComputedStyle(element).backgroundColor;

        // Function to find the closest non-transparent color
        function getNonTransparentColor(el) {
            while (el && el !== document.documentElement) {
                let bgColor = getComputedStyle(el).backgroundColor;
                if (bgColor.startsWith("rgb") && bgColor !== "rgba(0, 0, 0, 0)") {
                    return bgColor;
                }
                el = el.parentElement;
            }
            return "rgb(255, 255, 255)";
        }

        color = getNonTransparentColor(element);

        // Convert RGB to HEX safely
        function rgbToHex(rgb) {
            let match = rgb.match(/\d+/g);
            if (!match || match.length < 3) {
                console.error("Invalid color format:", rgb);
                return "#FFFFFF";
            }
            let [r, g, b] = match.map(Number);
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }

        let hexColor = rgbToHex(color);
        navigator.clipboard.writeText(hexColor).then(() => {
            alert("Color copied: " + hexColor);
        });

        chrome.storage.local.set({ selectedColor: hexColor });

        console.log("Picked Color:", hexColor);
    };

    document.addEventListener("click", window.pickColor);
    console.log("Color picker activated!");
} else {
    console.log("Color picker already active.");
}
