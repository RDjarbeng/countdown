// require('./clock')
import Clock from './clock.js'

// DOM nodes
let icon = document.getElementsByClassName("toggleMode")[0];
let dayOfYear = document.getElementsByClassName("day")[0];
let controls = document.getElementsByClassName("button");
let body = document.body;
//to stop the clock
let intervalID;
let clockMovement = false;

// Initialize Clock class
var myclock = new Clock(new Date(`Jan 1, ${new Date().getFullYear()+1} 00:00:00`));

function startClock() {
    intervalID = setInterval(startTime, 500);
}

function startTime() {
    myclock.countDown();
    // console.log(myclock.hours);
    let d = myclock.days
    let h = myclock.hours
    let m = myclock.minutes
    let s = myclock.seconds
    h = addZeros(h);
    // m = checkMin(m,h)
    m = addZeros(m);
    s = addZeros(s);
    // h =2;
    document.getElementById("clock").innerHTML = d+`day${d>1? 's':''} `+h + ":" + m + ":" + s;

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


//not necessary, mins in 60 countdown only
// function checkMin(m, h){
//     return Math.abs(h*60 -m)
// }

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
    icon.innerHTML = `<i class="fas fa-sun"></i>`;
    body.classList.toggle("light");
}

function activateDarkMode() {
    icon.innerHTML = `<i class="fas fa-moon"></i>`;
    body.classList.toggle("light");
}

function setMode(autoLight) {
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

// init countdown and autoMode
//Initialize counter for beginning of next year


// setInterval(checkClock, 500);

startClock();
autoLight();
// init events
icon.addEventListener("click", setMode);
icon.addEventListener("click", notifyMode);
controls[0].addEventListener("click", restartTime);
controls[1].addEventListener("click", stopClock);