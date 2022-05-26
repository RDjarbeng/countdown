let today = new Date();
let day, month, year, time, dayOfWeek;

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getAndSetDomElements(){
year =document.getElementById('year');
month =document.getElementById('month');
day =document.getElementById('dayOfMonth');
dayOfWeek =document.getElementById('dayOfWeek');
time =document.getElementById('time');

setDomElements();
}

function setInnerHtmlForNotNull(element, value){
    if(element)//check for null
        element.innerHTML = value;
}
function setDomElements(){
    setInnerHtmlForNotNull(day, today.getDate())
    setInnerHtmlForNotNull(month, months[today.getMonth()] )
    setInnerHtmlForNotNull(year, today.getFullYear())
    setInnerHtmlForNotNull(dayOfWeek, days[today.getDay()] )
    setInnerHtmlForNotNull(time, today.toLocaleString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }))
}


getAndSetDomElements();
let dayIntervaltimer = setInterval(setDomElements, 1000);

async function copyDOY() {
    await navigator.clipboard.writeText(`Day ${ dayCount.innerText ||'rcountdown'}/365`);
    notifyUser("Copied to clipboard");
    // console.log(await navigator.clipboard.readText());
}
$(".copy-link")[0].addEventListener("click", copyDOY);