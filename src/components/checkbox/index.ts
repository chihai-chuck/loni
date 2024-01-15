import Checkbox from "./checkbox.vue";

Checkbox.install = function (Vue: Loni.VueConstructor) {
    Vue.component("loni-checkbox", Checkbox);
}

export default Checkbox;
