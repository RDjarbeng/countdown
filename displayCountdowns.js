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
        document.querySelectorAll('.countdown-list-text').forEach(item => {
            item.addEventListener('click', event => {
                // todo: find a better way of accessing element in countdown array
                if([null,"",undefined].includes(document.querySelector(".clock-row").style.display)){
                    document.getElementsByClassName("clock-row")[0].style.display="flex";
                    document.getElementsByClassName("clock-row")[0].style.animationPlayState="running";
                    
                }
                updateClockAndText(arrayOfCountdowns[item.parentElement.getAttribute('data-index')].date, arrayOfCountdowns[item.parentElement.getAttribute('data-index')].text)
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
        listItems += `
        <div class="countdown-list-item" data-index="${index}" data-id="${countdown.dateModified}">
            <div class="countdown-list-text"> ${countdown.text} </div>
            <div class="countdown-list-options"><i class="fas fa-chevron-circle-down fa-lg"></i><div class="menu" style="display:none">
            <div class="menu-opts">Set as main</div>
            <div class="menu-opts">Delete</div>
        </div></div>
            <div class="countdown-list-date"> 
                Due: ${date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ', ' + date.getFullYear()}
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

const ContextMenu=(event)=>{
    if(event.currentTarget.querySelector(".menu").style.display == "block"){
        event.currentTarget.querySelector(".menu").style.display = "none";
        console.log("context-menu: hide");
    }
    else{
        event.currentTarget.querySelector(".menu").style.display = "block";
        console.log("context-menu: show");
    }
}
document.querySelectorAll(".countdown-list-options").forEach((option)=>{
    option.addEventListener("click",ContextMenu);
});