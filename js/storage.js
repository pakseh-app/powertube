/* ==========================================================
   PowerTube
   storage.js
   Version : 1.0
========================================================== */

class StorageManager {

    constructor() {

        this.KEYS = {

            HISTORY: "powertube_history",

            FAVORITES: "powertube_favorites",

            SETTINGS: "powertube_settings",

            RESUME: "powertube_resume"

        };

    }

    /* ============================================
       BASIC
    ============================================ */

    get(key, defaultValue = []) {

        try {

            const data = localStorage.getItem(key);

            if (data === null) {

                return defaultValue;

            }

            return JSON.parse(data);

        }

        catch (e) {

            console.error(e);

            return defaultValue;

        }

    }

    set(key, value) {

        try {

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

        }

        catch (e) {

            console.error(e);

        }

    }

    remove(key) {

        localStorage.removeItem(key);

    }

    clearAll() {

        localStorage.clear();

    }

    /* ============================================
       HISTORY
    ============================================ */

    getHistory() {

        return this.get(this.KEYS.HISTORY);

    }

    addHistory(video) {

        if (!video || !video.id) return;

        let history = this.getHistory();

        history = history.filter(item => item.id !== video.id);

        history.unshift({

            id: video.id,

            title: video.title,

            channel: video.channel,

            thumbnail: video.thumbnail,

            watchedAt: Date.now()

        });

        if (history.length > 100) {

            history.length = 100;

        }

        this.set(this.KEYS.HISTORY, history);

    }

    clearHistory() {

        this.remove(this.KEYS.HISTORY);

    }

    /* ============================================
       FAVORITES
    ============================================ */

    getFavorites() {

        return this.get(this.KEYS.FAVORITES);

    }

    addFavorite(video) {

        if (!video || !video.id) return;

        const favorites = this.getFavorites();

        const exists = favorites.some(

            item => item.id === video.id

        );

        if (exists) return;

        favorites.unshift({

            id: video.id,

            title: video.title,

            channel: video.channel,

            thumbnail: video.thumbnail,

            addedAt: Date.now()

        });

        this.set(this.KEYS.FAVORITES, favorites);

    }

    removeFavorite(videoId) {

        const favorites = this.getFavorites();

        const filtered = favorites.filter(

            item => item.id !== videoId

        );

        this.set(this.KEYS.FAVORITES, filtered);

    }

    isFavorite(videoId) {

        return this.getFavorites().some(

            item => item.id === videoId

        );

    }

    /* ============================================
       RESUME PLAYBACK
    ============================================ */

    getResumeData() {

        return this.get(this.KEYS.RESUME, {});

    }

    saveResume(videoId, seconds) {

        const data = this.getResumeData();

        data[videoId] = {

            position: seconds,

            updatedAt: Date.now()

        };

        this.set(this.KEYS.RESUME, data);

    }

    getResume(videoId) {

        const data = this.getResumeData();

        return data[videoId] || null;

    }

    removeResume(videoId) {

        const data = this.getResumeData();

        delete data[videoId];

        this.set(this.KEYS.RESUME, data);

    }

    /* ============================================
       SETTINGS
    ============================================ */

    getSettings() {

        return this.get(

            this.KEYS.SETTINGS,

            {

                theme: "dark",

                autoplay: false,

                language: "id",

                region: "ID",

                historyLimit: 100

            }

        );

    }

    saveSettings(settings) {

        this.set(

            this.KEYS.SETTINGS,

            settings

        );

    }

    updateSetting(name, value) {

        const settings = this.getSettings();

        settings[name] = value;

        this.saveSettings(settings);

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

window.Storage = new StorageManager();
