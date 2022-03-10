import { stopClock, waitForAnimation, notifyUser } from "./app.js";
import { setCountDownList } from "./form.js";
import Clock from "./clock.js";

const dayNumber = document.getElementById('day-num');
const hourNumber = document.getElementById("hour-num");
const minNumber = document.getElementById("min-num");
const secNumber = document.getElementById("sec-num");
const coundownTextDisplay = document.getElementById('countdown-text');
const countdownList = document.getElementById('countdown-list');
let test = false;
let arrayOfCountdowns;
// todo: sort by modified time
async function displayCountdowns() {

    
    let jsonListOfCountdowns = await localStorage.getItem('countdown');
    console.log(jsonListOfCountdowns, jsonListOfCountdowns.length);
    arrayOfCountdowns = JSON.parse(jsonListOfCountdowns);
    if (arrayOfCountdowns && arrayOfCountdowns.length) {
        
        let listItems = populateList(arrayOfCountdowns);
        countdownList.innerHTML = listItems;
        updateClockAndText(arrayOfCountdowns[0].date, arrayOfCountdowns[0].text)
        addEventListeners();

    } else {
        countdownList.innerHTML = 'Found no countdowns to display';
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
            <div class="countdown-list-options" ><i class="fas fa-chevron-circle-down fa-lg"></i>
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
                console.log( count_index, count_modified,arrayOfCountdowns);
                arrayOfCountdowns = arrayOfCountdowns.filter((countdown, index)=> countdown.dateModified!= count_modified);
                test= true;
                setCountDownList(arrayOfCountdowns);
                countdownList.innerHTML = populateList(arrayOfCountdowns)
                // console.log('delete clicked', targetElement.parentElement, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')]);
            }
        }
    })
}

function addEventListeners(){
    addListEventListener();
    // add context menu event listener
    document.querySelector('.container').addEventListener("click", hideContextMenus);
}
await displayCountdowns();
