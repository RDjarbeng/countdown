
import { NewYearClock } from "./js/clock";

const dayClock = new NewYearClock()
let dayCount = dayClock.countDays();
let daysInyear = dayClock.getDaysinYear();
document.querySelector('div').innerText+= 'Day '+dayCount+'/6' +(daysInyear|'365');
let url = `whatsapp://send?text=Day ${dayCount || 'X'}/${daysInyear|'365'}`;


console.log('days', dayCount);
console.log(window.location.protocol + "me //" + window.location.host );
// window.location.replace(url);
window.open(url);