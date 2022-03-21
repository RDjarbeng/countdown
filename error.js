let prevErr = false;
const errMessage = "Oops an error occurred 🤧😓😐";

const closeErrorInfo = () => event.currentTarget.parentNode.remove();

const errorHandler =()=> {
    let errHtml = `
    <section class="error-notification">
    <style>
        .error-notification {
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            z-index: 5;
            position: absolute;
            padding-top: 10vmin;
        }

        .error-message {
            width: 80vmin;
            height: 8vmin;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 2vmin;
            background: #f8d7da;
            color: #842029;
            position: relative;
        }

        .error-close {
            position: absolute;
            right: 3%;
            padding: 1.2vmin 2.2vmin;
        }
    </style>
    <div class="error-message">
        <span>${errMessage}</span>
        <div class="error-close" onclick="closeErrorInfo()">
            <i class="fas fa-times"></i>
        </div>
    </div>
</section>
`;
    if (prevErr) {
        $("error-notification").remove();
        document.body.insertAdjacentHTML("afterbegin", errHtml);
    } else {
        document.body.insertAdjacentHTML("afterbegin", errHtml);
        prevErr = true;
    }
};
window.onerror = errorHandler;