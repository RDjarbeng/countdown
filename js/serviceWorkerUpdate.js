import { registerSW } from "virtual:pwa-register";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

//track banner count
let countBanner = 0;
function showUpdateToast() {
    countBanner++;
    //limit banner count to 1
    if (countBanner <= 1)
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
                console.log(
                    "Clicking on update to refresh the new service worker"
                );
                updateSW(true); // Trigger service worker update
            },
        }).showToast();
}

// Register the service workers
const updateSW = registerSW({
    onNeedRefresh() {
        console.log("New app version, now available");
    },
    onOfflineReady() {
        console.log("App is offline now");
    },
});

//check for waiting service worker updates
async function checkWaitingServiceWorker() {
    if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        if (registration.waiting) {
            console.log("A new Service Worker is waiting");
            showUpdateToast();
        }
    }
}

if ("serviceWorker" in navigator) {
    // Initial check on page load
    checkWaitingServiceWorker();

    // Listen for new service worker taking control
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("New service worker activated");
        checkWaitingServiceWorker();
    });

    // Listen for new updates
    navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
            console.log("New service worker found");
            const newWorker = registration.installing;
            newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed") {
                    checkWaitingServiceWorker();
                }
            });
        });
    });
}
