const createButton = document.getElementsByClassName("new-item")[0];
if (!document.querySelector("[href='form.css']")) {
    document.head.insertAdjacentHTML(
        "beforeend",
        `<link rel="stylesheet" href="form.css">`
    );
}
const popFormHtml = `<section class="pop-up-container">
<form action="/countdown-list.html" method="get" class="pop-up-form">
    <div class="form-header">Set Countdown</div>
    <div class="form-sections">
        <label for="">Note &nbsp;</label>
        <input type="text" placeholder="countdown #1">
    </div>
    <div class="form-sections">
        <label for="">Date &nbsp;</label>
        <input type="date">
    </div>
    <div class="form-sections">
        <label for=""></label>
        <input type="submit" value="Submit">
    </div>    
    <div class="close-form"><button>Close</button></div>
</form>
</section>`;

createButton.addEventListener("click", popForm);
function popForm() {
    document.body.insertAdjacentHTML("afterbegin", popFormHtml);
    document.body.style.position = "fixed";
    document.getElementsByClassName("close-form")[0].onclick = (e)=> {
        document.getElementsByClassName("pop-up-container")[0].remove();
        document.body.style.position = "";
    }
}