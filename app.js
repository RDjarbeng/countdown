// DOM nodes
let icon = document.getElementsByClassName("toggleMode")[0];
let controls = document.getElementsByClassName("button");
let body = document.body;
//to stop the clock
let intervalID;
let clockMovement = false;


function startClock() {
    intervalID = setInterval(startTime, 500);
}

function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = 60 - today.getMinutes();
    let s = 60 - today.getSeconds();
    h = checkHour(h);
    h = checkTime(h);
    // m = checkMin(m,h)
    m = checkTime(m);
    s = checkTime(s);
    // h =2;
    document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;

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
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function checkHour(h) {
    return 24 - h;
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
startClock();
autoLight();
// init events
icon.addEventListener("click", setMode);
icon.addEventListener("click", notifyMode);
controls[0].addEventListener("click", restartTime);
controls[1].addEventListener("click", stopClock);