/* ==========================================================
   PowerTube
   router.js
   Version : 1.1
========================================================== */

class AppRouter {

    constructor() {

        this.routes = {};

        this.currentRoute = "";

        this.previousRoute = "";

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

        this.previousRoute = this.currentRoute;

        this.currentRoute = name;

        this.clear();

        try {

            this.routes[name](data);

        } catch (error) {

            console.error(error);

            this.error("Terjadi kesalahan saat membuka halaman.");

            return;

        }

        // Refresh keyboard setelah halaman selesai dirender
        setTimeout(() => {

            if (window.Keyboard) {

                Keyboard.refresh();

            }

        }, 100);

    }

    /* ============================================
       BACK
    ============================================ */

    back() {

        if (this.previousRoute) {

            this.go(this.previousRoute);

            return;

        }

        this.go("home");

    }

    /* ============================================
       CLEAR
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
       GET CURRENT ROUTE
    ============================================ */

    getCurrentRoute() {

        return this.currentRoute;

    }

    /* ============================================
       GET PREVIOUS ROUTE
    ============================================ */

    getPreviousRoute() {

        return this.previousRoute;

    }

}

/* ==========================================================
   CREATE ROUTER
========================================================== */

window.Router = new AppRouter();

/* ==========================================================
   REGISTER ROUTES
========================================================== */

/* HOME */

Router.register("home", () => {

    if (window.HomeModule) {

        HomeModule.render();

        return;

    }

    Router.loading("Memuat Beranda...");

});

/* SEARCH */

Router.register("search", () => {

    if (window.SearchModule) {

        SearchModule.render();

        return;

    }

    Router.loading("Memuat Pencarian...");

});

/* PLAYER */

Router.register("player", (video) => {

    if (window.PlayerModule) {

        PlayerModule.render(video);

        return;

    }

    Router.loading("Memuat Pemutar...");

});

/* HISTORY */

Router.register("history", () => {

    if (window.HistoryModule) {

        HistoryModule.render();

        return;

    }

    Router.loading("Memuat History...");

});

/* FAVORITES */

Router.register("favorites", () => {

    if (window.FavoritesModule) {

        FavoritesModule.render();

        return;

    }

    Router.loading("Memuat Favorit...");

});

/* SETTINGS */

Router.register("settings", () => {

    if (window.SettingsModule) {

        SettingsModule.render();

        return;

    }

    Router.loading("Memuat Pengaturan...");

});
