// require('./clock')
import Clock from './clock.js'

// DOM nodes
// let icon = document.getElementsByClassName("toggleMode")[0];
let icon = document.getElementById('themeToggle');
let dayCount = document.getElementById("countDay");
// let controls = document.getElementsByClassName("button");
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let body = document.body;
let dayNumber =document.getElementById('day-num');
let hourNumber =document.getElementById("hour-num");
let minNumber =document.getElementById("min-num");
let secNumber =document.getElementById("sec-num");
//to stop the clock
let intervalID;
let clockMovement = false;

// Initialize Clock class
var myclock = new Clock();

function startClock() {
    intervalID = setInterval(startTime, 500);
}

function startTime() {
    myclock.countDown();
    let d = myclock.days
    let h = myclock.hours
    let m = myclock.minutes
    let s = myclock.seconds
    d= addZeros(d);
    h = addZeros(h);
    m = addZeros(m);
    s = addZeros(s);
    dayNumber.innerHTML = `${d}`;
    hourNumber.innerHTML = `${h}`;
    minNumber.innerHTML = `${m}`;
    secNumber.innerHTML = `${s}`;
    dayCount.innerHTML= myclock.countDays();
    clockMovement = true;
}

function restartTime() {
    if (clockMovement) {
        return;
    } else {
        startClock();
    }
}
// add zero in front of numbers < 10
function addZeros(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

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
startClock();
autoLight();
// init events
icon.addEventListener("click", setMode);
icon.addEventListener("click", notifyMode);
//Prefer this 
// startButton.addEventListener("click", restartTime);
// endButton.addEventListener("click", stopClock);

// service worker
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
    .then( (reg)=> console.log('service worker registered', reg))
        .catch((err)=> console.log('Service worker not registered', err));
  });
        
}