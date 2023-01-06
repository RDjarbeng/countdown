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
    let currentNotifications = $(".notification");
    if (currentNotifications) {
        currentNotifications.forEach((e)=> e.remove());
    }

    const errMessage = "Oops an error occurred 🤧😐";
    let errHtml = `
    <section class="notification notification--error" style="--num:1">
        <div class="notification_msg">
            <span>${msg || errMessage}</span>
            <div class="notification_close" >
                <i class="fas fa-times"></i>
            </div>
        </div>
    </section>`;
    
    document.body.insertAdjacentHTML("afterbegin", errHtml);
    $('.notification_msg')[0].addEventListener('click', closeErrorInfo);
};

window.onerror = errorHandlerWithoutMessage;