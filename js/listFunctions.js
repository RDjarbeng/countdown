import { Clock, Anniversary } from "./clock.js";
import { errorHandler } from "./error.js";
import { saveCountDownList } from "./formfunctions.js";
import { removeElementSetDisplayNone } from "./functions.js";
import { notifyUser } from "./uiFunctions.js";
/* SECTION: DISPLAY COUNTDOWNS */

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
            console.log(arrayOfCountdowns[pos]);
            arrayOfCountdowns[pos].text = countItem.text;
            arrayOfCountdowns[pos].date = countItem.date;
            arrayOfCountdowns[pos].dateModified = countItem.dateModified;
            arrayOfCountdowns[pos].repeat = countItem.repeat;
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

export  function fetchArrayOfCountdowns() {
    let jsonListOfCountdowns =  localStorage.getItem('countdown');
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
let countItemExists = false;