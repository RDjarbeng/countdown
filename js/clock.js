export class Clock {
    /**
     * Create a countdown clock with a Date object
     * @constructor
     * @param {Date} endDate 
     */
    constructor(endDate) {
        // expecting a date object
        this.setEndDate(endDate)
        this.countDown();
    }
    /**
    * change the clock's end date, call this.countdown() after
    * @param {Date} endDate 
    */
    setEndDate(endDate) {
        //set endDate to end of year
        // todo: check endDate for validity as date
        this.currentDate = new Date();
        this.endDate = endDate || new Date(`Jan 1, ${this.currentDate.getFullYear() + 1} 00:00:00`)

    }
    /**
     * Returns the time in seconds between end date and current time
     * @returns {number} n
     */
    getDistance() {
        return this.endDate.getTime() - new Date().getTime();
    }
    /**
     * Calls the function to populate/refresh the time values in the clock, used for reset
     */
    countDown = () => {
        // account for case of the countdown being reached, reset
        if (this.getDistance() >= 0) {
            // console.log('Running the count');
            // Time calculations for days, hours, minutes and seconds
            this.calculateTimeValues()
        } else {
            // clear date values
            this.resetMethod();
        }
    }
    /**
     * Defines what should happen when the countdown is reached
     */
    resetMethod() {
        this.clearCounter();
    }

    calculateTimeValues() {
        let distance = this.getDistance();
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }
    /**
     * Return the number of days, account for leap year
     * @returns {Number} days Number of days in the year
     */
    countDays() {
        //account for leap year
        //end date is set to Jan 1st of next year, so subtract 1
        this.endDate.getFullYear()
        this.dayLength = ((this.currentDate.getFullYear() % 4 != 0) ? 365 : 366)
        return this.dayLength - this.days
    }
    /**
     * Sets the clock values, day, hour, year, second to 0, !not a replacement for stop clock 
     */
    clearCounter() {
        this.days = this.hours = this.minutes = this.seconds = 0;
    }
}
/**
* Clock which resets to New year for the next year
*/
export class NewYearClock extends Clock {
    resetMethod() {
        //reset to New Year's for default 
        this.setEndDate()
    }
}
/**
* Clock that resets every year for given date
*/
export class Anniversary extends Clock {
    // @ override
    constructor(endDate) {
        super(endDate);
        // account for case of the countdown being reached, reset
        if (this.getDistance < 0) {
            // Time calculations for days, hours, minutes and seconds
            this.resetMethod()
        }
    }

    resetMethod() {
        // console.log('calling reset', this.endDate.getFullYear()<= new Date().getFullYear(), 'first cond', this.getDistance<0);
        while (this.endDate.getFullYear() <= new Date().getFullYear() && this.getDistance() < 0) {
            // this.endDate.
            console.log(this.endDate, 'Repeat End date triggering');
            this.endDate.setFullYear(this.endDate.getFullYear() + 1)
            // console.log('Anniversary done', this);
        }
    }

}
