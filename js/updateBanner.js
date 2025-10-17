import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../css/update-banner.css";

let bannerShown = false;

export default function showUpdateToast(updateSW) {
    if (bannerShown) return; // only show once per page load
    bannerShown = true;

    Toastify({
        text: `
        <h4>A newer version of this page is available!</h4>
        <br>
        <a class='do-sw-update'>Click this banner to update and reload</a>
        `,
        escapeMarkup: false,
        offset: {
            x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 50, // vertical axis - can be a number or a string indicating unity. eg: '2em'
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
            bannerShown = false;
        },
    }).showToast();
}