import { notifyUser } from "./functions.js";
let icon = document.getElementById('themeToggle');

function activateLightMode() {
    setInnerHtmlForNotNull(icon, `<i class="fas fa-moon fa-fw"></i>`);
    if(body.classList.contains("dark")){
    body.classList.replace("dark","light");}else{body.classList.add("light");}
    localStorage.setItem("userMode", "light");
    console.log("saving: ",  localStorage.getItem("userMode"));
}

function activateDarkMode() {
    setInnerHtmlForNotNull(icon, `<i class="fas fa-sun fa-fw"></i>`);
    if(body.classList.contains("light")){
        body.classList.replace("light","dark");}else{body.classList.add("dark");}
        localStorage.setItem("userMode", "dark");
        console.log("saving: ",  localStorage.getItem("userMode"));
}

function setMode() {
    if (!body.classList.contains("light")) {
        activateLightMode();
    } else {
        activateDarkMode();
    }
}
function notifyMode() {
    let notifyText;
    if (body.classList.contains("light")) {
        notifyText = "Light mode set";
    } else {
        notifyText = "Dark mode set";
    }

    notifyUser(notifyText);
}

function loadTheme() {
    let savedTheme = localStorage.getItem("theme");
    if(!["",null,undefined].includes(savedTheme)){
        document.body.setAttribute("data-theme", savedTheme);
    }
    // set default mode to go with theme if page has none
    if( !["light","dark"].includes(...document.body.classList)){
        document.body.classList.add("light");
    }
}

function loadAppStatusBarTheme() {
    let primaryColor = localStorage.getItem("primaryColor");
    if(!["",null,undefined].includes(primaryColor)){
        document.querySelectorAll("[content='#7b68ee']").forEach(e=>e.setAttribute("content",primaryColor));  
    }
}

function loadBg() {
    let savedBg = localStorage.getItem("userBg");
    if( !["",null,undefined].includes(savedBg)){
        document.body.style.backgroundImage = `url(${savedBg})`;
    }
}
function loadMode() {
    let savedMode = localStorage.getItem("userMode");
    if( !["",null,undefined].includes(savedMode)){
        let modeAlt = (savedMode == "dark") ? "light" : "dark";
        const setModeIcon = (mode)=> {
            if (mode == "dark") {
                icon.innerHTML = `<i class="fas fa-sun fa-fw"></i>`;
            } 
            else {
                icon.innerHTML = `<i class="fas fa-moon fa-fw"></i>`
            }
        }
        
        if(!document.body.classList.contains(savedMode)){
            if(!document.body.classList.contains(modeAlt)){
                document.body.classList.add(savedMode);
                setModeIcon(savedMode);
        }
            else{
                document.body.classList.replace(modeAlt,savedMode);
                setModeIcon(savedMode);
        }
        }
        else{
            setModeIcon(savedMode);
        }
    }
}

loadTheme();
loadAppStatusBarTheme();
loadBg();
loadMode();

icon.addEventListener("click", setMode);
icon.addEventListener("click", notifyMode);