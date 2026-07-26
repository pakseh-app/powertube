/* ==========================================================
   PowerTube
   app.js
   Version : 1.0
========================================================== */

class PowerTubeApp {

    constructor() {

        this.currentPage = "home";

        this.initialized = false;

        this.elements = {};

    }

    /* ============================================
       INIT
    ============================================ */

    init() {

        if (this.initialized) return;

        this.cacheElements();

        this.bindEvents();

        this.loadDefaultPage();

        this.initialized = true;

        console.log("PowerTube Started");

    }

    /* ============================================
       CACHE DOM
    ============================================ */

    cacheElements() {

        this.elements.content =
            document.getElementById("content");

        this.elements.searchInput =
            document.getElementById("searchInput");

        this.elements.searchButton =
            document.getElementById("searchButton");

        this.elements.sidebarButtons =
            document.querySelectorAll("#sidebar button");

    }

    /* ============================================
       EVENTS
    ============================================ */

    bindEvents() {

        /* Sidebar */

        this.elements.sidebarButtons.forEach(button => {

            button.addEventListener("click", () => {

                const page =
                    button.dataset.page;

                this.navigate(page);

            });

        });

        /* Search Button */

        this.elements.searchButton.addEventListener("click", () => {

            this.startSearch();

        });

        /* Enter Search */

        this.elements.searchInput.addEventListener("keydown", e => {

            if (e.key === "Enter") {

                this.startSearch();

            }

        });

        /* Keyboard Android TV */

        document.addEventListener("keydown",

            this.handleKeyDown.bind(this)

        );

    }

    /* ============================================
       KEYBOARD
    ============================================ */

    handleKeyDown(event) {

        switch (event.key) {

            case "F5":

                event.preventDefault();

                location.reload();

                break;

            case "Escape":

                this.navigate("home");

                break;

        }

    }

    /* ============================================
       SEARCH
    ============================================ */

    startSearch() {

        const keyword =
            this.elements.searchInput.value.trim();

        if (!keyword) return;

        if (window.SearchModule) {

            SearchModule.search(keyword);

        }

        this.navigate("search");

    }

    /* ============================================
       PAGE
    ============================================ */

    navigate(page) {

        this.currentPage = page;

        if (window.Router) {

            Router.go(page);

        }

        this.highlightMenu(page);

    }

    /* ============================================
       MENU ACTIVE
    ============================================ */

    highlightMenu(page) {

        this.elements.sidebarButtons.forEach(button => {

            if (button.dataset.page === page) {

                button.style.background = "#ff3d3d";

            } else {

                button.style.background = "transparent";

            }

        });

    }

    /* ============================================
       DEFAULT PAGE
    ============================================ */

    loadDefaultPage() {

        this.navigate("home");

    }

}

/* ==========================================================
   START APP
========================================================== */

window.PowerTube = new PowerTubeApp();

window.addEventListener("DOMContentLoaded", () => {

    PowerTube.init();

});
