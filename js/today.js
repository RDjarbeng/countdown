import { NewYearClock } from "./clock.js";
import { addZeros, setInnerHtmlForNotNull } from "./functions.js";
import { notifyUser } from "./uiFunctions.js";

const dayClock = new NewYearClock();
let day, month, year, time, dayOfWeek, numerator, denominator, title;

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

        if (!view) return;

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
const getStatText = () => {
    let daysInYear = dayClock.getDaysinYear();
    let today = new Date();
    let dayOfWeek = days[today.getDay()];
    let day = today.getDate();
    let monthNumeric = today.getMonth() + 1;
    let year = today.getFullYear();
    let currentWeek = getWeekNumber(today);
    let totalWeeksInYear = getTotalWeeksInYear(today.getFullYear())
    let statText;
    
    const selectedView = title.getElementsByClassName('selected')[0];

    switch (selectedView.dataset.view.toLowerCase()) {
        case 'day':
            statText = `Day ${numerator.innerText || 'rcountdown'}/${daysInYear} \n${dayOfWeek} \n${addZeros(day)}.${addZeros(monthNumeric)}.${year}`;
            break;
        case 'week':
            statText = `Week ${currentWeek}/${totalWeeksInYear} \n${dayOfWeek} \n${addZeros(day)}.${addZeros(monthNumeric)}.${year}`;
            break;
    }
    
    return statText;
};

const copyDOY = async () => {
    let statText = getStatText();
    await navigator.clipboard.writeText(statText);
    notifyUser("Copied to clipboard");
};

const addClipBoardEventHandler = () => document.querySelector(".copy-link").addEventListener("click", copyDOY);

const updateTimeValues = () => {
    return setInterval(updateDate, 1000);
};

export function addWhatsappEventHandler() {
    let whatsappIcon = document.getElementById('sendWhatsappButton');
    if (whatsappIcon) {
        whatsappIcon.addEventListener('click', exportToWhatsapp);
    }
}

export function exportToWhatsapp() {
    let statText = encodeURIComponent(getStatText());
    window.open(`whatsapp://send?text=${statText}`);
}

export const fetchNasaBackground = async () => {
    const userBg = localStorage.getItem('userBg');
    const useNasaBg = localStorage.getItem('useNasaBg') !== 'false';
    const container = document.getElementById('nasaInfoContainer');
    const toggle = document.getElementById('nasaBgToggle');
    
    if (userBg) {
        if (container) container.style.display = 'none';
        return;
    }

    if (container) {
        container.style.display = 'flex';
        toggle.checked = useNasaBg;
    }

    if (!useNasaBg) {
        const titleEl = document.getElementById('nasaInfoHeaderTitle');
        if (titleEl) titleEl.innerText = "NASA APOD (Disabled)";
        const loading = document.getElementById('nasaLoading');
        if (loading) loading.style.display = 'none';
        return;
    }

    try {
        const cachedData = sessionStorage.getItem('nasaApod');
        let data;
        
        if (cachedData) {
            data = JSON.parse(cachedData);
        } else {
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
            if (!response.ok) throw new Error('NASA API error');
            data = await response.json();
            sessionStorage.setItem('nasaApod', JSON.stringify(data));
        }

        if (data.media_type === 'image') {
            const imageUrl = data.hdurl || data.url;
            
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
                document.body.style.backgroundImage = `url('${imageUrl}')`;
                
                const loading = document.getElementById('nasaLoading');
                if (loading) loading.style.display = 'none';
                const details = document.getElementById('nasaDetails');
                if (details) details.style.display = 'block';
                const titleEl = document.getElementById('nasaTitle');
                if (titleEl) titleEl.innerText = data.title;
                const explanationEl = document.getElementById('nasaExplanation');
                if (explanationEl) explanationEl.innerText = data.explanation;
            };
        }
    } catch (error) {
        console.warn("Could not fetch NASA background:", error);
        const loading = document.getElementById('nasaLoading');
        if (loading) loading.innerText = "Failed to load APOD.";
    }
};

const setupNasaUI = () => {
    const header = document.getElementById('nasaInfoHeader');
    const container = document.getElementById('nasaInfoContainer');
    const toggle = document.getElementById('nasaBgToggle');
    
    if (header) {
        header.addEventListener('click', () => {
            if (container) container.classList.toggle('expanded');
        });
    }

    if (toggle) {
        toggle.addEventListener('change', (e) => {
            localStorage.setItem('useNasaBg', e.target.checked);
            if (!e.target.checked) {
                document.body.style.backgroundImage = ''; // Revert to default
                const loading = document.getElementById('nasaLoading');
                if (loading) loading.style.display = 'none';
                const details = document.getElementById('nasaDetails');
                if (details) details.style.display = 'none';
                const titleEl = document.getElementById('nasaInfoHeaderTitle');
                if (titleEl) titleEl.innerText = "NASA APOD (Disabled)";
            } else {
                const titleEl = document.getElementById('nasaInfoHeaderTitle');
                if (titleEl) titleEl.innerText = "NASA Picture of the Day";
                const loading = document.getElementById('nasaLoading');
                if (loading) loading.style.display = 'block';
                fetchNasaBackground();
            }
        });
    }
};

const registerListenersAndUpdate = () => {
    addWhatsappEventHandler();
    addClipBoardEventHandler();
    updateTimeValues();
    setupNasaUI();
    fetchNasaBackground();
    window.addEventListener('backgroundChanged', fetchNasaBackground);
};

registerListenersAndUpdate();