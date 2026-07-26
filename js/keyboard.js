/* ==========================================================
   PowerTube
   keyboard.js
   Version : 1.0
========================================================== */

class KeyboardManager {

    constructor() {

        this.focusables = [];

        this.currentIndex = 0;

        this.initialized = false;

    }

    /* ============================================
       INIT
    ============================================ */

    init() {

        if(this.initialized) return;

        this.refresh();

        document.addEventListener(

            "keydown",

            this.handleKey.bind(this)

        );

        this.initialized = true;

    }

    /* ============================================
       REFRESH
    ============================================ */

    refresh() {

        this.focusables = [

            ...document.querySelectorAll(

                'button,[tabindex="0"],input,select'

            )

        ];

        if(this.focusables.length){

            this.currentIndex = 0;

            this.focus();

        }

    }

    /* ============================================
       FOCUS
    ============================================ */

    focus(){

        if(

            this.currentIndex < 0 ||

            this.currentIndex >= this.focusables.length

        ){

            return;

        }

        this.focusables[
            this.currentIndex
        ].focus();

    }

    /* ============================================
       NEXT
    ============================================ */

    next(){

        if(!this.focusables.length) return;

        this.currentIndex++;

        if(

            this.currentIndex >=

            this.focusables.length

        ){

            this.currentIndex = 0;

        }

        this.focus();

    }

    /* ============================================
       PREVIOUS
    ============================================ */

    previous(){

        if(!this.focusables.length) return;

        this.currentIndex--;

        if(this.currentIndex < 0){

            this.currentIndex =

                this.focusables.length - 1;

        }

        this.focus();

    }

    /* ============================================
       CLICK
    ============================================ */

    activate(){

        if(

            !this.focusables.length

        ) return;

        this.focusables[
            this.currentIndex
        ].click();

    }

    /* ============================================
       BACK
    ============================================ */

    back(){

        if(

            window.PowerTube &&

            PowerTube.currentPage !== "home"

        ){

            PowerTube.navigate("home");

        }

    }

    /* ============================================
       KEY
    ============================================ */

    handleKey(e){

        switch(e.key){

            case "ArrowDown":

                e.preventDefault();

                this.next();

                break;

            case "ArrowUp":

                e.preventDefault();

                this.previous();

                break;

            case "ArrowRight":

                e.preventDefault();

                this.next();

                break;

            case "ArrowLeft":

                e.preventDefault();

                this.previous();

                break;

            case "Enter":

                e.preventDefault();

                this.activate();

                break;

            case "Escape":

            case "Backspace":

                e.preventDefault();

                this.back();

                break;

        }

    }

}

window.Keyboard =

    new KeyboardManager();

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        Keyboard.init();

    }

);
