import { registerSW } from "virtual:pwa-register";
import showUpdateToast from "./updateBanner.js";

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
            showUpdateToast(updateSW);
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
