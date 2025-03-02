import { NewYearClock } from "./clock.js";
import { addZeros, setInnerHtmlForNotNull } from "./functions.js";
import { notifyUser } from "./uiFunctions.js";

const dayClock = new NewYearClock();
let day, month, year, time, dayOfWeek, dayCount, daysInYear, weekCount;
let weekViewHidden = localStorage.getItem('weekViewHidden') === 'true';

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
    weekCountDomElement: 'weekCount',
    weekCountContainerDomElement: 'weekCountContainer',
    toggleWeekViewDomElement: 'toggleWeekView',
    weekToggleButtonDomElement: 'weekToggleButton',
    weekToggleTextDomElement: 'weekToggleText'
};

const updateDate = () => {
    let today = new Date();
    setDomElements(today);
};

const getWeekNumber = (date) => {
    // Create a copy of the date to avoid modifying the original
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNum = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNum;
};

const getTotalWeeksInYear = (year) => {
    const dec31 = new Date(year, 11, 31); // December 31st of the year
    const weekNum = getWeekNumber(dec31); // Get the week number of Dec 31
    
    // Ensure the week number is within a valid range (52 or 53)
    // If dec31's week number is 1, it likely means it belongs to the next year, so we check the previous year's Dec 31
    if (weekNum === 1) {
        // If Dec 31 is in Week 1 of the next year, the current year has 52 weeks
        return 52;
    }
    
    // Otherwise, return the week number of Dec 31 (should be 52 or 53)
    return weekNum;
};

const setDomElements = (today) => {
    day = document.getElementById(TODAYPAGE_DOM_IDS.dayOfMonthDomElement);
    month = document.getElementById(TODAYPAGE_DOM_IDS.monthDomElement);
    year = document.getElementById(TODAYPAGE_DOM_IDS.yearDomElement);
    dayOfWeek = document.getElementById(TODAYPAGE_DOM_IDS.dayOfWeekDomElement);
    time = document.getElementById(TODAYPAGE_DOM_IDS.timeDomElement);
    dayCount = document.getElementById(TODAYPAGE_DOM_IDS.dayCountDomElement);
    daysInYear = document.getElementById(TODAYPAGE_DOM_IDS.daysInTheYearDomElement);
    weekCount = document.getElementById(TODAYPAGE_DOM_IDS.weekCountDomElement);
    
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
    
     // Get the current week number
     const currentWeek = getWeekNumber(today);
     // Get total weeks in the year
     const totalWeeks = getTotalWeeksInYear(today.getFullYear());
     setInnerHtmlForNotNull(weekCount, `${currentWeek} — ${totalWeeks}`);
     
    
    // Apply hidden state if needed
    updateWeekViewVisibility();
};
const updateWeekViewVisibility = () => {
    const weekContainer = document.getElementById(TODAYPAGE_DOM_IDS.weekCountContainerDomElement);
    const toggleIcon = document.getElementById(TODAYPAGE_DOM_IDS.toggleWeekViewDomElement).querySelector('i');
    const weekToggleText = document.getElementById(TODAYPAGE_DOM_IDS.weekToggleTextDomElement);
    
    if (weekViewHidden) {
        weekContainer.classList.add('hidden-section');
        toggleIcon.className = 'fas fa-eye';
        weekToggleText.textContent = '';
    } else {
        weekContainer.classList.remove('hidden-section');
        toggleIcon.className = 'fas fa-eye-slash';
        weekToggleText.textContent = '';
    }
};

/**
 * @returns {String} day Text depending on the format of the day of year text
 */
const getDayOfYearText = () => {
    let daysInYear = dayClock.getDaysinYear();
    let today = new Date();
    let dayOfWeek = days[today.getDay()];
    let day = today.getDate();
    let monthNumeric = today.getMonth() + 1;
    let year = today.getFullYear();
    let currentWeek = getWeekNumber(today);

    let dayTextToCopy = `Day ${dayCount.innerText || 'rcountdown'}/${daysInYear} \n${dayOfWeek} \n${addZeros(day)}.${addZeros(monthNumeric)}.${year}`;
    
    // Add week information if it's visible
    if (!weekViewHidden) {
        dayTextToCopy += `\nWeek ${currentWeek} of the year`;
    }
    
    return dayTextToCopy;
};

const copyDOY = async () => {
    let dayTextToCopy = getDayOfYearText();
    await navigator.clipboard.writeText(dayTextToCopy);
    notifyUser("Copied to clipboard");
};

const addClipBoardEventHandler = () => document.querySelector(".copy-link").addEventListener("click", copyDOY);

const toggleWeekView = () => {
    weekViewHidden = !weekViewHidden;
    localStorage.setItem('weekViewHidden', weekViewHidden);
    updateWeekViewVisibility();
    
};

const addToggleWeekViewHandlers = () => {
    // Add event listener to the eye icon in the week counter
    const toggleBtn = document.getElementById(TODAYPAGE_DOM_IDS.toggleWeekViewDomElement);
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleWeekView);
    }
    
    // Add event listener to the dedicated toggle button
    const weekToggleButton = document.getElementById(TODAYPAGE_DOM_IDS.weekToggleButtonDomElement);
    if (weekToggleButton) {
        weekToggleButton.addEventListener('click', toggleWeekView);
    }
};

const updateTimeValues = () => {
    return setInterval(updateDate, 1000);
};

export function addWhatappEventHandler() {
    let whatsappIcon = document.getElementById('sendWhatsappButton');
    if (whatsappIcon) {
        whatsappIcon.addEventListener('click', exportToWhatsapp);
    }
}

export function exportToWhatsapp() {
    let dayTextToCopy = encodeURIComponent(getDayOfYearText());
    window.open(`whatsapp://send?text=${dayTextToCopy}`);
}

const registerListenersAndUpdate = () => {
    addWhatappEventHandler();
    addClipBoardEventHandler();
    addToggleWeekViewHandlers();
    updateTimeValues();
};

registerListenersAndUpdate();