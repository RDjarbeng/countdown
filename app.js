// load the countdown clock
window.onload = startClock();

//todo: get the clock to stop
// todo: implement light theme

//to stop the clock
var t;
var clockMovement = false;

/***
*light mode if after 6am and after 18:00 evening
*/
function autoLight(){
    let h = new Date().getHours();
    console.log(h);
    if(h >6 && h<18 )
    activateLightMode();
}
function startClock(){
    t =setInterval(startTime, 500);
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = 60- today.getMinutes();
    var s = 60-today.getSeconds();
    // console.log(checkHour(h));
    h= checkHour(h)
    h = checkTime(h);
    // m = checkMin(m,h)
    m = checkTime(m);
    s = checkTime(s);
    // h =2;
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
// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = "0" + i};  
    return i;
}

function checkHour(h){
    return 24-h;
}

//not necessary, mins in 60 countdown only
// function checkMin(m, h){
//     return Math.abs(h*60 -m)
// }

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

let icon = document.getElementsByClassName("toggleMode")[0];
let body = document.body;
icon.addEventListener("click",setMode);
icon.addEventListener("click",notifyMode);

function activateLightMode(){
    icon.innerHTML = `<i class="fas fa-sun"></i>`;
    body.classList.toggle("light");
}

function activateDarkMode(){
    icon.innerHTML = `<i class="fas fa-moon"></i>`;
    body.classList.toggle("light");
}

function setMode(autoLight) {

    if(autoLight){
        activateLightMode()
        return;
    }
        

    if (!body.classList.contains("light")){
        activateLightMode();
    }
    else{
        activateDarkMode();
    }
}
function notifyMode() {
    let notifyText;
    if (body.classList.contains("light")) {
        notifyText = "Light mode set";
    } else {
        notifyText = "Dark mode set";
    }

    if (document.getElementsByClassName("mode-info")[0]) {
        document.getElementsByClassName("mode-info")[0].remove();
        body.insertAdjacentHTML("afterbegin",`<span class="mode-info">${notifyText}</span>`);
    }
    else{
        body.insertAdjacentHTML("afterbegin",`<span class="mode-info">${notifyText}</span>`);
    }
}
window.onload = autoLight();