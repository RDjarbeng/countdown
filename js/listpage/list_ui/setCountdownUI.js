/**
 * Get string with status of countdowns
 * @param {Clock} clock clock object for particular countdown
 * @returns {String} string of countdown status
 */

 export function getCountdownString(clock) {
    let countdownString = '';
    if (clock.days > 0) {
        countdownString = clock.days + ' days, ' + ((clock.hours > 0) ? (clock.hours + ' hours') : (clock.minutes + ' minutes'));
    } else if (clock.hours > 0) {
        countdownString = clock.hours + ' hours, ' + ((clock.minutes > 0) ? (clock.minutes + ' minutes') : (clock.seconds + ' seconds'));
    } else if (clock.minutes > 0) {
        countdownString = clock.minutes + ' minutes, ' + clock.seconds + ' seconds';
    } else if (clock.seconds >= 0) {
        countdownString = clock.seconds + ' seconds ';
    }
    return ` ${countdownString}`;
}

/**
 *
 * @param {Clock} clock
 * @returns {object} status
 * @returns {object} status.countdownStatus
 * @returns {object} status.countdownStatusTI
 * @returns {object} status.dueDateText
 */
 export function setCountDownStatus(clock) {
    let timeDifference = clock.getDistance();
    let countdownStatus = "";
    let countdownStatusTI = `<span style="color:#03bf42;"><i class="fas fa-hourglass-start"></i> active</span>`;
    let dueDateText = 'Due: ' + clock.endDate.getDate() + ' ' + clock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + clock.endDate.getFullYear();
    if (timeDifference > 0) {
        countdownStatus = getCountdownString(clock) +' more';
    } else {
        // countdown elapsed
        // countdownStatus = 'Due: ' + clock.endDate.getDate() + ' ' + clock.endDate.toLocaleString('default', { month: 'long' }) + ', ' + clock.endDate.getFullYear();
        countdownStatus = getCountdownString(clock) +' ago';
        countdownStatusTI = `<span style="color:crimson;"><i class="fas fa-hourglass-end"></i> elapsed</span>`;
    }
    return { countdownStatus, countdownStatusTI, dueDateText };
}