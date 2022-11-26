export class sidebar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <aside class="sidebar sidebar-hide">
        <section class="sidebar-content">
            <div class="brand">
                <div class="brand-logo"><img src="/img/icons/chrome512.png" alt="logo"></div>
                <div class="brand-name">Final CountDown</div>
            </div>
            <hr>
            <div class="opt-group">OPTIONS</div>
            <div class="sidebar-list">
                <div class="sidebar-list-items item-home">
                    <i class="fas fa-home fa-fw"></i> <span>Home</span>
                </div>
                <div class="sidebar-list-items item-countdowns">
                    <i class="fas fa-clock fa-fw"></i> <span>My CountDowns</span>
                </div>
                <div class="sidebar-list-items item-bg">
                    <i class="fas fa-upload fa-fw"></i> <span>Set Custom Background</span>
                </div>
                <div class="sidebar-list-items item-theme">
                    <i class="fas fa-adjust fa-fw"></i> <span>Change Theme</span>
                </div>
                <section class="pick-color">
                    <span class="pick-color-ico" data-settheme="red"></span>
                    <span class="pick-color-ico" data-settheme="pink"></span>
                    <span class="pick-color-ico" data-settheme="yellow"></span>
                    <span class="pick-color-ico" data-settheme="green"></span>
                    <span class="pick-color-ico" data-settheme="blue"></span>
                    <span class="pick-color-ico" data-settheme="purple"></span>
                    <span class="pick-color-ico" data-settheme="black"></span>
                </section>
                <div class="sidebar-list-items item-today">
                    <i class="fas fa-calendar-day fa-fw"></i> <span>Today</span>
                </div>
                <div class="sidebar-list-items item-about">
                    <i class="fas fa-question-circle fa-fw"></i> <span>About</span>
                </div>
            </div>
        </section>
    </aside>
        `;
    }
}
export class header extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        this.innerHTML = `
        <header class="header">        
        <div class="nav">
            <i class="fas fa-bars fa-lg"></i>
        </div>
        <div class="logo">
            <a href="/index.html"><div class="logo-ico"><img src="/img/icons/chrome192.png" alt="logo"></div></a>
            <div class="logo-name">Final CountDown</div>
        </div>
        <div class="mode-row">
            <span class="toggleMode" id='themeToggle'><i class="fas fa-sun fa-fw"></i></span>
        </div>
    </header>
        `;
    }
}

customElements.define("app-header", header);
customElements.define("app-sidebar", sidebar);