import {popForm, closeFormPopUp} from './formfunctions.js'
import {sanitize} from './functions.js'




function handleFormSubmission() {
    const submitbutton = document.getElementById('countdown-submit');

    // const event = document.createEvent('Event');
    // console.log(event);
    submitbutton.addEventListener('click', (e) => {

        e.preventDefault();
        console.log('submitting in form update');
        submitbutton.disabled = true;
        // get text field values, with auto values
        let userTextField = document.getElementById('countdownText');
        let repeatCheck = document.getElementById("repeat-cb");
        console.log(userTextField.value, 'user input');
        let userText = sanitize(userTextField.value)
        console.log(userText, 'sanitized user');

        if (!userText) {
            userText = userTextField.placeholder;
            countNumber++;
            localStorage.setItem('countNumber', countNumber)
        }
        let userDate = document.getElementById("dateInput").value;
        userDate = new Date(userDate);
        let countItem = { text: userText, date: userDate, dateModified: new Date() };
        if(repeatCheck){
            countItem.repeat = repeatCheck.checked;
        }
        console.log(countItem);
        let countdown = localStorage.getItem('countdown');
        if (countdown !== null) { //countdowns already exist
            countdown = JSON.parse(countdown);//array
            countdown.push(countItem);
            // console.log(countdown);
            setCountDownList(countdown);
            // external function
        } else {
            // create first countdown
            setCountDownList([countItem]);
            //  displayAndAddListeners();
        }
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



createButton.addEventListener("click", popForm);