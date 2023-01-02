export const setHTML = (elem, value) => elem.innerHTML = value;

export async function fetchFile(link, type) {
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

export const addZeros = (num) => (num < 10) ? ("0" + num) : num;
