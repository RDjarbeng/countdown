import { errorHandler } from "../error.js";
import { displayFormPopUp } from "../formfunctions.js";
import { handleFormUpdate } from "../formupdate.js";
import { addClickListenersWithoutDuplicates, setInnerHtmlForNotNull } from "../functions.js";
import { notifyUser } from "../uiFunctions.js";
import { countdownList, deleteFromCountdownsWithId, getArrayIndexByDateModified, getArrayOfCountdownStatus, populateList, updateArrayOfCountdownState, updateClockAndText } from "./listFunctions";
import { LISTPAGE_DOM_CLASSES } from "./LISTPAGE_DOM_SELECTORS.js";
import { hideContextMenus } from "./list_ui/hideContextMenus.js";
import { triggerContextMenu } from "./list_ui/triggerContextMenu.js";
import { showClockRow } from "./list_ui/updateListpageClockAndText.js";

let listArrayOfCountdowns =getArrayOfCountdownStatus();
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
  * @param {HTMLElement} targetElement 
  * @param {String} className 
  * @returns {Boolean}
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
function addListEventListener() {
    const countList = document.querySelector(LISTPAGE_DOM_CLASSES.countdownList)
    addClickListenersWithoutDuplicates(countList, listEventListener)
}

/**
 * Adds event listeners for the list and the page container for closing context menus
 */
 export function addEventHandlers() {
    addListEventListener();
    // add context menu event listener
    document.querySelector('.container').addEventListener("click", hideContextMenus);
}



/**
 * List Click event listener for the countdowns, context menu and items
 * @param {Event} event
 */
export const listEventListener = event => {
    const targetElement = event.target;

    // if event is fired on text or date, countdown item
    if (isTargetElementOnCountdownItem(targetElement)) {
        console.log(targetElement, 'parent', targetElement.parentElement);
        let targetIndex = getArrayIndexByDateModified(listlistArrayOfCountdowns, targetElement.parentElement.getAttribute('data-id'));
        // todo: find a better way of accessing element in countdown array
        console.log(targetIndex, 'index of element found in array');
        showClockRow();
        updateClockAndText(listArrayOfCountdowns[targetIndex].date, listArrayOfCountdowns[targetIndex].text);
    }

    //if the area for context menu is clicked
    else if (isTargetElementOnContextMenu(targetElement)) {
        //get the countdown list item and pass to function, search for list class .menu
        //in case of directly clicking on icon, parent element is .countdown-list-options div
        triggerContextMenu(targetElement.parentElement);

    } else if (isClassOnTargetElement(targetElement, 'menu-opts')) {
        let count_modified = targetElement.parentElement.getAttribute('data-id');
        if (isClassOnTargetElement(targetElement, 'main')) {
            // set as main clicked
            // find the element convert to JSON and place it as the main clock
            const countdown = listArrayOfCountdowns.find((countdown) => countdown.dateModified == count_modified);
            setMainClockCountdown(countdown);
        } else if (isClassOnTargetElement(targetElement, 'del')) {
            // fetch array if not existing in workspace
            if (!listArrayOfCountdowns) {
                console.log("Strangely array was not found in list functions on delete");
                updateArrayOfCountdownState();

            }
            deleteFromCountdownsWithId(count_modified);
            // setInnerHtmlForNotNull(countdownList, populateList(arrayOfCountdowns));
        } else if (isClassOnTargetElement(targetElement, 'edit')) {
            if (!listArrayOfCountdowns) {
                console.log("Strangely array was not found in list functions on edit");
                updateArrayOfCountdownState();
            }
            console.log(listArrayOfCountdowns);
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
                    console.log('something went wrong with the editing could not find id of item');
                    errorHandler('Unable to edit countdown');
                    console.log(editItem);
                }
            } catch (err) {
                console.log(err, 'Error in form display');
                errorHandler('Error in form display');
            }


        }
    }
};
