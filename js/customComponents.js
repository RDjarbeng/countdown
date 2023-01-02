import sidebarHtml from "../html/sidebar.html?raw";
import headerHtml from "../html/header.html?raw";

class sidebar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = sidebarHtml;
    }
}
class header extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.innerHTML = headerHtml;
    }
}

customElements.define("app-header", header);
customElements.define("app-sidebar", sidebar);