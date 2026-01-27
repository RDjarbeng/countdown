import sidebarHtml from "../html/sidebar.html?raw";
import headerHtml from "../html/header.html?raw";
import { initCustomAppName } from "./customAppName.js";

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
        super();
    }
    connectedCallback() {
        this.innerHTML = headerHtml;
        // Initialize custom app name after DOM is ready
        setTimeout(() => initCustomAppName(), 0);
    }
}

customElements.define("app-header", header);
customElements.define("app-sidebar", sidebar);
