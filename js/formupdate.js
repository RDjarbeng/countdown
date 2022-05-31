import { popForm, closeFormPopUp, sanitize, saveNewCdFromInputs } from './formfunctions.js'
import { errorHandler } from './error.js';
import { loadListPage } from './listFunctions.js';
const popAndAddFormOnList = () => {
    popForm()
    handleListpageForm();
}
function handleListpageForm() {
    const submitbutton = document.getElementById('countdown-submit');
    if(submitbutton){
    submitbutton.addEventListener('click', (e) => {

        e.preventDefault();
        submitbutton.disabled = true;
        saveCountdownForm();        
        // todo: refactor display and add 
        loadListPage();
        // testing
        closeFormPopUp();
    })
}else{
    errorHandler('Something went wrong with the add button');
    console.warn('FormUpdatejs: Handle List page form can not find submit button');
}
}



export function saveCountdownForm(){
    let userDate = document.getElementById("dateInput");
    let repeatCheck = document.getElementById("repeat-cb");
    let userTextField = document.getElementById('countdownText');
    // get text field values, with auto values
    // let userText = getUserText();

        saveNewCdFromInputs({ userTextField: userTextField, dateInput: userDate, repeatCheck: repeatCheck})
}

// todo: remove dynamic seting of css, @nyakotey
if (!document.querySelector("[href='css/form.css']")) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="stylesheet" href="/css/form.css">`
    );
}

// DOM Elements
const createButton = document.getElementsByClassName("new-item")[0];
createButton.addEventListener("click", popAndAddFormOnList);