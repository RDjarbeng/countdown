import { NewYearClock } from "./clock.js";
import { setInnerHtmlForNotNull, addWhatappEventHandler } from "./functions.js";
let today = new Date();
let dayClock = new NewYearClock()
let day, month, year, time, dayOfWeek, dayCount;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getAndSetDomElements(){
year =document.getElementById('year');
month =document.getElementById('month');
day =document.getElementById('dayOfMonth');
dayOfWeek =document.getElementById('dayOfWeek');
time =document.getElementById('time');
dayCount = document.getElementById("countDay");

setDomElements();
}

function setDomElements(){
    setInnerHtmlForNotNull(day, today.getDate())
    setInnerHtmlForNotNull(month, months[today.getMonth()] )
    setInnerHtmlForNotNull(year, today.getFullYear())
    setInnerHtmlForNotNull(dayOfWeek, days[today.getDay()] )
    setInnerHtmlForNotNull(time, today.toLocaleString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }))
    // day count
    setInnerHtmlForNotNull(dayCount, dayClock.countDays());
}


getAndSetDomElements();
addWhatappEventHandler();
let dayIntervaltimer = setInterval(setDomElements, 1000);

async function copyDOY() {
    await navigator.clipboard.writeText(`Day ${ dayCount.innerText ||'rcountdown'}/365`);
    // todo: import notify user correctly, waiting for nat
    notifyUser("Copied to clipboard");
    // console.log(await navigator.clipboard.readText());
}
$(".copy-link")[0].addEventListener("click", copyDOY);