import { Anniversary, Clock, NewYearClock } from "./js/clock.js";
import { animateAndStartClock, countElapsedListener_home, updateHomePageRepeatCountdown } from "./js/appfunctions.js";
import { errorHandler } from "./js/error.js";
import { setInnerHtmlForNotNull } from "./js/functions.js";
import { HOMEPAGE_DOM_IDS } from "./js/HOMEPAGE_DOM_IDS.js";
// import registerUpdateServiceWorker from "./js/serviceWorkerUpdate"

// DOM nodes
const animatedCountDuration = 800;
var dayNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockDayElement);
var hourNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockHourElement);
var minNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockMinuteElement);
var secNumber = document.getElementById(HOMEPAGE_DOM_IDS.clockSecondElement);
var dueDate = document.getElementById(HOMEPAGE_DOM_IDS.dueDate);

// Initialize default Clock class
// var myclock = new Anniversary(new Date('5-5-2022'));
var myclock = setMainClockOnHome();
setInnerHtmlForNotNull(dueDate, `${myclock.endDate.getDate() + ' ' + myclock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + myclock.endDate.getFullYear()}`)

function setMainClockOnHome() {
    let theClock = new NewYearClock();
    let mainClockCountdown = localStorage.getItem('mainClock');
    if (mainClockCountdown  && mainClockCountdown != 'undefined') { //countdown set to main
        mainClockCountdown = JSON.parse(mainClockCountdown)
        //if main clock is a repeat count
        if(mainClockCountdown.hasOwnProperty('repeat') && mainClockCountdown.repeat){
            console.warn('Repeat found');
            //check if Countdown has elapsed
            if (new Date(mainClockCountdown.date) - new Date() < 0){
                console.log('Less than 0');
                updateHomePageRepeatCountdown(mainClockCountdown)
            }
            console.log('inside app new Repeat',mainClockCountdown.date);
            theClock = new Anniversary(new Date(mainClockCountdown.date));
        }else{
            theClock = new Clock(new Date(mainClockCountdown.date));

        }
        setMainText(mainClockCountdown.text)
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
    addEventListener('elapsed', countElapsedListener_home);
} catch (error) {
    errorHandler("Error in diplay on this page");
    console.log(error);
    console.log("Error on main page clock")
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
