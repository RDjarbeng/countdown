export function switchContextIconUp(element) {
    element = element.querySelector('.fa-chevron-circle-down');
    if (element) {
        element.classList.replace('fa-chevron-circle-down', 'fa-chevron-circle-up');
    }
}

export function switchContextIconDown(element) {
    if (element)
        element.classList.replace('fa-chevron-circle-up', 'fa-chevron-circle-down');
}
