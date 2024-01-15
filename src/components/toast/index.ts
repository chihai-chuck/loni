import Vue from "vue";
import loni from "@/instance";
import Toast from "./toast.vue";

const cache = new Map();

const newInstance: Loni.Component.Toast.Instance = (data = {}, props = {}, callback?: Function) => {
    const instance = new Vue({
        data,
        render(h) {
            return h(Toast, {
                props,
                on: {
                    close: this.destroy
                }
            }, this.render ? [this.render(h)] : [])
        },
        methods: {
            destroy() {
                if(!instance._isDestroyed) {
                    if(instance.$el.parentElement) {
                        document.body.removeChild(instance.$el);
                    }
                    instance.$destroy();
                    cache.delete(instance);
                }
            }
        }
    }).$mount();

    document.body.appendChild(instance.$el);
    const toast = instance.$children[0] as unknown as Loni.Component.Toast;

    cache.set(instance, instance);

    toast.visible = true;

    return toast;
}

const toastInstance: Loni.Component.Toast.Able = (props: Loni.Component.Toast.Options | string) => {
    if(typeof props === "string") {
        return newInstance({}, {
            message: props
        });
    }
    return newInstance({
        render: props.render
    }, props);
}

const install = function (Vue: Loni.VueConstructor) {
    loni.Toast = toastInstance;
    Vue.prototype.$loni = loni;
}

export default {
    install,
    instance: toastInstance
};
