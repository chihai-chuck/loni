import Scroll from "./scroll.vue";

Scroll.install = function (Vue: Loni.VueConstructor) {
    Vue.component("loni-scroll", Scroll);
}

export default Scroll;
