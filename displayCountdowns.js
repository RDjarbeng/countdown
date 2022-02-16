import { stopClock, waitForAnimation } from "./app.js";
import Clock from "./clock.js";

const dayNumber = document.getElementById('day-num');
const hourNumber = document.getElementById("hour-num");
const minNumber = document.getElementById("min-num");
const secNumber = document.getElementById("sec-num");
const coundownTextDisplay = document.getElementById('countdown-text')
// todo: sort by modified time
async function displayCountdowns() {
    let countdownList = document.getElementById('countdown-list');

    let JsonListOfCountdowns = await localStorage.getItem('countdown');
    if (JsonListOfCountdowns) {
        let arrayOfCountdowns = JSON.parse(JsonListOfCountdowns).reverse();
        let listItems = populateList(arrayOfCountdowns);
        countdownList.innerHTML = listItems;
        // updateClockAndText(arrayOfCountdowns[0].date, arrayOfCountdowns[0].text)
        document.querySelectorAll('.countdown-list-item').forEach(item => {
            item.addEventListener('click', event => {
                // todo: find a bettwer way of accessing element in countdown array
                updateClockAndText(arrayOfCountdowns[item.getAttribute('data-index')].date, arrayOfCountdowns[item.getAttribute('data-index')].text)
                // console.log('running', item, item.getAttribute('data-index'), event.target);
            })
        })
    } else {
        countdownList.innerHTML = 'Found no countdowns to display';
    }
    // console.log(myClock);
}

function populateList(arrayOfCountdowns) {
    let listItems = '';
    arrayOfCountdowns.forEach((countdown, index) => {
        let date = new Date(countdown.date);
        let dateModified = new Date(countdown.dateModified)
        listItems += `<div class="countdown-list-item"  data-index="${index}" data-id ="${countdown.dateModified}"style ="border-bottom: 0.1em solid blue; padding: 0.6em;">
    <div class="countdown-list-text">
     <span>Text: </span> ${countdown.text} </div>
    <div>
    <span>Date: </span>${date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ', ' + date.getFullYear()}
    </div>
    <div>
    <span>Date Modified: </span>${dateModified.getDate() + ' ' + dateModified.toLocaleString('default', { month: 'long' }) + ', ' + dateModified.getFullYear()}
    </div>
    </div>`
    });
    return listItems;
}

function updateClockAndText(date, text, animation = true) {
    let clock = new Clock(new Date(date));
    coundownTextDisplay.innerHTML = text;
    stopClock();
    waitForAnimation(clock, { dayNumber, hourNumber, minNumber, secNumber },500)
}


await displayCountdowns();


function test() {
    console.log(this);
}