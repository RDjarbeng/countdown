// import Clock, { NewYearClock } from './js/clock.js'
// // import { NewYearClock } from './js/clock.js'
  class Clock {
    constructor(endDate) {
        // expecting a date object
        this.setEndDate(endDate)
        this.countDown();
    }

    setEndDate(endDate) {
        //set endDate to end of year
        // todo: check endDate for validity as date
        this.endDate = endDate ||new Date(`Jan 1, ${new Date().getFullYear() + 1} 00:00:00`)
        
        
    }
    countDown() {
        // Set the date we're counting down to
        let countDownDate = this.endDate.getTime();
        let now = new Date().getTime();
        var distance = countDownDate - now;
        // account for case of the countdown being reached, reset
        if (distance >= 0) {
            // Time calculations for days, hours, minutes and seconds
            this.calculateTimeValues(distance)
        } else {
            //reset to end of year
            // this.setEndDate()
            //todo: Countup from the deadline date
            // this.calculateTimeValues(Math.abs(distance));

            // clear date values
            this.resetMethod();
            

        }
    }

    resetMethod(){
        this.clearCounter();
    }

    calculateTimeValues(distance){
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }
    countDays() {
        //account for leap year
        this.dayLength = ((this.endDate.getFullYear() % 4 != 0) ? 365 : 366)
        return this.dayLength - this.days
    }

    clearCounter(){
        this.days=this.hours=this.minutes=this.seconds=0;
    }
}

class NewYearClock extends Clock{
    resetMethod(){
        //reset to New Year's for default 
        this.setEndDate()
        console.log(this.endDate)
    }
}

// DOM nodes
let dayCount = document.getElementById("countDay");
const animatedCountDuration = 800;

// let controls = document.getElementsByClassName("button");
// let startButton = document.getElementById('startButton');
// let stopButton = document.getElementById('stopButton');
const body = document.body;
var dayNumber = document.getElementById('day-num');
var hourNumber = document.getElementById("hour-num");
var minNumber = document.getElementById("min-num");
var secNumber = document.getElementById("sec-num");
var dueDate = document.getElementById('dueDate');
// const dateInput = document.getElementById('customDate')

// const customDayNumber = document.getElementById('day-custom');
// const customHourNumber = document.getElementById("hour-custom");
// const customMinNumber = document.getElementById("min-custom");
// const customSecNumber = document.getElementById("sec-custom");

//to stop the clock
let intervalID;
let customClockMovement = false;
let dayClock = new NewYearClock();
// let countItem = { text: 'test', date: '03-03-2022', dateModified: new Date() };
// localStorage.setItem('mainClock', JSON.stringify(countItem))

// Initialize default Clock class
// var myclock = new NewYearClock();
var myclock =  setMainClock();
var myclock =  setMainClock();
setInnerHtmlForNotNull(dueDate, `Due: ${myclock.endDate.getDate() + ' ' + myclock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + myclock.endDate.getFullYear()}`)
var customClock;

function setMainClock() {
    let mainclock =  localStorage.getItem('mainClock');
    if (mainclock !== null && mainclock != undefined) { //countdown set to main
        mainclock = JSON.parse(mainclock)
        myclock = new Clock(new Date(mainclock.date));
        setMainText(mainclock.text)
    }

    return myclock || new NewYearClock();

}

function setMainText(countdownText) {
    const textDisplay = document.getElementById('countdown-text');
    setInnerHtmlForNotNull(textDisplay, countdownText)
}

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

// add zero in front of numbers < 10
function addZeros(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

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



//todo: find a better way of checking for a valid date
/**
 * Listens for a user input for date element
 */
function listenForDate() {
    const input = this.value;
    // console.log(input, 'run');
    if (input != '') {
        customClock = new Clock(new Date(input));
        displayClockRow();
        // do the fast countdown
        // set speed faster when day of the year is greater
        // todo: change to animateValue
        stepIncreaseAndStart(customClock, { customDayNumber, customHourNumber, customMinNumber, customSecNumber }, (365 - customClock.days < 100) ? 365 - customClock.days : 70);
    }
}

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
//stop the clock
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

function addEventListeners() {
    let whatsappIcon = document.getElementById('sendWhatsappButton');
    if (whatsappIcon) {
        whatsappIcon.addEventListener('click', exportToWhatsapp);
    }

}

function exportToWhatsapp() {
    let dayNum = dayCount.innerText;
    window.open(`whatsapp://send?text= Day ${dayNum || 'rcountdown'}/365`);
}

function setInnerHtmlForNotNull(element, value){
    if(element)//check for null
        element.innerHTML = value;
}
//show day value before animation runs
setInnerHtmlForNotNull(dayCount, dayClock.countDays());

// startTime();
waitForAnimation(myclock, { dayNumber, hourNumber, minNumber, secNumber }, animatedCountDuration);
addEventListeners();

// init events



// dateInput.addEventListener('change', listenForDate);

// service worker

if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
    .then( (reg)=> console.log('service worker registered', reg))
        .catch((err)=> console.log('Service worker not registered', err));
  });
        
}