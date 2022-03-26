// Dom elements
// begin displaycountdown.js
var hourNumber = document.getElementById("hour-num");
var minNumber = document.getElementById("min-num");
var secNumber = document.getElementById("sec-num");
var countdownTextDisplay = document.getElementById('countdown-text');
var countdownClock = document.querySelector('.clock-row');
var countdownList = document.getElementById('countdown-list');
let test = false;
let arrayOfCountdowns;



function stopClock() {
    clearTimeout(intervalID);
    customClockMovement = false;
}

async function stepIncreaseAndStart(clockElement, domElements, speed = 50, start_num = 0) {
    animateValue(domElements.dayNumber, start_num, clockElement.days, speed);
    animateValue(domElements.hourNumber, start_num, clockElement.hours, speed);
    animateValue(domElements.minNumber, start_num, clockElement.minutes, speed);
    animateValue(domElements.secNumber, start_num, clockElement.seconds, speed);

}

async function waitForAnimation(clock, domElements, duration) {
    await stepIncreaseAndStart(clock || myclock, domElements, duration || animatedCountDuration)
    startClock(clock || myclock, domElements);
}

// todo: sort by modified time
async function displayCountdowns() {


    let jsonListOfCountdowns = await localStorage.getItem('countdown');
    arrayOfCountdowns = JSON.parse(jsonListOfCountdowns);
    if (arrayOfCountdowns && arrayOfCountdowns.length) {

        let listItems = populateList(arrayOfCountdowns);
        setInnerHtmlForNotNull(countdownList, listItems)
        setInnerHtmlForNotNull(countdownTextDisplay, '')
        // updateClockAndText(arrayOfCountdowns[arrayOfCountdowns.length-1].date, arrayOfCountdowns[arrayOfCountdowns.length-1].text)
        

    } else {
        setInnerHtmlForNotNull(countdownList, 'Found no countdowns to display');
        setInnerHtmlForNotNull(countdownTextDisplay, '')
    }
}

function populateList(arrayOfCountdowns) {
    let listItems = '';
    arrayOfCountdowns.forEach((countdown, index) => {
        let date = new Date(countdown.date);
        listItems += `
        <div class="countdown-list-item" data-index="${index}" data-id="${countdown.dateModified}">
            <div class="countdown-list-text"> ${countdown.text} </div>
            <div class="countdown-list-options" ><span class="material-icons">expand_circle_down </span>
            <div class="menu" data-index="${index}" data-id="${countdown.dateModified}" style="display:none">
            <div class="menu-opts edit">Edit</div>
            <div class="menu-opts del">Delete</div>
            <div class="menu-opts main">Set as main</div>
            
        </div></div>
            <div class="countdown-list-date"> 
                Due: ${date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ', ' + date.getFullYear()}
            </div>    
        </div>`
    });
    return listItems;
}

function updateClockAndText(date, text, animation = true) {
    let clock = new Clock(new Date(date));
    setInnerHtmlForNotNull(countdownTextDisplay, text);
    stopClock();
    waitForAnimation(clock, { dayNumber, hourNumber, minNumber, secNumber }, 500)
}

function removeClockAndText(){
    stopClock();
    setInnerHtmlForNotNull(countdownTextDisplay, '')
    if(countdownClock){
        // todo: set the display to none instead
        countdownClock.style.display = ''
    }
}

const triggerContextMenu = (element) => {
    if (element.querySelector(".menu").style.display == "block") {
        hideContextMenus();
        // element.querySelector(".menu").style.display = "none";
        // console.log("context-menu: hide");
    }
    else {
        hideContextMenus();//close all context menus before displaying the clicked one
        element.querySelector(".menu").style.display = "block";
        // console.log("context-menu: show");
    }
}

function hideContextMenus(event) {
    //if function is not triggered by event listener, event is empty
    if (!(event != null)) {
        document.querySelectorAll('.menu').forEach(contextMenu => contextMenu.style.display = "none");
    } else if (!(event.target.className == 'countdown-list-options' || event.target.tagName == 'I')) {
        // click is not on context menu icon area or icon   
        document.querySelectorAll('.menu').forEach(contextMenu => contextMenu.style.display = "none");
    }

}
function addListEventListener() {
    document.querySelector('.countdown-list').addEventListener('click', event => {
        //hide all context menus

        const targetElement = event.target;

        // if event is fired on text or date
        if (targetElement.className == 'countdown-list-text' || targetElement.className == 'countdown-list-date') {
            // hideContextMenus()
            // todo: find a better way of accessing element in countdown array
            updateClockAndText(arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')].date, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')].text)

            if ([null, "", undefined].includes(document.querySelector(".clock-row").style.display)) {
                document.querySelector(".clock-row").style.display = "flex";
                document.querySelector(".clock-row").style.animationPlayState = "running";
            }
        }
        //if the area for context menu is clicked
        else if (targetElement.className == 'countdown-list-options' || targetElement.tagName == 'I') {
            //get the countdown list item and pass to function, search for list class .menu
            //in case of directly clicking on icon, parent element is .countdown-list-options div
            triggerContextMenu(targetElement.parentElement);

        } else if (targetElement.className.search('menu-opts') > -1) {
            let count_modified = targetElement.parentElement.getAttribute('data-id');
            if (targetElement.className.search('main') > -1) {
                // set as main clicked
                // find the element convert to JSON and place it as the main clock
                const countdown = arrayOfCountdowns.find((countdown) => countdown.dateModified == count_modified);
                const mainCount = JSON.stringify(countdown);
                localStorage.setItem('mainClock', mainCount);
                let date = new Date(countdown.date);
                notifyUser(`Homepage clock set to ${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`);
            } else if (targetElement.className.search('del') > -1) {
                // delete item clicked
                arrayOfCountdowns = arrayOfCountdowns.filter((countdown, index) => countdown.dateModified != count_modified);
                test = true;
                setCountDownList(arrayOfCountdowns);
                countdownList.innerHTML = populateList(arrayOfCountdowns)
                // console.log('delete clicked', targetElement.parentElement, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')]);
            } else if (targetElement.className.search('edit') > -1) {
                let editItem = arrayOfCountdowns.find((countdown, index) => countdown.dateModified == count_modified);
                // todo: custom error messages for components on fail
                try {
                    if(editItem){
                    displayFormPopUp(editItem.text, /\d+-\d+-\d+T\d+:\d+/.exec(editItem.date), count_modified);
                    handleUpdate();
                }else{
                    // something went wrong with the editing
                    // todo: add custom error message
                    errorHandler();
                    console.log(editItem);
                }
                } catch (err) {
                    console.log(err, 'err in form display ');
                    errorHandler();
                }


            }
        }
    })
}

function handleUpdate() {
    // todo: update list with custom fired events
    const countdownForm = document.getElementById('customUpDateForm');
    const submitbutton = document.getElementById('countdown-update');
    

    // const event = document.createEvent('Event');
    // console.log(event);
    countdownForm.addEventListener('submit', (e) => {

        e.preventDefault();
        submitbutton.disabled = true;
        // get text field values, with auto values
        let userText = document.getElementById('countdownText').value;
        const modifiedTime = document.getElementById('modifiedTime').value;

        // if (!userText) {
        //     userText = userTextField.placeholder;
        //     countNumber++;
        //     localStorage.setItem('countNumber', countNumber)
        // }
        let userDate = document.getElementById("dateInput").value;
        userDate = new Date(userDate);
        let countItem = { text: userText, date: userDate, dateModified: new Date() };
        arrayOfCountdowns = arrayOfCountdowns? arrayOfCountdowns: JSON.parse(localStorage.getItem('countdown'));
        if (arrayOfCountdowns !== null) { //countdowns already exist
            
            
            let pos = arrayOfCountdowns.findIndex((value) =>
                value.dateModified == modifiedTime
            );
            if(pos>-1){
                console.log(arrayOfCountdowns[pos]);
                arrayOfCountdowns[pos].text = countItem.text;
                arrayOfCountdowns[pos].date = countItem.date;
                arrayOfCountdowns[pos].dateModified = countItem.dateModified;
                setCountDownList(arrayOfCountdowns);
                displayCountdowns();
                closeFormPopUp();
                removeClockAndText();
            }else{
                console.log("Unable to find item");
                errorHandler();
            }

        }
    })
}

function setCountDownList(jsArray){
    localStorage.setItem('countdown', JSON.stringify(jsArray))   
}

function displayFormPopUp(text, dateTime, modifiedTime) {
    // todo: Track items without using modifiedTime
    if(text && dateTime&& modifiedTime){
    const updateFormHtml = `<section class="pop-up-container">
    <form action="/countdown-list.html" method="get" id='customUpDateForm' class="pop-up-form">
        <div class="form-header">Update Countdown</div>
        <div class="form-sections">
            <label for="">Note &nbsp;</label>
            <input type="text" value="${text}" id='countdownText'>
        </div>
        <div class="form-sections">
            <label for="">Date &nbsp;</label>
            <input type="datetime-local" value= ${dateTime} id ="dateInput" min="" required>
        </div>
        <div class="form-sections">
            <label for=""></label>
            <input type="hidden" value = ${modifiedTime} id="modifiedTime">
            <input type="submit" id ="countdown-update" value="Update">
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
function closeFormPopUp() {
    document.getElementsByClassName("pop-up-container")[0].remove();
    document.body.style.position = "";
}

function setCountDownList(arrayOfJSONCountdowns) {
    localStorage.setItem('countdown', JSON.stringify(arrayOfJSONCountdowns))
}

function addEventListeners() {
    addListEventListener();
    // add context menu event listener
    document.querySelector('.container').addEventListener("click", hideContextMenus);
}
try{
displayCountdowns();
addEventListeners();
}catch (err) {
    console.log(err, 'err in display countdown initialisation');
    errorHandler();
}
