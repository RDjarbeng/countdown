// Dom elements
// begin displaycountdown.js
var hourNumber = document.getElementById("hour-num");
var minNumber = document.getElementById("min-num");
var secNumber = document.getElementById("sec-num");
var countdownTextDisplay = document.getElementById('countdown-text');
var countdownClock = document.querySelector('.clock-row');
var countdownList = document.getElementById('countdown-list');
let countItemExists = false;
let arrayOfCountdowns;
let testid = '';



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

    } else {
        setInnerHtmlForNotNull(countdownList, 'Found no countdowns to display');
        setInnerHtmlForNotNull(countdownTextDisplay, '')
    }
}
/**
 * Returns html string with a list of countdowns
 * @param {Array.<{text: String, date: String, dateModified: String}>} arrayOfCountdowns | contains array of countdown objects
 * @returns {string} list of countdownitems to be appended to DOM
 */
function populateList(arrayOfCountdowns) {
    countItemExists = false;
    let listItems = '';
    arrayOfCountdowns.forEach((countdown, index) => {
        listItems += addCountdownItem(countdown, index)
    });
    return listItems;
}

/**
 * 
 * @param {{text: String, date: String, dateModified: String}} countdown 
 * @param {Number} index the array index of the current item
 * @returns 
 */
function addCountdownItem(countdown, index) {
    let listItemClock = new Clock(new Date(countdown.date));
    let timeDifference = listItemClock.getDistance();
    let countdownStatus = "";
    let elapsed = false;
    if (timeDifference > 0) {
        countItemExists = true;
        countdownStatus = getCountdownString(listItemClock);
    } else {
        // countdown elapsed
        elapsed = 'true';
        countdownStatus = "Elapsed "
    }

    let countdownListItem = `
    <div class="countdown-list-item" data-index="${index}" data-id="${countdown.dateModified}">
        <div class="countdown-list-text"> ${countdown.text} </div>
        <div class="countdown-list-options" ><i class="fas fa-chevron-circle-down fa-lg"></i>
        <div class="menu" data-index="${index}" data-id="${countdown.dateModified}" style="display:none">
        <div class="menu-opts edit">
            <i class="fas fa-edit"></i>&nbsp;Edit
        </div>
        <div class="menu-opts del">
            <i class="fas fa-trash-alt"></i> &nbsp;Delete
        </div>
        <div class="menu-opts main">
            <i class="fas fa-clock"></i> &nbsp;Set as main
        </div>
        
    </div>
    </div>
        <div class="countdown-list-date" > 
        Status:
        <span 
            data-date="${countdown.date}" 
            class="${(!elapsed) ? 'countdown-counting' : ''}" >
             ${countdownStatus}
        </span> 
        </div>    
    </div>`;
    return countdownListItem;

}
/**
 * Get string with status of countdowns
 * @param {Clock} clock clock object for particular countdown
 * @returns {String} string of countdown status
 */
function getCountdownString(clock) {
    let countdownString ='';
    console.log(typeof clock.hours, clock.hours>0);
    if(clock.days>0){
        if(clock.hours<2){
            countdownString=clock.hours + ' hour, '+clock.minutes+' minutes';
        }else{
            countdownString= clock.days+ ' days ';
        }
        
    }else if(clock.hours>0){
        
        if(clock.hours<2){
            countdownString=clock.hours + ' hour, '+clock.minutes+' minutes';
        }else{
            countdownString= clock.hours + ' hours';
        }
    }else if(clock.minutes>0){
        countdownString=clock.minutes+' minutes';
    }else if(clock.seconds>0){
        countdownString= clock.seconds + ' seconds '
    }
    console.log(clock.hours>0, 'hours');
    return ` ${ countdownString } more`
}
/**
 * update countdown status for non elapsed countdowns
 */
async function updateCountdownItems() {
    let activeCountItems = document.querySelectorAll('.countdown-counting')
    const clock = new Clock();
    if(activeCountItems.length){
        await activeCountItems.forEach((element, _, countItems) => {
            let date =new Date(element.getAttribute('data-date'));
            clock.setEndDate(date);
            clock.countDown();
            if(clock.getDistance()>0){
                setInnerHtmlForNotNull(element, getCountdownString(clock))
            }else{
                console.log('elapsing');
                element.classList.remove('countdown-counting')
                setInnerHtmlForNotNull(element, 'Elapsed')
            }
            
            // countItemExists =(countItems.length<2 && clock.getDistance()<0)?false:countItemExists
        });
    }else{
        countItemExists= false;
    }
}
/**
 * display countdowns and start updating display for countdowns in progress
 */
function displayAndStartcount(){
    displayCountdowns().then(() => {
        // console.log('trigerred', countItemExists);
        if (countItemExists) {
            let interval =setInterval(()=>countItemExists?updateCountdownItems():clearInterval(interval), 1000)
        }
    }).catch((err) => {
        console.log(err);
        errorHandler('Unable to display your countdowns');
    });
}

function updateClockAndText(date, text, animation = true) {
    let clock = new Clock(new Date(date));
    setInnerHtmlForNotNull(countdownTextDisplay, text);
    stopClock();
    waitForAnimation(clock, { dayNumber, hourNumber, minNumber, secNumber }, 500)
}

function removeClockAndText() {
    stopClock();
    setInnerHtmlForNotNull(countdownTextDisplay, '')
    if (countdownClock) {
        // todo: set the display to none instead
        countdownClock.style.display = ''
    }
}

const triggerContextMenu = (element) => {
    if (element.querySelector(".menu").style.display == "block") {
        hideContextMenus();
    }
    else {
        hideContextMenus();//close all context menus before displaying the clicked one
        element.querySelector(".menu").style.display = "block";
        switchContextIconUp(element);
        // console.log("context-menu: show");
    }
}
function switchContextIconUp(element) {
    element = element.querySelector('.fa-chevron-circle-down')
    if (element) {
        element.classList.replace('fa-chevron-circle-down', 'fa-chevron-circle-up');
    }
}

function switchContextIconDown(element) {
    if (element)
        element.classList.replace('fa-chevron-circle-up', 'fa-chevron-circle-down');
}
function hideContextMenus(event) {
    //if function is not triggered by event listener, event is empty
    if ((!(event != null)) || !(event.target.className == 'countdown-list-options' || event.target.tagName == 'I')) {
        document.querySelectorAll('.menu').forEach(contextMenu => contextMenu.style.display = "none");
        document.querySelectorAll('.fa-chevron-circle-up').forEach(element => switchContextIconDown(element));
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
                setCountDownList(arrayOfCountdowns);
                setInnerHtmlForNotNull(countdownList,populateList(arrayOfCountdowns));
                // console.log('delete clicked', targetElement.parentElement, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')]);
            } else if (targetElement.className.search('edit') > -1) {
                let editItem = arrayOfCountdowns.find((countdown, index) => countdown.dateModified == count_modified);
                // todo: custom error messages for components on fail
                try {
                    if (editItem) {
                        displayFormPopUp(editItem.text, /\d+-\d+-\d+T\d+:\d+/.exec(editItem.date), count_modified);
                        handleUpdate();
                    } else {
                        // something went wrong with the editing
                        errorHandler('Unable to edit countdown');
                        // console.log(editItem);
                    }
                } catch (err) {
                    console.log(err, 'Error in form display');
                    errorHandler('Error in form display');
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
        arrayOfCountdowns = arrayOfCountdowns ? arrayOfCountdowns : JSON.parse(localStorage.getItem('countdown'));
        if (arrayOfCountdowns !== null) { //countdowns already exist


            let pos = arrayOfCountdowns.findIndex((value) =>
                value.dateModified == modifiedTime
            );
            if (pos > -1) {
                // todo: combine this file and form update.js
                console.log(arrayOfCountdowns[pos]);
                arrayOfCountdowns[pos].text = countItem.text;
                arrayOfCountdowns[pos].date = countItem.date;
                arrayOfCountdowns[pos].dateModified = countItem.dateModified;
                setCountDownList(arrayOfCountdowns);
                displayAndStartcount();
                closeFormPopUp();
                removeClockAndText();
            } else {
                console.log("Unable to update Item in displayCountdown, HandleUpdate");
                errorHandler('Unable to update Item');
            }

        }
    })
}

function setCountDownList(jsArray) {
    localStorage.setItem('countdown', JSON.stringify(jsArray))
}

function displayFormPopUp(text, dateTime, modifiedTime) {
    // todo: Track items without using modifiedTime
    if (text && dateTime && modifiedTime) {
        const updateFormHtml = `<section class="pop-up-container">
    <form action="/html/countdown-list.html" method="get" id='customUpDateForm' class="pop-up-form">
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

function addListEventHandlers() {
    addListEventListener();
    // add context menu event listener
    document.querySelector('.container').addEventListener("click", hideContextMenus);
}


try {
    // stop the clock from app.js
    stopClock()
    // todo: update time without redisplaying list of countdowns
    displayAndStartcount();

    addListEventHandlers();
} catch (err) {
    console.log(err, 'err in display countdown initialisation');
    errorHandler("Unable to fetch your countdowns");
}
