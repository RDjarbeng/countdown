// load the countdown clock
window.onload = startClock();
//todo: get the clock to stop
// todo: implement light theme

//to stop the clock
var t;
var clockMovement = false;

function startClock(){
    t =setInterval(startTime, 500);
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = 60-today.getSeconds();
    // console.log(checkHour(h));
    h= checkHour(h)
    h = checkTime(h);
    m = checkMin(m,h)
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    // t =  setTimeout(startTime, 500);
    clockMovement = true;
    
}
function restartTime(){
    if(clockMovement){
        return;
    }else{
        startClock()
    }
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function checkHour(h){
    return 24-h;
}

function checkMin(m, h){
    return Math.abs(h*60 -m)
}

function stopClock(){
    clearTimeout(t);
    clockMovement = false;
}

/*
function displayClock(){
    const clock =document.getElementById('clock')
    let d = new Date();
    clock.innerHTML= d.toLocaleTimeString();
//   var display = new Date().toLocaleTimeString();
//   console.log(display);
  setTimeout(displayClock, 1000); 
}

*/