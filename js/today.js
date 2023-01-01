import { NewYearClock } from "./clock.js";
import { setInnerHtmlForNotNull, addWhatappEventHandler } from "./functions.js";
import { notifyUser } from "./uiFunctions.js";
const today = new Date();
const dayClock = new NewYearClock()
let day, month, year, time, dayOfWeek, dayCount, daysInYear;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TODAYPAGE_DOM_IDS ={
    yearDomElement: 'year',
    monthDomElement: 'month',
    dayOfMonthDomElement: 'dayOfMonth',
    dayOfWeekDomElement: 'dayOfWeek',
    timeDomElement: 'time',
    dayCountDomElement: 'countDay',
    daysInTheYearDomElement: 'year-count',
}
const getAndSetDomElements = () => {
    year = document.getElementById(TODAYPAGE_DOM_IDS.yearDomElement);
    month = document.getElementById(TODAYPAGE_DOM_IDS.monthDomElement);
    day = document.getElementById(TODAYPAGE_DOM_IDS.dayOfMonthDomElement);
    dayOfWeek = document.getElementById(TODAYPAGE_DOM_IDS.dayOfWeekDomElement);
    time = document.getElementById(TODAYPAGE_DOM_IDS.timeDomElement);
    dayCount = document.getElementById(TODAYPAGE_DOM_IDS.dayCountDomElement);
    daysInYear = document.getElementById(TODAYPAGE_DOM_IDS.daysInTheYearDomElement);

    setDomElements();
}

const setDomElements = () => {
    //todo: add day count of the year to DOM elements to update
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
    setInnerHtmlForNotNull(daysInYear, dayClock.getDaysinYear());
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


