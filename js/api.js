/* ==========================================================
   PowerTube
   api.js
   Version : 1.0
========================================================== */

class ApiService {

    constructor() {

        this.baseUrl = "";

        this.region = "ID";

        this.language = "id";

        this.pageSize = 20;

        this.timeout = 15000;

    }

    /* ============================================
       CONFIG
    ============================================ */

    configure(config = {}) {

        if (config.baseUrl)
            this.baseUrl = config.baseUrl;

        if (config.region)
            this.region = config.region;

        if (config.language)
            this.language = config.language;

        if (config.pageSize)
            this.pageSize = config.pageSize;

    }

    /* ============================================
       REQUEST
    ============================================ */

    async request(endpoint, options = {}) {

        const controller = new AbortController();

        const timer = setTimeout(() => {

            controller.abort();

        }, this.timeout);

        try {

            const response = await fetch(

                this.baseUrl + endpoint,

                {

                    ...options,

                    signal: controller.signal

                }

            );

            clearTimeout(timer);

            if (!response.ok) {

                throw new Error(

                    "HTTP " + response.status

                );

            }

            return await response.json();

        }

        catch (error) {

            clearTimeout(timer);

            console.error(error);

            return null;

        }

    }

    /* ============================================
       TRENDING
    ============================================ */

    async getTrending(page = 1) {

        return await this.request(

            `/trending?page=${page}&region=${this.region}`

        );

    }

    /* ============================================
       SEARCH
    ============================================ */

    async search(keyword, page = 1) {

        return await this.request(

            `/search?q=${encodeURIComponent(keyword)}&page=${page}`

        );

    }

    /* ============================================
       CATEGORY
    ============================================ */

    async getCategory(name, page = 1) {

        return await this.request(

            `/category/${encodeURIComponent(name)}?page=${page}`

        );

    }

    /* ============================================
       RELATED
    ============================================ */

    async getRelated(videoId) {

        return await this.request(

            `/related/${videoId}`

        );

    }

    /* ============================================
       DETAIL
    ============================================ */

    async getVideo(videoId) {

        return await this.request(

            `/video/${videoId}`

        );

    }

    /* ============================================
       CHANNEL
    ============================================ */

    async getChannel(channelId) {

        return await this.request(

            `/channel/${channelId}`

        );

    }

    /* ============================================
       PLAYLIST
    ============================================ */

    async getPlaylist(id) {

        return await this.request(

            `/playlist/${id}`

        );

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

window.API = new ApiService();
