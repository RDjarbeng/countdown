import { errorHandler } from './error.js';
import { saveCountdownForm } from './formupdate.js';
import {addZeros} from './functions.js'

export const CONSTANT_IDS ={
    form_TextInput:'countdownText',
    form_dateInput: 'dateInput',
    form_repeatCheckBox: 'repeat-cb',
    form_modifiedTime: 'modifiedTime',
    form_submitButton: 'countdown-submit'
}
export function popForm() {
    addFormHTMLAndCloseListenerToPage(getFormHTML())
    setDateAttributes();
    
}
/**
 * 
 * @param {Object} [formDefaultValues] 
 * @returns 
 */
export function getFormHTML(formDefaultValues){
    let text, dateTime, modifiedTime, repeat;
    let formEdit=false;
    if(formDefaultValues){
        formEdit = true;
        text = formDefaultValues.text
        dateTime = formDefaultValues.dateTime
        modifiedTime = formDefaultValues.modifiedTime
        repeat = formDefaultValues.repeat
    }
    let countNumber= getUserDefaultCount();
    const popFormHtml = `<section class="pop-up-container">
    <form id='customDateForm' class="pop-up-form">
        <div class="form-header">Set Countdown</div>
        <div class="form-sections">
            <label for="">Title &nbsp;</label>
            <input type="text" 
            value= "${text||'' }" 
            placeholder="countdown #${countNumber}" 
            id="${CONSTANT_IDS.form_TextInput|| 'countdownText'}"
            >
        </div>
        <div class="form-sections">
            <label for="">Date & Time &nbsp;</label>
            <input type="datetime-local" 
            value= "${dateTime||'' }" 
            id ="${CONSTANT_IDS.form_dateInput|| 'dateInput'}" 
            min="" required
            >
        </div>
        <div class="form-sections form-repeat">
            <label for="repeat-cb">
                <input type="checkbox"
                 id="${CONSTANT_IDS.form_repeatCheckBox|| 'repeat-cb'}" 
                 ${repeat ? 'checked' : ''}
                 > 
                 Repeat every year 
            </label>
        </div>
        <div class="form-sections">
            <label for=""></label>
            <input type="hidden" 
            value ="${modifiedTime||''}" 
            id="${CONSTANT_IDS.form_modifiedTime|| 'modifiedTime'}"
            >
            <input 
            type="submit" 
            id ="${CONSTANT_IDS.form_submitButton|| 'countdown-submit'}" 
            value="${formEdit? 'Update' :'Submit' }" 
            formmethod="dialog"
            >
        </div>    
        <div class="close-form"><button>Close</button></div>
    </form>
    </section>`;
    return popFormHtml;

}

export function addFormHTMLAndCloseListenerToPage(popFormHtml){
    document.body.insertAdjacentHTML("afterbegin", popFormHtml);
    document.body.style.position = "fixed";
    
    document.getElementsByClassName("close-form")[0].onclick = (e) => { closeFormPopUp(); }
}
/**
 * Returns the count of user default countdowns stored in local storage else returns 1
 * @returns {Number} 
 */
export function getUserDefaultCount(){
    let countNumber = localStorage.getItem('countNumber');
    if (!countNumber)
        countNumber = 1;
    else 
        countNumber = Number(countNumber)
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
    dateInput.setAttribute("min", todayString);
    dateInput.value = todayString;
}

export function saveNewCountdownToLocalStorage(countItem) {
    let countdown = localStorage.getItem('countdown');
    if (countdown !== null) { //countdowns already exist
        countdown = JSON.parse(countdown);//array

        countdown.push(countItem);
        // console.log(countdown);
        saveCountDownList(countdown)
    } else {
        // create first countdown
        saveCountDownList([countItem]);
    }
}
/**
 * 
 * @param {Array} arrayOfJSONCountdowns 
 */
export function saveCountDownList(jsArray) {
    localStorage.setItem('countdown', JSON.stringify(jsArray))
}
/**
 * 
 * @param {HTMLInputElement} userTextField 
 * @returns 
 */
export function getUserText(userTextField){
    let userText = sanitize(userTextField.value);  
    let count = getUserDefaultCount();
    if (!userText) {  
        userText = userTextField.placeholder;
        localStorage.setItem('countNumber', ++count)
    }
    return userText;
}

export function saveNewCdFromInputs({userTextField,dateInput, repeatCheck, }){
    // DOM references
    let userDate = dateInput.value;
    // get text field values, with auto values
    let userText = getUserText(userTextField);

    userDate = new Date(userDate);
    let countItem = { text: userText, date: userDate, dateModified: new Date() };
    if (repeatCheck) {
        countItem.repeat = repeatCheck.checked;
    }
    saveNewCountdownToLocalStorage(countItem);
}

// todo: move this function to form update.js
export function addFormListenerForUpdate() {
    // todo: update list with custom fired events
    const submitbutton = document.getElementById(CONSTANT_IDS.form_submitButton);


    submitbutton.addEventListener('click', (e) => {

        e.preventDefault();
        submitbutton.disabled = true;
        // get text field values, with auto values
        saveCountdownForm();

        // updateLocalItem(arrayOfCountdowns, countItem, modifiedTime);
        // displayCountdowns();
        // closeFormPopUp();
        // removeClockAndText();
        // arrayOfCountdowns = arrayOfCountdowns ? arrayOfCountdowns : JSON.parse(localStorage.getItem('countdown'));
    })
}

export function checkRepeat(repeatCheckBox) {
    return repeatCheckBox.checked

}


export function saveCountdownForm(){
    let userDate = document.getElementById("dateInput");
    let repeatCheck = document.getElementById("repeat-cb");
    let userTextField = document.getElementById('countdownText');
    // get text field values, with auto values
    // let userText = getUserText();

        saveNewCdFromInputs({ userTextField: userTextField, dateInput: userDate, repeatCheck: repeatCheck})
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
        addFormHTMLAndCloseListenerToPage(getFormHTML({text: text, dateTime: dateTime, modifiedTime: modifiedTime, repeat: repeat}));
    }else{
        errorHandler('Error in form edit.')
        console.log('Null values in display form pop up');
    }
}