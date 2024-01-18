interface LoniInstance {
    Loading: Loni.Component.Loading.Instance;
    Dialog: Loni.Component.Dialog.Instance;
    Toast: Loni.Component.Toast.Able;
}

const loni = {} as LoniInstance;
export default loni;

declare module "vue" {
    interface ComponentCustomProperties {
        $loni: typeof loni;
    }
}
