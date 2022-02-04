// todo: sort by modified time
function displayCountdowns(){
    let countdownList =document.getElementById('countdown-list');
    let arrayOfCountdowns = JSON.parse(localStorage.getItem('countdown')).reverse();
    let listItems = '';
    arrayOfCountdowns.forEach(countdown => {
        let date = new Date(countdown.date);
        listItems+= `<div class="list-item" style ="border-bottom: 0.1em solid blue; padding: 0.6em;">
        <div class="list-text">
         <span>Text: </span> ${countdown.text} </div>
        <div>
        <span>Date: </span>${date.getDate()+' '+date.toLocaleString('default', { month: 'long' })+', '+ date.getFullYear() }
        </div>
        </div>`
    });
    countdownList.innerHTML = listItems;
}

displayCountdowns();