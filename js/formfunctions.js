import {addZeros} from './functions.js'
import { updateLocalItem } from "./listFunctions.js";

export function popForm() {
    let countNumber = getUserDefaultCount()
    const popFormHtml = `<section class="pop-up-container">
    <form id='customDateForm' class="pop-up-form">
        <div class="form-header">Set Countdown</div>
        <div class="form-sections">
            <label for="">Title &nbsp;</label>
            <input type="text" placeholder="countdown #${countNumber}" id='countdownText'>
        </div>
        <div class="form-sections">
            <label for="">Date & Time &nbsp;</label>
            <input type="datetime-local" id ="dateInput" min="" required>
        </div>
        <div class="form-sections form-repeat">
            <label for="repeat-cb">
                <input type="checkbox" id="repeat-cb"> Repeat every year 
            </label>
        </div>
        <div class="form-sections">
            <label for=""></label>
            <input type="submit" id ="countdown-submit"value="Submit" formmethod="dialog">
        </div>    
        <div class="close-form"><button>Close</button></div>
    </form>
    </section>`;

    document.body.insertAdjacentHTML("afterbegin", popFormHtml);
    document.body.style.position = "fixed";
    setDateAttributes();
    document.getElementsByClassName("close-form")[0].onclick = (e) => { 
        // console.log('close firing');
        closeFormPopUp();
     }
    
}
/**
 * Returns the count of user default countdowns stored in local storage else returns 1
 * @returns {Number} 
 */
export function getUserDefaultCount(){
    let countNumber = localStorage.getItem('countNumber');
    if (!countNumber)
        countNumber = 1;
    return countNumber;
}

export function closeFormPopUp() {
    document.getElementsByClassName("pop-up-container")[0].remove();
    document.body.style.position = "";
}

export function setDateAttributes() {
    const dateInput = document.getElementById("dateInput");
    const today = new Date();
    let dd = today.getDate();//add 1 to the date so date starts from tomorrow
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    let yyyy = today.getFullYear();
    let hr = addZeros(today.getHours());
    let min = addZeros(today.getMinutes());
    dd = addZeros(dd);
    mm = addZeros(mm)

    let todayString = yyyy + '-' + mm + '-' + dd + 'T' + hr + ':' + min;
    console.log(todayString);
    dateInput.setAttribute("min", todayString);
    dateInput.value = todayString;
}

export function saveToLocalStorage(countItem) {
    let countdown = localStorage.getItem('countdown');
    if (countdown !== null) { //countdowns already exist
        countdown = JSON.parse(countdown);//array

        countdown.push(countItem);
        // console.log(countdown);
        setCountDownList(countdown)
    } else {
        // create first countdown
        setCountDownList([countItem]);
    }
}
/**
 * 
 * @param {Array} arrayOfJSONCountdowns 
 */
export function setCountDownList(jsArray) {
    localStorage.setItem('countdown', JSON.stringify(jsArray))
}

export function getFormValuesAndSaveCd(){
    // DOM references
    let userDate = document.getElementById("dateInput").value;
    let repeatCheck = document.getElementById("repeat-cb");
    let userTextField = document.getElementById('countdownText');
    
    // get text field values, with auto values

    let userText = sanitize(userTextField.value);

    if (!userText) {
        userText = userTextField.placeholder;
        let countNumber = getUserDefaultCount();
        countNumber++;
        localStorage.setItem('countNumber', countNumber)
    }

    userDate = new Date(userDate);
    let countItem = { text: userText, date: userDate, dateModified: new Date() };
    if (repeatCheck) {
        countItem.repeat = repeatCheck.checked;
    }
    saveToLocalStorage(countItem);
}

export function checkRepeat(repeatCheckBox) {
    return repeatCheckBox.checked

}
/**
 * 
 * @param {String} string 
 * @returns {String} sanitized string without html chars
 */
export function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match) => (map[match]));
}


export function displayFormPopUp(text, dateTime, modifiedTime, repeat) {
    // todo: Track items without using modifiedTime
    if (text && dateTime && modifiedTime) {
        console.log('inside form display');
        const updateFormHtml = `<section class="pop-up-container">
    <form action="/html/countdown-list.html" method="get" id='customUpDateForm' class="pop-up-form">
        <div class="form-header">Update Countdown</div>
        <div class="form-sections">
            <label for="">Title &nbsp;</label>
            <input type="text" value="${text}" id='countdownText'>
        </div>
        <div class="form-sections">
            <label for="">Date & Time &nbsp;</label>
            <input type="datetime-local" value= ${dateTime} id ="dateInput" min="" required>
        </div>
        <div class="form-sections form-repeat">
            <label for="repeat-cb">
                <input type="checkbox" id="repeat-cb" ${repeat ? 'checked' : ''}> Repeat 
            </label>
        </div>
        <div class="form-sections">
            <label for=""></label>
            <input type="hidden" value = ${modifiedTime} id="modifiedTime">
            <input type="submit" id ="countdown-update" value="Update" formmethod="dialog">
        </div>    
        
        <div class="close-form"><button>Close</button></div>
    </form>
    </section>`;
        document.body.insertAdjacentHTML("afterbegin", updateFormHtml);
        document.body.style.position = "fixed";
        // setDateAttributes();
        document.getElementsByClassName("close-form")[0].onclick = (e) => { closeFormPopUp(); }
    }
}