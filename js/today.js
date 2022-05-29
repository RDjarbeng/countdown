import { NewYearClock } from "./clock.js";
import { setInnerHtmlForNotNull, addWhatappEventHandler } from "./functions.js";
import { notifyUser } from "./uiFunctions.js";
const today = new Date();
const dayClock = new NewYearClock()
let day, month, year, time, dayOfWeek, dayCount;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getAndSetDomElements = () => {
    year = document.getElementById('year');
    month = document.getElementById('month');
    day = document.getElementById('dayOfMonth');
    dayOfWeek = document.getElementById('dayOfWeek');
    time = document.getElementById('time');
    dayCount = document.getElementById("countDay");

    setDomElements();
}

const setDomElements = () => {
    setInnerHtmlForNotNull(day, today.getDate())
    setInnerHtmlForNotNull(month, months[today.getMonth()])
    setInnerHtmlForNotNull(year, today.getFullYear())
    setInnerHtmlForNotNull(dayOfWeek, days[today.getDay()])
    setInnerHtmlForNotNull(time, today.toLocaleString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }))
    // day count
    setInnerHtmlForNotNull(dayCount, dayClock.countDays());
}

const copyDOY = async () => {
    await navigator.clipboard.writeText(`Day ${dayCount.innerText || 'rcountdown'}/365`);
    notifyUser("Copied to clipboard");
}
const addClipBoardEventHandler = () => document.querySelector(".copy-link").addEventListener("click", copyDOY);

const updateTimeValues = () => {
    return setInterval(setDomElements, 1000);

}
const registerListenersAndUpdate = () => {
    addWhatappEventHandler();
    addClipBoardEventHandler();
    updateTimeValues();
}
getAndSetDomElements();
registerListenersAndUpdate();


