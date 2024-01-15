declare namespace Loni {
    type Vue = import("vue-property-decorator").Vue;
    type VueConstructor = Vue.VueConstructor;
    type VNode = Vue.VNode;

    interface AnyObject {
        [key: string]: any;
    }
}

interface LoniComponent extends Loni.VueConstructor {
    install: (Vue: Loni.VueConstructor) => void;
}
