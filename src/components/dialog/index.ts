import { createApp, h, getCurrentInstance } from "vue";
import loni from "@/instance";
import Dialog from "./dialog.vue";

const dialogComponent = Dialog as unknown as Loni.Component.Dialog.Able;

dialogComponent.install = async function (Vue) {
    Vue.component("loni-dialog", dialogComponent);
    loni.Dialog = Dialog as unknown as Loni.Component.Dialog.Able;
    Vue.config.globalProperties.$loni = loni;
}

const cache = new Map();

dialogComponent.newInstance = (data = {}, props = {}, callback?: Function) => {
    const $container = document.createElement("div");

    let _instance: ReturnType<typeof getCurrentInstance>;

    const instance = createApp({
        data() {
            return data;
        },
        render() {
            return h(Dialog, {
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
                        callback?.("confirm");
                    },
                    cancel: () => {
                        callback?.("cancel");
                    }
                }
            }, this.render ? [this.render(h)] : []);
        },
        methods: {
            destroy() {
                instance.unmount();
                document.body.removeChild($container);
                cache.delete(instance);
            }
        },
        created () {
            _instance = getCurrentInstance();
        }
    }).mount($container);

    const modal = _instance!.refs.modal as Dialog;

    document.body.appendChild($container);

    cache.set(instance, instance);

    modal.visible = true;

    return {
        component: modal
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

export default dialogComponent as Loni.Component.Dialog.Instance;
