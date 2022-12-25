import { removeElementSetDisplayNone, setInnerHtmlForNotNull, stopClock } from "./functions.js";
import { countdownTextDisplay, countdownClock } from "./listFunctions";



export function removeClockAndText() {
    stopClock();
    setInnerHtmlForNotNull(countdownTextDisplay, '');
    if (countdownClock) {
        removeElementSetDisplayNone(countdownClock);
    }
}
