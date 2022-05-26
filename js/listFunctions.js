

/* SECTION: DISPLAY COUNTDOWNS */

/**
 * 
 * @param {Array} arrayOfJSONCountdowns 
 */
 export function setCountDownList(arrayOfJSONCountdowns){
    localStorage.setItem('countdown', JSON.stringify(arrayOfJSONCountdowns))   
}
/**
 * Update a single countdown item in the array of countdowns
 *  with text, date, dateModified and repeat
 * @param {Array} arrayOfCountdowns
 * @param {Object} countItem
 * @param {String} id Identified to search array by
 */


export function updateLocalItem(arrayOfCountdowns, countItem, id) {
    if (arrayOfCountdowns !== null) { //countdowns already exist


        let pos = arrayOfCountdowns.findIndex((value) => value.dateModified == id
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
 * Returns html string with a list of countdowns
 * @param {Array.<{text: String, date: String, dateModified: String, repeat: String}>} arrayOfCountdowns | contains array of countdown objects
 * @returns {string} list of countdownitems to be appended to DOM
 */

export function populateList(arrayOfCountdowns) {
    let listItems = '';
    sortArrayOnSelection(arrayOfCountdowns);
    arrayOfCountdowns.forEach((countdown, index) => {
        listItems += addCountdownItem(countdown, index);
    });
    return listItems;
}
/**
 *
 * @param {Clock} clock
 * @returns {object} status
 * @returns {object} status.countdownStatus
 * @returns {object} status.countdownStatusTI
 */
export function setCountDownStatus(clock) {
    let timeDifference = clock.getDistance();
    let countdownStatus = "";
    let countdownStatusTI = `<span style="color:#03bf42;"><i class="fas fa-hourglass-start"></i> active</span>`;
    if (timeDifference > 0) {
        countdownStatus = getCountdownString(clock);
    } else {
        // countdown elapsed
        countdownStatus = 'Due: ' + clock.endDate.getDate() + ' ' + clock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + clock.endDate.getFullYear();
        countdownStatusTI = `<span style="color:crimson;"><i class="fas fa-hourglass-end"></i> elapsed</span>`;
    }
    return { countdownStatus, countdownStatusTI };
}
/**
 * Get string with status of countdowns
 * @param {Clock} clock clock object for particular countdown
 * @returns {String} string of countdown status
 */

export function getCountdownString(clock) {
    let countdownString = '';
    if (clock.days > 0) {
        countdownString = clock.days + ' days, ' + ((clock.hours > 0) ? (clock.hours + ' hours') : (clock.minutes + ' minutes'));
    } else if (clock.hours > 0) {
        countdownString = clock.hours + ' hours, ' + ((clock.minutes > 0) ? (clock.minutes + ' minutes') : (clock.seconds + ' seconds'));
    } else if (clock.minutes > 0) {
        countdownString = clock.minutes + ' minutes, ' + clock.seconds + ' seconds';
    } else if (clock.seconds >= 0) {
        countdownString = clock.seconds + ' seconds ';
    }
    return ` ${countdownString} more`;
}
/**
 * Sort countdown array by date modified or due date
 * @param {Array.<{text: String, date: String, dateModified: String, repeat: String}>} arrayOfCountdowns | contains array of countdown objects
 */

export function sortArrayOnSelection(arrayOfCountdowns) {
    let sortType = localStorage.getItem('sort');
    if (sortType == "due") {
        // sort by due date if present
        arrayOfCountdowns.sort((countItem1, countItem2) => new Date(countItem2.date).getTime() - new Date(countItem1.date).getTime());
    } else {
        arrayOfCountdowns.sort((countItem1, countItem2) => new Date(countItem1.dateModified).getTime() - new Date(countItem2.dateModified).getTime());
    }
}
