import { stopClock, waitForAnimation } from "./app.js";
import Clock from "./clock.js";

const dayNumber = document.getElementById('day-num');
const hourNumber = document.getElementById("hour-num");
const minNumber = document.getElementById("min-num");
const secNumber = document.getElementById("sec-num");
const coundownTextDisplay = document.getElementById('countdown-text')
let arrayOfCountdowns;
// todo: sort by modified time
async function displayCountdowns() {

    let countdownList = document.getElementById('countdown-list');

    let JsonListOfCountdowns = await localStorage.getItem('countdown');
    if (JsonListOfCountdowns) {
        arrayOfCountdowns = JSON.parse(JsonListOfCountdowns).reverse();
        let listItems = populateList(arrayOfCountdowns);
        countdownList.innerHTML = listItems;
        updateClockAndText(arrayOfCountdowns[0].date, arrayOfCountdowns[0].text)
        addListEventListener()

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
            <div class="menu-opts main">Set as main</div>
            <div class="menu-opts del">Delete</div>
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
    waitForAnimation(clock, { dayNumber, hourNumber, minNumber, secNumber }, 500)
}

const triggerContextMenu = (element) => {
    // console.log(element.querySelector('.menu'));
    if (element.querySelector(".menu").style.display == "block") {
        element.querySelector(".menu").style.display = "none";
        console.log("context-menu: hide");
    }
    else {
        
        element.querySelector(".menu").style.display = "block";
        
        console.log("context-menu: show");
    }
}

function addListEventListener(){
    document.querySelector('.countdown-list').addEventListener('click', event => {
        //hide all context menus
        document.querySelectorAll('.menu').forEach(contextMenu=> contextMenu.style.display = "none")
        const targetElement = event.target;

        // if event is fired on text or date
        if (targetElement.className == 'countdown-list-text' || targetElement.className == 'countdown-list-date') {
            console.log('clicking within the text');
            // todo: find a better way of accessing element in countdown array
            updateClockAndText(arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')].date, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')].text)

            if ([null, "", undefined].includes(document.querySelector(".clock-row").style.display)) {
                document.querySelector(".clock-row").style.display = "flex";
                document.querySelector(".clock-row").style.animationPlayState = "running";

            }

        }
        //if the area for context menu is clicked
        if (targetElement.className == 'countdown-list-options' || targetElement.tagName == 'I') {
            //get the countdown list item and pass to function, search for list class .menu
            //in case of directly clicking on icon, parent element is .countdown-list-options div
                triggerContextMenu(targetElement.parentElement);

        }

        
    })
}

await displayCountdowns();
