import { popForm, closeFormPopUp, FORM_DOM_IDS, saveCountdownForm } from './formfunctions.js'
import { handleHomePageFormSubmission } from './formupdate.js';

const popAndAddFormSubmission = () => {
    popForm()
    handleHomePageFormSubmission();
}




// DOM Elements
const createButton = document.getElementsByClassName("new-item")[0];
createButton.addEventListener("click", popAndAddFormSubmission);