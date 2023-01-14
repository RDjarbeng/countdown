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
let dayCount = new Clock().countDays();
document.querySelector('div').innerText+= 'Day '+dayCount+'/365';
let url = `whatsapp://send?text=Day ${dayCount || 'X'}/365`;
console.log('days', dayCount);
console.log(window.location.protocol + "me //" + window.location.host );
// window.location.replace(url);
window.open(url);

// const dayClock = new NewYearClock();