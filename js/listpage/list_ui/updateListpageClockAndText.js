import { removeElementSetDisplayNone, setInnerHtmlForNotNull, stopClock } from "../../functions";
import { countdownClock, countdownTextDisplay } from "../listFunctions";



export function removeClockAndText() {
    stopClock();
    setInnerHtmlForNotNull(countdownTextDisplay, '');
    if (countdownClock) {
        removeElementSetDisplayNone(countdownClock);
    }
}

/**
 * Display the mini clock on the countdownlist page
 */
 export const showClockRow = () => {
    //  if ([null, "", undefined].includes(document.querySelector(".clock-row").style.display)) {
    const clockRow = document.querySelector(".clock-row");
    if (clockRow) {
        clockRow.style.display = "flex";
        clockRow.style.animationPlayState = "running";
    }
    // }
};