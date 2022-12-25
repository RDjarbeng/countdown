/**
 * Display the mini clock on the countdownlist page
 */
export const showClockRow = () => {
    //  if ([null, "", undefined].includes(document.querySelector(".clock-row").style.display)) {
    const clockRow = document.querySelector(".clock-row");
    if (clockRow) {
        console.log('Showing the clock row');
        clockRow.style.display = "flex";
        clockRow.style.animationPlayState = "running";
    }
    // }
};
