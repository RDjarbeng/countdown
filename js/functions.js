// for a single source for all the scattered functions
//  due to Uc browser fix

function setCountDownList(arrayOfJSONCountdowns){
    localStorage.setItem('countdown', JSON.stringify(arrayOfJSONCountdowns))   
}

function setInnerHtmlForNotNull(element, value){
    if(element)//check for null
        element.innerHTML = value;
}

function closeFormPopUp() {
    document.getElementsByClassName("pop-up-container")[0].remove();
    document.body.style.position = "";
}