import { NewYearClock } from "./clock.js";
import { setInnerHtmlForNotNull, addWhatappEventHandler } from "./functions.js";
import { notifyUser } from "./uiFunctions.js";

const dayClock = new NewYearClock();
let day, month, year, time, dayOfWeek, dayCount, daysInYear;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TODAYPAGE_DOM_IDS = {
    yearDomElement: 'year',
    monthDomElement: 'month',
    dayOfMonthDomElement: 'dayOfMonth',
    dayOfWeekDomElement: 'dayOfWeek',
    timeDomElement: 'time',
    dayCountDomElement: 'countDay',
    daysInTheYearDomElement: 'year-count',
};

const updateDate = () => {
    let today = new Date();
    setDomElements(today);
};

const setDomElements = (today) => {
    day = document.getElementById(TODAYPAGE_DOM_IDS.dayOfMonthDomElement);
    month = document.getElementById(TODAYPAGE_DOM_IDS.monthDomElement);
    year = document.getElementById(TODAYPAGE_DOM_IDS.yearDomElement);
    dayOfWeek = document.getElementById(TODAYPAGE_DOM_IDS.dayOfWeekDomElement);
    time = document.getElementById(TODAYPAGE_DOM_IDS.timeDomElement);
    dayCount = document.getElementById(TODAYPAGE_DOM_IDS.dayCountDomElement);
    daysInYear = document.getElementById(TODAYPAGE_DOM_IDS.daysInTheYearDomElement);

    setInnerHtmlForNotNull(day, today.getDate());
    setInnerHtmlForNotNull(month, months[today.getMonth()]);
    setInnerHtmlForNotNull(year, today.getFullYear());
    setInnerHtmlForNotNull(dayOfWeek, days[today.getDay()]);
    setInnerHtmlForNotNull(time, today.toLocaleString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }));
    setInnerHtmlForNotNull(dayCount, dayClock.countDays());
    setInnerHtmlForNotNull(daysInYear, dayClock.getDaysinYear());
};

const copyDOY = async () => {
    let daysInYear =dayClock.getDaysinYear();
    let today = new Date();
    let dayOfWeek = days[today.getDay()];
    let day =today.getDate();
    let monthNumeric = today.getMonth()+1;
    let year = today.getFullYear();

    let dayTextToCopy = `Day ${dayCount.innerText || 'rcountdown'}/${daysInYear} \n${dayOfWeek}\n${day}.${monthNumeric}.${year}`
    console.log(dayTextToCopy);
    await navigator.clipboard.writeText(dayTextToCopy );
    notifyUser("Copied to clipboard");
};

const addClipBoardEventHandler = () => document.querySelector(".copy-link").addEventListener("click", copyDOY);

const updateTimeValues = () => {
    return setInterval(updateDate, 1000);
};

const registerListenersAndUpdate = () => {
    addWhatappEventHandler();
    addClipBoardEventHandler();
    updateTimeValues();
};

registerListenersAndUpdate();
