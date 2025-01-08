import { registerSW } from "virtual:pwa-register";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";



// Check for stored update status
function checkForUpdateToast() {
    if (localStorage.getItem("sw-update-available") === "true") {
        showUpdateToast();
    }
}

// Function to show the update toast
function showUpdateToast() {
    Toastify({
        text: `
            <h4>A newer version of this page is available!</h4>
            <br>
            <a class='do-sw-update'>Click this banner to update and reload</a>
            `,
        escapeMarkup: false,
        offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: -150, // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        className: "updateToastify",
        close: true,
        gravity: "bottom",
        duration: -1,
        onClick() {
            console.log("Clicking on update to refresh the new service worker");
            localStorage.removeItem("sw-update-available"); // Clear the flag
            updateSW(true); // Trigger service worker update
        },
    }).showToast();
}

// Register the service workers
const updateSW = registerSW({
    onNeedRefresh() {
        console.log("New app version, now available");
        localStorage.setItem("sw-update-available", "true"); 
        showUpdateToast(); 
    },
    onOfflineReady() {
        console.log("App is offline now");
    },
});

// Check for the update flag on page load
checkForUpdateToast();
