class Global {
    /* 预初始化 */
    init() {
        const docEl = document.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = () => {
                const clientWidth = docEl.clientWidth;
                if(!clientWidth) return;
                docEl.style.fontSize = clientWidth / 18.75 + 'px';
            };
        if(!document.addEventListener) return;
        window.addEventListener(resizeEvt, recalc);
        document.addEventListener('DOMContentLoaded', recalc);
    }
}

declare module "vue" {
    interface ComponentCustomProperties {
        $global: Global;
    }
}

export default {
    global: new Global(),
    install(app: import("vue").App) {
        app.config.globalProperties.$global = this.global;
    }
}
