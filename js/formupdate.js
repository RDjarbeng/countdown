import { popForm, closeFormPopUp, saveCountdownForm, FORM_DOM_IDS } from './formfunctions.js'
import { errorHandler } from './error.js';
import { displayCountdowns, loadListPage, updateArrayOfCountdownState, updateCountdownItemFromForm, updateLocalItem } from './listpage/listFunctions.js';
import { removeClockAndText } from './listpage/list_ui/updateListpageClockAndText.js';
export const popAndAddFormOnList = () => {
    popForm()
    handleListpageFormSubmission();
}
function handleListpageFormSubmission() {
    const submitbutton = document.getElementById(FORM_DOM_IDS.form_submitButton);
    if(submitbutton){
    submitbutton.addEventListener('click', (e) => {

        e.preventDefault();
        submitbutton.disabled = true;
        saveCountdownForm();        
        updateArrayOfCountdownState();
        // loadListPage();
        closeFormPopUp();
    })
}else{
    errorHandler('Something went wrong with the add button');
    console.warn('FormUpdatejs: Handle List page form can not find submit button');
}
}

export function handleFormUpdate() {
    // todo: update list with custom fired events
    const submitbutton = document.getElementById(FORM_DOM_IDS.form_submitButton);
    submitbutton.addEventListener('click', (e) => {
        e.preventDefault();
        submitbutton.disabled = true;
        
        const modifiedTimeAsID = document.getElementById(FORM_DOM_IDS.form_modifiedTime).value;
        updateLocalItem(updateCountdownItemFromForm(), modifiedTimeAsID);
        displayCountdowns();
        closeFormPopUp();
        removeClockAndText();
        
    })
}


// todo: remove dynamic seting of css, @nyakotey
// if (!document.querySelector("[href='css/form.css']")) {
//     document.head.insertAdjacentHTML(
//         "beforeend",
//         `<link rel="stylesheet" href="/css/form.css">`
//     );
// }

// DOM Elements
