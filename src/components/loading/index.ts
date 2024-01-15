import Vue from "vue";
import loni from "@/instance";
import Loading from "./loading.vue";

const loadingComponent = Loading as Loni.Component.Loading.Able;

loadingComponent.install = function (Vue: Loni.VueConstructor) {
    Vue.component("loni-loading", loadingComponent);
    loni.Loading = Loading as Loni.Component.Loading.Able;
    Vue.prototype.$loni = loni;
}

loadingComponent.newInstance = (data = {}, props = {}) => {
    const instance = new Vue({
        data,
        render(h) {
            return h("div", {
                class: "loni-loading-fullscreen",
                style: {
                    position: "fixed",
                    zIndex: 10000,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            }, [
                h(Loading, {
                    props: Object.assign({
                        fix: true,
                        background: "transparent",
                        fullScreen: true
                    }, props)
                }, this.render ? [this.render(h)] : [])
            ]);
        }
    }).$mount();

    document.body.appendChild(instance.$el);
    const loading = instance.$children[0] as unknown as Loni.Component.Loading;

    return {
        show() {
            document.body.style.overflow = "hidden";
            loading.visible = true;
        },
        remove(callback: Function) {
            if(instance._isDestroyed) {
                callback();
            } else {
                loading.visible = false;
                setTimeout(() => {
                    if(instance.$el.parentElement) {
                        document.body.removeChild(instance.$el);
                    }
                    instance.$destroy();
                    document.body.style.overflow = "";
                    callback();
                }, 500);
            }
        },
        component: loading
    };
};

let loadingInstance: Loni.Component.Loading.Able | null;

const getLoadingInstance = (render?: Loni.VNode, props: Loni.AnyObject = {}) => {
    loadingInstance = loadingInstance || loadingComponent.newInstance({
        render
    }, props);

    return loadingInstance as Loni.Component.Loading.Able;
};

loadingComponent.show = (props: Loni.AnyObject = {}) => {
    getLoadingInstance(props.render, props).show(props);
};

loadingComponent.hide = () => {
    if(!loadingInstance) return false;

    getLoadingInstance().remove(() => {
        loadingInstance = null;
    });
};

export default loadingComponent as Loni.Component.Loading.Instance;
