const createButton = document.getElementsByClassName("new-item")[0];

const popFormHtml = `<section class="pop-up-container">
<form action="/countdown-list.html" method="get" class="pop-up-form">
    <div class="form-header">Set Countdown</div>
    <div>
        <label for="">Note &nbsp;</label>
        <input type="text" placeholder="countdown #1">
    </div>
    <div>
        <label for="">Date &nbsp;</label>
        <input type="date" id ="dateInput" min="">
    </div>
    <div>
        <label for=""></label>
        <input type="submit" value="Submit">
    </div>    
    <div class="close-form"><button>Close</button></div>
</form>
</section>
<link rel="stylesheet" href="form.css">`;

createButton.addEventListener("click", popForm);
function popForm() {
    document.body.insertAdjacentHTML("afterbegin", popFormHtml);
    document.body.style.position = "fixed";
    setDateAttributes();
    document.getElementsByClassName("close-form")[0].onclick = (e)=> {
        document.getElementsByClassName("pop-up-container")[0].remove();
    }
}

function setDateAttributes(){
    const today = new Date();
let dd = today.getDate()+1;//add 1 to the date so date starts from tomorrow
let mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
let yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 

let todayString = yyyy+'-'+mm+'-'+dd;
document.getElementById("dateInput").setAttribute("min", todayString);
}