/* ==========================================================
   PowerTube
   favorites.js
   Version : 1.0
========================================================== */

class FavoritesPage {

    constructor() {

        this.items = [];

    }

    /* ============================================
       RENDER
    ============================================ */

    render() {

        this.items = Storage.getFavorites();

        const content =
            document.getElementById("content");

        if (this.items.length === 0) {

            content.innerHTML = `

                <div class="empty">

                    Belum ada video favorit.

                </div>

            `;

            return;

        }

        let html = `

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
            ">

                <h2>⭐ Favorit</h2>

                <button id="clearFavorites">

                    Hapus Semua

                </button>

            </div>

            <div
                id="favoriteGrid"
                class="video-grid">

        `;

        this.items.forEach(video => {

            html += this.createCard(video);

        });

        html += "</div>";

        content.innerHTML = html;

        this.bindEvents();

    }

    /* ============================================
       CARD
    ============================================ */

    createCard(video) {

        return `

        <div
            class="video-card"
            tabindex="0"
            data-id="${video.id}">

            <img

                class="video-thumb"

                loading="lazy"

                src="${video.thumbnail}"

            >

            <div class="video-info">

                <div class="video-title">

                    ${video.title}

                </div>

                <div class="video-channel">

                    ${video.channel}

                </div>

                <div class="video-meta">

                    ⭐ Favorit

                </div>

            </div>

        </div>

        `;

    }

    /* ============================================
       EVENTS
    ============================================ */

    bindEvents() {

        document
            .querySelectorAll(".video-card")
            .forEach(card => {

                card.onclick = () => {

                    const id =
                        card.dataset.id;

                    const video =
                        this.items.find(

                            item => item.id === id

                        );

                    if (video) {

                        Router.go(
                            "player",
                            video
                        );

                    }

                };

                card.onkeydown = (e) => {

                    if (e.key === "Enter") {

                        card.click();

                    }

                };

            });

        const clear =
            document.getElementById(
                "clearFavorites"
            );

        if (clear) {

            clear.onclick = () => {

                if (!confirm(
                    "Hapus semua favorit?"
                )) return;

                Storage.clearFavorites();
               
                );

                this.render();

            };

        }

    }

    /* ============================================
       REFRESH
    ============================================ */

    refresh() {

        this.render();

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

window.FavoritesModule =
    new FavoritesPage();
