/* ==========================================================
   PowerTube
   home.js
   Version : 1.0
========================================================== */

class HomePage {

    constructor() {

        this.page = 1;

        this.loading = false;

        this.hasMore = true;

        this.videos = [];

        this.container = null;

        this.scrollHandler =
            this.onScroll.bind(this);

    }

    /* ============================================
       RENDER
    ============================================ */

    async render() {

        this.page = 1;

        this.hasMore = true;

        this.videos = [];

        const content =
            document.getElementById("content");

        content.innerHTML = `

            <h2 style="margin-bottom:20px">

                🔥 Trending Indonesia

            </h2>

            <div
                id="videoGrid"
                class="video-grid">

            </div>

            <div
                id="homeLoading"
                class="loading hidden">

                Memuat...

            </div>

        `;

        this.container =
            document.getElementById("videoGrid");

        content.removeEventListener(
            "scroll",
            this.scrollHandler
        );

        content.addEventListener(
            "scroll",
            this.scrollHandler
        );

        await this.loadMore();

    }

    /* ============================================
       LOAD MORE
    ============================================ */

    async loadMore() {

        if (this.loading) return;

        if (!this.hasMore) return;

        this.loading = true;

        const loader =
            document.getElementById(
                "homeLoading"
            );

        loader.classList.remove("hidden");

        try {

            const result =
                await API.getTrending(
                    this.page
                );

            if (
                !result ||
                !Array.isArray(result.items)
            ) {

                this.hasMore = false;

                loader.classList.add("hidden");

                this.loading = false;

                return;

            }

            if (result.items.length === 0) {

                this.hasMore = false;

                loader.classList.add("hidden");

                this.loading = false;

                return;

            }

            this.videos.push(...result.items);

            this.renderItems(
                result.items
            );

            this.page++;

        }

        catch (error) {

            console.error(error);

        }

        loader.classList.add("hidden");

        this.loading = false;

    }

    /* ============================================
       RENDER ITEMS
    ============================================ */

    renderItems(items) {

        const fragment =
            document.createDocumentFragment();

        items.forEach(video => {

            fragment.appendChild(

                this.createCard(video)

            );

        });

        this.container.appendChild(
            fragment
        );

    }

    /* ============================================
       CARD
    ============================================ */

    createCard(video) {

        const card =
            document.createElement("div");

        card.className =
            "video-card";

        card.tabIndex = 0;

        card.innerHTML = `

            <img

                class="video-thumb"

                loading="lazy"

                src="${video.thumbnail}"

                alt="thumbnail">

            <div class="video-info">

                <div class="video-title">

                    ${video.title}

                </div>

                <div class="video-channel">

                    ${video.channel}

                </div>

                <div class="video-meta">

                    ${video.views || ""}

                </div>

            </div>

        `;

        card.addEventListener(
            "click",
            () => {

                Storage.addHistory(
                    video
                );

                Router.go(
                    "player",
                    video
                );

            }
        );

        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    Storage.addHistory(
                        video
                    );

                    Router.go(
                        "player",
                        video
                    );

                }

            }
        );

        return card;

    }

    /* ============================================
       SCROLL
    ============================================ */

    onScroll(event) {

        const target =
            event.target;

        if (

            target.scrollTop +
            target.clientHeight >

            target.scrollHeight - 600

        ) {

            this.loadMore();

        }

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

window.HomeModule =
    new HomePage();
