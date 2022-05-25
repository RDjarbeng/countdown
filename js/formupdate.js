import {popForm, closeFormPopUp, saveToLocalStorage, getFormValuesAndSaveCd} from './formfunctions.js'
import {sanitize} from './functions.js'



const popAndAddFormOnList=()=>{
    popForm()
    handleLlispageForm();
}

function handleLlispageForm() {
    const submitbutton = document.getElementById('countdown-submit');

    // const event = document.createEvent('Event');
    // console.log(event);
    submitbutton.addEventListener('click', (e) => {

        e.preventDefault();
        submitbutton.disabled = true;
        getFormValuesAndSaveCd()
        try {
            displayAndAddListeners();
            console.log('we did it', countItemExists);
        } catch (err) {
            console.log(err, 'err in updating countdown initialisation');
            errorHandler("Unable to finish update your countdowns");
        }
        // testing
        closeFormPopUp();
    })
}

function setCountDownList(jsArray) {
    localStorage.setItem('countdown', JSON.stringify(jsArray))
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



createButton.addEventListener("click", popAndAddFormOnList);