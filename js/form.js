import { popForm, closeFormPopUp, FORM_DOM_IDS, saveCountdownForm } from './formfunctions.js'
import { handleHomePageFormSubmission } from './formupdate.js';

const popAndAddFormSubmission = () => {
    popForm()
    handleHomePageFormSubmission();
}



// todo: remove dynamic seting of css
// if (!document.querySelector("[href='css/form.css']")) {
//     document.head.insertAdjacentHTML(
//         "beforeend",
//         `<link rel="stylesheet" href="/css/form.css">`
//     );
// }

// DOM Elements
const createButton = document.getElementsByClassName("new-item")[0];
createButton.addEventListener("click", popAndAddFormSubmission);