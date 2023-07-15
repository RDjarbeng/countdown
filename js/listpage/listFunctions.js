import { startClock, stepIncreaseAndStart } from "../appfunctions.js";
import { Anniversary, Clock } from "../clock.js";
import { errorHandler } from "../error.js";
import { fireElapsedEvent } from "../events.js";
import { saveCountDownList } from "../formfunctions.js";
import { setInnerHtmlForNotNull, stopClock } from "../functions.js";
import { getLocalIsoStringFromDateInput } from "../timefunctions.js";
import { LISTPAGE_DOM_CLASSES, LISTPAGE_DOM_IDS } from "./LISTPAGE_DOM_SELECTORS";
import { sortArrayOnSelection } from "./list_sort/sortArrayOnSelection";
import { removeSortUI } from "./list_ui/addSortUI.js";
import { getCountdownString, setCountDownStatus } from "./list_ui/setCountdownUI.js";
import { removeClockAndText } from "./list_ui/updateListpageClockAndText.js";

/**
 * Update a single countdown item in the array of countdowns
 *  with text, date, dateModified and repeat
 * @param {Array} arrayOfCountdowns
 * @param {Object} countItem
 * @param {String} id Identified to search array by
 */


export function updateLocalItem( countItem, id) {
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
    //@deprecated - rely only on array of countdowns to check if countdown exists
        // if(listItemClock.getDistance()>0){
    //     setCountItemExists(true)
    // }
        
    });
    
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
    let {countdownStatus, countdownStatusTI, dueDateText}=setCountDownStatus(listItemClock)
    if(listItemClock.getDistance()<0){
        elapsed =true
    }
    // console.log(countdown, 'repeat true', arrayOfCountdowns[index]);

    let countdownListItem = `
    <div class="countdown-list-item" title="${dueDateText}" data-index="${index}" data-id="${countdown.dateModified}">
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
                class="${(!elapsed) ? LISTPAGE_DOM_CLASSES.countdownsActiveClass : LISTPAGE_DOM_CLASSES.countdownsElapsedClass}" 
                title="${dueDateText}">
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
* @return {Boolean} repeat Item status
*/
export function updateRepeatCountdown(arrayOfCountdowns, date, index) {
    if (new Date(date) - new Date() < 0) {
        // arrayOfCountdowns[index].date = new Anniversary(new Date(date)).endDate.toISOString();
        arrayOfCountdowns[index].date =getLocalIsoStringFromDateInput(new Anniversary(new Date(date)).endDate);
        saveCountDownList(arrayOfCountdowns);
        return true; //repeat updated

    };
    return false
}
/**
 * @deprecated
 * Soon to remove this function, no longer going to set countitems manually
 * @param {Boolean} value Represents if a countdown is in progress/ non-elapsed
 */
export const setCountItemExists= (value)=> True;

/**
 * 
 * @returns {Boolean}
 */
export const getCountItemExists= ()=> (arrayOfCountdowns.length>0)?true: false;
/**
 * 
 * @param {Date} date Date as a string passed to date constructor
 * @param {String} text Shown above the mini clock
 * @param {Boolean} repeat if countdown repeat is true
 * @param {Boolean} animation if clock should be animated
 */
export function updateClockAndText(date, text, repeat, animation = true) {
    let clock = new Clock(new Date(date));
    if(repeat){
        clock = new Anniversary(new Date(date))
    }
    setInnerHtmlForNotNull(countdownTextDisplay, text);
    stopClock(interval);
    (animation) ? stepIncreaseAndStart(clock, { dayNumber, hourNumber, minNumber, secNumber }, 400) : null;
    interval = startClock(clock, { dayNumber, hourNumber, minNumber, secNumber }, false);

}


export  function displayCountdowns() {
    let arrayOfCountdowns =  fetchArrayOfCountdowns();

    if (arrayOfCountdowns && arrayOfCountdowns.length) {

        let listItems =  populateList(arrayOfCountdowns)
        
        setInnerHtmlForNotNull(countdownList, listItems)
        // setInnerHtmlForNotNull(countdownTextDisplay, '')

        setCountItemStatus(arrayOfCountdowns)
    } else {
        setDefaultTextForEmptyCountdowns();
        removeSortUI();
        removeClockAndText();
    }
}

/**
 * Sets the default text to show on new page or when countdown list is empty
 */
export const setDefaultTextForEmptyCountdowns=()=>{
    setInnerHtmlForNotNull(countdownList, 'Found no countdowns to display');
        setInnerHtmlForNotNull(countdownTextDisplay, '')
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
 * display countdowns and start updating display for countdowns in progress
 */
 export function displayAndUpdatecount() {
    try{

        displayCountdowns();
            if (getCountItemExists()) {
                console.log('Count Item exists');
                //update countdown items regardless of if elapsed or not
                let interval = setInterval(() => getCountItemExists() ? updateCountdownItems() : clearInterval(interval), 500)
            }else{
                console.warn('NO count items')
            }
        }catch(err) {
            console.log(err);
            errorHandler('Unable to display your countdowns');
        };
    }

    function handleElapsedCountdown(countdownElement){
        //fire custom elapsed event, passing the countdown elapsed as detail
    const countdown = arrayOfCountdowns.find((countdown) => countdown.dateModified == countdownElement.getAttribute('data-id'))
    fireElapsedEvent(countdown.text);
    console.log('elapsing');

    if (countdownElement.getAttribute('data-repeat') == 'true') {
        console.log('updating repeat', countdownElement);
        // update repeat item set enddate to next year
        let index = arrayOfCountdowns.findIndex((countdown) => countdown.dateModified == countdownElement.getAttribute('data-id'));
        let date = countdownElement.getAttribute('data-date');
        if (index && date) {
            updateRepeatCountdown(arrayOfCountdowns, date, index);
            displayAndUpdatecount();
        }

    } else {
        //remove item from active countdowns
        countdownElement.classList.remove(LISTPAGE_DOM_CLASSES.countdownsActiveClass)
        countdownElement.classList.add(LISTPAGE_DOM_CLASSES.countdownsElapsedClass)
        setInnerHtmlForNotNull(countdownElement, 'Elapsed');
        //update bottom part of countdown
        displayAndUpdatecount();

    }
    }

function updateActiveCountdowns(activeCountItems) {
    const clock = new Clock();
    activeCountItems.forEach((countdownElement, _, countItems) => {
        clock.setEndDate(new Date(countdownElement.getAttribute('data-date')));
        clock.countDown();
        //check elapsing countdowns
        if (clock.getDistance() > 0) {
            setInnerHtmlForNotNull(countdownElement, getCountdownString(clock) + ' more');
        } else {
            //handle elapsed countdown
            handleElapsedCountdown(countdownElement);
            
        }

    });
}


/**
 * update countdown status for non elapsed countdowns
 */
 export async function updateCountdownItems() {
    let activeCountItems = document.querySelectorAll('.'+LISTPAGE_DOM_CLASSES.countdownsActiveClass)
    
    if (activeCountItems.length) {
        updateActiveCountdowns(activeCountItems);
    } 
    let elapsedCountItems = document.querySelectorAll('.'+LISTPAGE_DOM_CLASSES.countdownsElapsedClass)
}
/**
 * Loads elements for listpage, calls display and addListeners using try and catch
 */
export function loadListPage(){
    try {
        displayAndUpdatecount();
    } catch (err) {
        console.log(err, 'err in updating countdown initialisation');
        errorHandler("Unable to fetch & update your countdowns");
    }
}

/**
 * Loads elements for listpage, calls display and addListeners using try and catch
 */
 export function loadhistoryPage(){
    try {
        displayAndUpdatecount();
    } catch (err) {
        console.log(err, 'err in updating countdown initialisation');
        errorHandler("Unable to fetch & update your countdowns");
    }
}

/**
 *
 * @returns {Array.<{text: String, date: String, dateModified: String, repeat: String}>} Array of countdowns stored in local storage, null if none
 */
 function fetchArrayOfCountdowns() {
    let jsonListOfCountdowns = localStorage.getItem('countdown');
    if (!jsonListOfCountdowns) {
        console.warn('Unable to fetch your saved countdowns in fetch array()');
        console.log('Warning in fetch Array of Countdowns, null fetched');
        return null;
    }
    return JSON.parse(jsonListOfCountdowns);
}

export const getArrayOfCountdownStatus=()=>{
    // if(!arrayOfCountdowns){
        arrayOfCountdowns = fetchArrayOfCountdowns();
    // }
    return arrayOfCountdowns;
}

export const deleteFromCountdownsWithId=(id)=>{ 
    arrayOfCountdowns= arrayOfCountdowns.filter((countdown, index) => countdown.dateModified != id);
    saveCountDownList(arrayOfCountdowns);
    loadListPage();
};


export function updateArrayOfCountdownState(){
    arrayOfCountdowns = fetchArrayOfCountdowns();
    loadListPage();
}
// todo: figure out a way to separate functions and dom references
//DOM Elements
const dayNumber = document.getElementById(LISTPAGE_DOM_IDS.clockDayElement);
const hourNumber = document.getElementById(LISTPAGE_DOM_IDS.clockHourElement);
const minNumber = document.getElementById(LISTPAGE_DOM_IDS.clockMinuteElement);
const secNumber = document.getElementById(LISTPAGE_DOM_IDS.clockSecondElement);

export const countdownTextDisplay = document.getElementById(LISTPAGE_DOM_IDS.countdownTextDisplay);
export const countdownList = document.getElementById(LISTPAGE_DOM_IDS.countdownList);
export const countdownClock = document.querySelector('.clock-row');

// clock interval tracker
let interval;
// let countItemExists = false;
export let arrayOfCountdowns = fetchArrayOfCountdowns()