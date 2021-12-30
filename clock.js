 class Clock{
    //  hour, min, second;
    constructor(endDate){
        this.endDate = endDate;
        this.countDown();
        // setInterval(startTime, 500);
    }
     startTime() {
        let today = new Date();
        let h = today.getHours();
        let m = 60- today.getMinutes();
        let s = 60-today.getSeconds();
        // console.log(checkHour(h));
        h= checkHour(h)
        h = checkTime(h);
        // m = checkMin(m,h)
        m = checkTime(m);
        s = checkTime(s);
        // No DOM MANIPULATION here
        // document.getElementById('clock').innerHTML =
        // h + ":" + m + ":" + s;
        this.hour = h;
        this.min =m;
        this.sec = s;
        return { hour: this.hour, min: this.min,sec: this.sec }
        
        // t =  setTimeout(startTime, 500);
        clockMovement = true;
        
    }

    countDown(){
// "Jan 5, 2022 15:37:25"
        // Set the date we're counting down to
let countDownDate = this.endDate.getTime();
// console.log(countDownDate, 'the count');

let now = new Date().getTime();
var distance = countDownDate - now;
// console.log(distance, 'Distance');
// Update the count down every 1 second
// Time calculations for days, hours, minutes and seconds
this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

// console.log(this.days, this.hours, this.minutes, this.seconds);

// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();

//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

// todo: New Year's message
// //   first 5 mins in the year
//   if (distance < 3000000) {
//     clearInterval(x);
//     var test ="Welcome to the new year";
//   }

//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";

//   // Display the result in the element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";

//   // If the count down is finished, write some text
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);
    }
}



// console.log(myclock.sec, sec, 'yello');