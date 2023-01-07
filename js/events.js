/**
 * Takes a countdown object whose details are to be attached to the event
 * @param {Object} countdown 
 */
export const fireElapsedEvent=(countdown)=>{
    const elapsedEvent = new CustomEvent('elapsed', { 
        detail: countdown 
    });
    dispatchEvent(elapsedEvent);
}