/* ==========================================================
   PowerTube
   history.js
   Version : 1.0
========================================================== */

class HistoryPage {

    constructor() {
        this.items = [];
    }

    render() {

        const content =
            document.getElementById("content");

        this.items = Storage.getHistory();

        if (!this.items.length) {

            content.innerHTML = `

                <div class="empty">

                    Belum ada riwayat tontonan.

                </div>

            `;

            return;

        }

        let html = `

            <div style="display:flex;
                        justify-content:space-between;
                        align-items:center;
                        margin-bottom:20px;">

                <h2>🕒 History</h2>

                <button id="clearHistory">

                    Hapus Semua

                </button>

            </div>

            <div
                id="historyGrid"
                class="video-grid">

        `;

        this.items.forEach(video => {

            html += this.createCard(video);

        });

        html += "</div>";

        content.innerHTML = html;

        this.bindEvents();

    }

    createCard(video) {

        return `

        <div
            class="video-card"
            tabindex="0"
            data-id="${video.id}">

            <img
                class="video-thumb"
                src="${video.thumbnail}"
                loading="lazy">

            <div class="video-info">

                <div class="video-title">

                    ${video.title}

                </div>

                <div class="video-channel">

                    ${video.channel}

                </div>

            </div>

        </div>

        `;

    }

    bindEvents() {

        document
            .querySelectorAll(".video-card")
            .forEach(card => {

                card.onclick = () => {

                    const id =
                        card.dataset.id;

                    const video =
                        this.items.find(

                            v => v.id === id

                        );

                    if (video) {

                        Router.go(
                            "player",
                            video
                        );

                    }

                };

            });

        const clear =
            document.getElementById(
                "clearHistory"
            );

        if (clear) {

            clear.onclick = () => {

                if (!confirm(
                    "Hapus semua history?"
                )) return;

                Storage.clearHistory();

                this.render();

            };

        }

    }

}

window.HistoryModule =
    new HistoryPage();
