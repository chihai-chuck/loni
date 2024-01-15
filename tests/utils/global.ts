import Vue from 'vue';

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

declare module "vue/types/vue" {
    interface Vue {
        $global: Global;
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Loni.Vue> {
        global?: Global;
    }
}

export default {
    Global,
    install(Vue: Loni.VueConstructor) {
        Vue.prototype.$global = new Global();
    }
};
