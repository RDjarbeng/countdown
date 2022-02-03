// todo: sort by modified time
function displayCountdowns(){
    let countdownList =document.getElementById('countdown-list');
    let arrayOfCountdowns = JSON.parse(localStorage.getItem('countdown')).reverse();
    let listItems = '';
    arrayOfCountdowns.forEach(countdown => {
        listItems+= "<div> <span>Text: </span>"+countdown.text+ "</div>"
        listItems+= "<div><span>Date: </span>"+countdown.date +"</div>"
    });
    countdownList.innerHTML = listItems;
}

displayCountdowns();