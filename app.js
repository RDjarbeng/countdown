// require('./clock')
import Clock from './clock.js'

// DOM nodes
// let icon = document.getElementsByClassName("toggleMode")[0];
let icon = document.getElementById('themeToggle');
let dayCount = document.getElementById("countDay");
// let controls = document.getElementsByClassName("button");
// let startButton = document.getElementById('startButton');
// let stopButton = document.getElementById('stopButton');
let body = document.body;
let dayNumber =document.getElementById('day-num');
let hourNumber =document.getElementById("hour-num");
let minNumber =document.getElementById("min-num");
let secNumber =document.getElementById("sec-num");
let dateInput = document.getElementById('customDate')
//to stop the clock
let intervalID;
let clockMovement = false;

// Initialize Clock class
var myclock = new Clock();
var customClock;

function startClock() {
    intervalID = setInterval(startTime, 500);
}

function startTime() {
    myclock.countDown();
    displayClock(myclock, dayNumber, hourNumber, minNumber, secNumber);
    dayCount.innerHTML= myclock.countDays();
    clockMovement = true;
}

// add zero in front of numbers < 10
function addZeros(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

function displayClock(counter, dayDisplay, hourDisplay, minDisplay, secDisplay){
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
        // console.log(customClock);
        const dayNumber =document.getElementById('day-custom');
        const hourNumber =document.getElementById("hour-custom");
        const minNumber =document.getElementById("min-custom");
        const secNumber =document.getElementById("sec-custom");
        
        // let customRow =document.getElementById("customDisplay");
        // show row
        // customRow.style.display= 'block';
        displayClock(customClock, dayNumber, hourNumber, minNumber, secNumber);
        console.log('problem');
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
    if (clockMovement) {
        return;
    } else {
        startClock();
    }
}
*/



function stopClock() {
    clearTimeout(intervalID);
    clockMovement = false;
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