// DOM Elements
const createButton = document.getElementsByClassName("new-item")[0];
let countNumber = 1;

// let dateInput, textInput;


if (!document.querySelector("[href='form.css']")) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="stylesheet" href="form.css">`
    );
}

// todo: set variable countdown value


createButton.addEventListener("click", popForm);


function popForm() {
    countNumber = localStorage.getItem('countNumber');
    if (!countNumber)
        countNumber = 1;
    const popFormHtml = `<section class="pop-up-container">
    <form action="/countdown-list.html" method="get" id='customDateForm' class="pop-up-form">
        <div class="form-header">Set Countdown</div>
        <div class="form-sections">
            <label for="">Note &nbsp;</label>
            <input type="text" placeholder="countdown #${countNumber}" id='countdownText'>
        </div>
        <div class="form-sections">
            <label for="">Date &nbsp;</label>
            <input type="datetime-local" id ="dateInput" min="" required>
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

function setDateAttributes() {
    const dateInput = document.getElementById("dateInput");
    const today = new Date();
    let dd = today.getDate() ;//add 1 to the date so date starts from tomorrow
    let mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    let todayString = yyyy + '-' + mm + '-' + dd+'T00:00';
    dateInput.setAttribute("min", todayString);
}

function closeFormPopUp() {
    document.getElementsByClassName("pop-up-container")[0].remove();
    document.body.style.position = "";
}

function handleFormSubmission() {
    const countdownForm = document.getElementById('customDateForm');
    const submitbutton = document.getElementById('countdown-submit');
    
    // const event = document.createEvent('Event');
    // console.log(event);
    countdownForm.addEventListener('submit', (e) => {
        
        // e.preventDefault();
        submitbutton.disabled = true;
        // get text field values, with auto values
        let userTextField = document.getElementById('countdownText');
        let userText = userTextField.value;

        if (!userText) {
            userText = userTextField.placeholder;
            countNumber++;
            localStorage.setItem('countNumber', countNumber)
        }
        let userDate = document.getElementById("dateInput").value;
        userDate = new Date(userDate);
        let countItem = { text: userText, date: userDate, dateModified: new Date() };
        let countdown = localStorage.getItem('countdown');
        if(countdown !== null){ //countdowns already exist
         countdown = JSON.parse(countdown);//array

        countdown.push(countItem);
        // console.log(countdown);
        localStorage.setItem('countdown', setCountDownList(countdown))

        }else{
            // create first countdown
            localStorage.setItem('countdown', setCountDownList([countItem]) );
        }

        // testing
        // closeFormPopUp();
    })
}

export function setCountDownList(ArrayOfJSONCountdowns){
    localStorage.setItem('countdown', JSON.stringify(ArrayOfJSONCountdowns))   
}
