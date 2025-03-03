import { NewYearClock } from "./clock.js";
import { addZeros, setInnerHtmlForNotNull } from "./functions.js";
import { notifyUser } from "./uiFunctions.js";

const dayClock = new NewYearClock();
let day, month, year, time, dayOfWeek, dayCount, numerator, denominator, title;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TODAYPAGE_DOM_IDS = {
    yearDomElement: 'year',
    monthDomElement: 'month',
    dayOfMonthDomElement: 'dayOfMonth',
    dayOfWeekDomElement: 'dayOfWeek',
    timeDomElement: 'time',
    numerator: 'num',
    denominator: 'den',
    title: 'title',
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

    numerator = document.getElementById(TODAYPAGE_DOM_IDS.numerator);
    denominator = document.getElementById(TODAYPAGE_DOM_IDS.denominator);
    title = document.getElementById(TODAYPAGE_DOM_IDS.title);
    
    setInnerHtmlForNotNull(day, today.getDate());
    setInnerHtmlForNotNull(month, months[today.getMonth()]);
    setInnerHtmlForNotNull(year, today.getFullYear());
    setInnerHtmlForNotNull(dayOfWeek, days[today.getDay()]);
    setInnerHtmlForNotNull(time, today.toLocaleString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }));
    
     const currentWeek = getWeekNumber(today); // Get the current week number
     const totalWeeks = getTotalWeeksInYear(today.getFullYear()); // Get total weeks in the year

     const toggleSelectedOption = (view) => {
        if (view.classList.contains("selected")) {
            view.classList.remove("selected");
        } else { view.classList.add("selected"); }
    }

    // event for changing the stat view
     const selectStatView = (e) =>{
        let options = Array.from(e.currentTarget.children);
        let view = e.target.closest(".option");

        options.forEach(option => {            
            if (option.classList.contains("selected")) {    
                option.classList.remove("selected");
            }
        }); 

        switch (view.dataset.view.toLowerCase()) {
            case 'day':
                setInnerHtmlForNotNull(numerator, dayClock.countDays() );
                setInnerHtmlForNotNull(denominator, dayClock.getDaysinYear()); 
                toggleSelectedOption(view);
                break;
            case 'week':
                setInnerHtmlForNotNull(numerator, `${currentWeek}`);
                setInnerHtmlForNotNull(denominator, `${totalWeeks}`);
                toggleSelectedOption(view);
                break;
        }
    }

    title.addEventListener("click", selectStatView);
};

function defaultStatView() {
    numerator = document.getElementById(TODAYPAGE_DOM_IDS.numerator);
    denominator = document.getElementById(TODAYPAGE_DOM_IDS.denominator);
    let selectedView = document.querySelector('[data-view]');
    selectedView.classList.add("selected");
    setInnerHtmlForNotNull(numerator, dayClock.countDays() );
    setInnerHtmlForNotNull(denominator, dayClock.getDaysinYear());;
}

defaultStatView();

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
    let totalWeeksInYear = getTotalWeeksInYear(today.getFullYear())

    let dayTextToCopy = `Day ${dayCount.innerText || 'rcountdown'}/${daysInYear} \n${dayOfWeek} \n${addZeros(day)}.${addZeros(monthNumeric)}.${year}`;
    
    return dayTextToCopy;
};

const copyDOY = async () => {
    let dayTextToCopy = getDayOfYearText();
    await navigator.clipboard.writeText(dayTextToCopy);
    notifyUser("Copied to clipboard");
};

const addClipBoardEventHandler = () => document.querySelector(".copy-link").addEventListener("click", copyDOY);

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
    // addToggleWeekViewHandlers();
    updateTimeValues();
};

registerListenersAndUpdate();