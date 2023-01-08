import { fireElapsedEvent } from "./events.js";
import { setInnerHtmlForNotNull, addZeros } from "./functions.js";

/**
 * 
 * @param {Clock} clock 
 * @param {{dayNumber: HTMLElement, hourNumber: HTMLElement, minNumber: HTMLElement, secNumber: HTMLElement}}domElements  should contain elements for day, hour, minutes, second
 * @param {Number} [duration=800] specifies how long the animation lasts in milliseconds
 */
 export async function waitForAnimationUpdate(clock, domElements, duration, interval ) {
    await stepIncreaseAndStart(clock , domElements, duration );
    // todo:fix this undefined function,delete
    // return startClockAndReset(clock , domElements, interval);
}

/**
 * 
 * @param {Clock} clock 
 * @param {{dayNumber: HTMLElement, hourNumber: HTMLElement, minNumber: HTMLElement, secNumber: HTMLElement}}domElements  should contain elements for day, hour, minutes, second
 * @param {Number} [duration=800] specifies how long the animation lasts in milliseconds
 */
export async function animateAndStartClock(clock, domElements, duration) {
    await stepIncreaseAndStart(clock, domElements, duration || animatedCountDuration)
    startClock(clock, domElements);
}

export function startClock(clock, domElements) {
    let intervalID = setInterval(() => { 
        updateDisplay(clock, domElements);
        // startTime(clock, domElements,);
     }, 500);
    return intervalID;
}
/**
 * 
 * @param {HTMLElement} clockElement 
 * @param {Object} domElements 
 *  @param {HTMLElement} domElements.dayNumber
 *  @param {HTMLElement} domElements.hourNumber
 *  @param {HTMLElement} domElements.minNumber
 *  @param {HTMLElement} domElements.secNumber
 * @param {Number} [speed = 50 ] - Speed of the animation in ms
 * @param {Number} [start_num =0] Start number at animation beginning
 */
export async function stepIncreaseAndStart(clockElement, domElements, speed = 50, start_num = 0) {
    animateValue(domElements.dayNumber, start_num, clockElement.days, speed);
    animateValue(domElements.hourNumber, start_num, clockElement.hours, speed);
    animateValue(domElements.minNumber, start_num, clockElement.minutes, speed);
    animateValue(domElements.secNumber, start_num, clockElement.seconds, speed);

}

/**
 * Updates the html dom nodes with the clock values, days, hours, minutes, seconds
 * @param {Clock} counter 
 * @param {{dayNumber: HTMLElement, hourNumber: HTMLElement, minNumber: HTMLElement, secNumber: HTMLElement}}domElements  should contain elements for day, hour, minutes, second 
 */
export function updateDisplay(counter,{ dayNumber, hourNumber, minNumber, secNumber }) {
    if(counter.getDistance()<0){
        //emit elapsed event
        //todo: create a listener for homepage, update elapsed event with countdown
        fireElapsedEvent()
    }
    counter.countDown();
    let d = counter.days
    let h = counter.hours
    let m = counter.minutes
    let s = counter.seconds
    d = addZeros(d);
    h = addZeros(h);
    m = addZeros(m);
    s = addZeros(s);
    setInnerHtmlForNotNull(dayNumber, `${d}`);
    setInnerHtmlForNotNull(hourNumber, `${h}`);
    setInnerHtmlForNotNull(minNumber, `${m}`);
    setInnerHtmlForNotNull(secNumber, `${s}`);
}

/**
 * Determines the response when a countdown elapses
 * @param {Event} e Ideally contains countdown object details at property detail with {text, date, dateModified, repeat}
 */
 export const countElapsedListener_home =(e)=>{
    console.log('Elapsed event caught',e)
    const countdown = e.detail;
    //set text to display
    let message=(countdown.text)?countdown.text: 'countdown'
    //show notification on page
    informUser(`Elapsed: ${message})}`)
    //show notification using device notifications (if allowed)
    showNotification(`Elapsed: ${message}`)
    //play audio
    //todo: get tone instead of song
    let song = new Audio("Efatawo.mp3");
    console.log(song);
    song.play();
}

/**
 * for the animated Countdown 
 * @param {HTMLElement} domElement 
 * @param {Number} start initial value
 * @param {Number} end final value of count
 * @param {Number} duration value in ms on how long count should last
 */
export function animateValue(domElement, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setInnerHtmlForNotNull(domElement, addZeros(Math.floor(progress * (end - start) + start)))
        if (progress < 1) {
            window.requestAnimationFrame(step);
            // animationComplete = false;
        }
    };
    window.requestAnimationFrame(step);
}

export const getYearsAndRemainder = (newDate, oldDate) => {
    let remainder = 0;
    // get initial years between dates
    let years = newDate.getFullYear() - oldDate.getFullYear();
    // check to make sure the oldDate is least recent
    if (years < 0) {
        console.warn('new date is lesser than old date in year difference')
        years = 0;
    } else {
        // set the old date and the new date to same year
        oldDate.setFullYear(newDate.getFullYear());
        if (oldDate - newDate > 0) {
            // check if remaining time/months of old date is less than new date
            // the final year for the dates is  not up to a year
            if (years != 0) {//skip year manipulation for dates in the same year
                console.log('Subtracting year');
                //set the old year to the previous year 
                // to calculate the time difference between last year and now
                years--;
                oldDate.setFullYear(oldDate.getFullYear() - 1);
            }
        }
    }

    remainder = newDate - oldDate;
    if (remainder < 0) { //check for negative dates due to wrong inputs
        console.warn('old date is greater than new Date');
        console.log('new date', newDate, 'old date', oldDate);
    }

    return { years, remainder };
}