/* ==========================================================
   PowerTube
   app.js
   Version : 2.0
========================================================== */

class PowerTubeApp {

    constructor() {

        this.currentPage = "home";

        this.initialized = false;

        this.searchInput = null;

    }

    /* ============================================
       INIT
    ============================================ */

    init() {

        if (this.initialized) {

            return;

        }

        this.cacheElement();

        this.bindEvents();

        this.loadSettings();

        this.openHome();

        this.initialized = true;

        console.log("PowerTube Started");

    }

    /* ============================================
       CACHE ELEMENT
    ============================================ */

    cacheElement() {

        this.searchInput =

            document.getElementById("searchInput");

    }

    /* ============================================
       EVENTS
    ============================================ */

    bindEvents() {

        this.bindSearch();

        this.bindNavigation();

        window.addEventListener(

            "resize",

            this.onResize.bind(this)

        );

    }

    /* ============================================
       SEARCH
    ============================================ */

    bindSearch() {

        if (!this.searchInput) {

            return;

        }

        this.searchInput.addEventListener(

            "keydown",

            (event) => {

                if (event.key !== "Enter") {

                    return;

                }

                const keyword =

                    event.target.value.trim();

                if (!keyword) {

                    return;

                }

                if (window.SearchModule) {

                    SearchModule.search(keyword);

                }

            }

        );

    }

    /* ============================================
       NAVIGATION
    ============================================ */

    bindNavigation() {

        const map = {

            navHome: "home",

            navHistory: "history",

            navFavorites: "favorites",

            navSettings: "settings"

        };

        Object.keys(map).forEach((id) => {

            const element =

                document.getElementById(id);

            if (!element) {

                return;

            }

            element.addEventListener(

                "click",

                () => {

                    this.navigate(map[id]);

                }

            );

        });

    }

    /* ============================================
       NAVIGATE
    ============================================ */

    navigate(page, data = null) {

        this.currentPage = page;

        Router.go(page, data);

    }

    /* ============================================
       HOME
    ============================================ */

    openHome() {

        this.navigate("home");

    }

    /* ============================================
       SETTINGS
    ============================================ */

    loadSettings() {

        if (

            !window.Storage ||

            !Storage.getSettings

        ) {

            return;

        }

        const settings =

            Storage.getSettings();

        if (

            settings.theme === "dark"

        ) {

            document.body.classList.add(

                "theme-dark"

            );

        }

    }

    /* ============================================
       WINDOW RESIZE
    ============================================ */

    onResize() {

        if (

            window.Keyboard &&

            Keyboard.refresh

        ) {

            Keyboard.refresh();

        }

    }

    /* ============================================
       GET PAGE
    ============================================ */

    getCurrentPage() {

        return this.currentPage;

    }

}

/* ==========================================================
   CREATE APP
========================================================== */

window.PowerTube =

    new PowerTubeApp();

/* ==========================================================
   START
========================================================== */

window.addEventListener(

    "DOMContentLoaded",

    () => {

        PowerTube.init();

    }

);
