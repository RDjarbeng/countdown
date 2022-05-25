import {sanitize} from './functions.js'
import {popForm, closeFormPopUp} from './formfunctions.js'

const popAndAddFormSubmission=()=>{
    popForm()
    handleFormSubmission();
}
function addZeros(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}






function checkRepeat(repeatCheckBox) {
    if (repeatCheckBox.checked) {
        return { repeat: true };
    }

}
function handleFormSubmission() {
    const submitbutton = document.getElementById('countdown-submit');
    // console.log(event);
    submitbutton.addEventListener('click', (e) => {
        console.log('submit firing');
        // DOM references
        e.preventDefault();
        // const submitbutton = document.getElementById('countdown-submit');
        let userDate = document.getElementById("dateInput").value;
        let repeatCheck = document.getElementById("repeat-cb");
        let userTextField = document.getElementById('countdownText');
        submitbutton.disabled = true;
        // get text field values, with auto values

        let userText = sanitize(userTextField.value);

        if (!userText) {
            userText = userTextField.placeholder;
            countNumber++;
            localStorage.setItem('countNumber', countNumber)
        }

        userDate = new Date(userDate);
        let countItem = { text: userText, date: userDate, dateModified: new Date() };
        if (repeatCheck) {
            countItem.repeat = repeatCheck.checked;
        }
        saveToLocalStorage(countItem);

        // testing
        window.location.href = "/html/countdown-list.html";
        closeFormPopUp();
    })
}

export function saveToLocalStorage(countItem) {
    let countdown = localStorage.getItem('countdown');
    if (countdown !== null) { //countdowns already exist
        countdown = JSON.parse(countdown);//array

        countdown.push(countItem);
        console.log(countdown);
        setCountDownList(countdown)
    } else {
        // create first countdown
        setCountDownList([countItem]);
    }
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



createButton.addEventListener("click", popAndAddFormSubmission);