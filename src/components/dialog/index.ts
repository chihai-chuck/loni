import Vue from "vue";
import loni from "@/instance";
import Dialog from "./dialog.vue";

const dialogComponent = Dialog as Loni.Component.Dialog.Able;

dialogComponent.install = async function (Vue: Loni.VueConstructor) {
    Vue.component("loni-dialog", dialogComponent);
    loni.Dialog = Dialog as Loni.Component.Dialog.Able;
    Vue.prototype.$loni = loni;
}

const cache = new Map();

dialogComponent.newInstance = (data = {}, props = {}, callback?: Function) => {
    const instance = new Vue({
        data,
        render(h) {
            return h("div", {
                class: "loni-dialog-popup",
                style: {
                    position: "fixed",
                    zIndex: 1890,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }
            }, [
                h(Dialog, {
                    props: Object.assign(props, {
                        value: false,
                        eventOnce: true
                    }),
                    on: {
                        input: (visible: boolean) => {
                            if(!visible) {
                                setTimeout(this.destroy, 400);
                            }
                        },
                        confirm: () => {
                            callback && callback("confirm");
                        },
                        cancel: () => {
                            callback && callback("cancel");
                        }
                    }
                }, this.render ? [this.render(h)] : [])
            ]);
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
    const dialog = instance.$children[0] as unknown as Loni.Component.Dialog;

    cache.set(instance, instance);

    dialog.visible = true;

    return {
        component: dialog
    }
}

dialogComponent.alert = (props: Loni.Component.Dialog.Options | string = {}) => {
    return new Promise(resolve => {
        if(typeof props === "string") {
            dialogComponent.newInstance({}, {
                message: props
            }, resolve);
        } else {
            dialogComponent.newInstance({
                render: props.render
            }, props, resolve);
        }
    });
}

dialogComponent.confirm = (props: Loni.Component.Dialog.Options | string = {}) => {
    return new Promise((resolve, reject) => {
        const callback = (status: string) => {
            if(status === "confirm") {
                resolve(status);
            } else {
                reject(status);
            }
        }
        if(typeof props === "string") {
            dialogComponent.newInstance({}, {
                message: props,
                showCancelButton: true
            }, callback);
        } else {
            dialogComponent.newInstance({
                render: props.render
            }, Object.assign(props, {
                showCancelButton: true
            }), callback);
        }
    });
}

dialogComponent.close = () => {
    cache.forEach((value, key) => {
        value.destroy();
        cache.delete(key);
    });
}

export default Dialog as Loni.Component.Dialog.Instance;
