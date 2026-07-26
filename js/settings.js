/* ==========================================================
   PowerTube
   settings.js
   Version : 1.0
========================================================== */

class SettingsPage {

    constructor() {

        this.settings = {};

    }

    /* ============================================
       RENDER
    ============================================ */

    render() {

        this.settings = Storage.getSettings();

        const content =
            document.getElementById("content");

        content.innerHTML = `

        <div class="settings-page">

            <h2>⚙ Pengaturan</h2>

            <div class="setting-group">

                <label>

                    Region Trending

                </label>

                <select id="settingRegion">

                    <option value="ID">Indonesia</option>

                </select>

            </div>

            <div class="setting-group">

                <label>

                    Tema

                </label>

                <select id="settingTheme">

                    <option value="dark">Dark</option>

                </select>

            </div>

            <div class="setting-group">

                <label>

                    Autoplay

                </label>

                <input
                    id="settingAutoplay"
                    type="checkbox">

            </div>

            <div class="setting-group">

                <label>

                    Maksimum History

                </label>

                <select id="settingHistoryLimit">

                    <option value="50">50</option>

                    <option value="100">100</option>

                    <option value="200">200</option>

                </select>

            </div>

            <hr>

            <button id="btnClearHistory">

                🕒 Hapus History

            </button>

            <button id="btnClearFavorite">

                ⭐ Hapus Favorit

            </button>

            <button id="btnClearResume">

                ▶ Hapus Resume

            </button>

            <button id="btnReset">

                🔄 Reset Pengaturan

            </button>

        </div>

        `;

        this.loadValues();

        this.bindEvents();

    }

    /* ============================================
       LOAD
    ============================================ */

    loadValues() {

        document.getElementById(
            "settingRegion"
        ).value = this.settings.region;

        document.getElementById(
            "settingTheme"
        ).value = this.settings.theme;

        document.getElementById(
            "settingAutoplay"
        ).checked = this.settings.autoplay;

        document.getElementById(
            "settingHistoryLimit"
        ).value = this.settings.historyLimit;

    }

    /* ============================================
       EVENTS
    ============================================ */

    bindEvents() {

        document
            .getElementById("settingRegion")
            .onchange = e => {

                Storage.updateSetting(
                    "region",
                    e.target.value
                );

            };

        document
            .getElementById("settingTheme")
            .onchange = e => {

                Storage.updateSetting(
                    "theme",
                    e.target.value
                );

            };

        document
            .getElementById("settingAutoplay")
            .onchange = e => {

                Storage.updateSetting(
                    "autoplay",
                    e.target.checked
                );

            };

        document
            .getElementById("settingHistoryLimit")
            .onchange = e => {

                Storage.updateSetting(
                    "historyLimit",
                    Number(e.target.value)
                );

            };

        document
            .getElementById("btnClearHistory")
            .onclick = () => {

                if(confirm("Hapus history?")){

                    Storage.clearHistory();

                    alert("History dihapus.");

                }

            };

        document
            .getElementById("btnClearFavorite")
            .onclick = () => {

                if(confirm("Hapus favorit?")){

                    Storage.remove(
                        Storage.KEYS.FAVORITES
                    );

                    alert("Favorit dihapus.");

                }

            };

        document
            .getElementById("btnClearResume")
            .onclick = () => {

                if(confirm("Hapus resume?")){

                    Storage.clearResume();

                    alert("Resume dihapus.");

                }

            };

        document
            .getElementById("btnReset")
            .onclick = () => {

                if(!confirm(
                    "Reset semua pengaturan?"
                )) return;

                Storage.saveSettings({

                    theme:"dark",

                    autoplay:false,

                    language:"id",

                    region:"ID",

                    historyLimit:100

                });

                this.render();

            };

    }

}

window.SettingsModule =
    new SettingsPage();
