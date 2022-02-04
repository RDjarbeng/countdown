import { stopClock, waitForAnimation } from "./app.js";
import Clock from "./clock.js";

const dayNumber = document.getElementById('day-num');
const hourNumber = document.getElementById("hour-num");
const minNumber = document.getElementById("min-num");
const secNumber = document.getElementById("sec-num");
// todo: sort by modified time
function displayCountdowns(){
    let countdownList =document.getElementById('countdown-list');
    let arrayOfCountdowns = JSON.parse(localStorage.getItem('countdown')).reverse();
    let listItems = '';
    arrayOfCountdowns.forEach(countdown => {
        let date = new Date(countdown.date);
        listItems+= `<div class="list-item" style ="border-bottom: 0.1em solid blue; padding: 0.6em;">
        <div class="list-text">
         <span>Text: </span> ${countdown.text} </div>
        <div>
        <span>Date: </span>${date.getDate()+' '+date.toLocaleString('default', { month: 'long' })+', '+ date.getFullYear() }
        </div>
        </div>`
    });
    countdownList.innerHTML = listItems;
    let clock = new Clock(new Date(arrayOfCountdowns[0].date));
    // waitForAnimation(new Clock(new Date(arrayOfCountdowns[0].date)));
    // myclock.endDate = new Date(arrayOfCountdowns[0].date)
    stopClock();
    waitForAnimation(clock, {dayNumber, hourNumber, minNumber, secNumber })
    
    // console.log(myClock);
}

displayCountdowns();