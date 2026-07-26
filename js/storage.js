/* ==========================================================
   PowerTube
   storage.js
   Version : 2.0
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

    get(key, defaultValue = null) {

        try {

            const value = localStorage.getItem(key);

            if (value === null) {

                return defaultValue;

            }

            return JSON.parse(value);

        }

        catch (error) {

            console.error(error);

            return defaultValue;

        }

    }

    set(key, value) {

        try {

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

            return true;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    }

    remove(key) {

        localStorage.removeItem(key);

    }

    clearAll() {

        localStorage.clear();

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

        return this.set(

            this.KEYS.SETTINGS,

            settings

        );

    }

    updateSetting(name, value) {

        const settings =

            this.getSettings();

        settings[name] = value;

        this.saveSettings(settings);

    }

    /* ============================================
       HISTORY
    ============================================ */

    getHistory() {

        return this.get(

            this.KEYS.HISTORY,

            []

        );

    }

    addHistory(video) {

        if (!video || !video.id) {

            return;

        }

        let history =

            this.getHistory();

        history = history.filter(

            item => item.id !== video.id

        );

        history.unshift({

            id: video.id,

            title: video.title || "",

            channel: video.channel || "",

            thumbnail: video.thumbnail || "",

            watchedAt: Date.now()

        });

        const limit =

            this.getSettings()

                .historyLimit || 100;

        if (

            history.length > limit

        ) {

            history.length = limit;

        }

        this.set(

            this.KEYS.HISTORY,

            history

        );

    }

    clearHistory() {

        this.remove(

            this.KEYS.HISTORY

        );

    }

    /* ============================================
       FAVORITES
    ============================================ */

    getFavorites() {

        return this.get(

            this.KEYS.FAVORITES,

            []

        );

    }

    addFavorite(video) {

        if (!video || !video.id) {

            return;

        }

        const favorites =

            this.getFavorites();

        const exists =

            favorites.some(

                item =>

                    item.id === video.id

            );

        if (exists) {

            return;

        }

        favorites.unshift({

            id: video.id,

            title: video.title || "",

            channel: video.channel || "",

            thumbnail: video.thumbnail || "",

            addedAt: Date.now()

        });

        this.set(

            this.KEYS.FAVORITES,

            favorites

        );

    }

    removeFavorite(videoId) {

        const favorites =

            this.getFavorites()

                .filter(

                    item =>

                        item.id !== videoId

                );

        this.set(

            this.KEYS.FAVORITES,

            favorites

        );

    }

    toggleFavorite(video) {

        if (!video || !video.id) {

            return false;

        }

        if (

            this.isFavorite(video.id)

        ) {

            this.removeFavorite(

                video.id

            );

            return false;

        }

        this.addFavorite(video);

        return true;

    }

    clearFavorites() {

        this.remove(

            this.KEYS.FAVORITES

        );

    }

    isFavorite(videoId) {

        return this.getFavorites().some(

            item =>

                item.id === videoId

        );

    }

    /* ============================================
       RESUME
    ============================================ */

    getResumeData() {

        return this.get(

            this.KEYS.RESUME,

            {}

        );

    }

    saveResume(videoId, position) {

        if (!videoId) {

            return;

        }

        const data =

            this.getResumeData();

        data[videoId] = {

            position,

            updatedAt: Date.now()

        };

        this.set(

            this.KEYS.RESUME,

            data

        );

    }

    getResume(videoId) {

        const data =

            this.getResumeData();

        return data[videoId] || null;

    }

    hasResume(videoId) {

        return !!this.getResume(videoId);

    }

    removeResume(videoId) {

        const data =

            this.getResumeData();

        delete data[videoId];

        this.set(

            this.KEYS.RESUME,

            data

        );

    }

    clearResume() {

        this.remove(

            this.KEYS.RESUME

        );

    }

    /* ============================================
       BACKUP
    ============================================ */

    exportData() {

        return {

            history:

                this.getHistory(),

            favorites:

                this.getFavorites(),

            settings:

                this.getSettings(),

            resume:

                this.getResumeData()

        };

    }

    importData(data) {

        if (!data) {

            return false;

        }

        if (data.history) {

            this.set(

                this.KEYS.HISTORY,

                data.history

            );

        }

        if (data.favorites) {

            this.set(

                this.KEYS.FAVORITES,

                data.favorites

            );

        }

        if (data.settings) {

            this.set(

                this.KEYS.SETTINGS,

                data.settings

            );

        }

        if (data.resume) {

            this.set(

                this.KEYS.RESUME,

                data.resume

            );

        }

        return true;

    }

}

/* ==========================================================
   GLOBAL INSTANCE
========================================================== */

window.Storage = new StorageManager();
