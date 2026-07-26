/* ==========================================================
   PowerTube
   utils.js
   Version : 2.0
========================================================== */

class Utils {

    /* ============================================
       FORMAT VIEW
    ============================================ */

    formatViews(value) {

        value = Number(value) || 0;

        if (value >= 1000000000) {

            return (value / 1000000000).toFixed(1) + " M";

        }

        if (value >= 1000000) {

            return (value / 1000000).toFixed(1) + " Jt";

        }

        if (value >= 1000) {

            return (value / 1000).toFixed(1) + " Rb";

        }

        return value.toString();

    }

    /* ============================================
       FORMAT DURATION
    ============================================ */

    formatDuration(seconds) {

        seconds = Number(seconds) || 0;

        const h = Math.floor(seconds / 3600);

        const m = Math.floor((seconds % 3600) / 60);

        const s = Math.floor(seconds % 60);

        if (h > 0) {

            return [

                h,

                String(m).padStart(2, "0"),

                String(s).padStart(2, "0")

            ].join(":");

        }

        return [

            m,

            String(s).padStart(2, "0")

        ].join(":");

    }

    /* ============================================
       FORMAT RELATIVE TIME
    ============================================ */

    timeAgo(timestamp) {

        const diff =

            Math.floor(

                (Date.now() - timestamp) / 1000

            );

        if (diff < 60) {

            return "Baru saja";

        }

        if (diff < 3600) {

            return Math.floor(diff / 60) + " menit lalu";

        }

        if (diff < 86400) {

            return Math.floor(diff / 3600) + " jam lalu";

        }

        if (diff < 2592000) {

            return Math.floor(diff / 86400) + " hari lalu";

        }

        if (diff < 31536000) {

            return Math.floor(diff / 2592000) + " bulan lalu";

        }

        return Math.floor(diff / 31536000) + " tahun lalu";

    }

    /* ============================================
       DEBOUNCE
    ============================================ */

    debounce(callback, delay = 300) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    }

    /* ============================================
       THROTTLE
    ============================================ */

    throttle(callback, delay = 300) {

        let waiting = false;

        return (...args) => {

            if (waiting) {

                return;

            }

            waiting = true;

            callback(...args);

            setTimeout(() => {

                waiting = false;

            }, delay);

        };

    }

    /* ============================================
       ESCAPE HTML
    ============================================ */

    escape(text) {

        if (text === null || text === undefined) {

            return "";

        }

        return String(text)

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#39;");

    }

    /* ============================================
       CREATE ELEMENT
    ============================================ */

    create(tag, className = "") {

        const el = document.createElement(tag);

        if (className) {

            el.className = className;

        }

        return el;

    }

    /* ============================================
       QUERY
    ============================================ */

    $(selector, parent = document) {

        return parent.querySelector(selector);

    }

    /* ============================================
       QUERY ALL
    ============================================ */

    $$(selector, parent = document) {

        return [...parent.querySelectorAll(selector)];

    }

    /* ============================================
       RANDOM ID
    ============================================ */

    uuid(length = 12) {

        const chars =

            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        let result = "";

        for (let i = 0; i < length; i++) {

            result += chars.charAt(

                Math.floor(

                    Math.random() * chars.length

                )

            );

        }

        return result;

    }

    /* ============================================
       COPY
    ============================================ */

    copy(text) {

        if (!navigator.clipboard) {

            return false;

        }

        navigator.clipboard.writeText(text);

        return true;

    }

    /* ============================================
       NETWORK
    ============================================ */

    isOnline() {

        return navigator.onLine;

    }

    /* ============================================
       IMAGE
    ============================================ */

    preloadImage(url) {

        return new Promise((resolve, reject) => {

            const img = new Image();

            img.onload = () => resolve(img);

            img.onerror = reject;

            img.src = url;

        });

    }

    /* ============================================
       STORAGE SIZE
    ============================================ */

    storageSize() {

        let total = 0;

        for (let key in localStorage) {

            if (!localStorage.hasOwnProperty(key)) {

                continue;

            }

            total +=

                localStorage[key].length;

        }

        return (

            total / 1024

        ).toFixed(2) + " KB";

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

window.Utils = new Utils();
