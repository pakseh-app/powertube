/* ==========================================================
   PowerTube
   components/sidebar.js
   Version : 2.0
========================================================== */

class Sidebar {

    constructor() {

        this.menu = [

            {
                id: "home",
                icon: "🏠",
                title: "Beranda"
            },

            {
                id: "search",
                icon: "🔍",
                title: "Cari"
            },

            {
                id: "history",
                icon: "🕒",
                title: "History"
            },

            {
                id: "favorites",
                icon: "⭐",
                title: "Favorit"
            },

            {
                id: "settings",
                icon: "⚙",
                title: "Pengaturan"
            }

        ];

    }

    /* ============================================
       RENDER
    ============================================ */

    render(containerId = "sidebar") {

        const container =

            document.getElementById(containerId);

        if (!container) {

            return;

        }

        container.innerHTML = "";

        this.menu.forEach(item => {

            container.appendChild(

                this.createItem(item)

            );

        });

        this.setActive(

            Router.getCurrentRoute()

        );

    }

    /* ============================================
       ITEM
    ============================================ */

    createItem(item) {

        const button =

            document.createElement("button");

        button.className =

            "sidebar-item";

        button.id =

            "nav-" + item.id;

        button.dataset.route =

            item.id;

        button.tabIndex = 0;

        button.innerHTML = `

            <span class="sidebar-icon">

                ${item.icon}

            </span>

            <span class="sidebar-title">

                ${item.title}

            </span>

        `;

        button.addEventListener(

            "click",

            () => {

                Router.go(item.id);

                this.setActive(item.id);

            }

        );

        return button;

    }

    /* ============================================
       ACTIVE
    ============================================ */

    setActive(route) {

        document

            .querySelectorAll(

                ".sidebar-item"

            )

            .forEach(item => {

                item.classList.remove(

                    "active"

                );

            });

        const current =

            document.querySelector(

                `[data-route="${route}"]`

            );

        if (current) {

            current.classList.add(

                "active"

            );

        }

    }

}

/* ==========================================================
   GLOBAL
========================================================== */

window.Sidebar =

    new Sidebar();
