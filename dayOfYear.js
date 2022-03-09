// const NewYearClock = require('clock.js');
// function include(filename)
// {
//     var head = document.getElementsByTagName('head')[0];

//     var script = document.createElement('script');
//     script.src = filename;
//     script.type = 'text/javascript';

//     head.appendChild(script)
//     console.log('check it out');
// }

class Clock {
    constructor(endDate) {
        // expecting a date object
        this.setEndDate(endDate)
        // this.countDown();
    }

    setEndDate(endDate) {
        //set endDate to end of year
        // todo: check endDate for validity as date
        this.endDate = endDate ||new Date(`Jan 1, ${new Date().getFullYear() + 1} 00:00:00`)
        
        
    }
    countDays() {
        let countDownDate = this.endDate.getTime();
        let now = new Date().getTime();
        var distance = countDownDate - now;
        //account for leap year
        this.dayLength = ((this.endDate.getFullYear() % 4 != 0) ? 365 : 366)
        this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
        return this.dayLength - this.days
    }
}
// include('clock.js')
let dayCount = new Clock().countDays();
// document.querySelector('div').innerText+= dayCount;
console.log('days', dayCount);

window.open(`whatsapp://send?text= Day ${dayCount || 'rcountdown'}/365`);
// const dayClock = new NewYearClock();
// const day = dayClock.countDays();
// console.log(day);