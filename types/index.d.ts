import "../src/types";

interface Loni {
    Loading: {
        show: (options?: Loni.Component.Loading.Options) => void;
        hide: () => void;
    },
    Dialog: {
        alert: (options: Loni.Component.Dialog.Options | string) => Promise<string>;
        confirm: (options: Loni.Component.Dialog.Options | string) => Promise<string>;
        close: () => void;
    },
    Toast: (options: Loni.Component.Toast.Options | string) => Promise<Loni.Component.Toast>;
}

declare module "vue" {
    interface ComponentCustomProperties {
        $loni: Loni;
    }
}
