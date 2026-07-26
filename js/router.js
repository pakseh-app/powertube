/* ==========================================================
   PowerTube
   router.js
   Version : 1.0
========================================================== */

class AppRouter {

    constructor() {

        this.routes = {};

        this.currentRoute = "";

        this.content =
            document.getElementById("content");

    }

    /* ============================================
       REGISTER ROUTE
    ============================================ */

    register(name, callback) {

        if (typeof callback !== "function") {

            console.warn("Invalid route:", name);

            return;

        }

        this.routes[name] = callback;

    }

    /* ============================================
       GO
    ============================================ */

    go(name, data = null) {

        if (!this.routes[name]) {

            this.render404(name);

            return;

        }

        this.currentRoute = name;

        this.clear();

        this.routes[name](data);

    }

    /* ============================================
       CLEAR CONTENT
    ============================================ */

    clear() {

        this.content.innerHTML = "";

        this.content.scrollTop = 0;

    }

    /* ============================================
       LOADING
    ============================================ */

    loading(text = "Loading...") {

        this.content.innerHTML = `

            <div class="loading">

                ${text}

            </div>

        `;

    }

    /* ============================================
       EMPTY
    ============================================ */

    empty(text = "Tidak ada data") {

        this.content.innerHTML = `

            <div class="empty">

                ${text}

            </div>

        `;

    }

    /* ============================================
       ERROR
    ============================================ */

    error(message) {

        this.content.innerHTML = `

            <div class="empty">

                ${message}

            </div>

        `;

    }

    /* ============================================
       404
    ============================================ */

    render404(route) {

        this.content.innerHTML = `

            <div class="empty">

                Halaman "${route}" tidak ditemukan.

            </div>

        `;

    }

    /* ============================================
       GET CURRENT
    ============================================ */

    getCurrentRoute() {

        return this.currentRoute;

    }

}

/* ==========================================================
   CREATE ROUTER
========================================================== */

window.Router = new AppRouter();

/* ==========================================================
   REGISTER PAGE
========================================================== */

Router.register("home", () => {

    if (window.HomeModule) {

        HomeModule.render();

        return;

    }

    Router.loading("Memuat Beranda...");

});

Router.register("search", () => {

    if (window.SearchModule) {

        SearchModule.render();

        return;

    }

    Router.loading("Memuat Pencarian...");

});

Router.register("player", (video) => {

    if (window.PlayerModule) {

        PlayerModule.render(video);

        return;

    }

    Router.loading("Memuat Player...");

});

Router.register("history", () => {

    if (window.HistoryModule) {

        HistoryModule.render();

        return;

    }

    Router.loading("Memuat History...");

});

Router.register("favorites", () => {

    if (window.FavoritesModule) {

        FavoritesModule.render();

        return;

    }

    Router.loading("Memuat Favorit...");

});

Router.register("settings", () => {

    if (window.SettingsModule) {

        SettingsModule.render();

        return;

    }

    Router.loading("Memuat Pengaturan...");

});
