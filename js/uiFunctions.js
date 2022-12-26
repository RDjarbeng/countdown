import { setInnerHtmlForNotNull, $ } from "./functions.js";
import * as components from "./customComponents.js"

// DOM elements
let body = document.body
let icon = document.getElementById('themeToggle');
/**
 * 
 * @param {String} message 
 */
export function notifyUser(message) {
    let notifyText = message;

    if (document.getElementsByClassName("mode-info")[0]) {
        document.getElementsByClassName("mode-info")[0].remove();
        body.insertAdjacentHTML(
            "afterbegin",
            `<span class="mode-info">${notifyText}</span>`
        );
    } else {
        body.insertAdjacentHTML(
            "afterbegin",
            `<span class="mode-info">${notifyText}</span>`
        );
    }
}
export function activateLightMode() {
    setInnerHtmlForNotNull(icon, `<i class="fas fa-moon fa-fw"></i>`);
    if (body.classList.contains("dark")) {
        body.classList.replace("dark", "light");
    } else { body.classList.add("light"); }
    localStorage.setItem("userMode", "light");
    console.log("saving: ", localStorage.getItem("userMode"));
}
export function activateDarkMode() {
    setInnerHtmlForNotNull(icon, `<i class="fas fa-sun fa-fw"></i>`);
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
    } else { body.classList.add("dark"); }
    localStorage.setItem("userMode", "dark");
    console.log("saving: ", localStorage.getItem("userMode"));
}
export function setMode() {
    if (!body.classList.contains("light")) {
        activateLightMode();
    } else {
        activateDarkMode();
    }
}
export function notifyMode() {
    let notifyText;
    if (body.classList.contains("light")) {
        notifyText = "Light mode set";
    } else {
        notifyText = "Dark mode set";
    }

    notifyUser(notifyText);
}
export function loadTheme() {
    let savedTheme = localStorage.getItem("theme");
    if (!["", null, undefined].includes(savedTheme)) {
        document.body.setAttribute("data-theme", savedTheme);
    }
    // set default mode to go with theme if page has none
    if (!["light", "dark"].includes(...document.body.classList)) {
        document.body.classList.add("light");
    }
}
export function loadAppStatusBarTheme() {
    let primaryColor = localStorage.getItem("primaryColor");
    if (!["", null, undefined].includes(primaryColor)) {
        document.querySelectorAll("[content='#7b68ee']").forEach(e => e.setAttribute("content", primaryColor));
    }
}
export function loadBg() {
    let savedBg = localStorage.getItem("userBg");
    if (!["", null, undefined].includes(savedBg)) {
        document.body.style.backgroundImage = `url(${savedBg})`;
    }
}
export function loadMode() {
    let savedMode = localStorage.getItem("userMode");
    if (!["", null, undefined].includes(savedMode)) {
        let modeAlt = (savedMode == "dark") ? "light" : "dark";
        const setModeIcon = (mode) => {
            if (mode == "dark") {
                icon.innerHTML = `<i class="fas fa-sun fa-fw"></i>`;
            }
            else {
                icon.innerHTML = `<i class="fas fa-moon fa-fw"></i>`;
            }
        };

        if (!document.body.classList.contains(savedMode)) {
            if (!document.body.classList.contains(modeAlt)) {
                document.body.classList.add(savedMode);
                setModeIcon(savedMode);
            }
            else {
                document.body.classList.replace(modeAlt, savedMode);
                setModeIcon(savedMode);
            }
        }
        else {
            setModeIcon(savedMode);
        }
    }
}


icon.addEventListener("click", setMode);
icon.addEventListener("click", notifyMode);

export const showLoader = () => {
    document.body.insertAdjacentHTML(
        "afterbegin",
        `<aside class="pop-up-container loader-container">
        <style>
        .loader{
            background-color: #ffffff;
            color: grey;
            padding: 0 1rem;
            border-radius: 0.4rem;
            font-size: 1.3em;
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.21);
        }
        .loader span:nth-child(n+2){
            font-size: 1.5em;
            animation-duration:2.5s;
            animation-iteration-count:infinite;    
        }
        .loader span:nth-child(2){animation-name:l1;}
        .loader span:nth-child(3){animation-name:l2;}
        .loader span:nth-child(4){animation-name:l3;}
        @keyframes l1{
            from{opacity:0;}
            15%{opacity:0;}
            25%{opacity:1;}
        }
        @keyframes l2{
            from{opacity:0;}
            40%{opacity:0;}
            50%{opacity:1;}
        }
        @keyframes l3{
            from{opacity:0;}
            65%{opacity:0;}
            75%{opacity:1;}
        }
        </style>
            <section class="loader" style="color: ${getComputedStyle($("body")[0]).getPropertyValue("--color-banner")}">
                <span>Loading</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </section>
        </aside>`
    );
};
export const removeLoader = () => {
    $(".loader-container")[0].remove();
}
export function setTheme(elem) {
    let prevTheme = getComputedStyle(document.body).getPropertyValue("--color-banner");
    document.body.dataset.theme = elem.dataset.settheme;
    localStorage.setItem("theme", `${elem.dataset.settheme}`);

    function setAppStatusBarTheme() {
        let primaryColor = getComputedStyle(document.body).getPropertyValue("--color-banner");
        $(`[content="${prevTheme}"]`).forEach((e) =>
            e.setAttribute("content", primaryColor)
        );
        localStorage.setItem("primaryColor", primaryColor);
    }
    setAppStatusBarTheme();
}

export function addFormCSS() {
    if (!$("[href='css/form.css']")[0]) {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<link rel="stylesheet" href="/css/form.css">`
        );
    }
}