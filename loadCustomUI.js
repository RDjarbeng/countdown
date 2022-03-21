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
        console.log("loading: ",savedMode);
        let modeAlt = (savedMode == "dark") ? "light" : "dark";
        if(!document.body.classList.contains(savedMode)){
            if(!document.body.classList.contains(modeAlt)){
                document.body.classList.add(savedMode);
            }
            else{
                document.body.classList.replace(modeAlt,savedMode);
            }
        }
    }
}

loadTheme();
loadAppStatusBarTheme();
loadBg();
loadMode();