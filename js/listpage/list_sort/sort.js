import { errorHandler } from "../../error";
import { addClickListenersWithoutDuplicates, toggleElementDisplayBlockOnScreen } from "../../functions";
import { fetchArrayOfCountdowns } from "../../getCountdowns/fetchArrayOfCountdowns";
import { displayCountdowns, getArrayOfCountdownStatus } from "../listFunctions";
import { LISTPAGE_DOM_CLASSES } from "../LISTPAGE_DOM_SELECTORS";
import { addSortUI } from "../list_ui/addSortUI";
import { closeSortMenu } from "../list_ui/closeSortMenu";


export const sortTitleEventHandler = () => {
    const sortOpts = document.querySelector(LISTPAGE_DOM_CLASSES.countdownSortByOptions);
    toggleElementDisplayBlockOnScreen(sortOpts);
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

export const addSortEventListeners = () => {
    const sortOpts = document.querySelector(LISTPAGE_DOM_CLASSES.countdownSortByOptions);
    const sortTitle = document.querySelector(LISTPAGE_DOM_CLASSES.countdownSortByText);

    if (!(sortTitle && sortOpts)) {
        console.log('Var sort title and sortOpts is null', 'sort title', sortTitle, 'sort opts', sortOpts);
        errorHandler("Something's wrong in sort UI")
        return;
    }
    // sort options menu events
    addClickListenersWithoutDuplicates(sortTitle, sortTitleEventHandler)
    addClickListenersWithoutDuplicates(sortOpts, sortOptionsEventHandler)
}


/**
 * Adds sort menu to the page
 */
 export const addSortUIAndListeners = () => {
     console.log('Adding sort UI');
     let arrayOfCd=getArrayOfCountdownStatus();
     if(arrayOfCd &&arrayOfCd.length>0){
        addSortUI();
    addSortEventListeners();

    }
}