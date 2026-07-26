/* ==========================================================
   PowerTube
   cache.js
   Version : 2.0
========================================================== */

class CacheManager {

    constructor() {

        this.KEY = "powertube_cache";

        this.DEFAULT_TTL = 1000 * 60 * 15;

        this.MAX_ITEMS = 100;

        this.data = this.load();

    }

    /* ============================================
       LOAD
    ============================================ */

    load() {

        try {

            const cache = localStorage.getItem(this.KEY);

            if (!cache) {

                return {};

            }

            return JSON.parse(cache);

        }

        catch (e) {

            console.error(e);

            return {};

        }

    }

    /* ============================================
       SAVE
    ============================================ */

    save() {

        try {

            localStorage.setItem(

                this.KEY,

                JSON.stringify(this.data)

            );

        }

        catch (e) {

            console.error(e);

        }

    }

    /* ============================================
       SET
    ============================================ */

    set(key, value, ttl = this.DEFAULT_TTL) {

        this.cleanup();

        this.data[key] = {

            value,

            created: Date.now(),

            expires: Date.now() + ttl

        };

        this.limit();

        this.save();

    }

    /* ============================================
       GET
    ============================================ */

    get(key) {

        const item = this.data[key];

        if (!item) {

            return null;

        }

        if (Date.now() > item.expires) {

            delete this.data[key];

            this.save();

            return null;

        }

        return item.value;

    }

    /* ============================================
       HAS
    ============================================ */

    has(key) {

        return this.get(key) !== null;

    }

    /* ============================================
       REMOVE
    ============================================ */

    remove(key) {

        delete this.data[key];

        this.save();

    }

    /* ============================================
       CLEAR
    ============================================ */

    clear() {

        this.data = {};

        this.save();

    }

    /* ============================================
       CLEANUP EXPIRED
    ============================================ */

    cleanup() {

        const now = Date.now();

        Object.keys(this.data).forEach(key => {

            if (this.data[key].expires < now) {

                delete this.data[key];

            }

        });

    }

    /* ============================================
       LIMIT
    ============================================ */

    limit() {

        const keys = Object.keys(this.data);

        if (keys.length <= this.MAX_ITEMS) {

            return;

        }

        keys.sort((a, b) => {

            return this.data[a].created -

                   this.data[b].created;

        });

        while (

            keys.length > this.MAX_ITEMS

        ) {

            const oldest = keys.shift();

            delete this.data[oldest];

        }

    }

    /* ============================================
       STATS
    ============================================ */

    stats() {

        return {

            items:

                Object.keys(this.data).length,

            maxItems:

                this.MAX_ITEMS,

            defaultTTL:

                this.DEFAULT_TTL

        };

    }

    /* ============================================
       SEARCH CACHE
    ============================================ */

    searchKey(keyword, page = 1) {

        return `search:${keyword}:${page}`;

    }

    /* ============================================
       TRENDING CACHE
    ============================================ */

    trendingKey(page = 1) {

        return `trending:${page}`;

    }

    /* ============================================
       CATEGORY CACHE
    ============================================ */

    categoryKey(name, page = 1) {

        return `category:${name}:${page}`;

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

window.Cache = new CacheManager();
