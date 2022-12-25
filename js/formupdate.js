import { popForm, closeFormPopUp, saveCountdownForm, FORM_DOM_IDS } from './formfunctions.js'
import { errorHandler } from './error.js';
import { loadListPage, updateArrayOfCountdownState } from './listpage/listFunctions.js';
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
        loadListPage();
        closeFormPopUp();
    })
}else{
    errorHandler('Something went wrong with the add button');
    console.warn('FormUpdatejs: Handle List page form can not find submit button');
}
}




// todo: remove dynamic seting of css, @nyakotey
// if (!document.querySelector("[href='css/form.css']")) {
//     document.head.insertAdjacentHTML(
//         "beforeend",
//         `<link rel="stylesheet" href="/css/form.css">`
//     );
// }

// DOM Elements
