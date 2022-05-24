function popForm() {
    countNumber = localStorage.getItem('countNumber');
    if (!countNumber)
        countNumber = 1;
    const popFormHtml = `<section class="pop-up-container">
    <form action="/html/countdown-list.html" method="get" id='customDateForm' class="pop-up-form">
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
            <input type="submit" id ="countdown-submit"value="Submit">
        </div>    
        <div class="close-form"><button>Close</button></div>
    </form>
    </section>`;

    document.body.insertAdjacentHTML("afterbegin", popFormHtml);
    document.body.style.position = "fixed";
    setDateAttributes();
    document.getElementsByClassName("close-form")[0].onclick = (e) => { closeFormPopUp(); }
    handleFormSubmission();
}

function addZeros(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

function setDateAttributes() {
    const dateInput = document.getElementById("dateInput");
    const today = new Date();
    let dd = today.getDate() ;//add 1 to the date so date starts from tomorrow
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    let yyyy = today.getFullYear();
    let hr = addZeros(today.getHours());
    let min = addZeros(today.getMinutes());
    dd = addZeros(dd);
    mm = addZeros(mm)

    let todayString = yyyy + '-' + mm + '-' + dd+'T'+ hr+':'+min;
    console.log(todayString);
    dateInput.setAttribute("min", todayString);
    dateInput.value= todayString;
}

function closeFormPopUp() {
    document.getElementsByClassName("pop-up-container")[0].remove();
    document.body.style.position = "";
}

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
  }

function handleFormSubmission() {
    const countdownForm = document.getElementById('customDateForm');
    const submitbutton = document.getElementById('countdown-submit');
    
    // const event = document.createEvent('Event');
    // console.log(event);
    countdownForm.addEventListener('submit', (e) => {
        
        e.preventDefault();
        // submitbutton.disabled = true;
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
        if(countdown !== null){ //countdowns already exist
         countdown = JSON.parse(countdown);//array
        countdown.push(countItem);
        // console.log(countdown);
        setCountDownList(countdown);
        // external function
        try{
            displayAndStartcount();
            console.log('we did it', countItemExists);
        } catch (err) {
    console.log(err, 'err in updating countdown initialisation');
    errorHandler("Unable to finish update your countdowns");
}
        // closeFormPopUp();

        }else{
            // create first countdown
             setCountDownList([countItem]);
             displayCountdowns();
            //  closeFormPopUp();
        }

        // testing
        closeFormPopUp();
    })
}

function setCountDownList(jsArray){
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