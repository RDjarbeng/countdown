import { popForm, closeFormPopUp, addFormListenerForUpdate, sanitize, CONSTANT_IDS } from './formfunctions.js'

const popAndAddFormSubmission = () => {
    popForm()
    handleFormSubmission();
}

function handleFormSubmission() {
    const submitbutton = document.getElementById(CONSTANT_IDS.form_submitButton);
    
    submitbutton.addEventListener('click', (e) => {
        e.preventDefault();
        submitbutton.disabled = true;
        addFormListenerForUpdate();
        // testing
        window.location.href = "/html/countdown-list.html";
        closeFormPopUp();
    })
}


// todo: remove dynamic seting of css
if (!document.querySelector("[href='css/form.css']")) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="stylesheet" href="/css/form.css">`
    );
}

// DOM Elements
const createButton = document.getElementsByClassName("new-item")[0];
createButton.addEventListener("click", popAndAddFormSubmission);