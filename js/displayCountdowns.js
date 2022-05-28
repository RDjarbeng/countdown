import { Clock, Anniversary } from "./clock.js";
import { removeElementSetDisplayNone, setInnerHtmlForNotNull, stopClock, toggleElementDisplayBlockOnScreen } from "./functions.js";
import { updateLocalItem, sortArrayOnSelection, setCountDownStatus, getCountdownString,  populateList, getCountItemExists, setCountItemExists, setCountItemStatus, fetchArrayOfCountdowns, closeSortMenu, showClockRow, switchContextIconDown, switchContextIconUp } from "./listFunctions.js";
import { closeFormPopUp, setCountDownList, displayFormPopUp } from "./formfunctions.js";
import { stepIncreaseAndStart, startClock } from "./appfunctions.js";
import { errorHandler } from "./error.js";
// Dom elements
// begin displaycountdown.js
const dayNumber = document.getElementById("day-num");
const hourNumber = document.getElementById("hour-num");
const minNumber = document.getElementById("min-num");
const secNumber = document.getElementById("sec-num");
const countdownTextDisplay = document.getElementById('countdown-text');
const countdownClock = document.querySelector('.clock-row');
const countdownList = document.getElementById('countdown-list');
let arrayOfCountdowns = fetchArrayOfCountdowns();

// todo: sort by modified time
async function displayCountdowns() {
    let cdArray = arrayOfCountdowns = await fetchArrayOfCountdowns();

    if (cdArray && cdArray.length) {

        let listItems = await populateList(cdArray)
        
        setInnerHtmlForNotNull(countdownList, listItems)
        setInnerHtmlForNotNull(countdownTextDisplay, '')

        setCountItemStatus(cdArray)
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
 * update countdown status for non elapsed countdowns
 */
async function updateCountdownItems() {
    let activeCountItems = document.querySelectorAll('.countdown-counting')
    const clock = new Clock();
    if (activeCountItems.length) {
        await activeCountItems.forEach((element, _, countItems) => {
            clock.setEndDate(new Date(element.getAttribute('data-date')));
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
                console.log('elapsing', arrayOfCountdowns.find((countdown) => countdown.dateModified == element.getAttribute('data-id')));
                element.classList.remove('countdown-counting')
                setInnerHtmlForNotNull(element, 'Elapsed')
            }

        });
    } else {
        setCountItemExists(false)
    }
}
/**
 * display countdowns and start updating display for countdowns in progress
 */
function displayAndStartcount() {
    displayCountdowns().then(() => {
        if (getCountItemExists()) {
            let interval = setInterval(() => getCountItemExists() ? updateCountdownItems() : clearInterval(interval), 1000)
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
        removeElementSetDisplayNone(countdownClock)
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

function hideContextMenus(event) {
    //if function is not triggered by event listener, event is empty
    if ((!(event != null)) || !(event.target.className == 'countdown-list-options' || event.target.tagName == 'I' || (event.target.className.search('sort-title') > -1))) {
        document.querySelectorAll('.menu').forEach(contextMenu => removeElementSetDisplayNone(contextMenu));
        document.querySelectorAll('.fa-chevron-circle-up').forEach(element => switchContextIconDown(element));
        closeSortMenu();
        // }
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



const sortTitleEventHandler = () => {
    const sortOpts = document.querySelector(".sort-options");
    toggleElementDisplayBlockOnScreen(sortOpts)
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
