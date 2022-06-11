import { errorHandler } from "./error.js";
import { notifyUser, showLoader } from "./uiFunctions.js";
import { $, setLink } from "./functions.js";
//DOM
const body = document.body;
const nav = $(".nav")[0];
const sidebar = $(".sidebar")[0];
const sidebarItems = $(".sidebar-list-items");
const colorIcons = $(".pick-color")[0];
//Event listeners
sidebarItems[0].addEventListener("click", () => setLink("/index.html"));
sidebarItems[1].addEventListener("click", () => setLink("/html/countdown-list.html"));
sidebarItems[2].addEventListener("click", openBgPicker);
sidebarItems[3].addEventListener("click", openColorPicker);
sidebarItems[4].addEventListener("click", () => setLink("/html/today.html"));
sidebarItems[5].addEventListener("click", () => setLink("/html/about.html"));
colorIcons.addEventListener("click", (e) => setTheme(e.target));
nav.addEventListener("click", openSidebar);
nav.addEventListener("click", (e) => {
    $(".container")[0].addEventListener("click", closeSideBarListener);
});
// function definitions
function openSidebar () {
    if (sidebar.classList.contains("sidebar-hide")) {
        sidebar.classList.replace("sidebar-hide", "sidebar-show");
    }
}

function closeSideBarListener(event) {
    sidebar.classList.add("sidebar-hide");
    event.currentTarget.removeEventListener("click", closeSideBarListener);
}

function setTheme(event) {
    let previousTheme = getComputedStyle(body).getPropertyValue("--color-banner");
    body.dataset.theme = event.dataset.settheme;
    localStorage.setItem("theme", `${event.dataset.settheme}`);
    setAppStatusBarTheme(previousTheme);
}

function setAppStatusBarTheme(prevTheme) {
    let primaryColor = getComputedStyle(body).getPropertyValue("--color-banner");
    $(`[content="${prevTheme}"]`).forEach((e) =>
        e.setAttribute("content", primaryColor)
    );
    localStorage.setItem("primaryColor", primaryColor);
}

function openColorPicker() {
    $(".pick-color")[0].classList.toggle("show-color");
}

function openBgPicker() {
    if (!$("[href='/css/form.css']")[0]) {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<link rel="stylesheet" href="/css/form.css">`
        );
    }
    showLoader();
    loadForm().catch(err => {
        errorHandler("Unable to set custom background");
        console.log(err);
    });
}

async function loadForm() {
    let file = await fetch("/html/form-upload.html");
    let html = await file.text();
    $(".loader-container")[0].remove();
    body.insertAdjacentHTML("afterbegin", html);
    body.style.position = "fixed";
    // upload-form html appended, can now access DOM and process imgs
    const filePicker = $("input[type='file']")[0];
    const closeFormBtn = $(".close-form")[0];
    const restoreDefaultBtn = $(".reset")[0];
    //Event listeners
    filePicker.onchange = () => readImage(filePicker.files[0]);
    $(".bg-presets-preview:not(.upload-preview) img").forEach((img) => {
        img.addEventListener("click", setSavedBg);
    });
    closeFormBtn.addEventListener("click", closeFormPopUp);
    restoreDefaultBtn.addEventListener("click", () => {
        localStorage.removeItem("userBg");
        body.style.backgroundImage = "";
        notifyUser("Default background restored");
        closeFormPopUp();
    });
    // function definitions
    function readImage(uploadedPic) {
        const reader = new FileReader();
        if (fileSizeOk(uploadedPic)) {
            reader.readAsDataURL(uploadedPic);
        }
        else {
            notifyUser("Picture is too big");
        }
    
        reader.onload = function () {
            let uploadedPic64 = reader.result;
            localStorage.setItem("userBg", `${uploadedPic64}`);
            body.style.backgroundImage = `url(${uploadedPic64})`;
            notifyUser("Background is set");
            closeFormPopUp();
        };
        reader.onerror = function () {
            errorHandler("Unable to set background");
            console.log(reader.error);
        };
    }

    async function setSavedBg(e) {
        let img = await fetch(e.target.src);
        let imgBlob = await img.blob();
        readImage(imgBlob);
    }

    function closeFormPopUp() {
        $(".pop-up-container")[0].remove();
        body.style.position = "";
    }
}

const fileSizeOk = (pic)=>{//check that uploaded image is < 3 MB
    console.log((pic.size/1048576).toFixed(2)+"MB");
    return pic.size/1048576 < 3.00 ? true : false; 
}