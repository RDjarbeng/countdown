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

// Initialize default Clock class
var myclock = new Clock();
var customClock;

function startClock() {
    intervalID = setInterval(startTime, 500);
}

function startTime() {
    updateDisplay(myclock, dayNumber, hourNumber, minNumber, secNumber);
    dayCount.innerHTML= myclock.countDays();
    if(customClockMovement){
        
        updateDisplay(customClock, customDayNumber, customHourNumber, customMinNumber, customSecNumber);
    }
}

// add zero in front of numbers < 10
function addZeros(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

function updateDisplay(counter, dayDisplay, hourDisplay, minDisplay, secDisplay){
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
        displayClockRow();
        // do the fast countdown
        // set speed faster when day of the year is greater
        stepIncreaseAndStart(customClock, {customDayNumber,customHourNumber, customMinNumber, customSecNumber} ,365-customClock.days );
    }
}

function displayClockRow(){
    
    let customRow =document.getElementById("customDisplay");
    // show row
    customRow.style.display= 'block';
}
/* //restart the clock
function restartTime() {
    if (customClockMovement) {
        return;
    } else {
        startClock();
    }
}

//stop the clock
function stopClock() {
    clearTimeout(intervalID);
    customClockMovement = false;
}
*/
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

function stepIncreaseAndStart(clockElement, domElements, speed =50, start_num =0){
    let days=0, hours=0, minutes=0, seconds =0;
    let done = true;
    console.log(days);
    // console.log(domElements);
    let timer = setInterval(() => {
        done=true;
        if(days < clockElement.days){
            done =false;
            days+=7;
            domElements.customDayNumber.innerHTML = days;
        }
        if(hours< clockElement.hours){
            done =false;
            console.log('hours', hours, done);
            hours++;
            domElements.customHourNumber.innerHTML = hours;
        }

        if(minutes< clockElement.minutes){
            done =false;
            minutes++;
            domElements.customMinNumber.innerHTML = minutes;
        }

        if(seconds< clockElement.seconds){
            done =false;
            seconds++;
            domElements.customSecNumber.innerHTML = seconds;
        }
        if(done){
            customClockMovement = true;
            clearInterval(timer)
        }
    }, speed);
}

startClock();
autoLight();
// init events
icon.addEventListener("click", setMode);
icon.addEventListener("click", notifyMode);
dateInput.addEventListener('change', listenForDate);

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