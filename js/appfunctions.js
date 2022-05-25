import {setInnerHtmlForNotNull, addZeros } from "./functions.js";

/**
 * 
 * @param {Clock} clock 
 * @param {Boolean} customClockMovement boolean to check if clock is already moving 
 * @param {{dayNumber: HTMLElement, hourNumber: HTMLElement, minNumber: HTMLElement, secNumber: HTMLElement}}domElements  should contain elements for day, hour, minutes, second
 * @param {Number} [duration=800] specifies how long the animation lasts in milliseconds
 */
 export async function waitForAnimation(clock, domElements, duration, customClockMovement=false ) {
    await stepIncreaseAndStart(clock || myclock, domElements, duration || animatedCountDuration, customClockMovement)
    startClock(clock || myclock, customClockMovement, domElements);
}

export function startClock(clock, customClockMovement, domElements) {
    let intervalID = setInterval(() => {  startTime(clock, customClockMovement, domElements,);  }, 500);
    return intervalID;
}


export function startTime(clock, customClockMovement, { dayNumber, hourNumber, minNumber, secNumber }) {
    // console.log(clock);
    updateDisplay(clock, dayNumber, hourNumber, minNumber, secNumber);
    // setInnerHtmlForNotNull(dayCount, dayClock.countDays());
    if (customClockMovement) {
        // updateDisplay(customClock, customDayNumber, customHourNumber, customMinNumber, customSecNumber);
    }
}

export async function stepIncreaseAndStart(clockElement, domElements, speed = 50, start_num = 0) {
    animateValue(domElements.dayNumber, start_num, clockElement.days, speed);
    animateValue(domElements.hourNumber, start_num, clockElement.hours, speed);
    animateValue(domElements.minNumber, start_num, clockElement.minutes, speed);
    animateValue(domElements.secNumber, start_num, clockElement.seconds, speed);

}

/**
 * Updates the html dom nodes with the clock values, days, hours, minutes, seconds
 * @param {Clock} counter 
 * @param {HTMLElement} dayDisplay 
 * @param {HTMLElement} hourDisplay 
 * @param {HTMLElement} minDisplay 
 * @param {HTMLElement} secDisplay 
 */
 export function updateDisplay(counter, dayDisplay, hourDisplay, minDisplay, secDisplay) {
    counter.countDown();
    let d = counter.days
    let h = counter.hours
    let m = counter.minutes
    let s = counter.seconds
    d = addZeros(d);
    h = addZeros(h);
    m = addZeros(m);
    s = addZeros(s);
    setInnerHtmlForNotNull(dayDisplay, `${d}`);
    setInnerHtmlForNotNull(hourDisplay, `${h}`);
    setInnerHtmlForNotNull(minDisplay, `${m}`);
    setInnerHtmlForNotNull(secDisplay, `${s}`);
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