/* ==========================================================
   PowerTube
   toast.js
   Version : 2.0
========================================================== */

class ToastManager {

    constructor() {

        this.container = null;

        this.duration = 2500;

        this.queue = [];

        this.showing = false;

        this.init();

    }

    /* ============================================
       INIT
    ============================================ */

    init() {

        this.container = document.createElement("div");

        this.container.id = "toastContainer";

        this.container.style.position = "fixed";

        this.container.style.left = "50%";

        this.container.style.bottom = "40px";

        this.container.style.transform = "translateX(-50%)";

        this.container.style.zIndex = "999999";

        this.container.style.pointerEvents = "none";

        document.body.appendChild(this.container);

    }

    /* ============================================
       SHOW
    ============================================ */

    show(message, type = "info") {

        this.queue.push({

            message,

            type

        });

        if (!this.showing) {

            this.next();

        }

    }

    /* ============================================
       NEXT
    ============================================ */

    next() {

        if (!this.queue.length) {

            this.showing = false;

            return;

        }

        this.showing = true;

        const data = this.queue.shift();

        const toast = document.createElement("div");

        toast.className =

            "powertube-toast " + data.type;

        toast.textContent = data.message;

        toast.style.background = "#1f1f1f";

        toast.style.color = "#fff";

        toast.style.padding = "14px 22px";

        toast.style.borderRadius = "12px";

        toast.style.marginTop = "10px";

        toast.style.minWidth = "220px";

        toast.style.textAlign = "center";

        toast.style.fontSize = "15px";

        toast.style.opacity = "0";

        toast.style.transition =

            "all .25s ease";

        toast.style.transform =

            "translateY(20px)";

        if (data.type === "success") {

            toast.style.borderLeft =

                "4px solid #22c55e";

        }

        if (data.type === "error") {

            toast.style.borderLeft =

                "4px solid #ef4444";

        }

        if (data.type === "warning") {

            toast.style.borderLeft =

                "4px solid #f59e0b";

        }

        if (data.type === "info") {

            toast.style.borderLeft =

                "4px solid #3b82f6";

        }

        this.container.appendChild(toast);

        requestAnimationFrame(() => {

            toast.style.opacity = "1";

            toast.style.transform =

                "translateY(0)";

        });

        setTimeout(() => {

            toast.style.opacity = "0";

            toast.style.transform =

                "translateY(20px)";

            setTimeout(() => {

                toast.remove();

                this.next();

            }, 300);

        }, this.duration);

    }

    /* ============================================
       SHORTCUTS
    ============================================ */

    success(message) {

        this.show(message, "success");

    }

    error(message) {

        this.show(message, "error");

    }

    warning(message) {

        this.show(message, "warning");

    }

    info(message) {

        this.show(message, "info");

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

window.Toast = new ToastManager();
