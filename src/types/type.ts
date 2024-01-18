declare namespace Loni {
    type Vue = InstanceType<import("vue-facing-decorator").VueCons>;
    type VueConstructor = import("vue-facing-decorator").VueCons;
    type App = import("vue").App;
    type VNode = import("vue").VNode;

    interface AnyObject {
        [key: string]: any;
    }
}

interface LoniComponent extends Loni.VueConstructor {
    install: (Vue: Loni.App) => void;
    $router?: import("vue-router").Router;
}
