import { Clock, Anniversary } from "./clock.js";
import { setInnerHtmlForNotNull, stopClock } from "./functions.js";
import { updateLocalItem, sortArrayOnSelection, setCountDownStatus, getCountdownString, setCountDownList } from "./listFunctions.js";
import { closeFormPopUp, displayFormPopUp } from "./formfunctions.js";
import { stepIncreaseAndStart, startClock } from "./appfunctions.js";
import { errorHandler } from "./error.js";
// Dom elements
// begin displaycountdown.js
const dayNumber = document.getElementById("day-num");
const hourNumber = document.getElementById("hour-num");
const minNumber = document.getElementById("min-num");
const secNumber = document.getElementById("sec-num");
var countdownTextDisplay = document.getElementById('countdown-text');
var countdownClock = document.querySelector('.clock-row');
var countdownList = document.getElementById('countdown-list');
let countItemExists = false;
let arrayOfCountdowns = fetchArrayOfCountdowns();
let testid = '';



async function fetchArrayOfCountdowns() {
    let jsonListOfCountdowns = await localStorage.getItem('countdown');
    return JSON.parse(jsonListOfCountdowns);
}

// todo: sort by modified time
async function displayCountdowns() {
    let cdArray = arrayOfCountdowns = await fetchArrayOfCountdowns();

    if (cdArray && cdArray.length) {

        let listItems = await populateList(cdArray)

        setInnerHtmlForNotNull(countdownList, listItems)
        setInnerHtmlForNotNull(countdownTextDisplay, '')

        sortUIAddListeners();

    } else {
        setInnerHtmlForNotNull(countdownList, 'Found no countdowns to display');
        setInnerHtmlForNotNull(countdownTextDisplay, '')
    }
}
/**
 * Adds sort menu to the page
 */
const sortUIAddListeners = async () => {
    if (!document.querySelector(".list-settings")) {
        const listContainer = document.querySelector(".list-container");
        let sortHtml = `
        <section class="list-settings">
            <div class="sort">
                <div class="sort-options">
                    <div class="sort-opt modified">Date modified</div>
                    <div class="sort-opt due">Due date</div>
                </div>
                <div class="sort-title"><i class="fas fas fa-sort-amount-up"></i> Sort By </div>
            </div>
        </section>`;
        listContainer.insertAdjacentHTML("afterbegin", sortHtml);
    }
    await addSortEventListeners();
}



/**
 * 
 * @param {{text: String, date: String, dateModified: String}} countdown 
 * @param {Number} index the array index of the current item
 * @returns 
 */
export function addCountdownItem(countdown, index) {
    let repeat = false
    let elapsed = false
    if (countdown.hasOwnProperty('repeat') && countdown.repeat) {
        // console.log(arrayOfCountdowns);
        updateRepeatCountdown(arrayOfCountdowns, countdown.date, index);
        repeat = true
    }
    let listItemClock = new Clock(new Date(countdown.date));
    let {countdownStatus, countdownStatusTI}=setCountDownStatus(listItemClock)
    if(listItemClock.getDistance()>0){
        countItemExists =true
    }else{
        elapsed = true;
    }
    // console.log(countdown, 'repeat true', arrayOfCountdowns[index]);

    let countdownListItem = `
    <div class="countdown-list-item" data-index="${index}" data-id="${countdown.dateModified}">
        <div class="countdown-list-text"> ${countdown.text} </div>
        <div class="countdown-list-options"><i class="fas fa-chevron-circle-down fa-lg"></i>
            <div class="menu" data-index="${index}" data-id="${countdown.dateModified}" style="display:none">
                <div class="menu-opts edit">
                    <i class="fas fa-edit"></i>&nbsp;Edit
                </div>
                <div class="menu-opts del">
                    <i class="fas fa-trash-alt"></i> &nbsp;Delete
                </div>
                <div class="menu-opts main">
                    <i class="fas fa-clock"></i> &nbsp;Set as main
                </div>       
            </div>
        </div>
        <div class="countdown-list-date"> 
            <div data-date="${countdown.date}" 
                data-id="${countdown.dateModified}" 
                data-repeat="${repeat}" 
                class="${(!elapsed) ? 'countdown-counting' : ''}" > 
                ${countdownStatus}
            </div>
            <div class="status-text">${countdownStatusTI}</div>
        </div>    
    </div>`;
    return countdownListItem;

}

/**
 * Returns html string with a list of countdowns
 * @param {Array.<{text: String, date: String, dateModified: String, repeat: String}>} arrayOfCountdowns | contains array of countdown objects
 * @returns {string} list of countdownitems to be appended to DOM
 */
export function populateList(arrayOfCountdowns) {
    let listItems = '';
    sortArrayOnSelection(arrayOfCountdowns);
    arrayOfCountdowns.forEach((countdown, index) => {
        listItems += addCountdownItem(countdown, index)
    });
    return listItems;
}

/**
* 
* @param {Array.<{text: String, date: String, dateModified: String, repeat: String}>} arrayOfCountdowns | contains array of countdown objects
* @param {String} date date preferrably in ISO string format
* @param {Number} index index of the repeat countdown element 
*/
export function updateRepeatCountdown(arrayOfCountdowns, date, index) {
    if (new Date(date) - new Date() < 0) {
        arrayOfCountdowns[index].date = new Anniversary(new Date(date)).endDate.toISOString();
        // arrayOfCountdowns[index].dateModified = new Date().toISOString();
        setCountDownList(arrayOfCountdowns);
        console.log('Updating values of old cds', arrayOfCountdowns[index]);

    };

}


/**
 * update countdown status for non elapsed countdowns
 */
async function updateCountdownItems() {
    let activeCountItems = document.querySelectorAll('.countdown-counting')
    const clock = new Clock();
    if (activeCountItems.length) {
        await activeCountItems.forEach((element, _, countItems) => {
            let date = new Date(element.getAttribute('data-date'));
            clock.setEndDate(date);
            clock.countDown();
            if (clock.getDistance() > 0) {
                setInnerHtmlForNotNull(element, getCountdownString(clock))
            } else if (element.getAttribute('data-repeat') == 'true') {
                console.log('updating repeat', element);
                // update repeat item set enddate to next year
                let index = arrayOfCountdowns.findIndex((countdown) => countdown.dateModified == element.getAttribute('data-id'));
                let date = element.getAttribute('data-date');
                if (index && date) {
                    updateRepeatCountdown(arrayOfCountdowns, date, index);
                    displayAndStartcount();
                }
                //         arrayOfCountdowns[index].date = new Anniversary(new Date(countdown.date)).endDate.toISOString();
                // arrayOfCountdowns[index].dateModified = new Date().toISOString();

            } else {
                console.log('elapsing');
                element.classList.remove('countdown-counting')
                setInnerHtmlForNotNull(element, 'Elapsed')
            }

            // countItemExists =(countItems.length<2 && clock.getDistance()<0)?false:countItemExists
        });
    } else {
        countItemExists = false;
    }
}
/**
 * display countdowns and start updating display for countdowns in progress
 */
function displayAndStartcount() {
    displayCountdowns().then(() => {
        if (countItemExists) {
            let interval = setInterval(() => countItemExists ? updateCountdownItems() : clearInterval(interval), 1000)
        }
    }).catch((err) => {
        console.log(err);
        errorHandler('Unable to display your countdowns');
    });
}

let interval;
function updateClockAndText(date, text, animation = true) {
    let clock = new Clock(new Date(date));
    setInnerHtmlForNotNull(countdownTextDisplay, text);
    stopClock(interval);
    (animation) ? stepIncreaseAndStart(clock, { dayNumber, hourNumber, minNumber, secNumber }, 400) : null;
    interval = startClock(clock, { dayNumber, hourNumber, minNumber, secNumber }, 500, interval);

}

function removeClockAndText() {
    stopClock();
    setInnerHtmlForNotNull(countdownTextDisplay, '')
    if (countdownClock) {
        // todo: set the display to none instead
        countdownClock.style.display = ''
    }
}

const triggerContextMenu = (element) => {
    if (element.querySelector(".menu")) {
        if (element.querySelector(".menu").style.display == "block") {
            hideContextMenus();
        }
        else {
            hideContextMenus();//close all context menus before displaying the clicked one
            element.querySelector(".menu").style.display = "block";
            switchContextIconUp(element);
            // console.log("context-menu: show");
        }
    }
}
function switchContextIconUp(element) {
    element = element.querySelector('.fa-chevron-circle-down')
    if (element) {
        element.classList.replace('fa-chevron-circle-down', 'fa-chevron-circle-up');
    }
}

function switchContextIconDown(element) {
    if (element)
        element.classList.replace('fa-chevron-circle-up', 'fa-chevron-circle-down');
}
function hideContextMenus(event) {
    //if function is not triggered by event listener, event is empty
    if ((!(event != null)) || !(event.target.className == 'countdown-list-options' || event.target.tagName == 'I' || (event.target.className.search('sort-title') > -1))) {
        document.querySelectorAll('.menu').forEach(contextMenu => contextMenu.style.display = "none");
        document.querySelectorAll('.fa-chevron-circle-up').forEach(element => switchContextIconDown(element));
        closeSortMenu();
        // }
    }
}
/**
 * Display the mini clock on the countdownlist page
 */
const showClockRow = () => {
    if ([null, "", undefined].includes(document.querySelector(".clock-row").style.display)) {
        const clockRow = document.querySelector(".clock-row")
        if (clockRow) {
            clockRow.style.display = "flex";
            clockRow.style.animationPlayState = "running";
        }
    }
}
/**
 * List Click event listener for the countdowns, context menu and items
 * @param {Event} event 
 */
const listEventListener = event => {
    const targetElement = event.target;

    // if event is fired on text or date
    if (targetElement.className == 'countdown-list-text' || targetElement.className == 'countdown-list-date') {
        // hideContextMenus()
        let targetIndex = targetElement.parentElement.getAttribute('data-index');
        // todo: find a better way of accessing element in countdown array
        console.log(targetIndex)
        showClockRow()
        updateClockAndText(arrayOfCountdowns[targetIndex].date, arrayOfCountdowns[targetIndex].text)
    }
    //if the area for context menu is clicked
    else if (targetElement.className == 'countdown-list-options' || targetElement.tagName == 'I') {
        //get the countdown list item and pass to function, search for list class .menu
        //in case of directly clicking on icon, parent element is .countdown-list-options div
        triggerContextMenu(targetElement.parentElement);

    } else if (targetElement.className.search('menu-opts') > -1) {
        let count_modified = targetElement.parentElement.getAttribute('data-id');
        if (targetElement.className.search('main') > -1) {
            // set as main clicked
            // find the element convert to JSON and place it as the main clock
            const countdown = arrayOfCountdowns.find((countdown) => countdown.dateModified == count_modified);
            const mainCount = JSON.stringify(countdown);
            localStorage.setItem('mainClock', mainCount);
            let date = new Date(countdown.date);
            notifyUser(`Homepage clock set to ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`);
        } else if (targetElement.className.search('del') > -1) {
            // delete item clicked
            arrayOfCountdowns = arrayOfCountdowns.filter((countdown, index) => countdown.dateModified != count_modified);
            setCountDownList(arrayOfCountdowns);
            setInnerHtmlForNotNull(countdownList, populateList(arrayOfCountdowns));
            // console.log('delete clicked', targetElement.parentElement, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')]);
        } else if (targetElement.className.search('edit') > -1) {
            let editItem = arrayOfCountdowns.find((countdown, index) => countdown.dateModified == count_modified);
            // todo: custom error messages for components on fail
            try {
                if (editItem) {
                    console.log('Edit clicked', editItem);
                    let repeat = false;
                    if (editItem.hasOwnProperty('repeat')) {
                        repeat = editItem.repeat;
                    }
                    displayFormPopUp(editItem.text, /\d+-\d+-\d+T\d+:\d+/.exec(editItem.date), count_modified, repeat);
                    handleFormUpdate();
                } else {
                    // something went wrong with the editing
                    errorHandler('Unable to edit countdown');
                    // console.log(editItem);
                }
            } catch (err) {
                console.log(err, 'Error in form display');
                errorHandler('Error in form display');
            }


        }
    }
}
function addListEventListener() {
    const countList = document.querySelector('.countdown-list')
    countList.removeEventListener('click', listEventListener)
    countList.addEventListener('click', listEventListener)
}

const closeSortMenu = () => {
    const sortOpts = document.querySelector(".sort-options");
    if (sortOpts.style.display == "block") {
        sortOpts.style.display = "none";
    }
}

const sortTitleEventHandler = () => {
    const sortOpts = document.querySelector(".sort-options");
    if (sortOpts.style.display == "block") {
        sortOpts.style.display = "none";
    }
    else {
        sortOpts.style.display = "block";
    }
}

const sortOptionsEventHandler = (event) => {
    if (event.target.className.search('due') > -1) {
        localStorage.setItem('sort', 'due')
    } else if (event.target.className.search('modified') > -1) {
        localStorage.setItem('sort', 'modified')
    }
    // close sortOptions menu on selection and refresh list
    closeSortMenu();
    displayCountdowns();
}

const addSortEventListeners = () => {
    const sortOpts = document.querySelector(".sort-options");
    const sortTitle = document.querySelector(".sort-title");

    if (!(sortTitle && sortOpts)) {
        console.log('Var sort title and sortOpts is null', 'sort title', sortTitle, 'sort opts', sortOpts);
        errorHandler("Something's wrong in sort UI")
        return;
    }
    sortTitle.removeEventListener("click", sortTitleEventHandler);
    sortTitle.addEventListener("click", sortTitleEventHandler);
    // sort options menu events
    sortOpts.removeEventListener("click", sortOptionsEventHandler)
    sortOpts.addEventListener("click", sortOptionsEventHandler)
}

// todo: move this function to form update.js
export function handleFormUpdate() {
    // todo: update list with custom fired events
    const countdownForm = document.getElementById('customUpDateForm');
    const submitbutton = document.getElementById('countdown-update');


    // const event = document.createEvent('Event');
    // console.log(event);
    countdownForm.addEventListener('submit', (e) => {

        e.preventDefault();
        submitbutton.disabled = true;
        // get text field values, with auto values
        let userText = document.getElementById('countdownText').value;
        const modifiedTime = document.getElementById('modifiedTime').value;
        let userDate = document.getElementById("dateInput").value;
        let repeatCheck = document.getElementById("repeat-cb");
        // if (!userText) {
        //     userText = userTextField.placeholder;
        //     countNumber++;
        //     localStorage.setItem('countNumber', countNumber)
        // }

        userDate = new Date(userDate);
        let countItem = { text: userText, date: userDate, dateModified: new Date() };
        if (repeatCheck) {
            countItem.repeat = repeatCheck.checked;
        }

        updateLocalItem(arrayOfCountdowns, countItem, modifiedTime);
        displayCountdowns();
        closeFormPopUp();
        removeClockAndText();
        arrayOfCountdowns = arrayOfCountdowns ? arrayOfCountdowns : JSON.parse(localStorage.getItem('countdown'));
    })
}



function addEventHandlers() {
    addListEventListener();
    // add context menu event listener
    document.querySelector('.container').addEventListener("click", hideContextMenus);
}

export async function displayAndAddListeners() {
    await displayAndStartcount()
    // sortUI();
    addEventHandlers();
}
try {
    displayAndAddListeners();
} catch (err) {
    console.log(err, 'err in display countdown initialisation');
    errorHandler("Unable to fetch your countdowns");
}
