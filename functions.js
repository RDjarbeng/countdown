// for a single source for all the scattered functions
//  due to Uc browser fix

function setCountDownList(arrayOfJSONCountdowns){
    localStorage.setItem('countdown', JSON.stringify(arrayOfJSONCountdowns))   
}