import * as app from "./r.js"

class RCountdown extends HTMLElement {
    static created = 0;
    constructor() {
        super();
    }
    async connectedCallback() {
        this.innerHTML = await app.fetchFile("widget.html", "text");
        let endDate = this.getAttribute("cd-to");
        let orient = this.getAttribute("orient");
        let size = this.getAttribute("size");
        ++RCountdown.created;
        this.startRcountdown(endDate);
        this.setStyles(orient, size);
    }

    $(elem) {
        return this.querySelector(elem);
    };

    startRcountdown(endDate) {
        const CLOCK_IDS = {
            dayElem: 'day-num',
            hourElem: 'hour-num',
            minuteElem: 'min-num',
            secondElem: 'sec-num',
        };
        const clockDOM = {
            day: this.$("#" + CLOCK_IDS.dayElem),
            hour: this.$("#" + CLOCK_IDS.hourElem),
            minute: this.$("#" + CLOCK_IDS.minuteElem),
            second: this.$("#" + CLOCK_IDS.secondElem),
        }

        app.waitForAnimation(new app.Clock(endDate), clockDOM, 800);
    }

    orient(orient) {
        switch (orient) {
            case "vertical":
                this.classList.add("rc--vertical");
                break;
            default:
                break;
        }
    }

    setStyles(orient, size) {
        this.id = `rc${RCountdown.created}`;
        this.orient(orient);

        if (size) {
            this.manualSize(size);
        } else {
            this.autoSize();
        }
    }

    autoSize() {
        let self = this;
        const resizeObserver = new ResizeObserver(resizeCallback);
        resizeObserver.observe(self);

        function resizeCallback(entries) {
            for (const entry of entries) {
                let dimension = entry.contentBoxSize[0];
                let size = (0.2 * dimension.inlineSize).toFixed();
                self.style.setProperty("--timer-width", `min(calc(${size}px), 25vmin)`);
            }
        }
    }

    manualSize(size) {
        this.style.setProperty("--timer-width", size);
    }

}

customElements.define("app-rcountdown", RCountdown);



