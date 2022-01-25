function loadTheme() {
    let savedTheme = localStorage.getItem("theme");
    document.body.setAttribute("data-theme", savedTheme);
    if( ["",null,undefined].includes(document.body.className)){
        document.body.className = "light";
    }
}
loadTheme();