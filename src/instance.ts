interface LoniInstance {
    Loading: Loni.Component.Loading.Instance;
    Dialog: Loni.Component.Dialog.Instance;
    Toast: Loni.Component.Toast.Able;
}

const loni = {} as LoniInstance;
export default loni;

declare module "vue/types/vue" {
    interface Vue {
        $loni: typeof loni;
    }
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Loni.Vue> {
        loni?: typeof loni;
    }
}
