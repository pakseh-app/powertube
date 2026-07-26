/* ==========================================================
   PowerTube
   search.js
   Version : 1.0
========================================================== */

class SearchPage {

    constructor() {

        this.keyword = "";

        this.page = 1;

        this.loading = false;

        this.hasMore = true;

        this.results = [];

        this.container = null;

        this.cache = new Map();

        this.debounce = null;

        this.scrollHandler =
            this.onScroll.bind(this);

    }

    /* ============================================
       RENDER
    ============================================ */

    render() {

        const content =
            document.getElementById("content");

        content.innerHTML = `

            <h2 style="margin-bottom:20px">

                🔍 Hasil Pencarian

            </h2>

            <div
                id="searchGrid"
                class="video-grid">

            </div>

            <div
                id="searchLoading"
                class="loading hidden">

                Memuat...

            </div>

        `;

        this.container =
            document.getElementById("searchGrid");

        content.removeEventListener(
            "scroll",
            this.scrollHandler
        );

        content.addEventListener(
            "scroll",
            this.scrollHandler
        );

    }

    /* ============================================
       SEARCH
    ============================================ */

    search(keyword) {

        clearTimeout(this.debounce);

        this.debounce = setTimeout(() => {

            this.start(keyword);

        },300);

    }

    /* ============================================
       START
    ============================================ */

    async start(keyword) {

        keyword = keyword.trim();

        if (!keyword) return;

        this.keyword = keyword;

        this.page = 1;

        this.results = [];

        this.hasMore = true;

        Router.go("search");

        this.container.innerHTML = "";

        if (this.cache.has(keyword)) {

            this.results =
                this.cache.get(keyword);

            this.renderItems(this.results);

            return;

        }

        await this.loadMore();

    }

    /* ============================================
       LOAD MORE
    ============================================ */

    async loadMore() {

        if (this.loading) return;

        if (!this.hasMore) return;

        this.loading = true;

        document
            .getElementById("searchLoading")
            .classList
            .remove("hidden");

        try {

            const result =
                await API.search(
                    this.keyword,
                    this.page
                );

            if (
                !result ||
                !Array.isArray(result.items)
            ) {

                this.hasMore = false;

            } else {

                this.results.push(
                    ...result.items
                );

                this.renderItems(
                    result.items
                );

                this.cache.set(
                    this.keyword,
                    [...this.results]
                );

                this.page++;

            }

        }

        catch(error){

            console.error(error);

        }

        document
            .getElementById("searchLoading")
            .classList
            .add("hidden");

        this.loading = false;

    }

    /* ============================================
       ITEMS
    ============================================ */

    renderItems(items){

        const fragment =
            document.createDocumentFragment();

        items.forEach(video=>{

            fragment.appendChild(

                this.createCard(video)

            );

        });

        this.container.appendChild(fragment);

    }

    /* ============================================
       CARD
    ============================================ */

    createCard(video){

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

            >

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

        card.onclick = ()=>{

            Storage.addHistory(video);

            Router.go("player",video);

        };

        card.onkeydown = (e)=>{

            if(e.key==="Enter"){

                Storage.addHistory(video);

                Router.go("player",video);

            }

        };

        return card;

    }

    /* ============================================
       SCROLL
    ============================================ */

    onScroll(e){

        const el = e.target;

        if(

            el.scrollTop +

            el.clientHeight >

            el.scrollHeight - 500

        ){

            this.loadMore();

        }

    }

}

window.SearchModule =
    new SearchPage();
