import Swipeout from "./swipeout.vue";

Swipeout.install = function (Vue: Loni.VueConstructor) {
    Vue.component(Swipeout.name, Swipeout);
}

export default Swipeout;
