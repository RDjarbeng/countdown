// require('./clock')
import Clock from './clock.js'

// DOM nodes
let icon = document.getElementById('themeToggle');
let dayCount = document.getElementById("countDay");
// let controls = document.getElementsByClassName("button");
// let startButton = document.getElementById('startButton');
// let stopButton = document.getElementById('stopButton');
const body = document.body;
const dayNumber =document.getElementById('day-num');
const hourNumber =document.getElementById("hour-num");
const minNumber =document.getElementById("min-num");
const secNumber =document.getElementById("sec-num");
const dateInput = document.getElementById('customDate')

const customDayNumber =document.getElementById('day-custom');
const customHourNumber =document.getElementById("hour-custom");
const customMinNumber =document.getElementById("min-custom");
const customSecNumber =document.getElementById("sec-custom");
//to stop the clock
let intervalID;
let customClockMovement = false;

// Initialize Clock class
var myclock = new Clock();
var customClock;

function startClock() {
    intervalID = setInterval(startTime, 500);
}

function startTime() {
    displayClock(myclock, dayNumber, hourNumber, minNumber, secNumber);
    dayCount.innerHTML= myclock.countDays();
    if(customClockMovement){
        displayClock(customClock, customDayNumber, customHourNumber, customMinNumber, customSecNumber);
    }
}

// add zero in front of numbers < 10
function addZeros(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

function displayClock(counter, dayDisplay, hourDisplay, minDisplay, secDisplay){
    counter.countDown();
    let d = counter.days
    let h = counter.hours
    let m = counter.minutes
    let s = counter.seconds
    d= addZeros(d);
    h = addZeros(h);
    m = addZeros(m);
    s = addZeros(s);

    dayDisplay.innerHTML = `${d}`;
    hourDisplay.innerHTML = `${h}`;
    minDisplay.innerHTML = `${m}`;
    secDisplay.innerHTML = `${s}`;
}



//todo: find a better way of checking for a valid date
/**
 * Listens for a user input for date element
 */
function listenForDate(){
    const input = this.value;
    // console.log(input, 'run');
    if(input != ''){
        customClock = new Clock(new Date(input));
        
        // let customRow =document.getElementById("customDisplay");
        // show row
        // customRow.style.display= 'block';
        customClockMovement = true;
        
        // let d = customClock.days
        // let h = customClock.hours
        // let m = customClock.minutes
        // let s = customClock.seconds
        // console.log(d, h, m, s);
        // d= addZeros(d);
        // h = addZeros(h);
        // m = addZeros(m);
        // s = addZeros(s);
        // console.log(d, h, m, s);
        // dayNumber.innerHTML = `${d}`;
        // hourNumber.innerHTML = `${h}`;
        // minNumber.innerHTML = `${m}`;
        // secNumber.innerHTML = `${s}`;
    }
}
/* restart the clock
function restartTime() {
    if (customClockMovement) {
        return;
    } else {
        startClock();
    }
}
*/



function stopClock() {
    clearTimeout(intervalID);
    customClockMovement = false;
}

//light mode if after 6am and after 18:00 evening
function autoLight() {
    let h = new Date().getHours();
    //between 6 am and 6pm
    if (h > 5 && h < 18) activateLightMode();
}

function activateLightMode() {
    icon.innerHTML = `<i class="fas fa-moon"></i>`;
    body.classList.toggle("light");
}

function activateDarkMode() {
    icon.innerHTML = `<i class="fas fa-sun"></i>`;
    body.classList.toggle("light");
}

function setMode() {
    if (!body.classList.contains("light")) {
        activateLightMode();
    } else {
        activateDarkMode();
    }
}
function notifyMode() {
    let notifyText;
    if (body.classList.contains("light")) {
        notifyText = "Light mode set";
    } else {
        notifyText = "Dark mode set";
    }

    if (document.getElementsByClassName("mode-info")[0]) {
        document.getElementsByClassName("mode-info")[0].remove();
        body.insertAdjacentHTML(
            "afterbegin",
            `<span class="mode-info">${notifyText}</span>`
        );
    } else {
        body.insertAdjacentHTML(
            "afterbegin",
            `<span class="mode-info">${notifyText}</span>`
        );
    }
}

        // console.log();
startClock();
autoLight();
// listenForDate();
// init events
icon.addEventListener("click", setMode);
icon.addEventListener("click", notifyMode);
dateInput.addEventListener('change', listenForDate);
//Prefer this 
// startButton.addEventListener("click", restartTime);
// endButton.addEventListener("click", stopClock);

// service worker
/*
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
    .then( (reg)=> console.log('service worker registered', reg))
        .catch((err)=> console.log('Service worker not registered', err));
  });
        
}
*/