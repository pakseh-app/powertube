/* ==========================================================
   PowerTube
   loading.js
   Version : 2.0
========================================================== */

class LoadingManager {

    constructor() {

        this.overlay = null;

        this.text = null;

        this.visible = false;

        this.create();

    }

    /* ============================================
       CREATE
    ============================================ */

    create() {

        this.overlay = document.createElement("div");

        this.overlay.id = "loadingOverlay";

        this.overlay.innerHTML = `

            <div class="loading-box">

                <div class="loading-spinner"></div>

                <div id="loadingText">

                    Memuat...

                </div>

            </div>

        `;

        Object.assign(this.overlay.style, {

            position: "fixed",

            left: "0",

            top: "0",

            width: "100%",

            height: "100%",

            display: "none",

            justifyContent: "center",

            alignItems: "center",

            background: "rgba(0,0,0,.55)",

            backdropFilter: "blur(2px)",

            zIndex: "999998"

        });

        document.body.appendChild(this.overlay);

        this.text =

            this.overlay.querySelector(

                "#loadingText"

            );

        this.injectStyle();

    }

    /* ============================================
       STYLE
    ============================================ */

    injectStyle() {

        const style = document.createElement("style");

        style.textContent = `

        .loading-box{

            width:240px;

            padding:30px;

            background:#202020;

            border-radius:18px;

            text-align:center;

            color:#fff;

            box-shadow:0 10px 40px rgba(0,0,0,.4);

        }

        .loading-spinner{

            width:48px;

            height:48px;

            margin:0 auto 18px;

            border:4px solid rgba(255,255,255,.15);

            border-top:4px solid #ff0000;

            border-radius:50%;

            animation:pt-spin .8s linear infinite;

        }

        @keyframes pt-spin{

            from{

                transform:rotate(0deg);

            }

            to{

                transform:rotate(360deg);

            }

        }

        `;

        document.head.appendChild(style);

    }

    /* ============================================
       SHOW
    ============================================ */

    show(message = "Memuat...") {

        this.text.textContent = message;

        this.overlay.style.display = "flex";

        this.visible = true;

    }

    /* ============================================
       HIDE
    ============================================ */

    hide() {

        this.overlay.style.display = "none";

        this.visible = false;

    }

    /* ============================================
       TOGGLE
    ============================================ */

    toggle(state) {

        if (state) {

            this.show();

        } else {

            this.hide();

        }

    }

    /* ============================================
       STATUS
    ============================================ */

    isVisible() {

        return this.visible;

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

window.Loading =

    new LoadingManager();
