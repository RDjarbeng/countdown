/**
 * closes the context menu for the sort option
 */
export const closeSortMenu = () => {
    const sortOpts = document.querySelector(".sort-options");
    if (sortOpts && sortOpts.style.display == "block") {
        sortOpts.style.display = "none";
    }
};
