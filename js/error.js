import "../css/notification.css";
import { $ } from "./functions.js";
/**
 * remove div containing error message
 * @param {Event} event 
 */
export const closeErrorInfo = (event) => event.currentTarget.parentElement.remove();
/**
 * Error handler for the top level window element to catch uncaught errors
 * @param {Error} err 
 */
export const errorHandlerWithoutMessage = (err) => {
    console.warn('Top level window error', err);
    errorHandler();
}
/**
 * Displays dismissable error message passed into function on screen
 * @param {String} msg 
 */
export const errorHandler = (msg) => {
    const errMessage = "Oops an error occurred 🤧😐";
    let errHtml = `
    <section class="notification notification--error">
        <div class="notification_msg">
            <span>${msg || errMessage}</span>
            <div class="notification_close" >
                <i class="fas fa-times"></i>
            </div>
        </div>
    </section>`;

    if (prevErr) {
        let item = $(".notification--error")[0];
        if (item) item.remove();
        document.body.insertAdjacentHTML("afterbegin", errHtml);
    } else {
        document.body.insertAdjacentHTML("afterbegin", errHtml);
        prevErr = true;
    }
    document.querySelector('.notification_msg').addEventListener('click', closeErrorInfo)
};
let prevErr = false;
window.onerror = errorHandlerWithoutMessage;