

import {Clock, NewYearClock  } from "./js/clock.js";
import { waitForAnimation } from "./js/appfunctions.js";
import { errorHandler } from "./js/error.js";
import {setInnerHtmlForNotNull } from "./js/functions.js";

// DOM nodes
// todo remove day clock and day count
let dayCount = document.getElementById("countDay");
const animatedCountDuration = 800;

var dayNumber = document.getElementById('day-num');
var hourNumber = document.getElementById("hour-num");
var minNumber = document.getElementById("min-num");
var secNumber = document.getElementById("sec-num");
var dueDate = document.getElementById('dueDate');

// Initialize default Clock class
// var myclock = new Anniversary(new Date('5-5-2022'));
var myclock =  setMainClock();
setInnerHtmlForNotNull(dueDate, `${myclock.endDate.getDate() + ' ' + myclock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + myclock.endDate.getFullYear()}`)

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


// todo: remove this unused function 
function displayClockRow() {
    let customRow = document.getElementById("customDisplay");
    // show row
    customRow.style.display = 'block';
}


try {
    //show day value before animation runs
waitForAnimation(myclock,  { dayNumber, hourNumber, minNumber, secNumber }, animatedCountDuration);

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
