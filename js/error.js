let prevErr = false;


const closeErrorInfo = () => event.currentTarget.parentNode.remove();

errorHandlerWithoutMessage= (err)=>{
    console.log(err);
    errorHandler();
}

const errorHandler =(msg)=> {
    const errMessage = "Oops an error occurred 🤧😐";
    let errHtml = `
    <section class="error-notification">
    <style>
        .error-notification {
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            z-index: 99;
            position: absolute;
            padding-top: 10vmin;
        }

        .error-message {
            width: 80vmin;
            padding: 2vmin;
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
        @media screen and (max-width: 427px) {
            .error-message{
                width: 90vmin;
               padding: 3.3vmin;
            }
        }
    </style>
    <div class="error-message">
        <span>${msg||errMessage}</span>
        <div class="error-close" onclick="closeErrorInfo()">
            <span class="material-icons">close</span>
        </div>
    </div>
</section>
`;
    if (prevErr) {
        let item =$(".error-notification")[0]
        if(item)
        item.remove();
        document.body.insertAdjacentHTML("afterbegin", errHtml);
    } else {
        document.body.insertAdjacentHTML("afterbegin", errHtml);
        prevErr = true;
    }
};
window.onerror = errorHandlerWithoutMessage;