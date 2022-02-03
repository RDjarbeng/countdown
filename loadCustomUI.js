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
        $("[content='#7b68ee']").forEach(e=>e.setAttribute("content",primaryColor));  
    }
}

function loadBg() {
    let savedBg = localStorage.getItem("userBg");
    if( !["",null,undefined].includes(savedBg)){
        document.body.style.backgroundImage = `url(${savedBg})`;
    }
}

loadTheme();
loadAppStatusBarTheme();
loadBg();
