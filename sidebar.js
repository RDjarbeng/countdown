const $ = (selector) => document.querySelectorAll(selector);
const setLink = (link) => (window.location.href = link);
const nav = $(".nav")[0];
const sidebar = $(".sidebar")[0];
const sidebarItems = $(".sidebar-list-items");
const colorIcons = $(".pick-color-ico");
nav.addEventListener("click", () => {
    if (sidebar.classList.contains("sidebar-hide")) {
        sidebar.classList.replace("sidebar-hide", "sidebar-show");
    }
});
sidebarItems[0].addEventListener("click", () => setLink("./index.html"));
sidebarItems[1].addEventListener("click", () =>
    setLink("./countdown-list.html")
);
sidebarItems[2].addEventListener("click", openBgPicker);
sidebarItems[3].addEventListener("click", openColorPicker);
sidebarItems[4].addEventListener("click", () => setLink("./authors.html"));

function setTheme(event) {
    let prevTheme = getComputedStyle(document.body).getPropertyValue(
        "--color-banner"
    );
    document.body.dataset.theme = event.currentTarget.dataset.settheme;
    localStorage.setItem("theme", `${event.currentTarget.dataset.settheme}`);
    
    function setAppStatusBarTheme() {
        let primaryColor = getComputedStyle(document.body).getPropertyValue(
            "--color-banner"
        );
        $(`[content="${prevTheme}"]`).forEach((e) =>
            e.setAttribute("content", primaryColor)
        );
        localStorage.setItem("primaryColor", primaryColor);
    }
    setAppStatusBarTheme();
}

function openColorPicker() {
    $(".pick-color")[0].classList.toggle("show-color");
}

colorIcons.forEach((e) => {
    e.addEventListener("click", function (e) {
        setTheme(e);
    });
});

nav.addEventListener("click", (e) => {
    $(".container")[0].addEventListener("click", closeSideBarListener);
});

const closeSideBarListener = (event) => {
    sidebar.classList.add("sidebar-hide");
    event.currentTarget.removeEventListener("click", closeSideBarListener);
};

function openBgPicker() {
    if (!$("[href='form.css']")[0]) {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<link rel="stylesheet" href="form.css">`
        );
    }
    if (!$("[href='loader.css']")[0]) {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<link rel="stylesheet" href="loader.css">`
        );
    }
    const showLoader = () => {
        document.body.insertAdjacentHTML(
            "afterbegin",
            `<aside class="pop-up-container loader-container">
                <section class="loader" style="color: ${getComputedStyle($("body")[0]).getPropertyValue("--color-banner")}">
                    <span>Loading</span>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </section>
            </aside>`
        );
    };
    showLoader();

    const loadForm = async () => {
        let file = await fetch("./form-upload.html");
        let ft = await file.text();
        document.getElementsByClassName("loader-container")[0].remove();
        document.body.insertAdjacentHTML("afterbegin", ft);
        document.body.style.position = "fixed";
        const filePicker = document.querySelector("input[type='file']");
        const reading = (uploadedPic) => {
            let reader = new FileReader();
            reader.readAsDataURL(uploadedPic);

            reader.onload = function () {
                let uploadedPic64 = reader.result;
                localStorage.setItem("userBg", `${uploadedPic64}`);
                document.body.style.backgroundImage = `url(${uploadedPic64})`;
            };
            reader.onerror = function () {
                console.log(reader.error);
            };
        };
        filePicker.onchange = () => {
            reading(filePicker.files[0]);
        };
        document
            .getElementsByClassName("close-form")[0]
            .addEventListener("click", () => {
                document.getElementsByClassName("pop-up-container")[0].remove();
                document.body.style.position = "";
            });
        $(".reset")[0].addEventListener("click", () => {
            localStorage.removeItem("userBg");
            document.body.style.backgroundImage = "";
        });
        $(".bg-presets-preview:not(.upload-preview) img").forEach((e) => {
            e.addEventListener("click", () => {
                const sbg = async () => {
                    let img = await fetch(e.src);
                    let imgblob = await img.blob();
                    reading(imgblob);
                };
                sbg();
            });
        });
    };
    loadForm().catch(err => {
        errorHandler();
    });
}
