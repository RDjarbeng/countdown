// for a single source for all the scattered functions
//  due to Uc browser fix

export function setCountDownList(arrayOfJSONCountdowns){
    localStorage.setItem('countdown', JSON.stringify(arrayOfJSONCountdowns))   
}

export function setInnerHtmlForNotNull(element, value){
    if(element)//check for null
        element.innerHTML = value;
}

export function closeFormPopUp() {
    document.getElementsByClassName("pop-up-container")[0].remove();
    document.body.style.position = "";
}

export function addZeros(time) {
    if (time < 10) {
        time = "0" + time;
    }
    return time;
}

