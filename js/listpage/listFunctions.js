import { startClock, stepIncreaseAndStart } from "../appfunctions.js";
import { Clock, Anniversary } from "../clock.js";
import { closeSortMenu } from "./list_ui/closeSortMenu";
import { errorHandler } from "../error.js";
import { closeFormPopUp, FORM_DOM_IDS, displayFormPopUp, saveCountDownList, getCdFromFormInputs } from "../formfunctions.js";
import { addClickListenersWithoutDuplicates, setInnerHtmlForNotNull, stopClock, toggleElementDisplayBlockOnScreen } from "../functions.js";
import { LISTPAGE_DOM_IDS } from "./LISTPAGE_DOM_IDS";
import { sortArrayOnSelection } from "./list_sort/sortArrayOnSelection";
import { notifyUser } from "../uiFunctions.js";
import { hideContextMenus } from "./list_ui/hideContextMenus";
import { addSortUI } from "./list_ui/addSortUI";
import { triggerContextMenu } from "./list_ui/triggerContextMenu.js";
import { removeClockAndText, showClockRow } from "./list_ui/updateListpageClockAndText.js";
import { handleFormUpdate, popAndAddFormOnList } from "../formupdate.js";

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
export const setCountItemExists= (value)=> countItemExists = value;

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
        console.warn('Unable to fetch your saved countdowns in fetch array()')
        console.log('Warning in fetch Array of Countdowns, null fetched');
        return null;
    }
    return JSON.parse(jsonListOfCountdowns);
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
    if(countdown){
        const countdownToStore=JSON.stringify(countdown)
        localStorage.setItem('mainClock',countdownToStore);
        let date = new Date(countdown.date);
        notifyUser(`Homepage clock set to ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`);
    }else{
        errorHandler('Could not set main clock');
        console.log("set main clock() received a null or undefined countdown")
    }
        
}

export function updateClockAndText(date, text, animation = true) {
    let clock = new Clock(new Date(date));
    setInnerHtmlForNotNull(countdownTextDisplay, text);
    stopClock(interval);
    (animation) ? stepIncreaseAndStart(clock, { dayNumber, hourNumber, minNumber, secNumber }, 400) : null;
    interval = startClock(clock, { dayNumber, hourNumber, minNumber, secNumber }, 500, interval);

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

export  function displayCountdowns() {
    let arrayOfCountdowns =  fetchArrayOfCountdowns();

    if (arrayOfCountdowns && arrayOfCountdowns.length) {

        let listItems =  populateList(arrayOfCountdowns)
        
        setInnerHtmlForNotNull(countdownList, listItems)
        setInnerHtmlForNotNull(countdownTextDisplay, '')

        setCountItemStatus(arrayOfCountdowns)
        addSortUIAndListeners();

    } else {
        setDefaultTextForEmptyCountdowns();
    }
}

/**
 * Sets the default text to show on new page or when countdown list is empty
 */
export const setDefaultTextForEmptyCountdowns=()=>{
    setInnerHtmlForNotNull(countdownList, 'Found no countdowns to display');
        setInnerHtmlForNotNull(countdownTextDisplay, '')
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

    // if event is fired on text or date, countdown item
    if (isTargetElementOnCountdownItem(targetElement)) {
        console.log(targetElement,'parent', targetElement.parentElement);
        let targetIndex = getArrayIndexByDateModified(arrayOfCountdowns,targetElement.parentElement.getAttribute('data-id'))
        // todo: find a better way of accessing element in countdown array
        console.log(targetIndex, 'index of element found in array')
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
            // fetch array if not existing in workspace
            if(!arrayOfCountdowns){
                console.log("Strangely array was not found in list functions on delete");
                updateArrayOfCountdownState();

            }
            arrayOfCountdowns = arrayOfCountdowns.filter((countdown, index) => countdown.dateModified != count_modified);
            saveCountDownList(arrayOfCountdowns);
            setInnerHtmlForNotNull(countdownList, populateList(arrayOfCountdowns));
            // console.log('delete clicked', targetElement.parentElement, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')]);
        } else if (isClassOnTargetElement(targetElement,'edit')) {
            if(!arrayOfCountdowns){
                console.log("Strangely array was not found in list functions on edit");
                updateArrayOfCountdownState();

            }
            console.log(arrayOfCountdowns);
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
                    console.log( 'something went wrong with the editing could not find id of item');
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

export function updateCountdownItemFromForm(){
    let countItem =getCdFromFormInputs();
        countItem.dateModified= new Date().toISOString();
        return countItem;
}
/**
 * display countdowns and start updating display for countdowns in progress
 */
 export function displayAndUpdatecount() {
    try{

        displayCountdowns()
            if (getCountItemExists()) {
                let interval = setInterval(() => getCountItemExists() ? updateCountdownItems() : clearInterval(interval), 1000)
            }
        }catch(err) {
            console.log(err);
            errorHandler('Unable to display your countdowns');
        };
    }


/**
 * update countdown status for non elapsed countdowns
 */
 export async function updateCountdownItems() {
    let activeCountItems = document.querySelectorAll('.countdown-counting')
    const clock = new Clock();
    if (activeCountItems.length) {
        activeCountItems.forEach((element, _, countItems) => {
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
                    displayAndUpdatecount();
                }

            } else {
                console.log('elapsing', arrayOfCountdowns.find((countdown) => countdown.dateModified == element.getAttribute('data-id')));
                element.classList.remove('countdown-counting')
                setInnerHtmlForNotNull(element, 'Elapsed');
                //update bottom part of countdown
                displayAndUpdatecount();

            }

        });
    } else {
        setCountItemExists(false)
    }
}
/**
 * Loads elements for listpage, calls display and addListeners using try and catch
 */
export function loadListPage(){
    try {
        displayAndAddListeners();
    } catch (err) {
        console.log(err, 'err in updating countdown initialisation');
        errorHandler("Unable to fetch & update your countdowns");
    }
}

export async function displayAndAddListeners() {
     displayAndUpdatecount()
    // sortUI();
    addEventHandlers();
}

export function updateArrayOfCountdownState(){
    arrayOfCountdowns = fetchArrayOfCountdowns()
}
// todo: figure out a way to separate functions and dom references
//DOM Elements
const dayNumber = document.getElementById(LISTPAGE_DOM_IDS.clockDayElement);
const hourNumber = document.getElementById(LISTPAGE_DOM_IDS.clockHourElement);
const minNumber = document.getElementById(LISTPAGE_DOM_IDS.clockMinuteElement);
const secNumber = document.getElementById(LISTPAGE_DOM_IDS.clockSecondElement);

export const countdownTextDisplay = document.getElementById(LISTPAGE_DOM_IDS.countdownTextDisplay);
const countdownList = document.getElementById(LISTPAGE_DOM_IDS.countdownList);
export const countdownClock = document.querySelector('.clock-row');
//get button for create countdown
const createButton = document.getElementsByClassName("new-item")[0];
createButton.addEventListener("click", popAndAddFormOnList);
// clock interval tracker
let interval;
let countItemExists = false;
let arrayOfCountdowns = fetchArrayOfCountdowns()