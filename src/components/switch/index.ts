import Switch from "./switch.vue";

Switch.install = function (Vue: Loni.VueConstructor) {
    Vue.component(Switch.name, Switch);
}

export default Switch;
