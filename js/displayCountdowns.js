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
        
        const  sortUI = async ()=>  {   
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
 * 
 * @param {Array} arrayOfCountdowns 
 * @returns {String} listItems
 */
function populateList(arrayOfCountdowns) {
    // console.log(arrayOfCountdowns);
    let listItems = '';
    sortArrayOnSelection();
    arrayOfCountdowns.forEach((countdown, index) => {
        if(countdown.hasOwnProperty('repeat') && countdown.repeat){
            // console.log(arrayOfCountdowns);
            // countdown elapsed
            if(new Date(countdown.date) -new Date()<0){
                arrayOfCountdowns[index].date =new Anniversary(new Date(countdown.date)).endDate.toISOString();
                arrayOfCountdowns[index].dateModified =new Date().toISOString();
                setCountDownList(arrayOfCountdowns);
                console.log('Updating values of old cds');

            };
            // console.log(countdown, 'repeat true', arrayOfCountdowns[index]);
        }
        let date = new Date(countdown.date);
        listItems += `
        <div class="countdown-list-item" data-index="${index}" data-id="${countdown.dateModified}">
            <div class="countdown-list-text"> ${countdown.text} </div>
            <div class="countdown-list-options" ><i class="fas fa-chevron-circle-down fa-lg"></i>
            <div class="menu" data-index="${index}" data-id="${countdown.dateModified}" style="display:none">
            <div class="menu-opts edit">
                <i class="fas fa-edit fa-fw"></i> Edit
            </div>
            <div class="menu-opts del">
                <i class="fas fa-trash-alt fa-fw"></i> Delete
            </div>
            <div class="menu-opts main">
                <i class="fas fa-clock fa-fw"></i> Set as main
            </div>
            
        </div></div>
            <div class="countdown-list-date"> 
                Due: ${date.getDate() + ' ' + date.toLocaleString('default', { month: 'long' }) + ', ' + date.getFullYear()}
            </div>    
        </div>`
    });
    return listItems;
}

function sortArrayOnSelection(){
    let sortType = localStorage.getItem('sort');
    if(sortType =="due"){
        // sort by due date if present
        arrayOfCountdowns.sort((countItem1, countItem2)=> new Date(countItem2.date).getTime()-new Date(countItem1.date).getTime())
    }else{
        arrayOfCountdowns.sort((countItem1, countItem2)=> new Date(countItem1.dateModified).getTime()-new Date(countItem2.dateModified).getTime())
    }
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
    if(element.querySelector(".menu")){
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
function switchContextIconUp(element){
    element = element.querySelector('.fa-chevron-circle-down')
    if(element){
    element.classList.replace('fa-chevron-circle-down', 'fa-chevron-circle-up');
}
}

function switchContextIconDown(element){    
    if(element)
    element.classList.replace('fa-chevron-circle-up', 'fa-chevron-circle-down');
}
function hideContextMenus(event) {
    //if function is not triggered by event listener, event is empty
    if ((!(event != null))||!(event.target.className == 'countdown-list-options' || event.target.tagName == 'I'|| (event.target.className.search('sort-title') >-1))) {
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
                test = true;
                setCountDownList(arrayOfCountdowns);
                countdownList.innerHTML = populateList(arrayOfCountdowns)
                // console.log('delete clicked', targetElement.parentElement, arrayOfCountdowns[targetElement.parentElement.getAttribute('data-index')]);
            } else if (targetElement.className.search('edit') > -1) {
                let editItem = arrayOfCountdowns.find((countdown, index) => countdown.dateModified == count_modified);
                // todo: custom error messages for components on fail
                try {
                    if(editItem){
                    console.log('Edit clicked', editItem);
                    repeat =false;
                    if(editItem.hasOwnProperty('repeat')){
                        repeat = editItem.repeat;
                    }
                    displayFormPopUp(editItem.text, /\d+-\d+-\d+T\d+:\d+/.exec(editItem.date), count_modified, repeat );
                    handleUpdate();
                }else{
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

const closeSortMenu=()=>{
    const sortOpts = document.querySelector(".sort-options");
    if (sortOpts.style.display == "block") {
        sortOpts.style.display = "none";
    }
}

const addSortEventListeners = ()=>{
    const sortOpts = document.querySelector(".sort-options");
    const sortTitle = document.querySelector(".sort-title");
        sortTitle.addEventListener("click", ()=> {
            if (sortOpts.style.display == "block") {
                sortOpts.style.display = "none";
            }
            else{
                sortOpts.style.display = "block";
            }
        });
        // sort options menu events
        sortOpts.addEventListener("click", (event)=> {
            if(event.target.className.search('due') > -1){
                localStorage.setItem('sort', 'due') 
                // console.log('due clicked', localStorage.getItem('sort'));
                // displayCountdowns();
                  
            }else if(event.target.className.search('modified') > -1){
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
        if(repeatCheck){
            countItem.repeat = repeatCheck.checked;
        }
        
        updateLocalItem(countItem, modifiedTime);
        displayCountdowns();
        closeFormPopUp();
        removeClockAndText();
        arrayOfCountdowns = arrayOfCountdowns? arrayOfCountdowns: JSON.parse(localStorage.getItem('countdown'));
    })
}

function updateLocalItem(countItem, modifiedTime){
    if (arrayOfCountdowns !== null) { //countdowns already exist
            
            
        let pos = arrayOfCountdowns.findIndex((value) =>
            value.dateModified == modifiedTime
        );
        if(pos>-1){
            console.log(arrayOfCountdowns[pos]);
            arrayOfCountdowns[pos].text = countItem.text;
            arrayOfCountdowns[pos].date = countItem.date;
            arrayOfCountdowns[pos].dateModified = countItem.dateModified;
            arrayOfCountdowns[pos].repeat = countItem.repeat;
            setCountDownList(arrayOfCountdowns);
        }else{
            console.log("Unable to find Item to update in displayCountdown array of Countdowns, HandleUpdate", pos);
            errorHandler('Unable to update Item');
        }

    }

}
function setCountDownList(jsArray){
    localStorage.setItem('countdown', JSON.stringify(jsArray))   
}

function displayFormPopUp(text, dateTime, modifiedTime, repeat) {
    // todo: Track items without using modifiedTime
    console.log(text, dateTime, modifiedTime, 'form');
    if(text && dateTime&& modifiedTime){
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
                <input type="checkbox" id="repeat-cb" ${repeat?'checked':''}> Repeat 
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
    await displayCountdowns().catch((err)=>{
        console.log(err);
        errorHandler('Unable to fetch your countdowns')
    });
    addListEventHandlers();
}
try{
    displayAndAddListeners();
}catch (err) {
    console.log(err, 'err in display countdown initialisation');
    errorHandler("Unable to fetch your countdowns");
}
