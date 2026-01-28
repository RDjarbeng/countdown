/**
 * Custom App Name Module
 * Handles personalized app naming with localStorage persistence
 */

const STORAGE_KEY = "customAppName";
const DEFAULT_NAME = "Final CountDown";

/**
 * Get the custom app name from localStorage
 * @returns {string} The custom name or default 'rcountdown'
 */
export function getCustomAppName() {
    const savedName = localStorage.getItem(STORAGE_KEY);
    return savedName && savedName.trim() !== "" ? savedName : DEFAULT_NAME;
}

/**
 * Save the custom app name to localStorage
 * @param {string} name - The name to save
 */
export function saveCustomAppName(name) {
    const trimmedName = name.trim();
    if (trimmedName === "") {
        localStorage.removeItem(STORAGE_KEY);
    } else {
        localStorage.setItem(STORAGE_KEY, trimmedName);
    }
}

/**
 * Initialize the custom app name functionality
 * Sets up event listeners for editing the app name
 */
export function initCustomAppName() {
    const displayElement = document.getElementById("app-name-display");
    const inputElement = document.getElementById("app-name-input");

    if (!displayElement || !inputElement) {
        console.warn("Custom app name elements not found");
        return;
    }

    // Load and display the saved name
    const savedName = getCustomAppName();
    displayElement.textContent = savedName;

    // Click on display to edit
    displayElement.addEventListener("click", () => {
        displayElement.style.display = "none";
        inputElement.style.display = "inline-block";
        inputElement.value = displayElement.textContent;
        inputElement.focus();
        inputElement.select();
    });

    // Save on blur (clicking outside)
    inputElement.addEventListener("blur", () => {
        saveAndHideInput();
    });

    // Save on Enter key
    inputElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            inputElement.blur(); // Trigger the blur event
        } else if (e.key === "Escape") {
            // Cancel editing
            inputElement.value = displayElement.textContent;
            hideInput();
        }
    });

    function saveAndHideInput() {
        const newName = inputElement.value.trim();
        const finalName = newName === "" ? DEFAULT_NAME : newName;

        saveCustomAppName(newName);
        displayElement.textContent = finalName;
        hideInput();
    }

    function hideInput() {
        inputElement.style.display = "none";
        displayElement.style.display = "inline-block";
    }
}
