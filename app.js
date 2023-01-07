import { Clock, NewYearClock } from "./js/clock.js";
import { animateAndStartClock } from "./js/appfunctions.js";
import { errorHandler } from "./js/error.js";
import { setInnerHtmlForNotNull } from "./js/functions.js";
// import registerUpdateServiceWorker from "./js/serviceWorkerUpdate"

// DOM nodes
const animatedCountDuration = 800;
const HOMEPAGE_DOM_IDS ={
    clockDayElement:'day-num',
    clockHourElement: 'hour-num',
    clockMinuteElement: 'min-num',
    clockSecondElement: 'sec-num',
    countdownTextDisplay: 'countdown-text',
    dueDate: 'dueDate',
}

var dayNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockDayElement);
var hourNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockHourElement);
var minNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockMinuteElement);
var secNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockSecondElement);
var dueDate = document.getElementById(HOMEPAGE_DOM_IDS.dueDate);

// Initialize default Clock class
// var myclock = new Anniversary(new Date('5-5-2022'));
var myclock = setMainClock();
setInnerHtmlForNotNull(dueDate, `${myclock.endDate.getDate() + ' ' + myclock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + myclock.endDate.getFullYear()}`)

function setMainClock() {
    let theClock = new NewYearClock();
    let mainclock = localStorage.getItem('mainClock');
    console.log(mainclock);
    if (mainclock  && mainclock != 'undefined') { //countdown set to main
        mainclock = JSON.parse(mainclock)
        theClock = new Clock(new Date(mainclock.date));
        setMainText(mainclock.text)
    }
    return theClock;

}

function setMainText(countdownText) {
    const textDisplay = document.getElementById(HOMEPAGE_DOM_IDS.countdownTextDisplay);
    setInnerHtmlForNotNull(textDisplay, countdownText)
}



try {
    //show day value before animation runs
    animateAndStartClock(myclock, { dayNumber, hourNumber, minNumber, secNumber }, animatedCountDuration);

    // addWhatappEventHandler();
    // as;
} catch (error) {
    errorHandler("Error in clock");
    console.log(error);
    console.log("Error on main page clock inside wait for animation")
}



/*
if ("serviceWorker" in navigator) {
    // && !/localhost/.test(window.location)) {
    registerSW();
  }
  */
// old service worker
/*
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
    .then( (reg)=>{ 
        console.log('service worker registered', reg)
    })
        .catch((err)=> console.log('Service worker not registered', err));
  });
        
}*/
