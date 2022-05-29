import { Clock } from "./clock.js";
import { setInnerHtmlForNotNull } from "./functions.js";
import { updateLocalItem, getCountdownString, populateList, getCountItemExists, setCountItemExists, setCountItemStatus, fetchArrayOfCountdowns,   LISTPAGE_DOM_IDS, displayCountdowns, addEventHandlers } from "./listFunctions.js";
import { errorHandler } from "./error.js";
// Dom elements
// begin displaycountdown.js
let arrayOfCountdowns = fetchArrayOfCountdowns();





/**
 * update countdown status for non elapsed countdowns
 */
async function updateCountdownItems() {
    let activeCountItems = document.querySelectorAll('.countdown-counting')
    const clock = new Clock();
    if (activeCountItems.length) {
        await activeCountItems.forEach((element, _, countItems) => {
            clock.setEndDate(new Date(element.getAttribute('data-date')));
            clock.countDown();
            if (clock.getDistance() > 0) {
                setInnerHtmlForNotNull(element, getCountdownString(clock))
            } else if (element.getAttribute('data-repeat') == 'true') {
                console.log('updating repeat', element);
                // update repeat item set enddate to next year
                let index = arrayOfCountdowns.findIndex((countdown) => countdown.dateModified == element.getAttribute('data-id'));
                let date = element.getAttribute('data-date');
                if (index && date) {
                    updateRepeatCountdown(arrayOfCountdowns, date, index);
                    displayAndStartcount();
                }
                //         arrayOfCountdowns[index].date = new Anniversary(new Date(countdown.date)).endDate.toISOString();
                // arrayOfCountdowns[index].dateModified = new Date().toISOString();

            } else {
                console.log('elapsing', arrayOfCountdowns.find((countdown) => countdown.dateModified == element.getAttribute('data-id')));
                element.classList.remove('countdown-counting')
                setInnerHtmlForNotNull(element, 'Elapsed')
            }

        });
    } else {
        setCountItemExists(false)
    }
}
/**
 * display countdowns and start updating display for countdowns in progress
 */
function displayAndStartcount() {
    displayCountdowns().then(() => {
        if (getCountItemExists()) {
            let interval = setInterval(() => getCountItemExists() ? updateCountdownItems() : clearInterval(interval), 1000)
        }
    }).catch((err) => {
        console.log(err);
        errorHandler('Unable to display your countdowns');
    });
}



export async function displayAndAddListeners() {
    await displayAndStartcount()
    // sortUI();
    addEventHandlers();
}
try {
    displayAndAddListeners();
} catch (err) {
    console.log(err, 'err in display countdown initialisation');
    errorHandler("Unable to fetch your countdowns");
}

