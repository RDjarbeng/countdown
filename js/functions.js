// for a single source for all the scattered functions
//  due to Uc browser fix
/**
 * 
 * @param {Array} arrayOfJSONCountdowns 
 */
export function setCountDownList(arrayOfJSONCountdowns){
    localStorage.setItem('countdown', JSON.stringify(arrayOfJSONCountdowns))   
}
/**
 * Checks if a DOM element variable is null before setting innerHTML
 * @param {HTMLElement} element 
 * @param {String} value 
 */
 export function setInnerHtmlForNotNull(element, value){
    if(element)//check for null
        element.innerHTML = value;
}

export function closeFormPopUp() {
    document.getElementsByClassName("pop-up-container")[0].remove();
    document.body.style.position = "";
}

/**
 * add zero in front of numbers < 10
 * @param {Number} num 
 * @returns {String} number with 0 at the front
 */
export function addZeros(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

export function addWhatappEventHandler() {
    let whatsappIcon = document.getElementById('sendWhatsappButton');
    if (whatsappIcon) {
        whatsappIcon.addEventListener('click', exportToWhatsapp);
    }

}


export function exportToWhatsapp() {
    let dayNum = dayCount.innerText;
    window.open(`whatsapp://send?text= Day ${dayNum || 'rcountdown'}/365`);
}



/**
 * Stop the clock with global var intervalID
 */
 export function stopClock(interval) {
    clearTimeout(interval);
    // customClockMovement = false;
}


/* SECTION: DISPLAY COUNTDOWNS */

/**
 * Update a single countdown item in the array of countdowns
 *  with text, date, dateModified and repeat
 * @param {Array} arrayOfCountdowns 
 * @param {Object} countItem 
 * @param {String} id Identified to search array by
 */
export function updateLocalItem(arrayOfCountdowns, countItem, id) {
    if (arrayOfCountdowns !== null) { //countdowns already exist


        let pos = arrayOfCountdowns.findIndex((value) =>
            value.dateModified == id
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



/**
 * Sort countdown array by date modified or due date
 * @param {Array.<{text: String, date: String, dateModified: String, repeat: String}>} arrayOfCountdowns | contains array of countdown objects
 */
export function sortArrayOnSelection(arrayOfCountdowns) {
    let sortType = localStorage.getItem('sort');
    if (sortType == "due") {
        // sort by due date if present
        arrayOfCountdowns.sort((countItem1, countItem2) => new Date(countItem2.date).getTime() - new Date(countItem1.date).getTime())
    } else {
        arrayOfCountdowns.sort((countItem1, countItem2) => new Date(countItem1.dateModified).getTime() - new Date(countItem2.dateModified).getTime())
    }
}

