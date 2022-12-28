/**
 * Convers date to isoString, keeping the local time at which it was set
 * toISOString in js, offsets it to UTC time zone
 * @param {String} dateString 
 * @returns {String} Date in local time as a string
 */
export const getLocalIsoStringFromDateInput=(dateString)=> {
    const date = new Date(dateString);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // getMonth() returns a 0-based index, so we need to add 1
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
  
    // pad the month, day, hours, and minutes with leading zeros if necessary
    month = (month < 10) ? '0' + month : month;
    day = (day < 10) ? '0' + day : day;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
  
    return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
  }
  