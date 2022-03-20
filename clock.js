export default class Clock {
    constructor(endDate) {
        // expecting a date object
        this.setEndDate(endDate)
        this.countDown();
    }

    setEndDate(endDate) {
        //set endDate to end of year
        // todo: check endDate for validity as date
        this.endDate = endDate ||new Date(`Jan 1, ${new Date().getFullYear() + 1} 00:00:00`)
        
        
    }
    countDown() {
        // Set the date we're counting down to
        let countDownDate = this.endDate.getTime();
        let now = new Date().getTime();
        var distance = countDownDate - now;
        // account for case of the countdown being reached, reset
        if (distance >= 0) {
            // Time calculations for days, hours, minutes and seconds
            this.calculateTimeValues(distance)
        } else {
            //reset to end of year
            // this.setEndDate()
            //todo: Countup from the deadline date
            // this.calculateTimeValues(Math.abs(distance));

            // clear date values
            this.resetMethod();
            

        }
    }

    resetMethod(){
        this.clearCounter();
    }

    calculateTimeValues(distance){
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.years = Math.floor(this.days / this.dayLength);
        this.days = this.days%this.dayLength
            this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }
    countDays() {
        //account for leap year
        this.dayLength = ((this.endDate.getFullYear() % 4 != 0) ? 365 : 366)
        return this.dayLength - this.days
    }

    clearCounter(){
        this.days=this.hours=this.minutes=this.seconds=0;
    }
}

export class NewYearClock extends Clock{
    resetMethod(){
        //reset to New Year's for default 
        this.setEndDate()
        console.log(this.endDate)
    }
}