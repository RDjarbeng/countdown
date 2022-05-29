import { Clock } from "./clock.js";
import { setInnerHtmlForNotNull } from "./functions.js";
import { getCountdownString, populateList, getCountItemExists, setCountItemExists, setCountItemStatus, fetchArrayOfCountdowns,   LISTPAGE_DOM_IDS, displayCountdowns, addEventHandlers, displayAndStartcount } from "./listFunctions.js";
import { errorHandler } from "./error.js";
// Dom elements
// begin displaycountdown.js
let arrayOfCountdowns = fetchArrayOfCountdowns();









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

