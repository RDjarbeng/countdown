import * as app from "./r.js"

class RCountdown extends HTMLElement {
    constructor() {
        super();
    }
    async connectedCallback() {
        this.innerHTML = await app.fetchFile("widget.html", "text");
        let endDate = this.getAttribute("cd-to");
        let orient = this.getAttribute("orient");
        this.startRcountdown(endDate);
        this.setStyles(orient);
    }

    $(elem) {
        return this.querySelector("#" + elem);
    };

    startRcountdown(endDate) {
        const CLOCK_IDS = {
            dayElem: 'day-num',
            hourElem: 'hour-num',
            minuteElem: 'min-num',
            secondElem: 'sec-num',
        };
        const clockDOM = {
            day: this.$(CLOCK_IDS.dayElem),
            hour: this.$(CLOCK_IDS.hourElem),
            minute: this.$(CLOCK_IDS.minuteElem),
            second: this.$(CLOCK_IDS.secondElem),
        }

        app.waitForAnimation(new app.Clock(endDate), clockDOM, 800);
    }

    setStyles(orient){
        switch (orient) {
            case "vertical":
                this.classList.add("rc--vertical")
                break;
            default:
                break;
        }
    }

}

customElements.define("app-rcountdown", RCountdown);



