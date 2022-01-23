const $ = (selector) => document.querySelectorAll(selector);
const featureNotReady = () => {
    window.location.href = "./fallback.html";
};
const nav = $(".nav")[0];
const sidebar = $(".sidebar")[0];
const sidebarItems = $(".sidebar-list-items");
const colorIcons = $(".pick-color-ico");
nav.addEventListener("click", () => {
    if (sidebar.classList.contains("sidebar-hide")) {
        sidebar.classList.replace("sidebar-hide", "sidebar-show");
    }
});
sidebarItems[0].onclick = featureNotReady;
sidebarItems[1].onclick = featureNotReady;
sidebarItems[2].onclick = openColorPicker;
sidebarItems[3].onclick = () => {
    window.location.href = "./authors.html";
};

function setTheme(event) {
    document.body.dataset.theme = event.currentTarget.dataset.settheme;
}

function openColorPicker() {
    $(".pick-color")[0].classList.toggle("show-color");
}

colorIcons.forEach((e) => {
    e.addEventListener("click", function (e) {
        // alert(e);
        setTheme(e);
    });
});

nav.addEventListener("click",(e)=>{
    $(".container")[0].addEventListener("click",closeSideBarListener);
});

const closeSideBarListener = (event)=> {
    console.log(event.target);
    sidebar.classList.add("sidebar-hide");
    event.currentTarget.removeEventListener("click",closeSideBarListener);
}