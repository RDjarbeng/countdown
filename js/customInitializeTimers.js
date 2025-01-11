import { Clock, Anniversary } from "./clock";
import { fireElapsedEvent } from "./events";
import { countHasElapsedListener } from "./listpage/listEventListener";


// Fetch the stored countdown object
const countdownObject = JSON.parse(localStorage.getItem("mainClock"));

if (countdownObject){
addEventListener("elapsed", countHasElapsedListener);
const isRepeat = countdownObject.repeat;

// Create the appropriate clock instance
let clock = isRepeat
    ? new Anniversary(new Date(countdownObject.date))
    : new Clock(new Date(countdownObject.date));

// Start the countdown
function updateClock() {
    // Check if time has elapsed before countdown
    if (clock.getDistance() <= 0) {
        console.log("Time elapsed, handling completion...");

        // Fire the event for the current completion
        fireElapsedEvent(countdownObject.text);

        if (isRepeat) {
            // For Anniversary clock, reset to next occurrence
            clock.resetMethod();
            console.log(`Reset to next occurrence: ${clock.endDate}`);

            // Only continue if we successfully reset to a future date
            if (clock.getDistance() > 0) {
                setTimeout(updateClock, 1000);
            }
        }
        return;
    }

    // Normal countdown flow
    clock.countDown();
    console.log(`Time remaining: ${clock.getDistance()} ms`);

    // Schedule next update
    setTimeout(updateClock, 1000);
}



// Initial check and start
if (clock.getDistance() <= 0 && isRepeat) {
    // If we're already past the date and it's repeating,
    // reset to next occurrence before starting
    clock.resetMethod();
}

if(clock.getDistance()>=0)
updateClock();
}