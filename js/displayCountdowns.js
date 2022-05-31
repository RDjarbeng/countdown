import { displayAndAddListeners } from "./listFunctions.js";
import { errorHandler } from "./error.js";
// Dom elements
// begin displaycountdown.js

try {
    displayAndAddListeners();
} catch (err) {
    console.log(err, 'err in display countdown initialisation');
    errorHandler("Unable to fetch your countdowns");
}

