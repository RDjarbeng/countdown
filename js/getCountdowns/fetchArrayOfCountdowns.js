/**
 *
 * @returns {Array} Array of countdowns stored in local storage, null if none
 */
function fetchArrayOfCountdowns() {
    let jsonListOfCountdowns = localStorage.getItem('countdown');
    if (!jsonListOfCountdowns) {
        console.warn('Unable to fetch your saved countdowns in fetch array()');
        console.log('Warning in fetch Array of Countdowns, null fetched');
        return null;
    }
    return JSON.parse(jsonListOfCountdowns);
}
