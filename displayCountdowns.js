/* 
import { stopClock, waitForAnimation, notifyUser } from "./app.js";
 import { setCountDownList } from "./form.js";
 import Clock from "./clock.js";
*/

// spaghetti code to be cleaned
// class Clock {
//     constructor(endDate) {
//         // expecting a date object
//         this.setEndDate(endDate)
//         this.countDown();
//     }

//     setEndDate(endDate) {
//         //set endDate to end of year
//         // todo: check endDate for validity as date
//         this.endDate = endDate ||new Date(`Jan 1, ${new Date().getFullYear() + 1} 00:00:00`)
        
        
//     }
//     countDown() {
//         // Set the date we're counting down to
//         let countDownDate = this.endDate.getTime();
//         let now = new Date().getTime();
//         var distance = countDownDate - now;
//         // account for case of the countdown being reached, reset
//         if (distance >= 0) {
//             // Time calculations for days, hours, minutes and seconds
//             this.calculateTimeValues(distance)
//         } else {
//             //reset to end of year
//             // this.setEndDate()
//             //todo: Countup from the deadline date
//             // this.calculateTimeValues(Math.abs(distance));

//             // clear date values
//             this.resetMethod();
            

//         }
//     }

//     resetMethod(){
//         this.clearCounter();
//     }

//     calculateTimeValues(distance){
//         this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
//             this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//             this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//             this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
//     }
//     countDays() {
//         //account for leap year
//         this.dayLength = ((this.endDate.getFullYear() % 4 != 0) ? 365 : 366)
//         return this.dayLength - this.days
//     }

//     clearCounter(){
//         this.days=this.hours=this.minutes=this.seconds=0;
//     }
// }

function stopClock() {
    clearTimeout(intervalID);
    customClockMovement = false;
}

async function stepIncreaseAndStart(clockElement, domElements, speed = 50, start_num = 0) {
    animateValue(domElements.dayNumber, start_num, clockElement.days, speed);
    animateValue(domElements.hourNumber, start_num, clockElement.hours, speed);
    animateValue(domElements.minNumber, start_num, clockElement.minutes, speed);
    animateValue(domElements.secNumber, start_num, clockElement.seconds, speed);

}

async function waitForAnimation(clock, domElements, duration) {
    await stepIncreaseAndStart(clock || myclock, domElements, duration || animatedCountDuration)
    startClock(clock || myclock, domElements);
}
// begin displaycountdown.js
// const dayNumber = document.getElementById('day-num');
var hourNumber = document.getElementById("hour-num");
var minNumber = document.getElementById("min-num");
var secNumber = document.getElementById("sec-num");
var coundownTextDisplay = document.getElementById('countdown-text');
var countdownList = document.getElementById('countdown-list');
let test = false;
let arrayOfCountdowns;

// todo: sort by modified time
async function displayCountdowns() {

    
    let jsonListOfCountdowns = await localStorage.getItem('countdown');
    arrayOfCountdowns = JSON.parse(jsonListOfCountdowns);
    if (arrayOfCountdowns && arrayOfCountdowns.length) {
        
        let listItems = populateList(arrayOfCountdowns);
        setInnerHtmlForNotNull(countdownList, listItems)
        setInnerHtmlForNotNull(coundownTextDisplay, '')
        // updateClockAndText(arrayOfCountdowns[arrayOfCountdowns.length-1].date, arrayOfCountdowns[arrayOfCountdowns.length-1].text)
        addEventListeners();

    } else {
        setInnerHtmlForNotNull(countdownList, 'Found no countdowns to display');
        setInnerHtmlForNotNull(coundownTextDisplay, '')
    }
    // console.log(myClock);
}

function populateList(arrayOfCountdowns) {
    let listItems = '';
    arrayOfCountdowns.forEach((countdown, index) => {
        let date = new Date(countdown.date);
        listItems += `
        <div class="countdown-list-item" data-index="${index}" data-id="${countdown.dateModified}">
            <div class="countdown-list-text"> ${countdown.text} </div>
            <div class="countdown-list-options" ><span class="material-icons">expand_circle_down </span>
            <div class="menu" data-index="${index}" data-id="${countdown.dateModified}" style="display:none">
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
        hideContextMenus();    
        // element.querySelector(".menu").style.display = "none";
        console.log("context-menu: hide");
    }
    else {
        hideContextMenus();//close all context menus before displaying the clicked one
        element.querySelector(".menu").style.display = "block";
        console.log("context-menu: show");
    }
}

function hideContextMenus(event){
    //if function is not triggered by event listener, event is empty
    if(!(event != null)){
        document.querySelectorAll('.menu').forEach(contextMenu=> contextMenu.style.display = "none");
    }else if(!( event.target.className == 'countdown-list-options' || event.target.tagName == 'I') ){
    // click is not on context menu icon area or icon   
        document.querySelectorAll('.menu').forEach(contextMenu=> contextMenu.style.display = "none");
    }
    
}
function addListEventListener(){
    document.querySelector('.countdown-list').addEventListener('click', event => {
        //hide all context menus
        
        const targetElement = event.target;
        // console.log(targetElement.className, targetElement.className.search('menu-opts'));

        // if event is fired on text or date
        if (targetElement.className == 'countdown-list-text' || targetElement.className == 'countdown-list-date') {
            console.log('clicking within the text');
            // hideContextMenus()
            // todo: find a better way of accessing element in countdown array
            updateClockAndText(arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')].date, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')].text)

            if ([null, "", undefined].includes(document.querySelector(".clock-row").style.display)) {
                document.querySelector(".clock-row").style.display = "flex";
                document.querySelector(".clock-row").style.animationPlayState = "running";
            }
        }
        //if the area for context menu is clicked
        else if (targetElement.className == 'countdown-list-options' || targetElement.tagName == 'I') {
            //get the countdown list item and pass to function, search for list class .menu
            //in case of directly clicking on icon, parent element is .countdown-list-options div
                triggerContextMenu(targetElement.parentElement);

        }else if (targetElement.className.search('menu-opts')>-1) {
            let count_index = targetElement.parentElement.getAttribute('data-index');
            let count_modified = targetElement.parentElement.getAttribute('data-id');
            if(targetElement.className.search('main')>-1){
                // set as main clicked
                // find the element convert to JSON and place it as the main clock
                const countdown =arrayOfCountdowns.find((countdown)=>countdown.dateModified== count_modified);
                const mainCount =JSON.stringify(countdown);
                console.log(mainCount, typeof(mainCount), 'type me');
                localStorage.setItem('mainClock', mainCount);
                let date = new Date(countdown.date);
                notifyUser(`Homepage clock set to ${date.getDate()} ${date.toLocaleString('default', { month: 'long' }) } ${date.getFullYear()}`);
                console.log(`main clicked, item set as main ${date.getDate()} ${date.toLocaleString('default', { month: 'long' }) } ${date.getFullYear()}`, mainCount);
            }else if(targetElement.className.search('del')>-1){
                // delete item clicked
                arrayOfCountdowns = arrayOfCountdowns.filter((countdown, index)=> countdown.dateModified!= count_modified);
                test= true;
                setCountDownList(arrayOfCountdowns);
                countdownList.innerHTML = populateList(arrayOfCountdowns)
                // console.log('delete clicked', targetElement.parentElement, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')]);
            }
        }
    })
}
function setCountDownList(arrayOfJSONCountdowns){
    localStorage.setItem('countdown', JSON.stringify(arrayOfJSONCountdowns))   
}

function addEventListeners(){
    addListEventListener();
    // add context menu event listener
    document.querySelector('.container').addEventListener("click", hideContextMenus);
}
displayCountdowns();
