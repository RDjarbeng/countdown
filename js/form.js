import {popForm, closeFormPopUp, getFormValuesAndSaveCd, sanitize} from './formfunctions.js'

const popAndAddFormSubmission=()=>{
    popForm()
    handleFormSubmission();
}


function handleFormSubmission() {
    const submitbutton = document.getElementById('countdown-submit');
    // console.log(event);
    submitbutton.addEventListener('click', (e) => {
        
        e.preventDefault();
        submitbutton.disabled = true;
        getFormValuesAndSaveCd()
        // testing
        window.location.href = "/html/countdown-list.html";
        closeFormPopUp();
    })
}







// DOM Elements
const createButton = document.getElementsByClassName("new-item")[0];
let countNumber = 1;

// let dateInput, textInput;

// todo: remove dynamic seting of css
if (!document.querySelector("[href='css/form.css']")) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="stylesheet" href="/css/form.css">`
    );
}



createButton.addEventListener("click", popAndAddFormSubmission);