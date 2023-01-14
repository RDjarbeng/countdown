/**
 * Takes a countdown event title to add to the event detail parameter
 * @param {String} countdownTitle 
 */
export const fireElapsedEvent=(countdownTitle)=>{
    const elapsedEvent = new CustomEvent('elapsed', { 
        detail: countdownTitle 
    });
    dispatchEvent(elapsedEvent);
}