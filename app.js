

import {Clock, NewYearClock  } from "./js/clock.js";
import {setInnerHtmlForNotNull } from "./js/functions.js";
// DOM nodes
let dayCount = document.getElementById("countDay");
const animatedCountDuration = 800;

const body = document.body;
var dayNumber = document.getElementById('day-num');
var hourNumber = document.getElementById("hour-num");
var minNumber = document.getElementById("min-num");
var secNumber = document.getElementById("sec-num");
var dueDate = document.getElementById('dueDate');

//to stop the clock
let intervalID;
let customClockMovement = false;
let dayClock = new NewYearClock();
// Initialize default Clock class
// var myclock = new Anniversary(new Date('5-5-2022'));
var myclock =  setMainClock();
setInnerHtmlForNotNull(dueDate, `${myclock.endDate.getDate() + ' ' + myclock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + myclock.endDate.getFullYear()}`)
var customClock;

function setMainClock() {
    let myclock = new NewYearClock();
    let mainclock =  localStorage.getItem('mainClock');
    if (mainclock !== null && mainclock != undefined) { //countdown set to main
        mainclock = JSON.parse(mainclock)
        myclock = new Clock(new Date(mainclock.date));
        setMainText(mainclock.text)
    }
    return myclock;

}

function setMainText(countdownText) {
    const textDisplay = document.getElementById('countdown-text');
    setInnerHtmlForNotNull(textDisplay, countdownText)
}
/**
 * 
 * @param {Clock} clock 
 * @param {{dayNumber: HTMLElement, hourNumber: HTMLElement, minNumber: HTMLElement, secNumber: HTMLElement}}domElements  should contain elements for day, hour, minutes, second
 * @param {Number} [duration=800] specifies how long the animation lasts in milliseconds
 */
 async function waitForAnimation(clock, domElements, duration) {
    await stepIncreaseAndStart(clock || myclock, domElements, duration || animatedCountDuration)
    startClock(clock || myclock, domElements);
}

function startClock(clock, { dayNumber, hourNumber, minNumber, secNumber }) {
    intervalID = setInterval(() => {  startTime(clock, { dayNumber, hourNumber, minNumber, secNumber });  }, 500);
}

function startTime(clock, { dayNumber, hourNumber, minNumber, secNumber }) {
    // console.log(clock);
    updateDisplay(clock, dayNumber, hourNumber, minNumber, secNumber);
    setInnerHtmlForNotNull(dayCount, dayClock.countDays());
    if (customClockMovement) {
        updateDisplay(customClock, customDayNumber, customHourNumber, customMinNumber, customSecNumber);
    }
}
/**
 * add zero in front of numbers < 10
 * @param {Number} num 
 * @returns num number with 0 at the front
 */
function addZeros(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}
/**
 * Updates the html dom nodes with the clock values, days, hours, minutes, seconds
 * @param {Clock} counter 
 * @param {HTMLElement} dayDisplay 
 * @param {HTMLElement} hourDisplay 
 * @param {HTMLElement} minDisplay 
 * @param {HTMLElement} secDisplay 
 */
function updateDisplay(counter, dayDisplay, hourDisplay, minDisplay, secDisplay) {
    counter.countDown();
    let d = counter.days
    let h = counter.hours
    let m = counter.minutes
    let s = counter.seconds
    d = addZeros(d);
    h = addZeros(h);
    m = addZeros(m);
    s = addZeros(s);
    setInnerHtmlForNotNull(dayDisplay, `${d}`);
    setInnerHtmlForNotNull(hourDisplay, `${h}`);
    setInnerHtmlForNotNull(minDisplay, `${m}`);
    setInnerHtmlForNotNull(secDisplay, `${s}`);
}

/**
 * Listens for a user input for date element
 */
// function listenForDate() {
//     const input = this.value;
//     // console.log(input, 'run');
//     if (input != '') {
//         customClock = new Clock(new Date(input));
//         displayClockRow();
//         // do the fast countdown
//         // set speed faster when day of the year is greater
//         // todo: change to animateValue
//         stepIncreaseAndStart(customClock, { customDayNumber, customHourNumber, customMinNumber, customSecNumber }, (365 - customClock.days < 100) ? 365 - customClock.days : 70);
//     }
// }

function displayClockRow() {
    let customRow = document.getElementById("customDisplay");
    // show row
    customRow.style.display = 'block';
}
/* //restart the clock
function restartTime() {
    if (customClockMovement) {
        return;
    } else {
        startClock();
    }
}
*/
/**
 * Stop the clock with global var intervalID
 */
 function stopClock() {
    clearTimeout(intervalID);
    customClockMovement = false;
}

//for the animated Countdown
function animateValue(domElement, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setInnerHtmlForNotNull(domElement, addZeros(Math.floor(progress * (end - start) + start)))
        if (progress < 1) {
            window.requestAnimationFrame(step);
            // animationComplete = false;
        }
    };
    window.requestAnimationFrame(step);
}

async function stepIncreaseAndStart(clockElement, domElements, speed = 50, start_num = 0) {
    animateValue(domElements.dayNumber, start_num, clockElement.days, speed);
    animateValue(domElements.hourNumber, start_num, clockElement.hours, speed);
    animateValue(domElements.minNumber, start_num, clockElement.minutes, speed);
    animateValue(domElements.secNumber, start_num, clockElement.seconds, speed);

}




try {
    //show day value before animation runs
// setInnerHtmlForNotNull(dayCount, dayClock.countDays());

// startTime();
waitForAnimation(myclock, { dayNumber, hourNumber, minNumber, secNumber }, animatedCountDuration);
// addWhatappEventHandler();
// as;
} catch (error) {
    errorHandler("Error in clock");
    console.log(error);
}

// service worker
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
