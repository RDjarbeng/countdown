import {popForm, closeFormPopUp, sanitize, getFormValuesAndSaveCd} from './formfunctions.js'



const popAndAddFormOnList=()=>{
    popForm()
    handleListpageForm();
}

function handleListpageForm() {
    const submitbutton = document.getElementById('countdown-submit');

    // const event = document.createEvent('Event');
    // console.log(event);
    submitbutton.addEventListener('click', (e) => {

        e.preventDefault();
        submitbutton.disabled = true;
        getFormValuesAndSaveCd()
        // todo: refactor display and add 
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

// DOM Elements
const createButton = document.getElementsByClassName("new-item")[0];
// let dateInput, textInput;
// todo: remove dynamic seting of css
if (!document.querySelector("[href='css/form.css']")) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="stylesheet" href="/css/form.css">`
    );
}



createButton.addEventListener("click", popAndAddFormOnList);