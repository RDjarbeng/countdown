// for a single source for all the scattered functions
//  due to Uc browser fix

import { errorHandler } from "./error.js";

/**
 * Checks if a DOM element variable is null before setting innerHTML
 * @param {HTMLElement} element 
 * @param {String} value 
 */
 export function setInnerHtmlForNotNull(element, value){
    if(element)//check for null
        element.innerHTML = value;
    else
        console.warn('Element passed to setInnerHTML for not null is null/undefined');
}


/**
 * add zero in front of numbers < 10
 * @param {Number} num 
 * @returns {String} number with 0 at the front
 */
export const addZeros=(num)=> (num < 10)?("0" + num): num;

export function addWhatappEventHandler() {
    let whatsappIcon = document.getElementById('sendWhatsappButton');
    if (whatsappIcon) {
        whatsappIcon.addEventListener('click', exportToWhatsapp);
    }

}


export function exportToWhatsapp() {
    let dayNum = document.getElementById("countDay").innerText;
    window.open(`whatsapp://send?text= Day ${dayNum || 'rcountdown'}/365`);
}



/**
 * Stop the clock with global var intervalID
 */
 export function stopClock(interval) {
    clearTimeout(interval);
    // customClockMovement = false;
}

/**
 * Toggles an element from style.display =block if none and vice versa
 * @param {HTMLElement} element element to set to block or none
 */
export const toggleElementDisplayBlockOnScreen=(element)=>{
    if(element){
        (element.style.display == "block")?removeElementSetDisplayNone(element):addElementSetDisplayBlock(element)
    }else{
        console.log('Element passed to toggleElementDisplayBlockOnScreen is null');
        errorHandler('Unable to display item')
    }

}

/**
 * removes element from screen,sets its display to none if not null, checks for null
 * @param {HTMLElement} element 
 * @returns 
 */
export const removeElementSetDisplayNone=(element)=>(element)?element.style.display = "none":null;


export const addElementSetDisplayBlock=(element)=>(element)?element.style.display = "block":null;
/**
 * use this to set onclick listeners with a callback, recommended to avoid setting the same listener twice, (does not remove other callbacks)
 * @param {HTMLElement} element 
 * @param {Function} eventHandler 
 */
export const addClickListenersWithoutDuplicates = (element, eventHandler)=>{
    element.removeEventListener("click", eventHandler);
    element.addEventListener("click", eventHandler);
    if(element){

}else{
    console.warn("Null element passed to addlistenersWithoutDuplicates")
}
}

export const $ = (selector) => document.querySelectorAll(selector);
export const setLink = (link) => (window.location.href = link);

export const fileSizeOk = (pic) => {
    const megabyte = 1024 * 1024;
    return pic.size / megabyte < 3.00 ? true : false;
}

export const fetchFile = async (link,type)=>{
    let data = await fetch(link);
    switch (type) {
        case "text":
            data = await data.text();
            break;
            case "json":
                data = await data.json();
                break;
                case "blob":
                    data = await data.blob();
                    break;
        default:
            break;
    }
    return data;
}

export async function convertToBlob (fileUrl) {
    return await fetchFile(fileUrl, "blob");
}