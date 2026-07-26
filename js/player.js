/* ==========================================================
   PowerTube
   player.js
   Version : 2.0
========================================================== */

class PlayerPage {

    constructor() {

        this.video = null;

    }

    /* ============================================
       RENDER
    ============================================ */

    render(video = null) {

        this.video = video;

        if (!video) {

            Router.empty("Video tidak ditemukan.");

            return;

        }

        Storage.addHistory(video);

        const content = document.getElementById("content");

        content.innerHTML = `

        <div class="player-page">

            <div class="player-box">

                <div id="playerArea">

                    <div class="player-placeholder">

                        <div style="font-size:70px;">▶</div>

                        <div>

                            Player siap digunakan

                        </div>

                    </div>

                </div>

            </div>

            <div class="player-detail">

                <h2 id="videoTitle">

                    ${Utils.escape(video.title)}

                </h2>

                <div class="player-meta">

                    ${Utils.escape(video.channel || "")}

                </div>

                <div class="player-actions">

                    <button id="btnFavorite">

                        ⭐ Favorit

                    </button>

                    <button id="btnShare">

                        📤 Bagikan

                    </button>

                    <button id="btnBack">

                        ⬅ Kembali

                    </button>

                </div>

            </div>

        </div>

        `;

        this.bindEvents();

    }

    /* ============================================
       EVENTS
    ============================================ */

    bindEvents() {

        document
            .getElementById("btnFavorite")
            .onclick = () => {

                const state =

                    Storage.toggleFavorite(

                        this.video

                    );

                if (state) {

                    Toast.success(

                        "Ditambahkan ke Favorit"

                    );

                } else {

                    Toast.info(

                        "Dihapus dari Favorit"

                    );

                }

            };

        document
            .getElementById("btnShare")
            .onclick = () => {

                this.share();

            };

        document
            .getElementById("btnBack")
            .onclick = () => {

                Router.back();

            };

    }

    /* ============================================
       SHARE
    ============================================ */

    share() {

        if (!this.video) {

            return;

        }

        const url =

            this.video.url ||

            "";

        if (

            navigator.share

        ) {

            navigator.share({

                title:

                    this.video.title,

                text:

                    this.video.title,

                url

            });

            return;

        }

        if (url) {

            Utils.copy(url);

            Toast.success(

                "Link disalin"

            );

        } else {

            Toast.info(

                "Tidak ada link"

            );

        }

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

window.PlayerModule =

    new PlayerPage();
