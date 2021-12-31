export default class Clock {
    //  hour, min, second;
    constructor(endDate) {
        this.endDate = endDate;
        //account for leap year
        this.dayLength = ((endDate.getFullYear()%4!=0)?365: 366)
        this.countDown();
        // setInterval(startTime, 500);
    }

    countDown() {
        // Set the date we're counting down to
        let countDownDate = this.endDate.getTime();
        let now = new Date().getTime();
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    }
    countDays(){
        return this.dayLength -this.days
    }
}



// console.log(myclock.sec, sec, 'yello');