var p = Object.defineProperty;
var g = (e, t, r) => t in e ? p(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var h = (e, t, r) => (g(e, typeof t != "symbol" ? t + "" : t, r), r);
const o = (e, t) => e.innerHTML = t, c = (e) => e < 10 ? "0" + e : e;
class f {
  constructor(t) {
    this.setEndDate(t), this.countDown();
  }
  setEndDate(t) {
    let r = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    new RegExp(r).test(t) ? this.endDate = new Date(t) : this.endDate = new Date();
  }
  countDown() {
    this.getDistance() >= 0 ? this.calculateTimeValues() : this.reset();
  }
  getDistance() {
    return this.endDate.getTime() - new Date().getTime();
  }
  calculateTimeValues() {
    let t = this.getDistance();
    this.days = Math.floor(t / (1e3 * 60 * 60 * 24)), this.hours = Math.floor(t % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)), this.minutes = Math.floor(t % (1e3 * 60 * 60) / (1e3 * 60)), this.seconds = Math.floor(t % (1e3 * 60) / 1e3);
  }
  reset() {
    this.days = this.hours = this.minutes = this.seconds = 0;
  }
}
function v(e, t, r) {
  w(e, t, r), y(e, t);
}
function y(e, t) {
  return setInterval(() => {
    b(e, t);
  }, 500);
}
function b(e, t) {
  e.countDown();
  let r = c(e.days), n = c(e.hours), i = c(e.minutes), a = c(e.seconds);
  o(t.day, `${r}`), o(t.hour, `${n}`), o(t.minute, `${i}`), o(t.second, `${a}`);
}
async function w(e, t, r = 50, n = 0) {
  m(t.day, n, e.days, r), m(t.hour, n, e.hours, r), m(t.minute, n, e.minutes, r), m(t.second, n, e.seconds, r);
}
function m(e, t, r, n) {
  let i = null;
  const a = (l) => {
    i || (i = l);
    const d = Math.min((l - i) / n, 1);
    o(e, c(Math.floor(d * (r - t) + t))), d < 1 && window.requestAnimationFrame(a);
  };
  window.requestAnimationFrame(a);
}
const x = `<div class="rc_timer">\r
    <span class="rc_timer-num" id="day-num">00</span>\r
    <span class="rc_timer-text">Days</span>\r
</div>\r
<div class="rc_timer">\r
    <span class="rc_timer-num" id="hour-num">00</span>\r
    <span class="rc_timer-text">Hours</span>\r
</div>\r
<div class="rc_timer">\r
    <span class="rc_timer-num" id="min-num">00</span>\r
    <span class="rc_timer-text">Minutes</span>\r
</div>\r
<div class="rc_timer">\r
    <span class="rc_timer-num" id="sec-num">00</span>\r
    <span class="rc_timer-text">Seconds</span>\r
</div>`, z = `@import"https://fonts.googleapis.com/css2?family=Nunito:wght@500&display=swap";\r
\r
app-rcountdown * {\r
    font-family: Nunito, Arial, Helvetica, sans-serif;\r
    padding: 0;\r
    margin: 0;\r
    box-sizing: border-box;\r
    position: relative;\r
}\r
\r
app-rcountdown {\r
    --bg-color: rgba(0, 0, 0, 0.07);\r
    --color-muted: rgba(255, 255, 255, 0.15);\r
    --timer-num: calc(0.52 * var(--timer-width));\r
    --timer-text-width: calc(0.7 * var(--timer-width));\r
    --timer-text-size: calc(0.15 * var(--timer-text-width));\r
    --timer-grad: rgba(255, 255, 255, 0.5);\r
    --timer-box: 0 0 5px 1px rgba(0, 0, 0, 0.1);\r
    --timer-spacing: min(2.5vmin, 1.5rem);\r
    --timer-text-bg: whitesmoke;\r
}\r
\r
app-rcountdown {\r
    position: relative;\r
    display: flex;\r
    align-items: center;\r
    justify-content: center;\r
    text-align: center;\r
    border-radius: 0.2rem;\r
    padding: var(--timer-spacing);\r
    gap: var(--timer-spacing);\r
    background-color: var(--bg-color);\r
    font-family: Inter, Arial, Helvetica, sans-serif;\r
    overflow: hidden;\r
}\r
\r
.rc--vertical {\r
    flex-direction: column;\r
}\r
\r
.rc_timer {\r
    position: relative;\r
    display: flex;\r
    justify-content: center;\r
    align-items: center;\r
    flex-shrink: 0;\r
    width: var(--timer-width);\r
    height: var(--timer-width);\r
    border: 2px solid rgba(255, 255, 255, 0.2);\r
    border-radius: calc(var(--timer-spacing) / 2);\r
    background: linear-gradient(90deg,\r
            var(--color-muted) 50%,\r
            var(--timer-grad) 50%);\r
    margin-bottom: calc(var(--timer-spacing) / 2);\r
    backdrop-filter: blur(1px);\r
    font-family: Inter, sans-serif;\r
}\r
\r
.rc_timer-num {\r
    font-size: var(--timer-num);\r
}\r
\r
.rc_timer-text {\r
    font-size: var(--timer-text-size);\r
    content: "";\r
    position: absolute;\r
    bottom: -1em;\r
    background: var(--timer-text-bg);\r
    border-radius: 0.3em;\r
    padding: 0.5em 0;\r
    text-align: center;\r
    width: var(--timer-text-width);\r
    overflow: clip;\r
    transition: background-color 0.2s ease;\r
}`, s = class extends HTMLElement {
  constructor() {
    super();
  }
  static addStyles() {
    let t = document.createElement("style");
    t.textContent = z, document.head.append(t), s.addedStyles = !0;
  }
  async connectedCallback() {
    this.innerHTML = x, s.addedStyles || s.addStyles();
    let t = this.getAttribute("cd-to"), r = this.getAttribute("orient"), n = this.getAttribute("size");
    ++s.created, this.startRcountdown(t), this.setStyles(r, n);
  }
  $(t) {
    return this.querySelector(t);
  }
  startRcountdown(t) {
    const r = {
      dayElem: "day-num",
      hourElem: "hour-num",
      minuteElem: "min-num",
      secondElem: "sec-num"
    }, n = {
      day: this.$("#" + r.dayElem),
      hour: this.$("#" + r.hourElem),
      minute: this.$("#" + r.minuteElem),
      second: this.$("#" + r.secondElem)
    };
    v(new f(t), n, 800);
  }
  orient(t) {
    switch (t) {
      case "vertical":
        this.classList.add("rc--vertical");
        break;
    }
  }
  setStyles(t, r) {
    this.id = `rc${s.created}`, this.orient(t), r ? this.manualSize(r) : this.autoSize();
  }
  autoSize() {
    let t = this;
    new ResizeObserver(n).observe(t);
    function n(i) {
      for (const a of i) {
        let l = a.contentBoxSize[0], d = (0.2 * l.inlineSize).toFixed();
        t.style.setProperty("--timer-width", `min(calc(${d}px), 25vmin)`);
      }
    }
  }
  manualSize(t) {
    this.style.setProperty("--timer-width", t);
  }
};
let u = s;
h(u, "created", 0);
customElements.define("app-rcountdown", u);
