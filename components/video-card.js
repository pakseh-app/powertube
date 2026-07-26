/* ==========================================================
   PowerTube
   components/video-card.js
   Version : 2.0
========================================================== */

class VideoCard {

    constructor() {

        this.defaultThumbnail =

            "assets/images/no-thumbnail.png";

    }

    /* ============================================
       CREATE
    ============================================ */

    create(video = {}) {

        const card = document.createElement("div");

        card.className = "video-card";

        card.tabIndex = 0;

        card.dataset.videoId =

            video.id || "";

        card.innerHTML = `

            <div class="video-thumb">

                <img
                    loading="lazy"
                    draggable="false"
                    src="${video.thumbnail || this.defaultThumbnail}"
                    alt="${Utils.escape(video.title || "")}">

                <div class="video-duration">

                    ${video.duration || "--:--"}

                </div>

            </div>

            <div class="video-info">

                <div class="video-title">

                    ${Utils.escape(video.title || "Tanpa Judul")}

                </div>

                <div class="video-channel">

                    ${Utils.escape(video.channel || "-")}

                </div>

                <div class="video-meta">

                    ${Utils.formatViews(video.views || 0)}
                    •
                    ${video.published || ""}

                </div>

            </div>

        `;

        this.bind(card, video);

        return card;

    }

    /* ============================================
       EVENTS
    ============================================ */

    bind(card, video) {

        card.addEventListener(

            "click",

            () => {

                if (window.Router) {

                    Router.go(

                        "player",

                        video

                    );

                }

            }

        );

        card.addEventListener(

            "keydown",

            (e) => {

                if (e.key === "Enter") {

                    e.preventDefault();

                    card.click();

                }

            }

        );

    }

    /* ============================================
       RENDER LIST
    ============================================ */

    render(container, list = []) {

        if (!container) {

            return;

        }

        container.innerHTML = "";

        if (!Array.isArray(list)) {

            return;

        }

        list.forEach(video => {

            container.appendChild(

                this.create(video)

            );

        });

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

window.VideoCard =

    new VideoCard();
