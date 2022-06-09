import { startClock, stepIncreaseAndStart } from "./appfunctions.js";
import { Clock, Anniversary } from "./clock.js";
import { errorHandler } from "./error.js";
import { closeFormPopUp, FORM_DOM_IDS, displayFormPopUp, getUserText, saveCountDownList, getCdFromFormInputs } from "./formfunctions.js";
import { addClickListenersWithoutDuplicates, removeElementSetDisplayNone, setInnerHtmlForNotNull, stopClock, toggleElementDisplayBlockOnScreen } from "./functions.js";
import { notifyUser } from "./uiFunctions.js";
/* SECTION: DISPLAY COUNTDOWNS */

export const LISTPAGE_DOM_IDS ={
    clockDayElement:'day-num',
    clockHourElement: 'hour-num',
    clockMinuteElement: 'min-num',
    clockSecondElement: 'sec-num',
    countdownTextDisplay: 'countdown-text',
    countdownList: 'countdown-list'
}
/**
 * Update a single countdown item in the array of countdowns
 *  with text, date, dateModified and repeat
 * @param {Array} arrayOfCountdowns
 * @param {Object} countItem
 * @param {String} id Identified to search array by
 */


export function updateLocalItem(arrayOfCountdowns, countItem, id) {
    id =id.trim();
    if (arrayOfCountdowns !== null) { //countdowns already exist


        let pos = arrayOfCountdowns.findIndex((value) => value.dateModified == id
        );
        if (pos > -1) {
            arrayOfCountdowns[pos].text = countItem.text;
            arrayOfCountdowns[pos].date = countItem.date;
            arrayOfCountdowns[pos].dateModified = countItem.dateModified;
            arrayOfCountdowns[pos].repeat = countItem.repeat;
            console.log(arrayOfCountdowns[pos]);
            saveCountDownList(arrayOfCountdowns);
        } else {
            console.log("Unable to find Item to update in displayCountdown array of Countdowns, HandleUpdate", pos);
            console.log('item', countItem);
            console.log('countdowns', arrayOfCountdowns);
            
            errorHandler('Unable to update Item');
        }

    }


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
        listItems += getCountdownItemHtml(arrayOfCountdowns,countdown, index);
        
    });
    return listItems;
}

export function setCountItemStatus( arrayOfCountdowns){
    arrayOfCountdowns.forEach((countdown) => {
        let listItemClock = new Clock(new Date(countdown.date));
    if(listItemClock.getDistance()>0){
        setCountItemExists(true)
    }
        
    });
    
}
/**
 *
 * @param {Clock} clock
 * @returns {object} status
 * @returns {object} status.countdownStatus
 * @returns {object} status.countdownStatusTI
 */
export function setCountDownStatus(clock) {
    let timeDifference = clock.getDistance();
    let countdownStatus = "";
    let countdownStatusTI = `<span style="color:#03bf42;"><i class="fas fa-hourglass-start"></i> active</span>`;
    if (timeDifference > 0) {
        countdownStatus = getCountdownString(clock);
    } else {
        // countdown elapsed
        countdownStatus = 'Due: ' + clock.endDate.getDate() + ' ' + clock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + clock.endDate.getFullYear();
        countdownStatusTI = `<span style="color:crimson;"><i class="fas fa-hourglass-end"></i> elapsed</span>`;
    }
    return { countdownStatus, countdownStatusTI };
}
/**
 * Get string with status of countdowns
 * @param {Clock} clock clock object for particular countdown
 * @returns {String} string of countdown status
 */

export function getCountdownString(clock) {
    let countdownString = '';
    if (clock.days > 0) {
        countdownString = clock.days + ' days, ' + ((clock.hours > 0) ? (clock.hours + ' hours') : (clock.minutes + ' minutes'));
    } else if (clock.hours > 0) {
        countdownString = clock.hours + ' hours, ' + ((clock.minutes > 0) ? (clock.minutes + ' minutes') : (clock.seconds + ' seconds'));
    } else if (clock.minutes > 0) {
        countdownString = clock.minutes + ' minutes, ' + clock.seconds + ' seconds';
    } else if (clock.seconds >= 0) {
        countdownString = clock.seconds + ' seconds ';
    }
    return ` ${countdownString} more`;
}
/**
 * Sort countdown array by date modified or due date
 * @param {Array.<{text: String, date: String, dateModified: String, repeat: String}>} arrayOfCountdowns | contains array of countdown objects
 */

export function sortArrayOnSelection(arrayOfCountdowns) {
    let sortType = localStorage.getItem('sort');
    if (sortType == "due") {
        // sort by due date if present
        arrayOfCountdowns.sort((countItem1, countItem2) => new Date(countItem2.date).getTime() - new Date(countItem1.date).getTime());
    } else {
        arrayOfCountdowns.sort((countItem1, countItem2) => new Date(countItem1.dateModified).getTime() - new Date(countItem2.dateModified).getTime());
    }
}

/**
 * 
 * @param {{text: String, date: String, dateModified: String}} countdown 
 * @param {Number} index the array index of the current item
 * @returns {String} countdownListItem containing html for a countdown item
 */
 export function getCountdownItemHtml(arrayOfCountdowns,countdown, index) {
    let repeat = false
    let elapsed = false
    if (countdown.hasOwnProperty('repeat') && countdown.repeat) {
        // console.log(arrayOfCountdowns);
        updateRepeatCountdown(arrayOfCountdowns, countdown.date, index);
        repeat = true
    }
    let listItemClock = new Clock(new Date(countdown.date));
    let {countdownStatus, countdownStatusTI}=setCountDownStatus(listItemClock)
    if(listItemClock.getDistance()<0){
        elapsed =true
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
* 
* @param {Array.<{text: String, date: String, dateModified: String, repeat: String}>} arrayOfCountdowns | contains array of countdown objects
* @param {String} date date preferrably in ISO string format
* @param {Number} index index of the repeat countdown element 
*/
export function updateRepeatCountdown(arrayOfCountdowns, date, index) {
    if (new Date(date) - new Date() < 0) {
        arrayOfCountdowns[index].date = new Anniversary(new Date(date)).endDate.toISOString();
        // arrayOfCountdowns[index].dateModified = new Date().toISOString();
        saveCountDownList(arrayOfCountdowns);
        console.log('Updating values of old cds', arrayOfCountdowns[index]);

    };

}
/**
 * 
 * @param {Boolean} value Represents if a countdown is in progress/ non-elapsed
 */
export const setCountItemExists= (value)=> {
    countItemExists = value;
}

/**
 * 
 * @returns {Boolean}
 */
export const getCountItemExists= ()=> countItemExists;
/**
 * 
 * @returns {Array} Array of countdowns stored in local storage, null if none
 */
export  function fetchArrayOfCountdowns() {
    let jsonListOfCountdowns =  localStorage.getItem('countdown');
    if(!jsonListOfCountdowns){
        console.warn('Unable to fetch your saved countdowns')
        console.log('Error in fetch Array of Countdowns, null fetched');
        return null;
    }
    return JSON.parse(jsonListOfCountdowns);
}
/**
 * closes the context menu for the sort option
 */
export const closeSortMenu = () => {
    const sortOpts = document.querySelector(".sort-options");
    if (sortOpts && sortOpts.style.display == "block") {
        sortOpts.style.display = "none";
    }
}
/**
 * Closes all countdown context menus, event or triggered in code
 * @param {Event} [event] 
 */
export function hideContextMenus(event) {
    //if function is not triggered by event listener, event is empty
    if ((!(event != null)) || !(event.target.className == 'countdown-list-options' || event.target.tagName == 'I' || (event.target.className.search('sort-title') > -1))) {
        document.querySelectorAll('.menu').forEach(contextMenu => removeElementSetDisplayNone(contextMenu));
        document.querySelectorAll('.fa-chevron-circle-up').forEach(element => switchContextIconDown(element));
        closeSortMenu();
        // }
    }
}

/**
 * Display the mini clock on the countdownlist page
 */
 export const showClockRow = () => {
    if ([null, "", undefined].includes(document.querySelector(".clock-row").style.display)) {
        const clockRow = document.querySelector(".clock-row")
        if (clockRow) {
            clockRow.style.display = "flex";
            clockRow.style.animationPlayState = "running";
        }
    }
}

export function switchContextIconUp(element) {
    element = element.querySelector('.fa-chevron-circle-down')
    if (element) {
        element.classList.replace('fa-chevron-circle-down', 'fa-chevron-circle-up');
    }
}

export function switchContextIconDown(element) {
    if (element)
        element.classList.replace('fa-chevron-circle-up', 'fa-chevron-circle-down');
}

/**
 * Checks if the target element is part of a countdown
 * @param {HTMLElement} targetElement 
 * @returns {Boolean}
 */
export const isTargetElementOnCountdownItem=(targetElement)=> (targetElement.className == 'countdown-list-text' || targetElement.className == 'countdown-list-date');


/**
 * Checks if the target element is part of context menu
 * @param {HTMLElement} targetElement 
 * @returns {Boolean}
 */
export const isTargetElementOnContextMenu=(targetElement)=> (targetElement.className == 'countdown-list-options' || targetElement.tagName == 'I');
/**
 * 
 */
export const isClassOnTargetElement=(targetElement, className) => (targetElement.className.search(className) > -1);

export const setMainClockCountdown=(countdown) =>{
        localStorage.setItem('mainClock', JSON.stringify(countdown));
        let date = new Date(countdown.date);
            notifyUser(`Homepage clock set to ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`);
}

export const triggerContextMenu = (element) => {
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


export function updateClockAndText(date, text, animation = true) {
    let clock = new Clock(new Date(date));
    setInnerHtmlForNotNull(countdownTextDisplay, text);
    stopClock(interval);
    (animation) ? stepIncreaseAndStart(clock, { dayNumber, hourNumber, minNumber, secNumber }, 400) : null;
    interval = startClock(clock, { dayNumber, hourNumber, minNumber, secNumber }, 500, interval);

}

export function addSortUI(){
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
}

export const sortTitleEventHandler = () => {
    const sortOpts = document.querySelector(".sort-options");
    toggleElementDisplayBlockOnScreen(sortOpts);
}

export const addSortEventListeners = () => {
    const sortOpts = document.querySelector(".sort-options");
    const sortTitle = document.querySelector(".sort-title");

    if (!(sortTitle && sortOpts)) {
        console.log('Var sort title and sortOpts is null', 'sort title', sortTitle, 'sort opts', sortOpts);
        errorHandler("Something's wrong in sort UI")
        return;
    }
    // sort options menu events
    addClickListenersWithoutDuplicates(sortTitle, sortTitleEventHandler)
    addClickListenersWithoutDuplicates(sortOpts, sortOptionsEventHandler)
}

export async function displayCountdowns() {
    let arrayOfCountdowns = await fetchArrayOfCountdowns();

    if (arrayOfCountdowns && arrayOfCountdowns.length) {

        let listItems = await populateList(arrayOfCountdowns)
        
        setInnerHtmlForNotNull(countdownList, listItems)
        setInnerHtmlForNotNull(countdownTextDisplay, '')

        setCountItemStatus(arrayOfCountdowns)
        addSortUIAndListeners();

    } else {
        setInnerHtmlForNotNull(countdownList, 'Found no countdowns to display');
        setInnerHtmlForNotNull(countdownTextDisplay, '')
    }
}

/**
 * Adds sort menu to the page
 */
 export const addSortUIAndListeners = async () => {
    addSortUI();
    await addSortEventListeners();
}

/**
 * Handle event when user clicks on item in sort menu
 * @param {Event} event 
 */
export const sortOptionsEventHandler = (event) => {
    if (event.target.className.search('due') > -1) {
        localStorage.setItem('sort', 'due')
    } else if (event.target.className.search('modified') > -1) {
        localStorage.setItem('sort', 'modified')
    }
    // close sortOptions menu on selection and refresh list
    closeSortMenu();
    displayCountdowns();
}

export const getCountdownByDateModified = (dateModified)=>{
    return arrayOfCountdowns.find((countdown, index) => countdown.dateModified == dateModified);
}

export const getCountdownIndexByDateModified = (dateModified)=>{
    return arrayOfCountdowns.findIndex((countdown) => countdown.dateModified == dateModified);
}
// todo remove this function, set array of countdows to one source
export const getArrayIndexByDateModified = (array,dateModified)=>{
    return array.findIndex((countdown) => countdown.dateModified == dateModified);
}


export function removeClockAndText() {
    stopClock();
    setInnerHtmlForNotNull(countdownTextDisplay, '')
    if (countdownClock) {
        removeElementSetDisplayNone(countdownClock)
    }
}
/**
 * Adds event listeners for the list and the page container for closing context menus
 */
export function addEventHandlers() {
    addListEventListener();
    // add context menu event listener
    document.querySelector('.container').addEventListener("click", hideContextMenus);
}
function addListEventListener() {
    const countList = document.querySelector('.countdown-list')
    addClickListenersWithoutDuplicates(countList, listEventListener)
}

/**
 * List Click event listener for the countdowns, context menu and items
 * @param {Event} event 
 */
const listEventListener = event => {
    const targetElement = event.target;

    // if event is fired on text or date
    if (isTargetElementOnCountdownItem(targetElement)) {
        console.log(targetElement,'parent', targetElement.parentElement);
        
        // let targetIndex = targetElement.parentElement.getAttribute('data-index');
        let targetIndex = getArrayIndexByDateModified(arrayOfCountdowns,targetElement.parentElement.getAttribute('data-id'))
        // todo: find a better way of accessing element in countdown array
        console.log(targetIndex)
        showClockRow();
        updateClockAndText(arrayOfCountdowns[targetIndex].date, arrayOfCountdowns[targetIndex].text)
    }
    //if the area for context menu is clicked
    else if (isTargetElementOnContextMenu(targetElement)) {
        //get the countdown list item and pass to function, search for list class .menu
        //in case of directly clicking on icon, parent element is .countdown-list-options div
        triggerContextMenu(targetElement.parentElement);

    } else if (isClassOnTargetElement(targetElement,'menu-opts')) {
        let count_modified = targetElement.parentElement.getAttribute('data-id');
        if ( isClassOnTargetElement(targetElement,'main')) {
            // set as main clicked
            // find the element convert to JSON and place it as the main clock
            const countdown = arrayOfCountdowns.find((countdown) => countdown.dateModified == count_modified);
            setMainClockCountdown(countdown);
            
        
        } else if (isClassOnTargetElement(targetElement,'del') ) {
            arrayOfCountdowns = arrayOfCountdowns.filter((countdown, index) => countdown.dateModified != count_modified);
            saveCountDownList(arrayOfCountdowns);
            setInnerHtmlForNotNull(countdownList, populateList(arrayOfCountdowns));
            // console.log('delete clicked', targetElement.parentElement, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')]);
        } else if (isClassOnTargetElement(targetElement,'edit')) {
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
                    console.log( 'something went wrong with the editing');
                    errorHandler('Unable to edit countdown');
                    console.log(editItem);
                }
            } catch (err) {
                console.log(err, 'Error in form display');
                errorHandler('Error in form display');
            }


        }
    }
}
// todo: move this function to form update.js
export function handleFormUpdate() {
    // todo: update list with custom fired events
    const submitbutton = document.getElementById(FORM_DOM_IDS.form_submitButton);


    submitbutton.addEventListener('click', (e) => {
        e.preventDefault();
        submitbutton.disabled = true;
        // get form values and return countdown item   
        let formDOMElementsAsObject = {
            userTextField:document.getElementById(FORM_DOM_IDS.form_TextInput),
        dateInput: document.getElementById(FORM_DOM_IDS.form_dateInput),
        repeatCheck: document.getElementById(FORM_DOM_IDS.form_repeatCheckBox),
    }   
        let countItem =getCdFromFormInputs(formDOMElementsAsObject)
        countItem.dateModified= new Date();
        
        const modifiedTime = document.getElementById(FORM_DOM_IDS.form_modifiedTime).value;
        updateLocalItem(arrayOfCountdowns, countItem, modifiedTime);
        displayCountdowns();
        closeFormPopUp();
        removeClockAndText();
        
    })
}

/**
 * display countdowns and start updating display for countdowns in progress
 */
 export function displayAndStartcount() {
    displayCountdowns().then(() => {
        if (getCountItemExists()) {
            let interval = setInterval(() => getCountItemExists() ? updateCountdownItems() : clearInterval(interval), 1000)
        }
    }).catch((err) => {
        console.log(err);
        errorHandler('Unable to display your countdowns');
    });
}

/**
 * update countdown status for non elapsed countdowns
 */
 export async function updateCountdownItems() {
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

export function loadListPage(){
    try {
        displayAndAddListeners();
    } catch (err) {
        console.log(err, 'err in updating countdown initialisation');
        errorHandler("Unable to finish updating your countdowns");
    }
}

export async function displayAndAddListeners() {
    await displayAndStartcount()
    // sortUI();
    addEventHandlers();
}

// todo: figure out a way to separate functions and dom references
//DOM Elements
const dayNumber = document.getElementById(LISTPAGE_DOM_IDS.clockDayElement);
const hourNumber = document.getElementById(LISTPAGE_DOM_IDS.clockHourElement);
const minNumber = document.getElementById(LISTPAGE_DOM_IDS.clockMinuteElement);
const secNumber = document.getElementById(LISTPAGE_DOM_IDS.clockSecondElement);
const countdownTextDisplay = document.getElementById(LISTPAGE_DOM_IDS.countdownTextDisplay);
const countdownList = document.getElementById(LISTPAGE_DOM_IDS.countdownList);
const countdownClock = document.querySelector('.clock-row');
// clock interval tracker
let interval;
let countItemExists = false;
let arrayOfCountdowns = fetchArrayOfCountdowns()