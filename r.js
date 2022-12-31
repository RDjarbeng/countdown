const setHTML = (elem, value) => elem.innerHTML = value;
const addZeros = (num) => (num < 10) ? ("0" + num) : num;

export class Clock {

    constructor(endDate) {
        this.setEndDate(endDate)
        this.countDown();
    }

    setEndDate(endDate) {
        // expecting a string of format yyyy-mm-dd
        let datePattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
        let regex = new RegExp(datePattern);
        if (regex.test(endDate)) {
            this.endDate = new Date(endDate);
        }
        else {
            this.endDate = new Date();
        }
    }

    //   Calls the function to populate/refresh the time values in the clock, used for reset
    countDown() {
        if (this.getDistance() >= 0) {
            this.calculateTimeValues();
        } else {
            this.reset();
        }
    }
    //  Returns the time in seconds between end date and current time
    getDistance() {
        return this.endDate.getTime() - new Date().getTime();
    }

    calculateTimeValues() {
        let distance = this.getDistance();
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }

    reset() {
        this.days = this.hours = this.minutes = this.seconds = 0;
    }

}

function startClock(clock, clockDOM) {
    let intervalID = setInterval(() => {updateDisplay(clock, clockDOM);}, 500);
    return intervalID;
}

export function waitForAnimation(clock, domElements, duration) {
    stepIncreaseAndStart(clock, domElements, duration);
    startClock(clock, domElements);
}

/**
 * 
 * @param {Clock} clock 
 * @param {Object} domElements 
 *  @param {HTMLElement} domElements.dayNumber
 *  @param {HTMLElement} domElements.hourNumber
 *  @param {HTMLElement} domElements.minNumber
 *  @param {HTMLElement} domElements.secNumber
 * @param {Number} [speed = 50 ] - Speed of the animation in ms
 * @param {Number} [start_num =0] Start number at animation beginning
 */
async function stepIncreaseAndStart(clock, domElements, speed = 50, start_num = 0) {
    animateValue(domElements.day, start_num, clock.days, speed);
    animateValue(domElements.hour, start_num, clock.hours, speed);
    animateValue(domElements.minute, start_num, clock.minutes, speed);
    animateValue(domElements.second, start_num, clock.seconds, speed);
}

function updateDisplay(clock, clockDOM) {
    clock.countDown();
    let d = addZeros(clock.days);
    let h = addZeros(clock.hours);
    let m = addZeros(clock.minutes);
    let s = addZeros(clock.seconds);
    setHTML(clockDOM.day, `${d}`);
    setHTML(clockDOM.hour, `${h}`);
    setHTML(clockDOM.minute, `${m}`);
    setHTML(clockDOM.second, `${s}`);
}

/** 
* for the animated Countdown 
* @param {HTMLElement} domElement 
* @param {Number} start initial value
* @param {Number} end final value of count
* @param {Number} duration value in ms on how long count should last
*/
function animateValue(domElement, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setHTML(domElement, addZeros(Math.floor(progress * (end - start) + start)))
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

export async function fetchFile(link, type) {
    let data = await fetch(link);
    switch (type) {
        case "text":
            data = await data.text();
            break;
        case "json":
            data = await data.json();
            break;
        case "blob":
            data = await data.blob();
            break;
        default:
            break;
    }
    return data;
}