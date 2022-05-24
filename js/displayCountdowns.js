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

        const sortUI = async () => {
            if (!document.querySelector(".list-settings")) {
                const listContainer = document.querySelector(".list-container");
                let sortHtml = `
                <section class="list-settings">
                    <div class="sort">
                        <div class="sort-options">
                            <div class="sort-opt modified">Date modified</div>
                            <div class="sort-opt due">Due date</div>
                        </div>
                        <div class="sort-title"><i class="fas fas fa-sort-amount-up"></i> Sort By </div>
                    </div>
                </section>`;
                listContainer.insertAdjacentHTML("afterbegin", sortHtml);
            }
            // addSortEventListeners();
        }


        sortUI();

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
    sortArrayOnSelection();
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
    let repeat = false
    if (countdown.hasOwnProperty('repeat') && countdown.repeat) {
        // console.log(arrayOfCountdowns);
        updateRepeatCountdown(countdown.date, index);
        repeat = true
    }
    const countdownDate =new Date(countdown.date)
    let listItemClock = new Clock(countdownDate);
    let timeDifference = listItemClock.getDistance();
    let countdownStatus = "";
    let countdownStatusTI =`<span style="color:#03bf42;"><i class="fas fa-hourglass-start"></i> active</span>`;
    let elapsed = false;
    if (timeDifference > 0) {
        countItemExists = true;
        countdownStatus = getCountdownString(listItemClock);
    } else {
        // countdown elapsed
        elapsed = 'true';
        countdownStatus = 'Due: '+countdownDate.getDate() + ' ' + countdownDate.toLocaleString('default', { month: 'long' }) + ', ' + countdownDate.getFullYear();
        countdownStatusTI = `<span style="color:crimson;"><i class="fas fa-hourglass-end"></i> elapsed</span>`;
    }
        // console.log(countdown, 'repeat true', arrayOfCountdowns[index]);

    let countdownListItem = `
    <div class="countdown-list-item" data-index="${index}" data-id="${countdown.dateModified}">
        <div class="countdown-list-text"> ${countdown.text} </div>
        <div class="countdown-list-options"><i class="fas fa-chevron-circle-down fa-lg"></i>
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
        <div class="countdown-list-date"> 
            <div data-date="${countdown.date}" 
                data-id="${countdown.dateModified}" 
                data-repeat="${repeat}" 
                class="${(!elapsed) ? 'countdown-counting' : ''}" > 
                ${countdownStatus}
            </div>
            <div class="status-text">${countdownStatusTI}</div>
        </div>    
    </div>`;
    return countdownListItem;

}
/**
 * 
 * @param {String} date date preferrably in ISO string format
 * @param {Number} index index of the repeat countdown element 
 */
function updateRepeatCountdown(date, index){
    if (new Date(date) - new Date() < 0) {
        arrayOfCountdowns[index].date = new Anniversary(new Date(date)).endDate.toISOString();
        // arrayOfCountdowns[index].dateModified = new Date().toISOString();
        setCountDownList(arrayOfCountdowns);
        console.log('Updating values of old cds', arrayOfCountdowns[index]);

    };

}
/**
 * Get string with status of countdowns
 * @param {Clock} clock clock object for particular countdown
 * @returns {String} string of countdown status
 */
function getCountdownString(clock) {
    let countdownString ='';
    if(clock.days>0){
            countdownString=clock.days + ' days, '+ ((clock.hours>0)?(clock.hours+' hours'):(clock.minutes+' minutes'));
    }else if(clock.hours>0){
            countdownString=clock.hours + ' hours, '+((clock.minutes>0)?(clock.minutes+' minutes'):(clock.seconds+' seconds'));
    }else if(clock.minutes>0){
            countdownString=clock.minutes + ' minutes, '+clock.seconds+' seconds';
    }else if(clock.seconds>=0){
        countdownString= clock.seconds + ' seconds '
    }
    return ` ${countdownString} more`
}
/**
 * update countdown status for non elapsed countdowns
 */
async function updateCountdownItems() {
    let activeCountItems = document.querySelectorAll('.countdown-counting')
    const clock = new Clock();
    if (activeCountItems.length) {
        await activeCountItems.forEach((element, _, countItems) => {
            let date = new Date(element.getAttribute('data-date'));
            clock.setEndDate(date);
            clock.countDown();
            if (clock.getDistance() > 0) {
                setInnerHtmlForNotNull(element, getCountdownString(clock))
            }else if(element.getAttribute('data-repeat')=='true'){
                console.log('updating repeat', element);
                // update repeat item set enddate to next year
                let index = arrayOfCountdowns.findIndex((countdown) => countdown.dateModified == element.getAttribute('data-id'));
                let date=element.getAttribute('data-date');
                if(index && date){
                updateRepeatCountdown(date, index);
                displayAndStartcount();
            }
        //         arrayOfCountdowns[index].date = new Anniversary(new Date(countdown.date)).endDate.toISOString();
        // arrayOfCountdowns[index].dateModified = new Date().toISOString();

            } else {
                console.log('elapsing');
                element.classList.remove('countdown-counting')
                setInnerHtmlForNotNull(element, 'Elapsed')
            }

            // countItemExists =(countItems.length<2 && clock.getDistance()<0)?false:countItemExists
        });
    } else {
        countItemExists = false;
    }
}
/**
 * display countdowns and start updating display for countdowns in progress
 */
function displayAndStartcount() {
    displayCountdowns().then(() => {
        if (countItemExists) {
            let interval = setInterval(() => countItemExists ? updateCountdownItems() : clearInterval(interval), 1000)
        }
    }).catch((err) => {
        console.log(err);
        errorHandler('Unable to display your countdowns');
    });
}

function sortArrayOnSelection() {
    let sortType = localStorage.getItem('sort');
    if (sortType == "due") {
        // sort by due date if present
        arrayOfCountdowns.sort((countItem1, countItem2) => new Date(countItem2.date).getTime() - new Date(countItem1.date).getTime())
    } else {
        arrayOfCountdowns.sort((countItem1, countItem2) => new Date(countItem1.dateModified).getTime() - new Date(countItem2.dateModified).getTime())
    }
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
    if (element.querySelector(".menu")) {
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
    if ((!(event != null)) || !(event.target.className == 'countdown-list-options' || event.target.tagName == 'I' || (event.target.className.search('sort-title') > -1))) {
        document.querySelectorAll('.menu').forEach(contextMenu => contextMenu.style.display = "none");
        document.querySelectorAll('.fa-chevron-circle-up').forEach(element => switchContextIconDown(element));
        closeSortMenu();
        // }
    }


}
function addListEventListener() {
    document.querySelector('.countdown-list').addEventListener('click', event => {
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
                setInnerHtmlForNotNull(countdownList, populateList(arrayOfCountdowns));
                // console.log('delete clicked', targetElement.parentElement, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')]);
            } else if (targetElement.className.search('edit') > -1) {
                let editItem = arrayOfCountdowns.find((countdown, index) => countdown.dateModified == count_modified);
                // todo: custom error messages for components on fail
                try {
                    if (editItem) {
                        console.log('Edit clicked', editItem);
                        repeat = false;
                        if (editItem.hasOwnProperty('repeat')) {
                            repeat = editItem.repeat;
                        }
                        displayFormPopUp(editItem.text, /\d+-\d+-\d+T\d+:\d+/.exec(editItem.date), count_modified, repeat);
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

const closeSortMenu = () => {
    const sortOpts = document.querySelector(".sort-options");
    if (sortOpts.style.display == "block") {
        sortOpts.style.display = "none";
    }
}

const addSortEventListeners = () => {
    const sortOpts = document.querySelector(".sort-options");
    const sortTitle = document.querySelector(".sort-title");
    sortTitle.addEventListener("click", () => {
        if (sortOpts.style.display == "block") {
            sortOpts.style.display = "none";
        }
        else {
            sortOpts.style.display = "block";
        }
    });
    // sort options menu events
    sortOpts.addEventListener("click", (event) => {
        if (event.target.className.search('due') > -1) {
            localStorage.setItem('sort', 'due')
        } else if (event.target.className.search('modified') > -1) {
            localStorage.setItem('sort', 'modified')
            // console.log('modified clicked', localStorage.getItem('sort'));
            // displayCountdowns();
        }
        // close sortOptions menu on selection and refresh list
        closeSortMenu();
        displayCountdowns();
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
        let userDate = document.getElementById("dateInput").value;
        let repeatCheck = document.getElementById("repeat-cb");
        // if (!userText) {
        //     userText = userTextField.placeholder;
        //     countNumber++;
        //     localStorage.setItem('countNumber', countNumber)
        // }

        userDate = new Date(userDate);
        let countItem = { text: userText, date: userDate, dateModified: new Date() };
        if (repeatCheck) {
            countItem.repeat = repeatCheck.checked;
        }

        updateLocalItem(countItem, modifiedTime);
        displayCountdowns();
        closeFormPopUp();
        removeClockAndText();
        arrayOfCountdowns = arrayOfCountdowns ? arrayOfCountdowns : JSON.parse(localStorage.getItem('countdown'));
    })
}

function updateLocalItem(countItem, modifiedTime) {
    if (arrayOfCountdowns !== null) { //countdowns already exist


        let pos = arrayOfCountdowns.findIndex((value) =>
            value.dateModified == modifiedTime
        );
        if (pos > -1) {
            console.log(arrayOfCountdowns[pos]);
            arrayOfCountdowns[pos].text = countItem.text;
            arrayOfCountdowns[pos].date = countItem.date;
            arrayOfCountdowns[pos].dateModified = countItem.dateModified;
            arrayOfCountdowns[pos].repeat = countItem.repeat;
            setCountDownList(arrayOfCountdowns);
        } else {
            console.log("Unable to find Item to update in displayCountdown array of Countdowns, HandleUpdate", pos);
            errorHandler('Unable to update Item');
        }

    }

}
function setCountDownList(jsArray) {
    localStorage.setItem('countdown', JSON.stringify(jsArray))
}

function displayFormPopUp(text, dateTime, modifiedTime, repeat) {
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
    addSortEventListeners();

    // add context menu event listener
    document.querySelector('.container').addEventListener("click", hideContextMenus);
}

async function displayAndAddListeners(){
    await displayAndStartcount()
    addListEventHandlers();
}
try {
    displayAndAddListeners();
} catch (err) {
    console.log(err, 'err in display countdown initialisation');
    errorHandler("Unable to fetch your countdowns");
}
